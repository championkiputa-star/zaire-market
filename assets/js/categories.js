/**
 * ===================================================================
 * ZAÏRE-MARKET — Gestionnaire des Catégories (Modèle Made-in-China)
 * ===================================================================
 */

const CATEGORIES_DATA = [
  { name: "Agriculture & Nourriture", icon: "fa-seedling", slug: "agriculture-nourriture" },
  { name: "Vêtement & Accessoires", icon: "fa-shirt", slug: "vetement-accessoires" },
  { name: "Habits de Différentes Marques", icon: "fa-tags", slug: "habits-de-differentes-marques" },
  { name: "Arts & Métiers", icon: "fa-gem", slug: "arts-metiers" },
  { name: "Pièces & Accessoires d'Auto et de Moto", icon: "fa-car", slug: "pieces-auto-moto" },
  { name: "Sacs, Valises & Boîtes", icon: "fa-bag-shopping", slug: "sacs-valises-boites" },
  { name: "Produits Chimiques", icon: "fa-flask", slug: "produits-chimiques" },
  { name: "Produits Informatiques", icon: "fa-laptop", slug: "produits-informatiques" },
  { name: "Construction & Décoration", icon: "fa-paint-roller", slug: "construction-decoration" },
  { name: "Électroniques de Consommation", icon: "fa-mobile-screen-button", slug: "electroniques-consommation" },
  { name: "Électricité & Électronique", icon: "fa-bolt", slug: "electricite-electronique" },
  { name: "Meuble", icon: "fa-couch", slug: "meuble" },
  { name: "Santé & Hygiène", icon: "fa-kit-medical", slug: "sante-hygiene" },
  { name: "Équipement Industriel & Composants", icon: "fa-gear", slug: "equipement-industriel" },
  { name: "Instruments & Compteurs", icon: "fa-gauge-high", slug: "instruments-compteurs" },
  { name: "Industrie Légère & Articles d'Usage Courant", icon: "fa-kitchen-set", slug: "industrie-legere" },
  { name: "Luminaire & Éclairage", icon: "fa-lightbulb", slug: "luminaire-eclairage" },
  { name: "Machinerie de Fabrication & de Façonnage", icon: "fa-tractor", slug: "machinerie-fabrication" },
  { name: "Métallurgie, Minéral & Énergie", icon: "fa-cubes-stacked", slug: "metallurgie-mineral-energie" },
  { name: "Fournitures de Bureau", icon: "fa-calculator", slug: "fournitures-bureau" },
  { name: "Emballage & Impression", icon: "fa-box-open", slug: "emballage-impression" },
  { name: "Sécurité & Protection", icon: "fa-shield-halved", slug: "securite-protection" },
  { name: "Service", icon: "fa-bell-concierge", slug: "service" },
  { name: "Sports & Loisirs", icon: "fa-volleyball", slug: "sports-loisirs" },
  { name: "Textile", icon: "fa-scroll", slug: "textile" },
  { name: "Outils & Quincaillerie", icon: "fa-wrench", slug: "outils-quincaillerie" },
  { name: "Jouets", icon: "fa-shapes", slug: "jouets" },
  { name: "Transport", icon: "fa-truck", slug: "transport" }
];

/**
 * Affiche la liste des catégories (fidèle aux captures Made-in-China)
 */
function renderCategoriesList(targetElementId = "allCategoriesList") {
  const container = document.getElementById(targetElementId);
  if (!container) return;

  const html = CATEGORIES_DATA.map(cat => {
    const count = (products || []).filter(p => p.category === cat.name && p.status !== 'suspendu').length;
    return `
    <li class="category-list-item">
      <button class="category-link" data-category="${escapeHTML(cat.name)}" onclick="filterCategory(this.getAttribute('data-category'))">
        <div class="category-link-left">
          <div class="category-icon-wrapper">
            <i class="fa-solid ${cat.icon}"></i>
          </div>
          <span class="category-link-title">${escapeHTML(cat.name)}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="badge badge-category" style="font-size: 11px;">${count} article${count > 1 ? 's' : ''}</span>
          <i class="fa-solid fa-chevron-right category-chevron"></i>
        </div>
      </button>
    </li>
    `;
  }).join("");

  container.innerHTML = html;
}

/**
 * Grille de catégories rapides sur la page d'accueil
 */
function renderQuickCategories(targetElementId = "quickCategoriesContainer") {
  const container = document.getElementById(targetElementId);
  if (!container) return;

  // Sélection des 8 catégories populaires
  const popular = CATEGORIES_DATA.slice(0, 8);

  const html = popular.map(cat => {
    const count = (products || []).filter(p => p.category === cat.name && p.status !== 'suspendu').length;
    return `
    <div class="quick-category-card" data-category="${escapeHTML(cat.name)}" onclick="filterCategory(this.getAttribute('data-category'))">
      <i class="fa-solid ${cat.icon}"></i>
      <span>${escapeHTML(cat.name)}</span>
      <small style="color: #64748b; font-size: 11px;">${count} article${count > 1 ? 's' : ''}</small>
    </div>
    `;
  }).join("");

  container.innerHTML = html;
}

/**
 * Remplit automatiquement les balises <select> de catégories
 */
function populateCategorySelects() {
  const selects = document.querySelectorAll(".category-select-source");
  selects.forEach(select => {
    const isFilter = select.getAttribute("data-is-filter") === "true";
    let options = isFilter ? '<option value="all">Toutes les catégories</option>' : '<option value="">Choisir une catégorie...</option>';

    CATEGORIES_DATA.forEach(cat => {
      options += `<option value="${escapeHTML(cat.name)}">${escapeHTML(cat.name)}</option>`;
    });

    select.innerHTML = options;
  });
}

/**
 * Filtrer par catégorie et basculer sur la vue produits
 */
function filterCategory(categoryName) {
  closeCategoriesDrawer();
  showPage("products");

  // Réinitialiser la recherche textuelle et les filtres pour afficher directement tous les produits de la catégorie
  const searchInput = document.getElementById("productSearch");
  if (searchInput) searchInput.value = "";

  const cityFilter = document.getElementById("cityFilter");
  if (cityFilter) cityFilter.value = "all";

  const filterSelect = document.getElementById("categoryFilter");
  if (filterSelect) {
    filterSelect.value = categoryName;
  }

  displayProducts();
  showToast(`Catégorie : ${categoryName}`, "info");
}

/**
 * Gestion du tiroir latéral / modal des catégories
 */
function toggleCategoriesDrawer() {
  const modal = document.getElementById("categoriesModal");
  if (modal) {
    modal.classList.toggle("active");
    if (modal.classList.contains("active")) {
      renderCategoriesList("drawerCategoriesList");
    }
  }
}

function closeCategoriesDrawer() {
  const modal = document.getElementById("categoriesModal");
  if (modal) {
    modal.classList.remove("active");
  }
}
