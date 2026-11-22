<?php
/**
 * ===================================================================
 * ZAÏRE-MARKET — API REST : Catalogue des Produits & Publications
 * Requêtes Sécurisées, Filtrage SQL & Insertion Certifiée
 * ===================================================================
 */

require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/security.php';
require_once __DIR__ . '/../config/database.php';

$method = $_SERVER['REQUEST_METHOD'];

if (!$pdo) {
    json_response(['status' => 'error', 'message' => 'Connexion base de données indisponible.'], 500);
}

// -------------------------------------------------------------------
// 1. RÉCUPÉRATION DU CATALOGUE (GET)
// -------------------------------------------------------------------
if ($method === 'GET') {
    $category = trim($_GET['category'] ?? 'all');
    $city = trim($_GET['city'] ?? 'all');
    $search = trim($_GET['search'] ?? '');
    $limit = isset($_GET['limit']) ? max(1, min(200, (int)$_GET['limit'])) : 150;
    $offset = isset($_GET['offset']) ? max(0, (int)$_GET['offset']) : 0;

    $whereClauses = ["status = 'disponible'"];
    $params = [];

    // Si un utilisateur admin demande spécifiquement tous les produits (y compris suspendus)
    if (isset($_GET['all_statuses']) && $_GET['all_statuses'] === '1') {
        $user = get_authenticated_user();
        if ($user && in_array($user['role'], ['admin', 'super_admin'])) {
            $whereClauses = ["1=1"];
        }
    }

    if ($category !== 'all' && !empty($category)) {
        $whereClauses[] = "LOWER(category) = :category";
        $params[':category'] = strtolower($category);
    }

    if ($city !== 'all' && !empty($city)) {
        $whereClauses[] = "LOWER(city) = :city";
        $params[':city'] = strtolower($city);
    }

    if (!empty($search)) {
        $whereClauses[] = "(LOWER(name) LIKE :search OR LOWER(description) LIKE :search OR LOWER(seller_name) LIKE :search)";
        $params[':search'] = '%' . strtolower($search) . '%';
    }

    $whereSQL = implode(' AND ', $whereClauses);
    $querySQL = "SELECT * FROM products WHERE {$whereSQL} ORDER BY created_at DESC LIMIT {$limit} OFFSET {$offset}";

    try {
        $stmt = $pdo->prepare($querySQL);
        $stmt->execute($params);
        $rows = $stmt->fetchAll();

        // Normalisation des champs pour compatibilité totale avec les scripts JS
        $normalized = array_map(function($p) {
            return [
                'id' => (string)$p['id'],
                'name' => $p['name'],
                'price' => (float)$p['price'],
                'category' => $p['category'],
                'city' => $p['city'],
                'image' => $p['image'] ?: 'assets/images/logo.jpg',
                'description' => $p['description'] ?? '',
                'status' => $p['status'],
                'sellerId' => $p['seller_id'],
                'sellerName' => $p['seller_name'],
                'viewsCount' => (int)($p['views_count'] ?? 0),
                'createdAt' => $p['created_at']
            ];
        }, $rows);

        json_response([
            'status' => 'success',
            'count' => count($normalized),
            'data' => $normalized
        ]);
    } catch (PDOException $e) {
        json_response(['status' => 'error', 'message' => 'Erreur lors du chargement des produits.'], 500);
    }
}

// -------------------------------------------------------------------
// 2. AJOUT D'UN NOUVEAU PRODUIT (POST - VENDEURS & ADMINS)
// -------------------------------------------------------------------
if ($method === 'POST') {
    $user = require_auth();

    // Rôle requis : vendeur, admin ou super_admin
    if (!in_array($user['role'], ['vendeur', 'admin', 'super_admin'])) {
        json_response([
            'status' => 'error',
            'message' => 'Seuls les vendeurs enregistrés et les administrateurs peuvent publier des articles.'
        ], 403);
    }

    $input = get_json_input();
    $name = trim($input['name'] ?? '');
    $price = (float)($input['price'] ?? 0);
    $category = trim($input['category'] ?? '');
    $city = trim($input['city'] ?? 'Kinshasa');
    $description = trim($input['description'] ?? '');
    $image = trim($input['image'] ?? '');

    if (empty($name) || $price <= 0 || empty($category)) {
        json_response([
            'status' => 'error',
            'message' => 'Le nom du produit, la catégorie et un prix positif sont obligatoires.'
        ], 400);
    }

    if (empty($image)) {
        $image = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600';
    }

    $productId = 'P' . str_pad((string)rand(100, 9999), 4, '0', STR_PAD_LEFT);
    $sellerId = $user['uid'];
    $sellerName = $user['name'] ?: 'Vendeur RDC';

    try {
        $stmt = $pdo->prepare("
            INSERT INTO products (id, seller_id, seller_name, name, description, price, category, city, image, status, views_count, created_at)
            VALUES (:id, :seller_id, :seller_name, :name, :description, :price, :category, :city, :image, 'disponible', 0, NOW())
        ");
        $stmt->execute([
            ':id' => $productId,
            ':seller_id' => $sellerId,
            ':seller_name' => $sellerName,
            ':name' => $name,
            ':description' => $description,
            ':price' => $price,
            ':category' => $category,
            ':city' => $city,
            ':image' => $image
        ]);

        json_response([
            'status' => 'success',
            'message' => 'Produit publié avec succès sur Zaïre-Market !',
            'product' => [
                'id' => $productId,
                'name' => $name,
                'price' => $price,
                'category' => $category,
                'city' => $city,
                'image' => $image,
                'sellerId' => $sellerId,
                'sellerName' => $sellerName,
                'status' => 'disponible'
            ]
        ], 201);
    } catch (PDOException $e) {
        json_response(['status' => 'error', 'message' => 'Erreur technique lors de la publication.'], 500);
    }
}

json_response(['status' => 'error', 'message' => 'Méthode HTTP non supportée.'], 405);
