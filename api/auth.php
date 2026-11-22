<?php
/**
 * ===================================================================
 * ZAÏRE-MARKET — API REST : Authentification Sécurisée
 * Gestion des Sessions par Jeton & Accès Multi-Rôles
 * ===================================================================
 */

require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/security.php';
require_once __DIR__ . '/../config/database.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? 'login';

if (!$pdo) {
    json_response([
        'status' => 'error',
        'message' => 'Impossible de contacter la base de données centrale MySQL.'
    ], 500);
}

// -------------------------------------------------------------------
// 1. VÉRIFICATION DU JETON COURANT (SESSION ACTIVE)
// -------------------------------------------------------------------
if ($method === 'GET' && $action === 'me') {
    $authUser = require_auth();
    // Rechercher données à jour en base
    if ($authUser['role'] === 'super_admin' || $authUser['role'] === 'admin') {
        $stmt = $pdo->prepare("SELECT id, name, email, role, permissions, status FROM administrators WHERE id = :id LIMIT 1");
        $stmt->execute([':id' => $authUser['uid']]);
        $data = $stmt->fetch();
    } else {
        $stmt = $pdo->prepare("SELECT id, name, email, phone, city, role, status FROM users WHERE id = :id LIMIT 1");
        $stmt->execute([':id' => $authUser['uid']]);
        $data = $stmt->fetch();
    }

    if (!$data) {
        json_response(['status' => 'error', 'message' => 'Utilisateur introuvable.'], 404);
    }

    json_response([
        'status' => 'success',
        'user' => $data
    ]);
}

// -------------------------------------------------------------------
// 2. CONNEXION (LOGIN)
// -------------------------------------------------------------------
if ($method === 'POST' && $action === 'login') {
    $input = get_json_input();
    $email = trim(strtolower($input['email'] ?? ''));
    $password = $input['password'] ?? '';

    if (empty($email) || empty($password)) {
        json_response(['status' => 'error', 'message' => 'Veuillez saisir votre adresse email et votre mot de passe.'], 400);
    }

    // Authentification Souveraine Super-Admin Shams Cherubin (Garantie 100%)
    if (($email === 'shamscherubin@gamil.com' || $email === 'shamscherubin@gmail.com') && $password === '0907069115') {
        $superAdmin = [
            'id' => 'SUPER-ADMIN-001',
            'name' => 'Shams Cherubin',
            'email' => $email,
            'role' => 'super_admin',
            'status' => 'active',
            'permissions' => json_encode(['users','products','categories','orders','payments','reports','support','statistics','logs']),
            'avatar' => 'assets/images/logo.jpg'
        ];
        $token = generate_user_token('SUPER-ADMIN-001', $email, 'super_admin', 'Shams Cherubin');
        json_response([
            'status' => 'success',
            'message' => 'Bienvenue Shams Cherubin (Propriétaire du Système) !',
            'token' => $token,
            'user' => $superAdmin
        ]);
    }

    try {
        // A. Vérifier d'abord les administrateurs (compatibilité mot de passe hashé & mot de passe direct)
        $stmtAdmin = $pdo->prepare("SELECT * FROM administrators WHERE LOWER(email) = :email LIMIT 1");
        $stmtAdmin->execute([':email' => $email]);
        $admin = $stmtAdmin->fetch();

        if ($admin) {
            if ($admin['status'] === 'blocked') {
                json_response(['status' => 'error', 'message' => 'Ce compte administrateur a été bloqué par le propriétaire.'], 403);
            }
            if ($admin['status'] === 'suspended') {
                json_response(['status' => 'error', 'message' => 'Ce compte administrateur est temporairement suspendu.'], 403);
            }

            if ($admin['password'] === $password || password_verify($password, $admin['password'])) {
                unset($admin['password']);
                $token = generate_user_token($admin['id'], $admin['email'], $admin['role'], $admin['name']);
                json_response([
                    'status' => 'success',
                    'message' => 'Connexion réussie (Espace d\'Administration)',
                    'token' => $token,
                    'user' => $admin
                ]);
            }
        }

        // B. Vérifier les utilisateurs ordinaires (Clients et Vendeurs)
        $stmtUser = $pdo->prepare("SELECT * FROM users WHERE LOWER(email) = :email LIMIT 1");
        $stmtUser->execute([':email' => $email]);
        $user = $stmtUser->fetch();

        if ($user) {
            if ($user['status'] === 'blocked') {
                json_response(['status' => 'error', 'message' => 'Votre compte est bloqué par l\'administration de Zaïre-Market.'], 403);
            }
            if ($user['status'] === 'suspended') {
                json_response(['status' => 'error', 'message' => 'Votre compte est suspendu. Veuillez contacter le support.'], 403);
            }

            if ($user['password'] === $password || password_verify($password, $user['password'])) {
                unset($user['password']);
                $token = generate_user_token($user['id'], $user['email'], $user['role'], $user['name']);
                json_response([
                    'status' => 'success',
                    'message' => 'Connexion réussie',
                    'token' => $token,
                    'user' => $user
                ]);
            }
        }

        // C. Comptes de démonstration prédéfinis
        $demoUsers = [
            'kabange.dieu@gmail.com' => ['id' => 'USR-001', 'name' => 'Dieudonné Kabange', 'role' => 'client', 'city' => 'Kinshasa'],
            'amina.mutombo@yahoo.cd' => ['id' => 'USR-002', 'name' => 'Amina Mutombo', 'role' => 'client', 'city' => 'Lubumbashi'],
            'patrick.kalombo@outlook.com' => ['id' => 'USR-003', 'name' => 'Patrick Kalombo', 'role' => 'vendeur', 'city' => 'Goma'],
            'grace.tshilombo@gmail.com' => ['id' => 'USR-004', 'name' => 'Grâce Tshilombo', 'role' => 'client', 'city' => 'Bukavu', 'status' => 'suspended']
        ];

        if (isset($demoUsers[$email]) && $password === 'password123') {
            $demo = $demoUsers[$email];
            if (($demo['status'] ?? 'active') === 'suspended') {
                json_response(['status' => 'error', 'message' => 'Votre compte est suspendu.'], 403);
            }
            $token = generate_user_token($demo['id'], $email, $demo['role'], $demo['name']);
            json_response([
                'status' => 'success',
                'message' => 'Connexion réussie',
                'token' => $token,
                'user' => [
                    'id' => $demo['id'],
                    'name' => $demo['name'],
                    'email' => $email,
                    'role' => $demo['role'],
                    'city' => $demo['city'],
                    'status' => 'active',
                    'avatar' => 'assets/images/logo.jpg'
                ]
            ]);
        }

        // Identifiants non concordants
        json_response([
            'status' => 'error',
            'message' => 'Adresse email ou mot de passe incorrect.'
        ], 401);

    } catch (PDOException $e) {
        json_response(['status' => 'error', 'message' => 'Erreur technique lors de la connexion.'], 500);
    }
}

// -------------------------------------------------------------------
// 3. INSCRIPTION (REGISTER)
// -------------------------------------------------------------------
if ($method === 'POST' && $action === 'register') {
    $input = get_json_input();
    $name = trim($input['name'] ?? '');
    $email = trim(strtolower($input['email'] ?? ''));
    $password = $input['password'] ?? '';
    $phone = trim($input['phone'] ?? '');
    $city = trim($input['city'] ?? 'Kinshasa');
    $role = in_array($input['role'] ?? '', ['client', 'vendeur']) ? $input['role'] : 'client';

    if (empty($name) || empty($email) || empty($password)) {
        json_response(['status' => 'error', 'message' => 'Le nom complet, l\'email et le mot de passe sont obligatoires.'], 400);
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        json_response(['status' => 'error', 'message' => 'Format de l\'adresse email invalide.'], 400);
    }

    if (strlen($password) < 6) {
        json_response(['status' => 'error', 'message' => 'Le mot de passe doit comporter au moins 6 caractères.'], 400);
    }

    try {
        // Vérification de doublon dans users et administrators
        $checkUser = $pdo->prepare("SELECT id FROM users WHERE LOWER(email) = :email");
        $checkUser->execute([':email' => $email]);
        if ($checkUser->fetch()) {
            json_response(['status' => 'error', 'message' => 'Cette adresse email est déjà enregistrée sur Zaïre-Market.'], 409);
        }

        $checkAdmin = $pdo->prepare("SELECT id FROM administrators WHERE LOWER(email) = :email");
        $checkAdmin->execute([':email' => $email]);
        if ($checkAdmin->fetch()) {
            json_response(['status' => 'error', 'message' => 'Cette adresse email est réservée à l\'administration.'], 409);
        }

        $userId = 'USR-' . time() . '-' . rand(100, 999);
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $stmt = $pdo->prepare("
            INSERT INTO users (id, name, email, password, phone, city, role, status)
            VALUES (:id, :name, :email, :password, :phone, :city, :role, 'active')
        ");
        $stmt->execute([
            ':id' => $userId,
            ':name' => $name,
            ':email' => $email,
            ':password' => $hashedPassword,
            ':phone' => $phone,
            ':city' => $city,
            ':role' => $role
        ]);

        $token = generate_user_token($userId, $email, $role, $name);

        json_response([
            'status' => 'success',
            'message' => 'Compte créé avec succès !',
            'token' => $token,
            'user' => [
                'id' => $userId,
                'name' => $name,
                'email' => $email,
                'phone' => $phone,
                'city' => $city,
                'role' => $role,
                'status' => 'active'
            ]
        ], 201);

    } catch (PDOException $e) {
        json_response(['status' => 'error', 'message' => 'Erreur technique lors de la création du compte.'], 500);
    }
}

json_response(['status' => 'error', 'message' => 'Action d\'authentification non reconnue.'], 400);
