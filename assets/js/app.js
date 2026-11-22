/**
 * ===================================================================
 * ZAÏRE-MARKET — Application Principale & Routage
 * Les utilitaires et fonctions de stockage sont dans core.js
 * ===================================================================
 */

/**
 * Système de Navigation / Routeur de Vues
 */
function showPage(pageId) {
  if (pageId === "admin" && !isAdmin()) {
    showToast("Accès réservé à l'administration.", "error");
    showPage("account");
    return;
  }

  // Masquer toutes les sections
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  // Afficher la page ciblée
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add("active");
  }

  // Synchronisation de la Bottom Navigation sur Mobile
  document.querySelectorAll(".bottom-nav-item").forEach(item => {
    if (item.getAttribute("data-page") === pageId) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Synchronisation de la navigation desktop
  document.querySelectorAll(".desktop-nav-link").forEach(link => {
    if (link.getAttribute("data-page") === pageId) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Visibilité du header : masqué uniquement sur la page de connexion, visible sur les tableaux de bord et toutes les autres pages
  const mainHeader = document.querySelector(".main-header");
  const isLoginPage = (pageId === "account" && (typeof currentUser === "undefined" || !currentUser));
  if (mainHeader) {
    mainHeader.style.display = isLoginPage ? "none" : "";
  }

  // Actions spécifiques lors de l'ouverture d'une page
  if (pageId === "home") {
    renderQuickCategories();
    if (typeof renderHomeFeaturedProducts === "function") {
      renderHomeFeaturedProducts();
    }
    if (typeof startFlashCountdown === "function") {
      startFlashCountdown();
    }
    if (typeof updateHomeCockpit === "function") {
      updateHomeCockpit();
    }
  }
  if (pageId === "categories") {
    renderCategoriesList("allCategoriesList");
  }
  if (pageId === "products") {
    displayProducts();
  }
  if (pageId === "cart") {
    displayCart();
  }
  if (pageId === "account") {
    displayAccount();
  }
  if (pageId === "admin") {
    displayAdmin();
  }

  // Toujours maintenir les avatars synchronisés
  if (typeof updateUserAvatarBadges === "function") {
    updateUserAvatarBadges();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Met à jour les liens d'administration selon l'état de connexion
 */
function updateNavigation() {
  const adminDesktopBtn = document.getElementById("adminDesktopNavBtn");
  const adminBottomBtn = document.getElementById("adminBottomNavBtn");

  if (isAdmin()) {
    if (adminDesktopBtn) adminDesktopBtn.style.display = "inline-flex";
    if (adminBottomBtn) adminBottomBtn.style.display = "flex";
  } else {
    if (adminDesktopBtn) adminDesktopBtn.style.display = "none";
    if (adminBottomBtn) adminBottomBtn.style.display = "none";
  }
}

/**
 * Initialisation au chargement de l'application
 */
document.addEventListener("DOMContentLoaded", () => {
  // Remplir les listes de catégories et menus
  populateCategorySelects();
  renderQuickCategories();
  if (typeof renderHomeFeaturedProducts === "function") {
    renderHomeFeaturedProducts();
  }
  if (typeof startFlashCountdown === "function") {
    startFlashCountdown();
  }
  if (typeof updateHomeCockpit === "function") {
    updateHomeCockpit();
  }
  renderCategoriesList("allCategoriesList");
  updateCartBadges();
  updateNavigation();
  if (typeof updateUserAvatarBadges === "function") {
    updateUserAvatarBadges();
  }

  // Écouteur pour la prévisualisation de photo
  const imageInput = document.getElementById("productImage");
  if (imageInput) {
    imageInput.addEventListener("input", previewProductImage);
  }

  // Fermer le tiroir de catégories en cliquant à l'extérieur
  const catModal = document.getElementById("categoriesModal");
  if (catModal) {
    catModal.addEventListener("click", (e) => {
      if (e.target === catModal) {
        closeCategoriesDrawer();
      }
    });
  }

  console.log("Zaïre-Market v2.0 initialisé avec succès 🇨🇩");
});
