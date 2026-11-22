<?php
/**
 * ===================================================================
 * ZAÏRE-MARKET — API REST : Commandes & Facturation Sécurisée
 * Recalcul Serveur Obligatoire, Anti-Falsification & Transactions PDO
 * ===================================================================
 */

require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/security.php';
require_once __DIR__ . '/../config/database.php';

$method = $_SERVER['REQUEST_METHOD'];

if (!$pdo) {
    json_response(['status' => 'error', 'message' => 'Base de données indisponible.'], 500);
}

// -------------------------------------------------------------------
// 1. LISTE DES COMMANDES (GET)
// -------------------------------------------------------------------
if ($method === 'GET') {
    $authUser = require_auth();

    try {
        if (in_array($authUser['role'], ['admin', 'super_admin'])) {
            // L'administrateur accède à toutes les commandes
            $stmt = $pdo->query("SELECT * FROM orders ORDER BY created_at DESC LIMIT 100");
        } else {
            // Le client n'accède qu'à ses propres commandes
            $stmt = $pdo->prepare("SELECT * FROM orders WHERE user_id = :uid ORDER BY created_at DESC LIMIT 50");
            $stmt->execute([':uid' => $authUser['uid']]);
        }
        $orders = $stmt->fetchAll();

        // Récupérer les articles associés pour chaque commande
        $ordersWithItems = [];
        $itemsStmt = $pdo->prepare("SELECT * FROM order_items WHERE order_id = :order_id");

        foreach ($orders as $order) {
            $itemsStmt->execute([':order_id' => $order['id']]);
            $order['items'] = $itemsStmt->fetchAll();
            $ordersWithItems[] = [
                'id' => $order['id'],
                'userId' => $order['user_id'],
                'customer' => $order['customer_name'],
                'customerPhone' => $order['customer_phone'] ?? '',
                'shippingCity' => $order['shipping_city'],
                'shippingAddress' => $order['shipping_address'] ?? '',
                'total' => (float)$order['total_amount'],
                'paymentMethod' => $order['payment_method'],
                'status' => $order['status'],
                'paymentStatus' => $order['payment_status'],
                'date' => $order['created_at'],
                'items' => array_map(function($it) {
                    return [
                        'productId' => $it['product_id'],
                        'productName' => $it['product_name'],
                        'price' => (float)$it['price'],
                        'quantity' => (int)$it['quantity'],
                        'subtotal' => (float)$it['subtotal']
                    ];
                }, $order['items'])
            ];
        }

        json_response([
            'status' => 'success',
            'count' => count($ordersWithItems),
            'data' => $ordersWithItems
        ]);

    } catch (PDOException $e) {
        json_response(['status' => 'error', 'message' => 'Erreur lors du chargement des commandes.'], 500);
    }
}

// -------------------------------------------------------------------
// 2. CRÉATION D'UNE NOUVELLE COMMANDE (POST)
// RECALCUL STRICT DES PRIX CÔTÉ SERVEUR (ZÉRO CONFIANCE AU CLIENT)
// -------------------------------------------------------------------
if ($method === 'POST') {
    $authUser = get_authenticated_user();
    $input = get_json_input();

    $itemsInput = $input['items'] ?? [];
    if (!is_array($itemsInput) || empty($itemsInput)) {
        json_response(['status' => 'error', 'message' => 'Votre panier est vide.'], 400);
    }

    $customerName = trim($input['customer'] ?? ($authUser['name'] ?? 'Client Zaïre-Market'));
    $customerPhone = trim($input['phone'] ?? ($input['customerPhone'] ?? ''));
    $shippingCity = trim($input['shippingCity'] ?? ($input['city'] ?? 'Kinshasa'));
    $shippingAddress = trim($input['shippingAddress'] ?? ($input['address'] ?? ''));
    $paymentMethod = trim($input['paymentMethod'] ?? 'Paiement à la livraison (Cash)');

    $userId = $authUser ? $authUser['uid'] : ('GUEST-' . substr(md5(uniqid()), 0, 8));

    try {
        $pdo->beginTransaction();

        $verifiedItems = [];
        $serverTotalAmount = 0.0;

        $checkProdStmt = $pdo->prepare("SELECT id, name, price, status FROM products WHERE id = :id LIMIT 1");

        foreach ($itemsInput as $rawItem) {
            $pId = (string)($rawItem['id'] ?? ($rawItem['productId'] ?? ''));
            $qty = max(1, (int)($rawItem['quantity'] ?? 1));

            $checkProdStmt->execute([':id' => $pId]);
            $dbProduct = $checkProdStmt->fetch();

            if (!$dbProduct) {
                $pdo->rollBack();
                json_response([
                    'status' => 'error',
                    'message' => "Le produit référencé (ID: {$pId}) n'existe pas dans le catalogue officiel."
                ], 400);
            }

            if ($dbProduct['status'] === 'suspendu' || $dbProduct['status'] === 'archive') {
                $pdo->rollBack();
                json_response([
                    'status' => 'error',
                    'message' => "L'article \"{$dbProduct['name']}\" n'est plus disponible à l'achat."
                ], 400);
            }

            $certifiedPrice = (float)$dbProduct['price'];
            $itemSubtotal = $certifiedPrice * $qty;
            $serverTotalAmount += $itemSubtotal;

            $verifiedItems[] = [
                'productId' => $dbProduct['id'],
                'productName' => $dbProduct['name'],
                'price' => $certifiedPrice,
                'quantity' => $qty,
                'subtotal' => $itemSubtotal
            ];
        }

        $orderId = 'CMD-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -5));

        $orderInsert = $pdo->prepare("
            INSERT INTO orders (id, user_id, customer_name, customer_phone, shipping_city, shipping_address, total_amount, payment_method, status, payment_status, created_at)
            VALUES (:id, :user_id, :customer_name, :customer_phone, :shipping_city, :shipping_address, :total_amount, :payment_method, 'Nouvelle', 'En attente', NOW())
        ");
        $orderInsert->execute([
            ':id' => $orderId,
            ':user_id' => $userId,
            ':customer_name' => $customerName,
            ':customer_phone' => $customerPhone,
            ':shipping_city' => $shippingCity,
            ':shipping_address' => $shippingAddress,
            ':total_amount' => $serverTotalAmount,
            ':payment_method' => $paymentMethod
        ]);

        $itemInsert = $pdo->prepare("
            INSERT INTO order_items (order_id, product_id, product_name, price, quantity, subtotal)
            VALUES (:order_id, :product_id, :product_name, :price, :quantity, :subtotal)
        ");

        foreach ($verifiedItems as $item) {
            $itemInsert->execute([
                ':order_id' => $orderId,
                ':product_id' => $item['productId'],
                ':product_name' => $item['productName'],
                ':price' => $item['price'],
                ':quantity' => $item['quantity'],
                ':subtotal' => $item['subtotal']
            ]);
        }

        // Journaliser la commande dans activity_logs
        $logStmt = $pdo->prepare("
            INSERT INTO activity_logs (id, user_email, action, ip_address, created_at)
            VALUES (:id, :email, :action, :ip, NOW())
        ");
        $logStmt->execute([
            ':id' => 'LOG-' . uniqid(),
            ':email' => $authUser['email'] ?? 'Acheteur',
            ':action' => "Nouvelle commande #{$orderId} ($" . number_format($serverTotalAmount, 2) . ") via {$paymentMethod}",
            ':ip' => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1'
        ]);

        $pdo->commit();

        json_response([
            'status' => 'success',
            'message' => 'Votre commande a été certifiée et enregistrée avec succès !',
            'order' => [
                'id' => $orderId,
                'total' => $serverTotalAmount,
                'totalCDF' => round($serverTotalAmount * 2850),
                'paymentMethod' => $paymentMethod,
                'itemsCount' => count($verifiedItems)
            ]
        ], 201);

    } catch (PDOException $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        json_response(['status' => 'error', 'message' => 'Erreur technique lors de la validation de la commande.'], 500);
    }
}

json_response(['status' => 'error', 'message' => 'Méthode non supportée.'], 405);
