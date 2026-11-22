<?php
/**
 * Connexion à la base de données MySQL via PDO
 * Compatible WampServer par défaut (host: localhost, user: root, password: "")
 */

// Paramètres de connexion : variables d'environnement (Render / Production) avec fallback local (WAMP)
$DB_HOST = getenv('DB_HOST') ?: '127.0.0.1';
$DB_PORT = getenv('DB_PORT') ?: '3306';
$DB_NAME = getenv('DB_NAME') ?: 'zaire_market';
$DB_USER = getenv('DB_USER') ?: 'root';
$DB_PASS = getenv('DB_PASS') !== false ? getenv('DB_PASS') : '';

try {
    $pdoOptions = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    // Support SSL pour les bases de données Cloud (Aiven, TiDB, Clever Cloud)
    if (getenv('DB_SSL') === 'true' || getenv('MYSQL_ATTR_SSL_CA')) {
        $pdoOptions[PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT] = false;
    }

    $pdo = new PDO(
        "mysql:host={$DB_HOST};port={$DB_PORT};dbname={$DB_NAME};charset=utf8mb4",
        $DB_USER,
        $DB_PASS,
        $pdoOptions
    );
} catch (PDOException $e) {
    // Si la base de données n'est pas encore créée ou serveur WAMP arrêté
    $pdo = null;
    $db_connection_error = $e->getMessage();
}
