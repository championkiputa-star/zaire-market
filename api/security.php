<?php
/**
 * ===================================================================
 * ZAÏRE-MARKET — Couche de Sécurité & Gestion des Jetons (Tokens)
 * Protection contre les accès non autorisés et falsifications
 * ===================================================================
 */

require_once __DIR__ . '/../config/database.php';

// Clé secrète de signature HMAC pour les jetons de session
define('ZM_SECURITY_SECRET', 'zaire_market_super_secure_key_2026_cd_rdc_kpt');

/**
 * Génère un jeton sécurisé signé par HMAC (valide 30 jours)
 */
function generate_user_token($userId, $email, $role, $name = '') {
    $payload = [
        'uid' => $userId,
        'email' => strtolower(trim($email)),
        'role' => $role,
        'name' => $name,
        'iat' => time(),
        'exp' => time() + (86400 * 30) // 30 jours
    ];
    $json = json_encode($payload);
    $base64 = rtrim(strtr(base64_encode($json), '+/', '-_'), '=');
    $sig = hash_hmac('sha256', $base64, ZM_SECURITY_SECRET);
    return $base64 . '.' . $sig;
}

/**
 * Valide un jeton signé et retourne le payload décodé ou null
 */
function verify_user_token($token) {
    if (empty($token) || !is_string($token)) {
        return null;
    }
    $parts = explode('.', $token);
    if (count($parts) !== 2) {
        return null;
    }
    list($base64, $signature) = $parts;
    $expected = hash_hmac('sha256', $base64, ZM_SECURITY_SECRET);
    if (!hash_equals($expected, $signature)) {
        return null;
    }
    $json = base64_decode(strtr($base64, '-_', '+/'));
    $payload = json_decode($json, true);
    if (!is_array($payload) || !isset($payload['exp']) || $payload['exp'] < time()) {
        return null;
    }
    return $payload;
}

/**
 * Récupère l'utilisateur authentifié depuis l'en-tête Authorization: Bearer <token>
 */
function get_authenticated_user() {
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if (empty($authHeader) && function_exists('apache_request_headers')) {
        $headers = apache_request_headers();
        $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    }

    $token = '';
    if (preg_match('/Bearer\s+(\S+)/i', $authHeader, $matches)) {
        $token = $matches[1];
    } elseif (!empty($_GET['token'])) {
        $token = $_GET['token'];
    } elseif (!empty($_POST['token'])) {
        $token = $_POST['token'];
    }

    if (empty($token)) {
        return null;
    }

    return verify_user_token($token);
}

/**
 * Exige une authentification valide, sinon stoppe avec HTTP 401
 */
function require_auth() {
    $user = get_authenticated_user();
    if (!$user) {
        json_response([
            'status' => 'error',
            'code' => 'UNAUTHORIZED',
            'message' => 'Authentification requise. Veuillez vous connecter.'
        ], 401);
    }
    return $user;
}

/**
 * Exige un ou plusieurs rôles spécifiques (ex: ['admin', 'super_admin'])
 */
function require_role($allowedRoles) {
    $user = require_auth();
    if (!is_array($allowedRoles)) {
        $allowedRoles = [$allowedRoles];
    }
    if (!in_array($user['role'], $allowedRoles)) {
        json_response([
            'status' => 'error',
            'code' => 'FORBIDDEN',
            'message' => 'Action refusée : permissions insuffisantes.'
        ], 403);
    }
    return $user;
}
