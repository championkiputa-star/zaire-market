/**
 * ===================================================================
 * ZAÏRE-MARKET — Fonctions de Base, Stockage & Utilitaires (Core)
 * Ce fichier DOIT être chargé EN PREMIER avant tous les autres scripts.
 * ===================================================================
 */

let activityLogs = loadData("zm_logs", []);
let orders = loadData("zm_orders", []);

/**
 * Utilitaires de Stockage Local
 */
function loadData(key, defaultValue) {
  try {
    const data = localStorage.getItem(key);
    if (!data) return defaultValue;
    return JSON.parse(data);
  } catch (err) {
    console.warn(`Erreur lecture localStorage pour [${key}]:`, err);
    return defaultValue;
  }
}

function saveData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Erreur écriture localStorage pour [${key}]:`, err);
  }
}

function generateId(prefix = "ZM") {
  return prefix + "-" + Date.now().toString(36).toUpperCase() + "-" + Math.floor(Math.random() * 1000);
}

function escapeHTML(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function logActivity(action) {
  const userEmail = (typeof currentUser !== "undefined" && currentUser) ? currentUser.email : "Visiteur";
  activityLogs.unshift({
    id: generateId("LOG"),
    action: action,
    user: userEmail,
    date: new Date().toLocaleString("fr-FR")
  });
  activityLogs = activityLogs.slice(0, 300);
  saveData("zm_logs", activityLogs);
}

/**
 * Toast Notifications Modernes
 */
function showToast(message, type = "info") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  let icon = "fa-circle-info";
  if (type === "success") icon = "fa-circle-check";
  if (type === "error") icon = "fa-circle-exclamation";

  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${escapeHTML(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/**
 * ===================================================================
 * Gestionnaire des Thèmes (Clair / Sombre)
 * ===================================================================
 */
function getPreferredTheme() {
  const saved = localStorage.getItem("zm_theme");
  if (saved === "dark" || saved === "light") {
    return saved;
  }
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

function updateThemeUI(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  const themeIcons = document.querySelectorAll(".theme-icon-toggle");
  const themeButtons = document.querySelectorAll(".theme-toggle-btn");

  themeIcons.forEach(icon => {
    if (theme === "dark") {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  });

  themeButtons.forEach(btn => {
    const isDark = theme === "dark";
    btn.setAttribute("title", isDark ? "Passer au thème clair (Jour)" : "Passer au thème sombre (Nuit)");
    btn.setAttribute("aria-label", isDark ? "Passer au thème clair" : "Passer au thème sombre");
  });
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  const newTheme = (current === "dark") ? "light" : "dark";
  localStorage.setItem("zm_theme", newTheme);
  updateThemeUI(newTheme);

  // Si l'administration est actuellement affichée, réactualiser les graphiques Chart.js avec la palette correspondante
  if (typeof initAdminCharts === "function" && document.getElementById("admin")?.classList.contains("active")) {
    initAdminCharts();
  }

  showToast(newTheme === "dark" ? "Thème Sombre activé 🌙" : "Thème Clair activé ☀️", "info");
}

function initTheme() {
  const theme = getPreferredTheme();
  updateThemeUI(theme);
}

// Initialisation immédiate du thème dès l'exécution de core.js
initTheme();

