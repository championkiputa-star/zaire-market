<!-- BARRE DE NAVIGATION MOBILE (BOTTOM NAVIGATION BAR) -->
<nav class="bottom-nav">
  <button class="bottom-nav-item active" data-page="home" onclick="showPage('home')">
    <i class="fa-solid fa-house"></i>
    <span>Accueil</span>
  </button>

  <button class="bottom-nav-item" data-page="categories" onclick="showPage('categories')">
    <i class="fa-solid fa-table-cells-large"></i>
    <span>Catégories</span>
  </button>

  <button class="bottom-nav-item sell-highlight" data-page="sell" onclick="showPage('sell')">
    <div class="sell-icon-wrapper">
      <i class="fa-solid fa-plus"></i>
    </div>
    <span>Vendre</span>
  </button>

  <button class="bottom-nav-item" data-page="cart" onclick="showPage('cart')">
    <i class="fa-solid fa-cart-shopping"></i>
    <span class="header-cart-badge cart-counter-badge" style="display: none; top: 4px; right: 18px;">0</span>
    <span>Panier</span>
  </button>

  <button class="bottom-nav-item" data-page="account" onclick="showPage('account')">
    <i class="fa-regular fa-user"></i>
    <span>Compte</span>
  </button>

  <button class="bottom-nav-item" id="adminBottomNavBtn" data-page="admin" onclick="showPage('admin')" style="display: none; color: #f59e0b;">
    <i class="fa-solid fa-shield-halved"></i>
    <span>Admin</span>
  </button>
</nav>
