<!-- TIROIR LATÉRAL DES CATÉGORIES (MODÈLE MOBILE MADE-IN-CHINA) -->
<div id="categoriesModal" class="categories-modal">
  <div class="categories-drawer">
    <div class="drawer-header">
      <div style="display: flex; align-items: center; gap: 10px;">
        <img src="assets/images/logo.jpg" alt="Zaïre Visionnaire Logo" style="width: 32px; height: 32px; border-radius: 8px; object-fit: cover; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
        <h2>Toutes les Catégories</h2>
      </div>
      <button class="drawer-close-btn" onclick="closeCategoriesDrawer()" aria-label="Fermer">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>

    <ul id="drawerCategoriesList" class="category-list-styled">
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
</div>