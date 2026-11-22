<?php
/**
 * ===================================================================
 * ZAÏRE-MARKET — API REST : Statistiques Réelles & Données Chart.js
 * Accès Réservé Exclusivement aux Administrateurs
 * ===================================================================
 */

require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/security.php';
require_once __DIR__ . '/../config/database.php';

// Protection : seuls les administrateurs ont accès
$authUser = require_role(['admin', 'super_admin']);

if (!$pdo) {
    json_response(['status' => 'error', 'message' => 'Base de données indisponible.'], 500);
}

try {
    $totalUsers = (int)$pdo->query("SELECT COUNT(*) FROM users")->fetchColumn();
    $totalProducts = (int)$pdo->query("SELECT COUNT(*) FROM products WHERE status = 'disponible'")->fetchColumn();
    $totalOrders = (int)$pdo->query("SELECT COUNT(*) FROM orders")->fetchColumn();
    $totalRevenue = (float)$pdo->query("SELECT COALESCE(SUM(total_amount), 0) FROM orders")->fetchColumn();

    // Répartition des produits par catégorie
    $catStmt = $pdo->query("
        SELECT category, COUNT(*) as count 
        FROM products 
        WHERE status = 'disponible'
        GROUP BY category 
        ORDER BY count DESC 
        LIMIT 6
    ");
    $categories = $catStmt->fetchAll();

    // 5 dernières commandes réelles
    $recentOrdersStmt = $pdo->query("
        SELECT id, customer_name as customer, total_amount as total, payment_method, status, created_at 
        FROM orders 
        ORDER BY created_at DESC 
        LIMIT 5
    ");
    $recentOrders = $recentOrdersStmt->fetchAll();

    json_response([
        'status' => 'success',
        'kpis' => [
            'users' => $totalUsers,
            'products' => $totalProducts,
            'orders' => $totalOrders,
            'revenue' => $totalRevenue,
            'revenueCDF' => round($totalRevenue * 2850)
        ],
        'categories' => $categories,
        'recentOrders' => $recentOrders
    ]);
} catch (PDOException $e) {
    json_response(['status' => 'error', 'message' => 'Erreur lors de la génération des statistiques.'], 500);
}
