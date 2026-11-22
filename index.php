<?php
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/config/database.php';

// Inclusion de l'en-tête (Head, Header, Recherche & Caméra)
require_once __DIR__ . '/includes/header.php';

// Inclusion de la barre de navigation desktop
require_once __DIR__ . '/includes/navbar.php';

// Modal / Tiroir latéral mobile des catégories
require_once __DIR__ . '/includes/categories-modal.php';
?>

<main class="app-container">

  <!-- ========================================================== -->
  <!-- 1. VUE ACCUEIL -->
  <!-- ========================================================== -->
  <section id="home" class="page active">
    <!-- ========================================================== -->
    <!-- 1. GRANDE DISPOSITION BENTO TITAN (3 BLOCS HAUT DE GAMME) -->
    <!-- ========================================================== -->
    <div class="titan-bento-hero">

      <!-- BLOC A : LE GRAND SHOWCASE MAÎTRE (58% desktop) -->
      <div class="bento-card bento-hero-main">
        <div class="bento-hero-header">
          <div class="titan-badge-row">
            <span class="hero-badge-tag titan-badge-tag">
              <i class="fa-solid fa-crown" style="color: #fbbf24;"></i> Zaïre Visionnaire • Le Géant Marketplace 🇨🇩
            </span>
            <span class="titan-badge-live">
              <span class="titan-live-dot"></span> Réseau 26 Provinces Actif
            </span>
          </div>
          <h1 class="titan-hero-title">Le Plus Grand Marché Numérique de la RDC</h1>
          <p class="titan-hero-desc">
            Achetez, vendez et expédiez en toute confiance dans toutes les provinces de la RDC, en toute sécurité.
          </p>
        </div>

        <div class="titan-metrics-ribbon">
          <div class="titan-metric-item">
            <i class="fa-solid fa-layer-group" style="color: #38bdf8;"></i>
            <span><strong>28</strong> Rayons</span>
          </div>
          <div class="titan-metric-item">
            <i class="fa-solid fa-boxes-packing" style="color: #10b981;"></i>
            <span><strong>99+</strong> Articles Certifiés</span>
          </div>
          <div class="titan-metric-item">
            <i class="fa-solid fa-truck-fast" style="color: #f59e0b;"></i>
            <span><strong>26</strong> Provinces RDC</span>
          </div>
          <div class="titan-metric-item">
            <i class="fa-solid fa-shield-halved" style="color: #a855f7;"></i>
            <span>Mobile Money Garanti</span>
          </div>
        </div>

        <div class="hero-cta-group titan-cta-group">
          <button onclick="showPage('products')" class="btn titan-btn-primary">
            <i class="fa-solid fa-fire"></i> Explorer le Grand Marché
          </button>
          <button onclick="showPage('sell')" class="btn titan-btn-glass">
            <i class="fa-solid fa-circle-plus"></i> + Vendre mon Produit
          </button>
        </div>
      </div>

      <!-- BLOC B : VENTE FLASH DU JOUR AVEC COMPTE À REBOURS EN DIRECT -->
      <div class="bento-card bento-flash-deal">
        <div class="flash-deal-top">
          <span class="flash-live-badge">
            <i class="fa-solid fa-bolt"></i> VENTE FLASH 24H
          </span>
          <div class="flash-countdown-box" id="flashCountdownBox">
            <span id="flashHours">04</span>:<span id="flashMins">32</span>:<span id="flashSecs">18</span>
          </div>
        </div>

        <div class="flash-product-visual">
          <img src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600" alt="Costume Homme Slim Fit" class="flash-img" id="flashDealImg">
          <span class="flash-discount-tag">-30% KINSHASA</span>
        </div>

        <div class="flash-product-info">
          <h4 class="flash-title" id="flashDealTitle">Costume Homme Slim Fit 2 Pièces Bleu Nuit</h4>
          <div class="flash-price-row">
            <span class="flash-price-current" id="flashDealCurrentPrice">$59.50</span>
            <span class="flash-price-old" id="flashDealOldPrice">$85.00</span>
          </div>
          
          <div class="flash-stock-wrap">
            <div class="flash-stock-labels">
              <span>Articles réservés</span>
              <strong style="color: #ef4444;">86% vendu</strong>
            </div>
            <div class="flash-stock-track">
              <div class="flash-stock-bar" style="width: 86%;"></div>
            </div>
          </div>

          <button class="btn btn-primary btn-block flash-btn" onclick="addToCart('P007', this)">
            <i class="fa-solid fa-bag-shopping"></i> Profiter de l'offre flash
          </button>
        </div>
      </div>

      <!-- BLOC C : COCKPIT UTILISATEUR & CONFIANCE MOBILE MONEY -->
      <div class="bento-card bento-user-cockpit">
        <div class="cockpit-user-header">
          <div class="cockpit-avatar-wrap">
            <img src="assets/images/logo.jpg" alt="Avatar" class="cockpit-avatar header-user-avatar-sync">
            <span class="cockpit-status-dot"></span>
          </div>
          <div class="cockpit-user-details">
            <span class="cockpit-greeting">Bienvenue sur Zaïre-Market</span>
            <h4 class="cockpit-username" id="cockpitUserName">Josué</h4>
            <span class="cockpit-role-badge badge badge-category" id="cockpitUserRole">Client Marché</span>
          </div>
        </div>

        <div class="cockpit-actions-list">
          <button class="cockpit-action-btn" onclick="showPage('account')">
            <span><i class="fa-solid fa-user-circle" style="color: #0284c7; margin-right: 6px;"></i> Mon Profil & Photo</span>
            <i class="fa-solid fa-chevron-right chevron-icon"></i>
          </button>
          <button class="cockpit-action-btn" onclick="showPage('cart')">
            <span><i class="fa-solid fa-cart-shopping" style="color: #f59e0b; margin-right: 6px;"></i> Mon Panier Actif</span>
            <span class="badge badge-category cart-counter-badge" style="display: none;">0</span>
            <i class="fa-solid fa-chevron-right chevron-icon"></i>
          </button>
          <button class="cockpit-action-btn highlight-sell" onclick="showPage('sell')">
            <span><i class="fa-solid fa-cloud-arrow-up" style="color: #0284c7; margin-right: 6px;"></i> + Déposer une annonce</span>
            <i class="fa-solid fa-chevron-right chevron-icon"></i>
          </button>
        </div>

        <!-- Confiance Paiements RDC -->
        <div class="cockpit-payments-box">
          <span class="cockpit-payments-label">Règlement 100% Sécurisé RDC</span>
          <div class="cockpit-payments-icons">
            <span class="payment-pill pill-mpesa"><i class="fa-solid fa-mobile-screen"></i> M-Pesa</span>
            <span class="payment-pill pill-airtel"><i class="fa-solid fa-phone"></i> Airtel</span>
            <span class="payment-pill pill-orange"><i class="fa-solid fa-wallet"></i> Orange</span>
            <span class="payment-pill pill-cash"><i class="fa-solid fa-money-bill-wave"></i> Cash</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================================== -->
    <!-- 2. RUBAN DES STORIES RAYONS (NAVIGATION CIRCULAIRE TITAN) -->
    <!-- ========================================================== -->
    <div class="stories-rayons-section">
      <div class="stories-header">
        <h3 class="stories-title"><i class="fa-solid fa-compass" style="color: #0284c7;"></i> Rayons & Univers Phares</h3>
        <span class="stories-subtitle">Filtrez instantanément d'un simple toucher</span>
      </div>
      <div class="stories-rayons-track">
        <button class="story-bubble-btn" onclick="filterCategory('Vêtement & Accessoires')">
          <div class="story-bubble-ring"><i class="fa-solid fa-shirt"></i></div>
          <span>Sape & Marques</span>
        </button>
        <button class="story-bubble-btn" onclick="filterCategory('Agriculture & Nourriture')">
          <div class="story-bubble-ring"><i class="fa-solid fa-seedling"></i></div>
          <span>Agri & Kivu</span>
        </button>
        <button class="story-bubble-btn" onclick="filterCategory('Électroniques de Consommation')">
          <div class="story-bubble-ring"><i class="fa-solid fa-mobile-screen-button"></i></div>
          <span>Tech & Phone</span>
        </button>
        <button class="story-bubble-btn" onclick="filterCategory('Véhicules')">
          <div class="story-bubble-ring"><i class="fa-solid fa-car"></i></div>
          <span>Véhicules RDC</span>
        </button>
        <button class="story-bubble-btn" onclick="filterCategory('Meuble')">
          <div class="story-bubble-ring"><i class="fa-solid fa-couch"></i></div>
          <span>Maison & Déco</span>
        </button>
        <button class="story-bubble-btn" onclick="filterCategory('Arts & Métiers')">
          <div class="story-bubble-ring"><i class="fa-solid fa-palette"></i></div>
          <span>Malachite & Art</span>
        </button>
        <button class="story-bubble-btn" onclick="filterCategory('Santé & Hygiène')">
          <div class="story-bubble-ring"><i class="fa-solid fa-heart-pulse"></i></div>
          <span>Santé & Soins</span>
        </button>
        <button class="story-bubble-btn" onclick="filterCategory('Transport')">
          <div class="story-bubble-ring"><i class="fa-solid fa-truck"></i></div>
          <span>Fret & Colis</span>
        </button>
        <button class="story-bubble-btn story-all" onclick="showPage('categories')">
          <div class="story-bubble-ring story-all-ring"><i class="fa-solid fa-layer-group"></i></div>
          <span>28 Rayons</span>
        </button>
      </div>
    </div>

    <!-- ========================================================== -->
    <!-- 3. VITRINE DES NOUVEAUTÉS & MEILLEURES VENTES SUR L'ACCUEIL -->
    <!-- ========================================================== -->
    <div class="titan-section-header" style="margin-top: 32px;">
      <div>
        <h2 class="titan-section-title">
          <i class="fa-solid fa-fire" style="color: #ef4444;"></i> Nouveautés & Meilleures Ventes en RDC
        </h2>
        <span class="titan-section-subtitle">Articles certifiés en direct des marchands de Kinshasa, Lubumbashi, Goma & Bukavu</span>
      </div>
      <button onclick="showPage('products')" class="btn titan-view-all-btn">
        Tout explorer (99+ articles) <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>

    <div id="homeFeaturedProductsGrid" class="products-grid">
      <!-- Rendu dynamique par products.js -->
    </div>

    <!-- 4. Catégories Vedettes / Accès Rapide Titan -->
    <div class="titan-section-header" style="margin-top: 36px;">
      <div>
        <h2 class="titan-section-title">
          <i class="fa-solid fa-border-all" style="color: #f59e0b;"></i> Explorer par Rayon
        </h2>
        <span class="titan-section-subtitle">Accédez directement aux catégories les plus actives</span>
      </div>
      <button onclick="showPage('categories')" class="btn titan-view-all-btn">
        Tous les 28 Rayons <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>

    <div id="quickCategoriesContainer" class="quick-categories-grid">
      <!-- Rempli dynamiquement par categories.js -->
    </div>

    <!-- 5. Garanties Zaïre-Market Titan -->
    <div class="titan-guarantees-grid">
      <div class="titan-guarantee-card">
        <div class="titan-guarantee-icon" style="background: rgba(2, 132, 199, 0.1); color: #0284c7;">
          <i class="fa-solid fa-truck-fast"></i>
        </div>
        <div>
          <strong class="titan-guarantee-title">Livraison Interurbaine</strong>
          <small class="titan-guarantee-desc">Expédition sécurisée par voie terrestre, aérienne & fluviale en RDC</small>
        </div>
      </div>
      <div class="titan-guarantee-card">
        <div class="titan-guarantee-icon" style="background: rgba(16, 185, 129, 0.1); color: #10b981;">
          <i class="fa-solid fa-mobile-screen-button"></i>
        </div>
        <div>
          <strong class="titan-guarantee-title">Paiement Mobile Money</strong>
          <small class="titan-guarantee-desc">Paiements certifiés M-Pesa, Airtel Money, Orange Money ou Cash</small>
        </div>
      </div>
      <div class="titan-guarantee-card">
        <div class="titan-guarantee-icon" style="background: rgba(245, 158, 11, 0.1); color: #f59e0b;">
          <i class="fa-solid fa-shield-halved"></i>
        </div>
        <div>
          <strong class="titan-guarantee-title">Vendeurs Vérifiés & Agréés</strong>
          <small class="titan-guarantee-desc">Boutiques et marchands contrôlés par le Super-Administrateur</small>
        </div>
      </div>
      <div class="titan-guarantee-card">
        <div class="titan-guarantee-icon" style="background: rgba(168, 85, 247, 0.1); color: #a855f7;">
          <i class="fa-solid fa-headset"></i>
        </div>
        <div>
          <strong class="titan-guarantee-title">Support Client Panafricain</strong>
          <small class="titan-guarantee-desc">Assistance en direct par messagerie et WhatsApp à Kinshasa</small>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================================== -->
  <!-- 2. VUE TOUTES LES CATÉGORIES (MODÈLE FIDÈLE AUX CAPTURES) -->
  <!-- ========================================================== -->
  <section id="categories" class="page">
    <div class="category-view-container">
      <div class="category-view-header">
        <h1>Toutes les Catégories</h1>
        <span class="category-counter">28 Rayons</span>
      </div>

      <ul id="allCategoriesList" class="category-list-styled">
      <li class="category-list-item">
        <button class="category-link" data-category="Agriculture &amp; Nourriture" onclick="filterCategory(this.getAttribute('data-category'))">
          <div class="category-link-left">
            <div class="category-icon-wrapper">
              <i class="fa-solid fa-seedling"></i>
            </div>
            <span class="category-link-title">Agriculture &amp; Nourriture</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-category" style="font-size: 11px;">4 articles</span>
            <i class="fa-solid fa-chevron-right category-chevron"></i>
          </div>
        </button>
      </li>
      <li class="category-list-item">
        <button class="category-link" data-category="Vêtement &amp; Accessoires" onclick="filterCategory(this.getAttribute('data-category'))">
          <div class="category-link-left">
            <div class="category-icon-wrapper">
              <i class="fa-solid fa-shirt"></i>
            </div>
            <span class="category-link-title">Vêtement &amp; Accessoires</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-category" style="font-size: 11px;">4 articles</span>
            <i class="fa-solid fa-chevron-right category-chevron"></i>
          </div>
        </button>
      </li>
      <li class="category-list-item">
        <button class="category-link" data-category="Habits de Différentes Marques" onclick="filterCategory(this.getAttribute('data-category'))">
          <div class="category-link-left">
            <div class="category-icon-wrapper">
              <i class="fa-solid fa-tags"></i>
            </div>
            <span class="category-link-title">Habits de Différentes Marques</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-category" style="font-size: 11px;">6 articles</span>
            <i class="fa-solid fa-chevron-right category-chevron"></i>
          </div>
        </button>
      </li>
      <li class="category-list-item">
        <button class="category-link" data-category="Arts &amp; Métiers" onclick="filterCategory(this.getAttribute('data-category'))">
          <div class="category-link-left">
            <div class="category-icon-wrapper">
              <i class="fa-solid fa-gem"></i>
            </div>
            <span class="category-link-title">Arts &amp; Métiers</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-category" style="font-size: 11px;">3 articles</span>
            <i class="fa-solid fa-chevron-right category-chevron"></i>
          </div>
        </button>
      </li>
      <li class="category-list-item">
        <button class="category-link" data-category="Pièces &amp; Accessoires d&#039;Auto et de Moto" onclick="filterCategory(this.getAttribute('data-category'))">
          <div class="category-link-left">
            <div class="category-icon-wrapper">
              <i class="fa-solid fa-car"></i>
            </div>
            <span class="category-link-title">Pièces &amp; Accessoires d&#039;Auto et de Moto</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-category" style="font-size: 11px;">4 articles</span>
            <i class="fa-solid fa-chevron-right category-chevron"></i>
          </div>
        </button>
      </li>
      <li class="category-list-item">
        <button class="category-link" data-category="Sacs, Valises &amp; Boîtes" onclick="filterCategory(this.getAttribute('data-category'))">
          <div class="category-link-left">
            <div class="category-icon-wrapper">
              <i class="fa-solid fa-bag-shopping"></i>
            </div>
            <span class="category-link-title">Sacs, Valises &amp; Boîtes</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-category" style="font-size: 11px;">3 articles</span>
            <i class="fa-solid fa-chevron-right category-chevron"></i>
          </div>
        </button>
      </li>
      <li class="category-list-item">
        <button class="category-link" data-category="Produits Chimiques" onclick="filterCategory(this.getAttribute('data-category'))">
          <div class="category-link-left">
            <div class="category-icon-wrapper">
              <i class="fa-solid fa-flask"></i>
            </div>
            <span class="category-link-title">Produits Chimiques</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-category" style="font-size: 11px;">3 articles</span>
            <i class="fa-solid fa-chevron-right category-chevron"></i>
          </div>
        </button>
      </li>
      <li class="category-list-item">
        <button class="category-link" data-category="Produits Informatiques" onclick="filterCategory(this.getAttribute('data-category'))">
          <div class="category-link-left">
            <div class="category-icon-wrapper">
              <i class="fa-solid fa-laptop"></i>
            </div>
            <span class="category-link-title">Produits Informatiques</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-category" style="font-size: 11px;">4 articles</span>
            <i class="fa-solid fa-chevron-right category-chevron"></i>
          </div>
        </button>
      </li>
      <li class="category-list-item">
        <button class="category-link" data-category="Construction &amp; Décoration" onclick="filterCategory(this.getAttribute('data-category'))">
          <div class="category-link-left">
            <div class="category-icon-wrapper">
              <i class="fa-solid fa-paint-roller"></i>
            </div>
            <span class="category-link-title">Construction &amp; Décoration</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-category" style="font-size: 11px;">4 articles</span>
            <i class="fa-solid fa-chevron-right category-chevron"></i>
          </div>
        </button>
      </li>
      <li class="category-list-item">
        <button class="category-link" data-category="Électroniques de Consommation" onclick="filterCategory(this.getAttribute('data-category'))">
          <div class="category-link-left">
            <div class="category-icon-wrapper">
              <i class="fa-solid fa-mobile-screen-button"></i>
            </div>
            <span class="category-link-title">Électroniques de Consommation</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-category" style="font-size: 11px;">4 articles</span>
            <i class="fa-solid fa-chevron-right category-chevron"></i>
          </div>
        </button>
      </li>
      <li class="category-list-item">
        <button class="category-link" data-category="Électricité &amp; Électronique" onclick="filterCategory(this.getAttribute('data-category'))">
          <div class="category-link-left">
            <div class="category-icon-wrapper">
              <i class="fa-solid fa-bolt"></i>
            </div>
            <span class="category-link-title">Électricité &amp; Électronique</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-category" style="font-size: 11px;">4 articles</span>
            <i class="fa-solid fa-chevron-right category-chevron"></i>
          </div>
        </button>
      </li>
      <li class="category-list-item">
        <button class="category-link" data-category="Meuble" onclick="filterCategory(this.getAttribute('data-category'))">
          <div class="category-link-left">
            <div class="category-icon-wrapper">
              <i class="fa-solid fa-couch"></i>
            </div>
            <span class="category-link-title">Meuble</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-category" style="font-size: 11px;">3 articles</span>
            <i class="fa-solid fa-chevron-right category-chevron"></i>
          </div>
        </button>
      </li>
      <li class="category-list-item">
        <button class="category-link" data-category="Santé &amp; Hygiène" onclick="filterCategory(this.getAttribute('data-category'))">
          <div class="category-link-left">
            <div class="category-icon-wrapper">
              <i class="fa-solid fa-kit-medical"></i>
            </div>
            <span class="category-link-title">Santé &amp; Hygiène</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-category" style="font-size: 11px;">4 articles</span>
            <i class="fa-solid fa-chevron-right category-chevron"></i>
          </div>
        </button>
      </li>
      <li class="category-list-item">
        <button class="category-link" data-category="Équipement Industriel &amp; Composants" onclick="filterCategory(this.getAttribute('data-category'))">
          <div class="category-link-left">
            <div class="category-icon-wrapper">
              <i class="fa-solid fa-gear"></i>
            </div>
            <span class="category-link-title">Équipement Industriel &amp; Composants</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-category" style="font-size: 11px;">3 articles</span>
            <i class="fa-solid fa-chevron-right category-chevron"></i>
          </div>
        </button>
      </li>
      <li class="category-list-item">
        <button class="category-link" data-category="Instruments &amp; Compteurs" onclick="filterCategory(this.getAttribute('data-category'))">
          <div class="category-link-left">
            <div class="category-icon-wrapper">
              <i class="fa-solid fa-gauge-high"></i>
            </div>
            <span class="category-link-title">Instruments &amp; Compteurs</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-category" style="font-size: 11px;">3 articles</span>
            <i class="fa-solid fa-chevron-right category-chevron"></i>
          </div>
        </button>
      </li>
      <li class="category-list-item">
        <button class="category-link" data-category="Industrie Légère &amp; Articles d&#039;Usage Courant" onclick="filterCategory(this.getAttribute('data-category'))">
          <div class="category-link-left">
            <div class="category-icon-wrapper">
              <i class="fa-solid fa-kitchen-set"></i>
            </div>
            <span class="category-link-title">Industrie Légère &amp; Articles d&#039;Usage Courant</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-category" style="font-size: 11px;">3 articles</span>
            <i class="fa-solid fa-chevron-right category-chevron"></i>
          </div>
        </button>
      </li>
      <li class="category-list-item">
        <button class="category-link" data-category="Luminaire &amp; Éclairage" onclick="filterCategory(this.getAttribute('data-category'))">
          <div class="category-link-left">
            <div class="category-icon-wrapper">
              <i class="fa-solid fa-lightbulb"></i>
            </div>
            <span class="category-link-title">Luminaire &amp; Éclairage</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-category" style="font-size: 11px;">4 articles</span>
            <i class="fa-solid fa-chevron-right category-chevron"></i>
          </div>
        </button>
      </li>
      <li class="category-list-item">
        <button class="category-link" data-category="Machinerie de Fabrication &amp; de Façonnage" onclick="filterCategory(this.getAttribute('data-category'))">
          <div class="category-link-left">
            <div class="category-icon-wrapper">
              <i class="fa-solid fa-tractor"></i>
            </div>
            <span class="category-link-title">Machinerie de Fabrication &amp; de Façonnage</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-category" style="font-size: 11px;">3 articles</span>
            <i class="fa-solid fa-chevron-right category-chevron"></i>
          </div>
        </button>
      </li>
      <li class="category-list-item">
        <button class="category-link" data-category="Métallurgie, Minéral &amp; Énergie" onclick="filterCategory(this.getAttribute('data-category'))">
          <div class="category-link-left">
            <div class="category-icon-wrapper">
              <i class="fa-solid fa-cubes-stacked"></i>
            </div>
            <span class="category-link-title">Métallurgie, Minéral &amp; Énergie</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-category" style="font-size: 11px;">3 articles</span>
            <i class="fa-solid fa-chevron-right category-chevron"></i>
          </div>
        </button>
      </li>
      <li class="category-list-item">
        <button class="category-link" data-category="Fournitures de Bureau" onclick="filterCategory(this.getAttribute('data-category'))">
          <div class="category-link-left">
            <div class="category-icon-wrapper">
              <i class="fa-solid fa-calculator"></i>
            </div>
            <span class="category-link-title">Fournitures de Bureau</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-category" style="font-size: 11px;">3 articles</span>
            <i class="fa-solid fa-chevron-right category-chevron"></i>
          </div>
        </button>
      </li>
      <li class="category-list-item">
        <button class="category-link" data-category="Emballage &amp; Impression" onclick="filterCategory(this.getAttribute('data-category'))">
          <div class="category-link-left">
            <div class="category-icon-wrapper">
              <i class="fa-solid fa-box-open"></i>
            </div>
            <span class="category-link-title">Emballage &amp; Impression</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-category" style="font-size: 11px;">3 articles</span>
            <i class="fa-solid fa-chevron-right category-chevron"></i>
          </div>
        </button>
      </li>
      <li class="category-list-item">
        <button class="category-link" data-category="Sécurité &amp; Protection" onclick="filterCategory(this.getAttribute('data-category'))">
          <div class="category-link-left">
            <div class="category-icon-wrapper">
              <i class="fa-solid fa-shield-halved"></i>
            </div>
            <span class="category-link-title">Sécurité &amp; Protection</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-category" style="font-size: 11px;">4 articles</span>
            <i class="fa-solid fa-chevron-right category-chevron"></i>
          </div>
        </button>
      </li>
      <li class="category-list-item">
        <button class="category-link" data-category="Service" onclick="filterCategory(this.getAttribute('data-category'))">
          <div class="category-link-left">
            <div class="category-icon-wrapper">
              <i class="fa-solid fa-bell-concierge"></i>
            </div>
            <span class="category-link-title">Service</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-category" style="font-size: 11px;">3 articles</span>
            <i class="fa-solid fa-chevron-right category-chevron"></i>
          </div>
        </button>
      </li>
      <li class="category-list-item">
        <button class="category-link" data-category="Sports &amp; Loisirs" onclick="filterCategory(this.getAttribute('data-category'))">
          <div class="category-link-left">
            <div class="category-icon-wrapper">
              <i class="fa-solid fa-volleyball"></i>
            </div>
            <span class="category-link-title">Sports &amp; Loisirs</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-category" style="font-size: 11px;">4 articles</span>
            <i class="fa-solid fa-chevron-right category-chevron"></i>
          </div>
        </button>
      </li>
      <li class="category-list-item">
        <button class="category-link" data-category="Textile" onclick="filterCategory(this.getAttribute('data-category'))">
          <div class="category-link-left">
            <div class="category-icon-wrapper">
              <i class="fa-solid fa-scroll"></i>
            </div>
            <span class="category-link-title">Textile</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-category" style="font-size: 11px;">3 articles</span>
            <i class="fa-solid fa-chevron-right category-chevron"></i>
          </div>
        </button>
      </li>
      <li class="category-list-item">
        <button class="category-link" data-category="Outils &amp; Quincaillerie" onclick="filterCategory(this.getAttribute('data-category'))">
          <div class="category-link-left">
            <div class="category-icon-wrapper">
              <i class="fa-solid fa-wrench"></i>
            </div>
            <span class="category-link-title">Outils &amp; Quincaillerie</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-category" style="font-size: 11px;">4 articles</span>
            <i class="fa-solid fa-chevron-right category-chevron"></i>
          </div>
        </button>
      </li>
      <li class="category-list-item">
        <button class="category-link" data-category="Jouets" onclick="filterCategory(this.getAttribute('data-category'))">
          <div class="category-link-left">
            <div class="category-icon-wrapper">
              <i class="fa-solid fa-shapes"></i>
            </div>
            <span class="category-link-title">Jouets</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-category" style="font-size: 11px;">3 articles</span>
            <i class="fa-solid fa-chevron-right category-chevron"></i>
          </div>
        </button>
      </li>
      <li class="category-list-item">
        <button class="category-link" data-category="Transport" onclick="filterCategory(this.getAttribute('data-category'))">
          <div class="category-link-left">
            <div class="category-icon-wrapper">
              <i class="fa-solid fa-truck"></i>
            </div>
            <span class="category-link-title">Transport</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge badge-category" style="font-size: 11px;">3 articles</span>
            <i class="fa-solid fa-chevron-right category-chevron"></i>
          </div>
        </button>
      </li>
      </ul>
    </div>
  </section>

  <!-- ========================================================== -->
  <!-- 3. VUE PRODUITS & CATALOGUE -->
  <!-- ========================================================== -->
  <section id="products" class="page">
    <!-- En-tête de Section Produits Titan -->
    <div class="titan-catalog-header">
      <div class="titan-catalog-title-group">
        <h2><i class="fa-solid fa-store" style="color: #0284c7;"></i> Grand Marché Zaïre-Market</h2>
        <p>Explorez les meilleures offres vérifiées en direct des producteurs et marchands de RDC</p>
      </div>
      <div class="titan-catalog-badge-box">
        <span id="productResultCount" class="titan-count-badge">0 produits</span>
      </div>
    </div>

    <!-- Ruban Interactif de Puces / Chips Catégories Titan -->
    <div class="products-chips-carousel" id="productsCategoryChips">
      <button class="chip-item active" onclick="quickFilterCatalogCategory('all', this)">
        <i class="fa-solid fa-fire" style="color: #f59e0b;"></i>
        <span>Tous les Articles (99)</span>
      </button>
      <button class="chip-item" onclick="quickFilterCatalogCategory('Habits de Différentes Marques', this)">
        <i class="fa-solid fa-tags" style="color: #ec4899;"></i>
        <span>Habits de Marques</span>
      </button>
      <button class="chip-item" onclick="quickFilterCatalogCategory('Agriculture & Nourriture', this)">
        <i class="fa-solid fa-seedling" style="color: #10b981;"></i>
        <span>Agriculture RDC</span>
      </button>
      <button class="chip-item" onclick="quickFilterCatalogCategory('Appareils Électroniques', this)">
        <i class="fa-solid fa-mobile-screen" style="color: #0284c7;"></i>
        <span>Électronique</span>
      </button>
      <button class="chip-item" onclick="quickFilterCatalogCategory('Véhicules & Pièces', this)">
        <i class="fa-solid fa-car" style="color: #f59e0b;"></i>
        <span>Véhicules & Pièces</span>
      </button>
      <button class="chip-item" onclick="quickFilterCatalogCategory('Meubles & Décoration Maison', this)">
        <i class="fa-solid fa-couch" style="color: #8b5cf6;"></i>
        <span>Maison & Meubles</span>
      </button>
      <button class="chip-item" onclick="quickFilterCatalogCategory('Arts & Métiers', this)">
        <i class="fa-solid fa-gem" style="color: #14b8a6;"></i>
        <span>Arts & Minéraux Katanga</span>
      </button>
      <button class="chip-item" onclick="quickFilterCatalogCategory('Santé & Médicaments', this)">
        <i class="fa-solid fa-heart-pulse" style="color: #ef4444;"></i>
        <span>Santé & Beauté</span>
      </button>
    </div>

    <!-- Barre de Filtres Moderne & Épurée Titan -->
    <div class="products-filter-bar titan-filter-bar">
      <!-- Recherche textuelle avec loupe -->
      <div class="titan-search-filter-box">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input
          id="productSearch"
          type="text"
          class="titan-filter-input"
          placeholder="Filtrer par nom, marque, mot-clé..."
          oninput="displayProducts()"
        >
      </div>

      <div class="titan-select-filters-row">
        <!-- Rayon / Catégorie -->
        <div class="titan-select-wrap">
          <i class="fa-solid fa-layer-group"></i>
          <select id="categoryFilter" class="filter-select category-select-source" data-is-filter="true" onchange="displayProducts()">
            <option value="all">Toutes les catégories</option>
          </select>
        </div>

        <!-- Ville -->
        <div class="titan-select-wrap">
          <i class="fa-solid fa-location-dot"></i>
          <select id="cityFilter" class="filter-select" onchange="displayProducts()">
            <option value="all">Toutes les villes (RDC)</option>
            <option value="Kinshasa">Kinshasa</option>
            <option value="Lubumbashi">Lubumbashi</option>
            <option value="Goma">Goma</option>
            <option value="Bukavu">Bukavu</option>
            <option value="Kisangani">Kisangani</option>
            <option value="Kolwezi">Kolwezi</option>
            <option value="Matadi">Matadi</option>
            <option value="Boma">Boma</option>
            <option value="Likasi">Likasi</option>
            <option value="Uvira">Uvira</option>
            <option value="Kananga">Kananga</option>
            <option value="Mbuji-Mayi">Mbuji-Mayi</option>
            <option value="Kikwit">Kikwit</option>
            <option value="Tshikapa">Tshikapa</option>
            <option value="Kindu">Kindu</option>
            <option value="Beni">Beni</option>
            <option value="Butembo">Butembo</option>
            <option value="Bunia">Bunia</option>
            <option value="Kalemie">Kalemie</option>
            <option value="Mbandaka">Mbandaka</option>
          </select>
        </div>

        <!-- Tri -->
        <div class="titan-select-wrap">
          <i class="fa-solid fa-arrow-down-short-wide"></i>
          <select id="sortFilter" class="filter-select" onchange="displayProducts()">
            <option value="newest">Plus récents</option>
            <option value="city-asc">Trier par Ville (A à Z)</option>
            <option value="city-desc">Trier par Ville (Z à A)</option>
            <option value="price-asc">Prix : croissant</option>
            <option value="price-desc">Prix : décroissant</option>
            <option value="name-asc">Nom du produit (A à Z)</option>
          </select>
        </div>

        <!-- Réinitialiser -->
        <button class="btn titan-reset-filter-btn" onclick="resetProductFilters()" title="Réinitialiser tous les filtres">
          <i class="fa-solid fa-rotate-left"></i>
        </button>
      </div>
    </div>

    <div id="productList" class="products-grid"></div>
  </section>

  <!-- ========================================================== -->
  <!-- 4. VUE VENDRE UN PRODUIT -->
  <!-- ========================================================== -->
  <section id="sell" class="page">
    <div class="form-card">
      <div class="form-header">
        <h1>Vendre sur Zaïre-Market</h1>
        <p>Publiez gratuitement votre article auprès de milliers d'acheteurs en RDC.</p>
      </div>

      <form id="productForm">
        <div class="form-group">
          <label for="productName">Nom du produit / Article *</label>
          <input id="productName" class="form-control" placeholder="Ex : iPhone 14 Pro Max 256Go" required>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="productPrice">Prix en Dollars ($ USD) *</label>
            <input id="productPrice" type="number" min="0" step="0.5" class="form-control" placeholder="Ex : 250" required>
          </div>

          <div class="form-group">
            <label for="productCategory">Catégorie *</label>
            <select id="productCategory" class="form-control category-select-source" required>
              <option value="">Sélectionner une catégorie</option>
            </select>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="productCity">Ville en RDC *</label>
            <select id="productCity" class="form-control" required>
              <option value="Kinshasa">Kinshasa</option>
              <option value="Lubumbashi">Lubumbashi</option>
              <option value="Goma">Goma</option>
              <option value="Bukavu" selected>Bukavu</option>
              <option value="Kisangani">Kisangani</option>
              <option value="Kolwezi">Kolwezi</option>
              <option value="Matadi">Matadi</option>
              <option value="Autre Ville">Autre Ville RDC</option>
            </select>
          </div>

          <div class="form-group">
            <label for="productImage">URL de l'image</label>
            <input id="productImage" type="url" class="form-control" placeholder="https://images.unsplash.com/...">
          </div>
        </div>

        <!-- Aperçu photo -->
        <div class="form-group">
          <label>Aperçu de la photo :</label>
          <div class="image-preview-box" style="background: var(--border-subtle); border: 2px dashed var(--border-light); color: var(--text-muted);">
            <img id="productImagePreview" src="" alt="Aperçu" style="display: none;">
            <span id="previewPlaceholderText" style="color: var(--text-muted); font-size: 13px;">
              <i class="fa-regular fa-image"></i> Aucune image saisie
            </span>
          </div>
        </div>

        <div class="form-group">
          <label for="productDescription">Description complète du produit *</label>
          <textarea id="productDescription" class="form-control" rows="4" placeholder="État, caractéristiques, garantie, disponibilité..." required></textarea>
        </div>

        <button type="submit" class="btn btn-primary btn-block" style="padding: 14px; font-size: 15px; margin-top: 10px;">
          <i class="fa-solid fa-cloud-arrow-up"></i> Publier mon produit sur Zaïre-Market
        </button>
      </form>
    </div>
  </section>

  <!-- ========================================================== -->
  <!-- 5. VUE MON PANIER & PAIEMENT MOBILE MONEY -->
  <!-- ========================================================== -->
  <section id="cart" class="page">
    <div class="cart-layout">
      <!-- Liste des articles -->
      <div class="cart-items-card" style="background: var(--bg-card); color: var(--text-main); border: 1px solid var(--border-light);">
        <div class="cart-items-header" style="border-bottom: 1px solid var(--border-light);">
          <h1 style="color: var(--text-main);">Mon Panier</h1>
          <span class="badge badge-category"><span class="cart-counter-badge">0</span> article(s)</span>
        </div>
        <div id="cartItems"></div>
      </div>

      <!-- Résumé de la commande & Paiement -->
      <div id="cartSummaryBox" class="cart-summary-card">
        <h3 class="summary-title">Résumé de la commande</h3>

        <div class="summary-row">
          <span>Sous-total articles</span>
          <strong id="cartSubtotalUSD">$0.00</strong>
        </div>

        <div class="summary-row">
          <span>Estimation livraison locale</span>
          <span style="color: #10b981; font-weight: 600;">Gratuite ou sur devis</span>
        </div>

        <div class="summary-row total-row">
          <span>Total à payer</span>
          <div style="text-align: right;">
            <div id="cartTotalUSD" style="color: var(--text-main); font-weight: 800;">$0.00</div>
            <div id="cartTotalCDF" style="font-size: 12px; color: var(--text-muted); font-weight: normal;">≈ 0 FC</div>
          </div>
        </div>

        <!-- Modes de Paiement Congolais -->
        <div style="margin-top: 18px;">
          <label style="font-size: 13px; font-weight: 700; color: var(--text-main); display: block; margin-bottom: 8px;">
            Sélectionnez votre moyen de paiement :
          </label>

          <div class="payment-methods-selector">
            <label class="payment-method-card selected">
              <input type="radio" name="paymentMethod" value="M-Pesa (Vodacom)" checked>
              <div class="payment-method-info">
                <i class="fa-solid fa-mobile-screen-button" style="color: #e11d48; font-size: 18px;"></i>
                <span>M-Pesa (Vodacom RDC)</span>
              </div>
            </label>

            <label class="payment-method-card">
              <input type="radio" name="paymentMethod" value="Airtel Money">
              <div class="payment-method-info">
                <i class="fa-solid fa-phone" style="color: #dc2626; font-size: 18px;"></i>
                <span>Airtel Money</span>
              </div>
            </label>

            <label class="payment-method-card">
              <input type="radio" name="paymentMethod" value="Orange Money">
              <div class="payment-method-info">
                <i class="fa-solid fa-wallet" style="color: #f97316; font-size: 18px;"></i>
                <span>Orange Money</span>
              </div>
            </label>

            <label class="payment-method-card">
              <input type="radio" name="paymentMethod" value="Paiement à la livraison (Cash)">
              <div class="payment-method-info">
                <i class="fa-solid fa-money-bill-wave" style="color: #10b981; font-size: 18px;"></i>
                <span>Paiement à la livraison (Cash)</span>
              </div>
            </label>
          </div>
        </div>

        <button class="btn btn-primary btn-block" onclick="checkout()" style="padding: 13px; font-size: 15px; margin-top: 14px;">
          <i class="fa-solid fa-lock"></i> Valider et Passer la commande
        </button>
      </div>
    </div>
  </section>

  <!-- ========================================================== -->
  <!-- 6. VUE MON COMPTE & AUTHENTIFICATION -->
  <!-- ========================================================== -->
  <section id="account" class="page">
    <div class="auth-wrapper">
      <!-- Bouton Retour au Marché (Visible quand le header est masqué) -->
      <div style="margin-bottom: 18px; text-align: left;">
        <button type="button" onclick="showPage('home')" class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 6px; border-radius: var(--radius-full); padding: 7px 16px; font-size: 12px;">
          <i class="fa-solid fa-arrow-left"></i> Retour au Marché
        </button>
      </div>

      <!-- Logo Officiel Zaïre-Market (Seul, sans titre en double) -->
      <div style="text-align: center; margin-bottom: 22px;">
        <div style="display: inline-flex; align-items: center; justify-content: center; background: #ffffff; padding: 10px; border-radius: 16px; box-shadow: 0 4px 18px rgba(0,0,0,0.18);">
          <img src="assets/images/logo.jpg" alt="Zaïre-Market Logo" style="width: 95px; height: 115px; object-fit: contain; display: block;">
        </div>
      </div>

      <!-- Non connecté -->
      <div id="loggedOut">
        <div class="auth-tabs">
          <button id="tabBtnLogin" class="auth-tab-btn active" onclick="showLogin()">Connexion</button>
          <button id="tabBtnRegister" class="auth-tab-btn" onclick="showRegister()">Créer un compte</button>
        </div>

        <!-- Formulaire de Connexion -->
        <form id="loginForm">
          <h2 style="font-size: 20px; font-weight: 800; color: var(--text-main); margin-bottom: 4px;">Connexion</h2>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 14px;">Connectez-vous à votre compte client ou vendeur Zaïre-Market.</p>

          <!-- Bouton Continuer avec Google -->
          <button type="button" class="btn-google-auth" onclick="loginWithGoogle()" title="Continuer avec Google">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.616z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
            </svg>
            <span>Continuer avec Google</span>
          </button>

          <div class="auth-divider">
            <span>ou avec votre email</span>
          </div>

          <div class="form-group">
            <label for="loginEmail">Adresse Email *</label>
            <input id="loginEmail" type="email" class="form-control" placeholder="exemple@zaire-market.cd" required>
          </div>

          <div class="form-group">
            <label for="loginPassword">Mot de passe *</label>
            <input id="loginPassword" type="password" class="form-control" placeholder="••••••••" required>
          </div>

          <button type="submit" class="btn btn-primary btn-block" style="padding: 12px; margin-top: 8px;">
            <i class="fa-solid fa-right-to-bracket"></i> Se connecter
          </button>

          <div style="margin-top: 18px; text-align: center;">
            <span style="font-size: 13px; color: var(--text-muted);">Pas encore de compte utilisateur ? </span>
            <a href="#" onclick="showRegister(); return false;" style="color: #0284c7; font-weight: 700; font-size: 13px;">Créer un compte</a>
          </div>
        </form>

        <!-- Formulaire d'Inscription (Obligatoire pour les clients/vendeurs) -->
        <form id="registerForm" hidden>
          <h2 style="font-size: 20px; font-weight: 800; color: var(--text-main); margin-bottom: 4px;">Créer un compte utilisateur</h2>
          <div style="background: rgba(2, 132, 199, 0.1); border: 1px solid rgba(2, 132, 199, 0.25); border-radius: 8px; padding: 10px; margin-bottom: 14px;">
            <small style="color: var(--accent-blue); font-weight: 600; display: block;">
              <i class="fa-solid fa-circle-info"></i> Inscription rapide partout en RDC
            </small>
            <small style="color: var(--text-muted); font-size: 11.5px;">
              Rejoignez des milliers d'acheteurs et vendeurs actifs dans les 26 provinces.
            </small>
          </div>

          <!-- Bouton Inscription avec Google -->
          <button type="button" class="btn-google-auth" onclick="loginWithGoogle()" title="S'inscrire avec Google">
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.616z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
            </svg>
            <span>Continuer avec Google</span>
          </button>

          <div class="auth-divider">
            <span>ou inscription classique</span>
          </div>

          <div class="form-group">
            <label for="registerName">Nom complet *</label>
            <input id="registerName" class="form-control" placeholder="Ex: Joseph Kabengele" required>
          </div>

          <div class="form-group">
            <label for="registerEmail">Adresse Email *</label>
            <input id="registerEmail" type="email" class="form-control" placeholder="joseph@email.com" required>
          </div>

          <div class="form-group">
            <label for="registerCity">Votre Ville (RDC) *</label>
            <select id="registerCity" class="form-control" required>
              <option value="Kinshasa">Kinshasa</option>
              <option value="Lubumbashi">Lubumbashi</option>
              <option value="Goma">Goma</option>
              <option value="Bukavu" selected>Bukavu</option>
              <option value="Kisangani">Kisangani</option>
              <option value="Kolwezi">Kolwezi</option>
              <option value="Matadi">Matadi</option>
              <option value="Autre Ville">Autre Ville RDC</option>
            </select>
          </div>

          <div class="form-group">
            <label for="registerPassword">Mot de passe *</label>
            <input id="registerPassword" type="password" class="form-control" placeholder="••••••••" required>
          </div>

          <button type="submit" class="btn btn-primary btn-block" style="padding: 12px; margin-top: 8px;">
            <i class="fa-solid fa-user-plus"></i> Créer mon compte Zaïre-Market
          </button>

          <div style="margin-top: 14px; text-align: center;">
            <span style="font-size: 13px; color: var(--text-muted);">Vous avez déjà un compte ? </span>
            <a href="#" onclick="showLogin(); return false;" style="color: #0284c7; font-weight: 700; font-size: 13px;">Se connecter</a>
          </div>
        </form>
      </div>

      <!-- Connecté -->
      <div id="loggedIn" hidden>
        <div id="profileInfo"></div>

        <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin: 24px 0 12px 0;">Mes Commandes Récentes</h3>
        <div id="userOrdersList"></div>

        <button onclick="logout()" class="btn btn-danger btn-block" style="margin-top: 20px;">
          <i class="fa-solid fa-power-off"></i> Se déconnecter
        </button>
      </div>

      <!-- Préférence d'Affichage Thème Clair / Sombre -->
      <div style="margin-top: 24px; padding: 14px 18px; border-radius: 12px; background: var(--bg-card); border: 1px solid var(--border-light); display: flex; align-items: center; justify-content: space-between;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 38px; height: 38px; border-radius: 50%; background: var(--border-subtle); display: flex; align-items: center; justify-content: center; font-size: 17px; color: var(--accent-blue);">
            <i class="fa-solid fa-circle-half-stroke"></i>
          </div>
          <div>
            <div style="font-weight: 700; font-size: 14px;">Mode d'Affichage</div>
            <div style="font-size: 12px; color: var(--text-muted);">Basculer entre thème clair et thème sombre</div>
          </div>
        </div>
        <button type="button" class="btn btn-secondary btn-sm theme-toggle-btn" onclick="toggleTheme()" style="gap: 6px;">
          <i class="fa-solid fa-moon theme-icon-toggle"></i>
          <span>Changer</span>
        </button>
      </div>
    </div>
  </section>

  <!-- ========================================================== -->
  <!-- 7. VUE ADMINISTRATION & STATISTIQUES CHART.JS -->
  <!-- ========================================================== -->
  <section id="admin" class="page">
    <div class="admin-wrapper">
      <!-- Bannière Top Admin -->
      <div class="admin-top-banner">
        <div class="admin-top-title">
          <h1><i class="fa-solid fa-shield-halved"></i> Panneau d'Administration Zaïre-Market</h1>
          <span class="admin-role-badge">Supervision</span>
        </div>
        <p id="adminWelcome" style="font-size: 13.5px; color: #cbd5e1;"></p>
      </div>

      <!-- Organigramme Hiérarchique 11 Pôles (Super-Administrateur) -->
      <div id="superadminOrganigramContainer"></div>

      <!-- Cartes KPI Indicateurs Clés -->
      <div class="admin-kpis-grid">
        <div class="kpi-card">
          <div class="kpi-icon-box kpi-icon-users">
            <i class="fa-solid fa-users"></i>
          </div>
          <div class="kpi-info-box">
            <span>Utilisateurs</span>
            <strong id="kpiTotalUsers">0</strong>
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-icon-box kpi-icon-products">
            <i class="fa-solid fa-boxes-stacked"></i>
          </div>
          <div class="kpi-info-box">
            <span>Produits en ligne</span>
            <strong id="kpiTotalProducts">0</strong>
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-icon-box kpi-icon-orders">
            <i class="fa-solid fa-cart-check"></i>
          </div>
          <div class="kpi-info-box">
            <span>Commandes</span>
            <strong id="kpiTotalOrders">0</strong>
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-icon-box kpi-icon-revenue">
            <i class="fa-solid fa-sack-dollar"></i>
          </div>
          <div class="kpi-info-box">
            <span>Volume Ventes</span>
            <strong id="kpiTotalRevenue">$0.00</strong>
          </div>
        </div>
      </div>

      <!-- Graphiques Chart.js -->
      <div class="admin-charts-row">
        <!-- Évolution des Ventes -->
        <div class="chart-card">
          <div class="chart-card-header">
            <h3><i class="fa-solid fa-chart-line" style="color: #0284c7;"></i> Tendance du Volume des Ventes ($ USD)</h3>
            <span class="badge badge-success">Activité 7 jours</span>
          </div>
          <div class="chart-canvas-wrapper">
            <canvas id="salesRevenueChart"></canvas>
          </div>
        </div>

        <!-- Répartition par Catégories -->
        <div class="chart-card">
          <div class="chart-card-header">
            <h3><i class="fa-solid fa-chart-pie" style="color: #f59e0b;"></i> Ventes par Catégorie</h3>
          </div>
          <div class="chart-canvas-wrapper">
            <canvas id="categoryDistributionChart"></canvas>
          </div>
        </div>
      </div>

      <!-- Menu des Sections Admin (11 Pôles & Outils) -->
      <div class="admin-nav-tabs" id="adminNavTabs">
        <button id="tabBtnPole4" class="admin-tab-btn active" onclick="switchAdminPole(4)">
          <i class="fa-solid fa-boxes-packing"></i> 4. Produits
        </button>
        <button id="tabBtnPole2" class="admin-tab-btn" onclick="switchAdminPole(2)">
          <i class="fa-solid fa-users-gear"></i> 2. Utilisateurs
        </button>
        <button id="tabBtnPole3" class="admin-tab-btn" onclick="switchAdminPole(3)">
          <i class="fa-solid fa-store"></i> 3. Vendeurs
        </button>
        <button id="tabBtnPole5" class="admin-tab-btn" onclick="switchAdminPole(5)">
          <i class="fa-solid fa-clipboard-check"></i> 5. Commandes
        </button>
        <button id="tabBtnPole6" class="admin-tab-btn" onclick="switchAdminPole(6)">
          <i class="fa-solid fa-sack-dollar"></i> 6. Finances
        </button>
        <button id="tabBtnPole7" class="admin-tab-btn" onclick="switchAdminPole(7)">
          <i class="fa-solid fa-truck-fast"></i> 7. Livraison
        </button>
        <button id="tabBtnPole8" class="admin-tab-btn" onclick="switchAdminPole(8)">
          <i class="fa-solid fa-headset"></i> 8. Communication
        </button>
        <button id="tabBtnPole9" class="admin-tab-btn" onclick="switchAdminPole(9)">
          <i class="fa-solid fa-shield-halved"></i> 9. Sécurité
        </button>
        <button id="tabBtnPole10" class="admin-tab-btn" onclick="switchAdminPole(10)">
          <i class="fa-solid fa-bullhorn"></i> 10. Marketing
        </button>
        <button id="tabBtnPole11" class="admin-tab-btn" onclick="switchAdminPole(11)">
          <i class="fa-solid fa-chart-pie"></i> 11. Statistiques
        </button>
        <button id="tabAdminManagement" class="admin-tab-btn" onclick="adminAdministrators()">
          <i class="fa-solid fa-user-gear"></i> Délégués
        </button>
        <button id="tabBtnAdminLogs" class="admin-tab-btn" onclick="adminLogs()">
          <i class="fa-solid fa-clipboard-list"></i> Journal
        </button>
      </div>

      <!-- Contenu Dynamique selon l'onglet cliqué -->
      <div id="adminContent" class="admin-body-content"></div>
    </div>
  </section>

</main>

<?php
// Inclusion de la navigation mobile inférieure (Bottom Navigation)
require_once __DIR__ . '/includes/bottom-nav.php';

// Inclusion du pied de page et de tous les scripts
require_once __DIR__ . '/includes/footer.php';
?>
