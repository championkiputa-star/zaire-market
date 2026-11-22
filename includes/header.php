<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Zaïre-Market — 1ère Marketplace Congolaise | Acheter & Vendre en RDC</title>

  <!-- Référencement Naturel Google & Moteurs de Recherche (SEO) -->
  <meta name="description" content="Zaïre-Market : la 1ère marketplace en RDC. Achetez et vendez facilement à Kinshasa, Lubumbashi, Goma, Bukavu, Kisangani et dans les 26 provinces. Paiement sécurisé Mobile Money (M-Pesa, Airtel, Orange) et livraison rapide.">
  <meta name="keywords" content="Zaïre-Market, zaire market, marketplace RDC, commerce en ligne Congo, acheter en RDC, vendre à Kinshasa, Lubumbashi, Goma, Bukavu, Kisangani, Mobile Money, M-Pesa, Airtel Money, Orange Money, e-commerce Congo, Champion Kiputa">
  <meta name="author" content="Champion Kiputa">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <link rel="canonical" href="https://zaire-market.onrender.com/">

  <!-- Balises Réseaux Sociaux & Partage (Open Graph Facebook, WhatsApp, LinkedIn) -->
  <meta property="og:locale" content="fr_FR">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Zaïre-Market — Le Plus Grand Marché Numérique de la RDC">
  <meta property="og:description" content="Achetez, vendez et expédiez en toute confiance dans les 26 provinces de la RDC. Produits certifiés et paiement Mobile Money garanti.">
  <meta property="og:url" content="https://zaire-market.onrender.com/">
  <meta property="og:site_name" content="Zaïre-Market">
  <meta property="og:image" content="https://zaire-market.onrender.com/assets/images/logo.jpg">
  <meta property="og:image:width" content="600">
  <meta property="og:image:height" content="600">

  <!-- Balises Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Zaïre-Market — 1ère Marketplace Congolaise">
  <meta name="twitter:description" content="Achetez et vendez en RDC en toute confiance avec livraison provinciale et Mobile Money.">
  <meta name="twitter:image" content="https://zaire-market.onrender.com/assets/images/logo.jpg">

  <!-- Données Structurées JSON-LD pour Google Rich Snippets -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Zaïre-Market",
    "url": "https://zaire-market.onrender.com/",
    "description": "La 1ère marketplace en République Démocratique du Congo pour acheter et vendre dans les 26 provinces.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://zaire-market.onrender.com/#products?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
  </script>

  <!-- Font-Awesome 6.7.2 Local & CDN Cloud -->
  <link rel="stylesheet" href="fontawesome-free-6.7.2-web/css/all.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />

  <!-- Feuilles de Style Modulaires Zaïre-Market -->
  <link rel="stylesheet" href="assets/css/style.css?v=2026.17">
  <link rel="stylesheet" href="assets/css/header-nav.css?v=2026.18">
  <link rel="stylesheet" href="assets/css/categories.css?v=2026.17">
  <link rel="stylesheet" href="assets/css/products.css?v=2026.17">
  <link rel="stylesheet" href="assets/css/cart-checkout.css?v=2026.17">
  <link rel="stylesheet" href="assets/css/admin.css?v=2026.17">
  <link rel="stylesheet" href="assets/css/theme-dark.css?v=2026.17">

  <!-- Favicon Officiel Zaïre Visionnaire -->
  <link rel="icon" type="image/jpeg" href="assets/images/logo.jpg">
  <link rel="apple-touch-icon" href="assets/images/logo.jpg">

  <!-- Pré-chargement du thème pour éviter tout scintillement blanc -->
  <script>
    (function() {
      var saved = localStorage.getItem('zm_theme');
      if (saved === 'dark' || (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    })();
  </script>
</head>
<body>

<!-- HEADER PRINCIPAL (Design de Titan Unifié & Épuré) -->
<header class="main-header titan-master-header">
  <div class="header-inner">

    <!-- Gauche : Menu Mobile + Logo + Bouton Rayons Desktop -->
    <div class="header-left-zone">
      <!-- Bouton Burger Mobile -->
      <button class="header-menu-btn" onclick="toggleCategoriesDrawer()" aria-label="Menu Catégories">
        <i class="fa-solid fa-bars"></i>
      </button>

      <!-- Logo Officiel Zaïre-Market Visionnaire -->
      <a href="#" class="header-brand" onclick="showPage('home'); return false;">
        <div class="brand-logo-container">
          <img src="assets/images/logo.jpg" alt="Zaïre-Market Logo" class="brand-logo-img">
        </div>
      </a>

      <!-- Bouton Rayons / Catégories Déroulant (Desktop) -->
      <button class="header-categories-btn" onclick="toggleCategoriesDrawer()" title="Explorer les 28 Rayons du Marché">
        <i class="fa-solid fa-layer-group" style="color: #0284c7;"></i>
        <span>Rayons</span>
        <i class="fa-solid fa-chevron-down" style="font-size: 10px; color: #94a3b8;"></i>
      </button>
    </div>

    <!-- Centre : Barre de Recherche Épurée avec Recherche Photo / Caméra -->
    <div class="header-search">
      <div class="search-input-wrapper titan-search-wrapper">
        <i class="fa-solid fa-magnifying-glass search-leading-icon"></i>
        <input
          type="text"
          id="homeSearch"
          placeholder="Rechercher un produit, marque, ville..."
          oninput="searchFromHome()"
        >
        <!-- Bouton Caméra (Recherche visuelle par photo) -->
        <button
          type="button"
          class="search-camera-btn"
          onclick="triggerCameraSearch()"
          title="Recherche par photo"
          aria-label="Recherche par photo"
        >
          <i class="fa-solid fa-camera"></i>
        </button>
        <!-- Bouton Validation Recherche -->
        <button
          type="button"
          class="search-submit-btn"
          onclick="searchFromHome()"
          aria-label="Rechercher"
        >
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
    </div>

    <!-- Droite : Actions Rapides Titan -->
    <div class="header-actions">
      <!-- Bouton Explorer -->
      <button class="header-nav-btn" onclick="showPage('products')" title="Explorer tous les produits">
        <i class="fa-solid fa-compass" style="color: #0284c7;"></i>
        <span class="header-btn-label">Explorer</span>
      </button>

      <!-- Bouton Vendre -->
      <button class="header-sell-btn" onclick="showPage('sell')" title="Déposer une annonce / Vendre">
        <i class="fa-solid fa-circle-plus" style="color: #38bdf8;"></i>
        <span>Vendre</span>
      </button>

      <!-- Bouton Panier -->
      <button class="header-action-btn header-cart-btn" onclick="showPage('cart')" title="Mon Panier">
        <div style="position: relative; display: inline-flex;">
          <i class="fa-solid fa-cart-shopping"></i>
          <span class="header-cart-badge cart-counter-badge" style="display: none;">0</span>
        </div>
        <span class="header-btn-label">Panier</span>
      </button>

      <!-- Bouton Compte avec Photo Permanente -->
      <button class="header-action-btn header-user-btn" onclick="showPage('account')" title="Mon Compte">
        <span id="headerAvatarContainer" style="display: inline-flex; align-items: center; justify-content: center;">
          <i class="fa-regular fa-user"></i>
        </span>
        <span class="header-btn-label" id="headerUserLabel">Compte</span>
      </button>

      <!-- Bouton Thème Sombre / Clair -->
      <button class="header-action-btn theme-toggle-btn" onclick="toggleTheme()" id="themeToggleBtn" title="Basculer le thème" aria-label="Basculer le thème">
        <i class="fa-solid fa-moon theme-icon-toggle" id="themeIcon"></i>
      </button>

      <!-- Bouton Accès Admin Délégué / Super-Admin -->
      <button class="header-admin-btn" id="adminDesktopNavBtn" onclick="showPage('admin')" title="Panneau d'Administration" style="display: none;">
        <i class="fa-solid fa-shield-halved"></i>
        <span>Admin</span>
      </button>
    </div>

  </div>
</header>
