<?php
/**
 * Configuration générale du projet Zaïre-Market
 */

// Définition de l'environnement
define('APP_NAME', 'Zaïre-Market');
define('APP_SLOGAN', 'La marketplace congolaise pour acheter et vendre partout en RDC');
define('APP_VERSION', '2.0.0');
define('APP_COUNTRY', 'République Démocratique du Congo');
define('APP_CURRENCY', '$');
define('APP_CDF_RATE', 2850); // Taux indicatif Franc Congolais

// Villes prises en charge en RDC
$CITIES_RDC = [
    'Kinshasa',
    'Lubumbashi',
    'Goma',
    'Bukavu',
    'Kisangani',
    'Kolwezi',
    'Matadi',
    'Kikwit',
    'Mbuji-Mayi',
    'Kananga',
    'Mbandaka',
    'Kindu'
];

// Moyens de paiement pris en charge
$PAYMENT_METHODS = [
    'mpesa' => [
        'name' => 'M-Pesa (Vodacom)',
        'icon' => 'fa-mobile-screen',
        'badge' => 'badge-mpesa'
    ],
    'airtel' => [
        'name' => 'Airtel Money',
        'icon' => 'fa-phone',
        'badge' => 'badge-airtel'
    ],
    'orange' => [
        'name' => 'Orange Money',
        'icon' => 'fa-wallet',
        'badge' => 'badge-orange'
    ],
    'cod' => [
        'name' => 'Paiement à la livraison (Cash)',
        'icon' => 'fa-money-bill-wave',
        'badge' => 'badge-cash'
    ]
];
