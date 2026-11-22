/**
 * ===================================================================
 * ZAÏRE-MARKET — Tableau de Bord d'Administration & Chart.js
 * Console Souveraine du Super-Administrateur (11 Pôles Hiérarchiques)
 * ===================================================================
 */

let salesChartInstance = null;
let categoryChartInstance = null;
let activePoleNumber = 4; // Par défaut : Pôle 4 (Produits)

// Données partagées / stockées pour les pôles
let vendorsList = loadData("zm_vendors", [
  {
    id: "VND-001",
    name: "AgriCongo Bio",
    owner: "Dieudonné Kabange",
    logo: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=120",
    city: "Kinshasa",
    category: "Agriculture & Nourriture",
    productsCount: 18,
    revenue: 4320.00,
    status: "certified",
    phone: "+243 81 234 5678"
  },
  {
    id: "VND-002",
    name: "Kivu Coffee Roasters",
    owner: "Amina Mutombo",
    logo: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=120",
    city: "Bukavu",
    category: "Agriculture & Nourriture",
    productsCount: 12,
    revenue: 2890.00,
    status: "certified",
    phone: "+243 99 876 5432"
  },
  {
    id: "VND-003",
    name: "Sape & Élégance Kinshasa",
    owner: "Patrick Kalombo",
    logo: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=120",
    city: "Kinshasa",
    category: "Habits de Différentes Marques",
    productsCount: 24,
    revenue: 6150.00,
    status: "certified",
    phone: "+243 82 456 7890"
  },
  {
    id: "VND-004",
    name: "Katanga Tech Hub",
    owner: "Serge Kalala",
    logo: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=120",
    city: "Lubumbashi",
    category: "Appareils Électroniques",
    productsCount: 15,
    revenue: 7800.00,
    status: "pending",
    phone: "+243 85 111 2233"
  },
  {
    id: "VND-005",
    name: "Art & Culture RDC",
    owner: "Grâce Tshilombo",
    logo: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=120",
    city: "Kolwezi",
    category: "Arts & Métiers",
    productsCount: 9,
    revenue: 1240.00,
    status: "suspended",
    phone: "+243 97 333 4455"
  }
]);

let deliveryList = loadData("zm_deliveries", [
  {
    trackingId: "ZM-EXP-9081",
    customer: "Dieudonné Kabange",
    destination: "Kinshasa (Gombe)",
    courier: "Kinshasa Moto Express",
    status: "En cours de livraison",
    date: "10/11/2026 14:10"
  },
  {
    trackingId: "ZM-EXP-9082",
    customer: "Amina Mutombo",
    destination: "Lubumbashi (Golf)",
    courier: "Katanga Fret Cargo",
    status: "En transit interurbain",
    date: "09/11/2026 11:25"
  },
  {
    trackingId: "ZM-EXP-9083",
    customer: "Patrick Kalombo",
    destination: "Goma (Himbi)",
    courier: "Kivu Rapide Express",
    status: "Pris en charge au dépôt",
    date: "10/11/2026 09:40"
  },
  {
    trackingId: "ZM-EXP-9084",
    customer: "Serge Kalala",
    destination: "Matadi (Centre)",
    courier: "Congo Fleuve Transit",
    status: "Livré",
    date: "08/11/2026 17:00"
  }
]);

let supportTickets = loadData("zm_support_tickets", [
  {
    id: "TCK-401",
    author: "kabange.dieu@gmail.com",
    subject: "Précision adresse de livraison à Bandalungwa",
    priority: "Normale",
    status: "Ouvert",
    date: "10/11/2026 12:45"
  },
  {
    id: "TCK-402",
    author: "amina.mutombo@yahoo.cd",
    subject: "Confirmation reçu de paiement M-Pesa",
    priority: "Haute",
    status: "Résolu",
    date: "09/11/2026 16:20"
  },
  {
    id: "TCK-403",
    author: "patrick.kalombo@outlook.com",
    subject: "Demande de certification badge vendeur",
    priority: "Normale",
    status: "En attente",
    date: "10/11/2026 08:30"
  }
]);

let promoCodes = loadData("zm_promo_codes", [
  {
    code: "VISION2026",
    discount: "10%",
    status: "Actif",
    uses: 142,
    expiry: "31/12/2026"
  },
  {
    code: "ZAIRE_VIP",
    discount: "15%",
    status: "Actif",
    uses: 89,
    expiry: "15/12/2026"
  },
  {
    code: "KIVU_FREESHIP",
    discount: "Livraison Offerte",
    status: "Expiré",
    uses: 64,
    expiry: "01/11/2026"
  }
]);

/**
 * ===================================================================
 * 1. Initialisation et affichage du panneau d'administration
 * ===================================================================
 */
/**
 * Synchronisation des KPIs d'administration en direct depuis MySQL
 */
async function syncAdminStats() {
  if (typeof ApiClient === "undefined" || !ApiClient.getToken()) return;
  try {
    const statsRes = await ApiClient.getStats();
    if (statsRes && statsRes.status === "success" && statsRes.kpis) {
      const kpis = statsRes.kpis;
      const kpiUsers = document.getElementById("kpiTotalUsers");
      const kpiProducts = document.getElementById("kpiTotalProducts");
      const kpiOrders = document.getElementById("kpiTotalOrders");
      const kpiRevenue = document.getElementById("kpiTotalRevenue");

      if (kpiUsers) kpiUsers.textContent = kpis.users;
      if (kpiProducts) kpiProducts.textContent = kpis.products;
      if (kpiOrders) kpiOrders.textContent = kpis.orders;
      if (kpiRevenue) kpiRevenue.textContent = `$${Number(kpis.revenue).toFixed(2)}`;
    }
  } catch (err) {
    console.warn("[Admin] Statistiques serveur inaccessibles:", err.message);
  }
}

function displayAdmin() {
  if (!isAdmin()) {
    showToast("Accès réservé aux administrateurs.", "error");
    showPage("account");
    return;
  }

  const welcomeElem = document.getElementById("adminWelcome");
  if (welcomeElem) {
    welcomeElem.textContent = `Connecté : ${currentUser.name} (${currentUser.role === 'super_admin' ? 'Super Administrateur — Accès Total' : 'Admin'})`;
  }

  // Calcul du Chiffre d'Affaires Total (Local)
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

  // Mise à jour des cartes KPI
  const kpiUsers = document.getElementById("kpiTotalUsers");
  const kpiProducts = document.getElementById("kpiTotalProducts");
  const kpiOrders = document.getElementById("kpiTotalOrders");
  const kpiRevenue = document.getElementById("kpiTotalRevenue");

  if (kpiUsers) kpiUsers.textContent = users.length;
  if (kpiProducts) kpiProducts.textContent = products.length;
  if (kpiOrders) kpiOrders.textContent = orders.length;
  if (kpiRevenue) kpiRevenue.textContent = `$${totalRevenue.toFixed(2)}`;

  // Synchronisation en direct avec la base de données MySQL
  if (typeof syncAdminStats === "function") {
    syncAdminStats();
  }

  // Rendu de l'Organigramme Hiérarchique 11 Pôles pour le Super-Admin
  renderSuperAdminOrganigram();

  // Masquer / Afficher l'onglet Délégués selon les droits
  const adminTab = document.getElementById("tabAdminManagement");
  if (adminTab) {
    adminTab.style.display = currentUser.role === "super_admin" ? "inline-flex" : "none";
  }

  // Initialisation des graphiques Chart.js
  initAdminCharts();

  // Activer le pôle courant (Pôle 4 par défaut ou sélectionné)
  switchAdminPole(activePoleNumber);
}

/**
 * ===================================================================
 * 2. Rendu de l'Organigramme Hiérarchique à 11 Pôles (Image Officielle)
 * ===================================================================
 */
function renderSuperAdminOrganigram() {
  const container = document.getElementById("superadminOrganigramContainer");
  if (!container) return;

  if (currentUser.role !== "super_admin") {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = `
    <div class="superadmin-organigram">
      <div class="superadmin-header-crown">
        <span class="superadmin-access-badge"><i class="fa-solid fa-lock-open"></i> Accès total</span>
        <i class="fa-solid fa-crown superadmin-crown-icon" style="color: #fbbf24;"></i>
        <h2>1. Super Administrateur</h2>
        <p>Fondateur – contrôle général de la plateforme</p>
      </div>

      <div class="superadmin-divider"></div>

      <div class="admin-poles-grid">
        <!-- Pôle 2 -->
        <button type="button" class="admin-pole-card ${activePoleNumber === 2 ? 'active' : ''}" id="poleCard-2" onclick="switchAdminPole(2)">
          <div class="admin-pole-icon"><i class="fa-solid fa-users-gear" style="color: #38bdf8;"></i></div>
          <div class="admin-pole-details">
            <div class="admin-pole-title">
              <span>2. Admin utilisateurs</span>
              <span class="admin-pole-badge">Pôle 2</span>
            </div>
            <div class="admin-pole-desc">Comptes, inscriptions, suspensions</div>
          </div>
        </button>

        <!-- Pôle 3 -->
        <button type="button" class="admin-pole-card ${activePoleNumber === 3 ? 'active' : ''}" id="poleCard-3" onclick="switchAdminPole(3)">
          <div class="admin-pole-icon"><i class="fa-solid fa-store" style="color: #f59e0b;"></i></div>
          <div class="admin-pole-details">
            <div class="admin-pole-title">
              <span>3. Admin vendeurs</span>
              <span class="admin-pole-badge">Pôle 3</span>
            </div>
            <div class="admin-pole-desc">Vérification et gestion des boutiques</div>
          </div>
        </button>

        <!-- Pôle 4 -->
        <button type="button" class="admin-pole-card ${activePoleNumber === 4 ? 'active' : ''}" id="poleCard-4" onclick="switchAdminPole(4)">
          <div class="admin-pole-icon"><i class="fa-solid fa-boxes-packing" style="color: #10b981;"></i></div>
          <div class="admin-pole-details">
            <div class="admin-pole-title">
              <span>4. Admin produits</span>
              <span class="admin-pole-badge">Pôle 4</span>
            </div>
            <div class="admin-pole-desc">Publications, catégories, modération</div>
          </div>
        </button>

        <!-- Pôle 5 -->
        <button type="button" class="admin-pole-card ${activePoleNumber === 5 ? 'active' : ''}" id="poleCard-5" onclick="switchAdminPole(5)">
          <div class="admin-pole-icon"><i class="fa-solid fa-clipboard-check" style="color: #a855f7;"></i></div>
          <div class="admin-pole-details">
            <div class="admin-pole-title">
              <span>5. Admin commandes</span>
              <span class="admin-pole-badge">Pôle 5</span>
            </div>
            <div class="admin-pole-desc">Suivi et traitement des commandes</div>
          </div>
        </button>

        <!-- Pôle 6 -->
        <button type="button" class="admin-pole-card ${activePoleNumber === 6 ? 'active' : ''}" id="poleCard-6" onclick="switchAdminPole(6)">
          <div class="admin-pole-icon"><i class="fa-solid fa-sack-dollar" style="color: #22c55e;"></i></div>
          <div class="admin-pole-details">
            <div class="admin-pole-title">
              <span>6. Admin finances</span>
              <span class="admin-pole-badge">Pôle 6</span>
            </div>
            <div class="admin-pole-desc">Commissions, transactions, remboursements</div>
          </div>
        </button>

        <!-- Pôle 7 -->
        <button type="button" class="admin-pole-card ${activePoleNumber === 7 ? 'active' : ''}" id="poleCard-7" onclick="switchAdminPole(7)">
          <div class="admin-pole-icon"><i class="fa-solid fa-truck-fast" style="color: #06b6d4;"></i></div>
          <div class="admin-pole-details">
            <div class="admin-pole-title">
              <span>7. Admin livraison</span>
              <span class="admin-pole-badge">Pôle 7</span>
            </div>
            <div class="admin-pole-desc">Livreurs, expéditions et suivi</div>
          </div>
        </button>

        <!-- Pôle 8 -->
        <button type="button" class="admin-pole-card ${activePoleNumber === 8 ? 'active' : ''}" id="poleCard-8" onclick="switchAdminPole(8)">
          <div class="admin-pole-icon"><i class="fa-solid fa-headset" style="color: #ec4899;"></i></div>
          <div class="admin-pole-details">
            <div class="admin-pole-title">
              <span>8. Admin communication</span>
              <span class="admin-pole-badge">Pôle 8</span>
            </div>
            <div class="admin-pole-desc">Messages, assistance et réclamations</div>
          </div>
        </button>

        <!-- Pôle 9 -->
        <button type="button" class="admin-pole-card ${activePoleNumber === 9 ? 'active' : ''}" id="poleCard-9" onclick="switchAdminPole(9)">
          <div class="admin-pole-icon"><i class="fa-solid fa-shield-halved" style="color: #ef4444;"></i></div>
          <div class="admin-pole-details">
            <div class="admin-pole-title">
              <span>9. Admin sécurité</span>
              <span class="admin-pole-badge">Pôle 9</span>
            </div>
            <div class="admin-pole-desc">Fraudes, signalements et contrôle</div>
          </div>
        </button>

        <!-- Pôle 10 -->
        <button type="button" class="admin-pole-card ${activePoleNumber === 10 ? 'active' : ''}" id="poleCard-10" onclick="switchAdminPole(10)">
          <div class="admin-pole-icon"><i class="fa-solid fa-bullhorn" style="color: #f97316;"></i></div>
          <div class="admin-pole-details">
            <div class="admin-pole-title">
              <span>10. Admin marketing</span>
              <span class="admin-pole-badge">Pôle 10</span>
            </div>
            <div class="admin-pole-desc">Publicités, promotions et campagnes</div>
          </div>
        </button>

        <!-- Pôle 11 -->
        <button type="button" class="admin-pole-card ${activePoleNumber === 11 ? 'active' : ''}" id="poleCard-11" onclick="switchAdminPole(11)">
          <div class="admin-pole-icon"><i class="fa-solid fa-chart-pie" style="color: #eab308;"></i></div>
          <div class="admin-pole-details">
            <div class="admin-pole-title">
              <span>11. Admin statistiques</span>
              <span class="admin-pole-badge">Pôle 11</span>
            </div>
            <div class="admin-pole-desc">Rapports, performances et données</div>
          </div>
        </button>
      </div>
    </div>
  `;
}

/**
 * Commutation interactive entre les 11 Pôles
 */
function switchAdminPole(poleNumber) {
  activePoleNumber = poleNumber;

  // Mise à jour de l'apparence des cartes de l'organigramme
  document.querySelectorAll(".admin-pole-card").forEach(c => c.classList.remove("active"));
  const card = document.getElementById(`poleCard-${poleNumber}`);
  if (card) card.classList.add("active");

  // Mise à jour des boutons onglets
  document.querySelectorAll(".admin-tab-btn").forEach(btn => btn.classList.remove("active"));
  const tabBtn = document.getElementById(`tabBtnPole${poleNumber}`);
  if (tabBtn) tabBtn.classList.add("active");

  // Déclenchement de la fonction du pôle correspondant
  switch (poleNumber) {
    case 2:
      adminUsers();
      break;
    case 3:
      adminVendors();
      break;
    case 4:
      adminProducts();
      break;
    case 5:
      adminOrders();
      break;
    case 6:
      adminFinances();
      break;
    case 7:
      adminDelivery();
      break;
    case 8:
      adminCommunication();
      break;
    case 9:
      adminSecurity();
      break;
    case 10:
      adminMarketing();
      break;
    case 11:
      adminStatistics();
      break;
    default:
      adminProducts();
  }
}

/**
 * ===================================================================
 * 3. Initialisation des Graphiques Chart.js
 * ===================================================================
 */
function initAdminCharts() {
  if (typeof Chart === "undefined") {
    console.warn("Chart.js n'est pas encore chargé.");
    return;
  }

  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const textColor = isDark ? "#cbd5e1" : "#475569";
  const gridColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)";

  // 1. Graphique d'évolution des ventes
  const ctxSales = document.getElementById("salesRevenueChart")?.getContext("2d");
  if (ctxSales) {
    if (salesChartInstance) salesChartInstance.destroy();

    const labels = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
    const revenueData = [120, 240, 180, 390, 520, 710, 480];

    salesChartInstance = new Chart(ctxSales, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
          label: "Volume de Ventes ($)",
          data: revenueData,
          borderColor: "#38bdf8",
          backgroundColor: isDark ? "rgba(56, 189, 248, 0.18)" : "rgba(2, 132, 199, 0.12)",
          fill: true,
          tension: 0.35,
          pointBackgroundColor: "#38bdf8",
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            ticks: { color: textColor },
            grid: { color: gridColor }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: textColor,
              callback: value => "$" + value
            },
            grid: { color: gridColor }
          }
        }
      }
    });
  }

  // 2. Graphique de répartition des catégories
  const ctxCategory = document.getElementById("categoryDistributionChart")?.getContext("2d");
  if (ctxCategory) {
    if (categoryChartInstance) categoryChartInstance.destroy();

    const catCounts = {};
    products.forEach(p => {
      catCounts[p.category] = (catCounts[p.category] || 0) + 1;
    });

    const catLabels = Object.keys(catCounts).slice(0, 5);
    const catData = Object.values(catCounts).slice(0, 5);

    categoryChartInstance = new Chart(ctxCategory, {
      type: "doughnut",
      data: {
        labels: catLabels.length > 0 ? catLabels : ["Électronique", "Mode", "Maison", "Autres"],
        datasets: [{
          data: catData.length > 0 ? catData : [4, 3, 2, 1],
          backgroundColor: ["#0284c7", "#f59e0b", "#10b981", "#e11d48", "#8b5cf6"]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: textColor,
              boxWidth: 12,
              font: { size: 11 }
            }
          }
        }
      }
    });
  }
}

/**
 * ===================================================================
 * 4. PÔLE 2 : ADMIN UTILISATEURS (Comptes, Inscriptions, Suspensions)
 * Avec affichage des photos de profil et zoom haute définition
 * ===================================================================
 */
function adminUsers() {
  if (!requirePermission("users")) return;
  const content = document.getElementById("adminContent");
  if (!content) return;

  content.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
      <div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="badge" style="background: #38bdf8; color: #0f172a; font-weight: 800;">PÔLE 2</span>
          <h3 style="font-size: 18px; font-weight: 800; color: #0f172a; margin: 0;">
            Admin Utilisateurs (${users.length} comptes inscrits)
          </h3>
        </div>
        <p style="font-size: 13px; color: #64748b; margin-top: 4px;">
          Contrôle total du Super-Administrateur : supervision des photos de profil, activation, suspension et blocage.
        </p>
      </div>

      <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
        <input type="text" id="userFilterInput" placeholder="Rechercher par nom, email..." class="filter-input" style="max-width: 220px; padding: 6px 12px; font-size: 13px;" oninput="filterAdminUsersTable(this.value)">
        <button class="btn btn-primary btn-sm" onclick="promptAddUser()">
          <i class="fa-solid fa-user-plus"></i> + Créer un Utilisateur
        </button>
      </div>
    </div>

    <div class="admin-table-container">
      <table class="modern-table" id="adminUsersTable">
        <thead>
          <tr>
            <th style="width: 60px; text-align: center;">Photo</th>
            <th>Nom Complet</th>
            <th>Email</th>
            <th>Ville</th>
            <th>Rôle</th>
            <th>Statut du Compte</th>
            <th>Actions Souveraines</th>
          </tr>
        </thead>
        <tbody>
          ${users.length === 0 ? '<tr><td colspan="7" style="text-align: center; color: #64748b; padding: 24px;">Aucun utilisateur ordinaire inscrit pour le moment.</td></tr>' : ''}
          ${users.map(u => {
            let statusBadge = `<span class="badge badge-success"><i class="fa-solid fa-check"></i> Actif</span>`;
            if (u.status === 'suspended') {
              statusBadge = `<span class="badge badge-warning"><i class="fa-solid fa-pause"></i> Suspendu</span>`;
            } else if (u.status === 'blocked') {
              statusBadge = `<span class="badge badge-danger"><i class="fa-solid fa-ban"></i> Bloqué</span>`;
            }

            const avatarHtml = u.avatar
              ? `<img src="${escapeHTML(u.avatar)}" alt="${escapeHTML(u.name)}" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 2px solid #0284c7; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.15); transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'" onclick="previewAdminAvatar('${escapeHTML(u.avatar)}', '${escapeHTML(u.name)}', '${escapeHTML(u.email)}')" title="Cliquez pour zoomer la photo de profil">`
              : `<div style="width: 44px; height: 44px; border-radius: 50%; background: #e2e8f0; color: #475569; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 15px; border: 1px solid #cbd5e1; margin: 0 auto;">${(u.name || 'U').charAt(0).toUpperCase()}</div>`;

            return `
            <tr data-user-name="${escapeHTML((u.name || '').toLowerCase())}" data-user-email="${escapeHTML((u.email || '').toLowerCase())}">
              <td style="text-align: center;">${avatarHtml}</td>
              <td>
                <strong style="font-size: 14px; color: #0f172a;">${escapeHTML(u.name)}</strong>
                <small style="display: block; color: #94a3b8; font-size: 11px;">Inscrit le : ${escapeHTML(u.createdAt || 'N/A')}</small>
              </td>
              <td>${escapeHTML(u.email)}</td>
              <td><span class="badge badge-city"><i class="fa-solid fa-location-dot"></i> ${escapeHTML(u.city || 'Kinshasa')}</span></td>
              <td><span class="badge badge-category">${escapeHTML(u.role)}</span></td>
              <td>${statusBadge}</td>
              <td>
                <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                  ${u.status !== 'active'
                    ? `<button class="btn btn-secondary btn-sm" style="color: #16a34a;" onclick="setUserStatus('${u.id}', 'active')" title="Rétablir l'accès">
                        <i class="fa-solid fa-play"></i> Activer
                       </button>`
                    : ''
                  }
                  ${u.status !== 'suspended'
                    ? `<button class="btn btn-secondary btn-sm" style="color: #d97706;" onclick="setUserStatus('${u.id}', 'suspended')" title="Suspendre temporairement">
                        <i class="fa-solid fa-pause"></i> Suspendre
                       </button>`
                    : ''
                  }
                  ${u.status !== 'blocked'
                    ? `<button class="btn btn-secondary btn-sm" style="color: #dc2626;" onclick="setUserStatus('${u.id}', 'blocked')" title="Bloquer définitivement">
                        <i class="fa-solid fa-ban"></i> Bloquer
                       </button>`
                    : ''
                  }
                  <button class="btn btn-danger btn-sm" onclick="deleteUser('${u.id}')" title="Supprimer le compte">
                    <i class="fa-solid fa-trash-can"></i> Supprimer
                  </button>
                </div>
              </td>
            </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function filterAdminUsersTable(query) {
  const q = (query || "").toLowerCase().trim();
  const rows = document.querySelectorAll("#adminUsersTable tbody tr");
  rows.forEach(r => {
    const name = r.getAttribute("data-user-name") || "";
    const email = r.getAttribute("data-user-email") || "";
    if (name.includes(q) || email.includes(q)) {
      r.style.display = "";
    } else {
      r.style.display = "none";
    }
  });
}

/**
 * Zoom / Aperçu Haute Définition d'une photo de profil pour le Super-Admin
 */
function previewAdminAvatar(avatarUrl, userName, userEmail) {
  let modal = document.getElementById("avatarPreviewModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "avatarPreviewModal";
    modal.className = "avatar-preview-modal-overlay";
    modal.onclick = function(e) {
      if (e.target === modal) closeAdminAvatarModal();
    };
    modal.innerHTML = `
      <div class="avatar-preview-modal-box">
        <button type="button" class="avatar-preview-modal-close" onclick="closeAdminAvatarModal()">&times;</button>
        <img id="avatarPreviewImg" src="" alt="Photo agrandie" class="avatar-preview-modal-img">
        <div class="avatar-preview-modal-caption">
          <h3 id="avatarPreviewName"></h3>
          <p id="avatarPreviewEmail"></p>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const img = document.getElementById("avatarPreviewImg");
  const nameElem = document.getElementById("avatarPreviewName");
  const emailElem = document.getElementById("avatarPreviewEmail");

  if (img) img.src = avatarUrl;
  if (nameElem) nameElem.textContent = userName;
  if (emailElem) emailElem.textContent = userEmail;

  modal.style.display = "flex";
}

function closeAdminAvatarModal() {
  const modal = document.getElementById("avatarPreviewModal");
  if (modal) modal.style.display = "none";
}

function setUserStatus(userId, newStatus) {
  const user = users.find(u => u.id === userId);
  if (!user) return;
  user.status = newStatus;
  saveData("zm_users", users);

  let label = "activé";
  if (newStatus === "suspended") label = "suspendu temporairement";
  if (newStatus === "blocked") label = "bloqué";

  logActivity(`Le Super-Admin Shams Cherubin a ${label} l'utilisateur : ${user.email}`);
  showToast(`Compte de ${user.name} : ${label}.`, "info");
  adminUsers();
}

/**
 * Création d'un nouvel utilisateur par le Super-Admin Shams Cherubin
 */
function promptAddUser() {
  const name = prompt("Nom complet du nouvel utilisateur (ex: Michel Mwamba) :");
  if (!name || !name.trim()) return;

  const email = prompt("Adresse email (ex: michel@zaire-market.cd) :");
  if (!email || !email.trim()) return;
  const cleanEmail = email.trim().toLowerCase();

  if (users.some(u => u.email === cleanEmail)) {
    showToast("Un compte avec cette adresse email existe déjà.", "error");
    return;
  }

  const password = prompt("Mot de passe provisoire (ex: 123456) :", "123456");
  if (!password) return;

  const roleChoice = prompt("Rôle attribué (tapez : client, vendeur, ou livreur) :", "client");
  const cleanRole = (roleChoice && (roleChoice.toLowerCase().trim() === "vendeur" || roleChoice.toLowerCase().trim() === "livreur"))
    ? roleChoice.toLowerCase().trim()
    : "client";

  const city = prompt("Ville en RDC (ex: Kinshasa, Lubumbashi, Goma, Bukavu, Kisangani...) :", "Kinshasa") || "Kinshasa";

  const newUser = {
    id: generateId("USR"),
    name: name.trim(),
    email: cleanEmail,
    password: password,
    city: city.trim(),
    role: cleanRole,
    status: "active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
    createdAt: new Date().toLocaleString("fr-FR")
  };

  users.unshift(newUser);
  saveData("zm_users", users);
  logActivity(`Création d'un compte (${cleanRole}) par Shams Cherubin : ${cleanEmail}`);
  showToast(`Utilisateur "${name.trim()}" (${cleanRole}) créé avec succès !`, "success");
  adminUsers();
}

function deleteUser(userId) {
  const user = users.find(u => u.id === userId);
  if (!confirm(`Confirmez-vous la suppression DÉFINITIVE du compte de "${user?.name || userId}" ? Toutes ses activités seront purgées.`)) return;

  users = users.filter(u => u.id !== userId);
  products = products.filter(p => p.sellerId !== userId);
  saveData("zm_users", users);
  saveData("zm_products", products);

  logActivity(`Suppression définitive de l'utilisateur ${user?.email} par le Super-Admin`);
  showToast(`Utilisateur "${user?.name}" définitivement supprimé.`, "info");
  displayAdmin();
  adminUsers();
}

/**
 * ===================================================================
 * 5. PÔLE 3 : ADMIN VENDEURS (Vérification et Gestion des Boutiques)
 * ===================================================================
 */
function adminVendors() {
  if (!requirePermission("users")) return;
  const content = document.getElementById("adminContent");
  if (!content) return;

  content.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
      <div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="badge" style="background: #f59e0b; color: #0f172a; font-weight: 800;">PÔLE 3</span>
          <h3 style="font-size: 18px; font-weight: 800; color: #0f172a; margin: 0;">
            Admin Vendeurs & Boutiques RDC (${vendorsList.length})
          </h3>
        </div>
        <p style="font-size: 13px; color: #64748b; margin-top: 4px;">
          Certification, modération et suivi des boutiques marchandes en République Démocratique du Congo.
        </p>
      </div>

      <button class="btn btn-primary btn-sm" onclick="promptAddVendor()">
        <i class="fa-solid fa-plus"></i> Agréer une Boutique
      </button>
    </div>

    <div class="admin-table-container">
      <table class="modern-table">
        <thead>
          <tr>
            <th style="width: 50px;">Logo</th>
            <th>Boutique</th>
            <th>Propriétaire</th>
            <th>Rayon Principal</th>
            <th>Ville</th>
            <th>Articles</th>
            <th>Volume</th>
            <th>Statut Boutique</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${vendorsList.map(v => {
            let badge = `<span class="badge badge-success"><i class="fa-solid fa-shield-check"></i> Certifiée</span>`;
            if (v.status === 'pending') badge = `<span class="badge badge-warning"><i class="fa-solid fa-clock"></i> En attente</span>`;
            if (v.status === 'suspended') badge = `<span class="badge badge-danger"><i class="fa-solid fa-ban"></i> Suspendue</span>`;

            return `
            <tr>
              <td>
                <img src="${escapeHTML(v.logo)}" alt="${escapeHTML(v.name)}" style="width: 40px; height: 40px; border-radius: 8px; object-fit: cover; border: 1px solid #cbd5e1;">
              </td>
              <td><strong>${escapeHTML(v.name)}</strong><br><small style="color: #64748b;">${escapeHTML(v.phone)}</small></td>
              <td>${escapeHTML(v.owner)}</td>
              <td><span class="badge badge-category">${escapeHTML(v.category)}</span></td>
              <td><span class="badge badge-city">${escapeHTML(v.city)}</span></td>
              <td><strong>${v.productsCount}</strong></td>
              <td><strong style="color: #0284c7;">$${Number(v.revenue).toFixed(2)}</strong></td>
              <td>${badge}</td>
              <td>
                <div style="display: flex; gap: 6px;">
                  ${v.status !== 'certified'
                    ? `<button class="btn btn-secondary btn-sm" style="color: #16a34a;" onclick="setVendorStatus('${v.id}', 'certified')" title="Certifier la boutique">
                        <i class="fa-solid fa-certificate"></i> Certifier
                       </button>`
                    : `<button class="btn btn-secondary btn-sm" style="color: #d97706;" onclick="setVendorStatus('${v.id}', 'suspended')" title="Suspendre l'activité">
                        <i class="fa-solid fa-pause"></i> Suspendre
                       </button>`
                  }
                  <button class="btn btn-secondary btn-sm" onclick="showToast('Ouverture du catalogue de ${v.name}...', 'info'); showPage('products');">
                    <i class="fa-solid fa-eye"></i> Catalogue
                  </button>
                </div>
              </td>
            </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function setVendorStatus(vendorId, newStatus) {
  const vendor = vendorsList.find(v => v.id === vendorId);
  if (!vendor) return;
  vendor.status = newStatus;
  saveData("zm_vendors", vendorsList);
  logActivity(`Statut boutique ${vendor.name} passé à : ${newStatus}`);
  showToast(`Boutique "${vendor.name}" : statut mis à jour (${newStatus}).`, "success");
  adminVendors();
}

function promptAddVendor() {
  const name = prompt("Nom de la nouvelle boutique commerciale :");
  if (!name) return;
  const owner = prompt("Nom complet du gérant / propriétaire :", currentUser ? currentUser.name : "Vendeur RDC");
  const city = prompt("Ville d'implantation (Kinshasa, Lubumbashi, Goma...) :", "Kinshasa");

  const newVendor = {
    id: generateId("VND"),
    name,
    owner: owner || "Commerçant RDC",
    logo: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=120",
    city: city || "Kinshasa",
    category: "Commerce Général",
    productsCount: 1,
    revenue: 0.00,
    status: "certified",
    phone: "+243 81 000 0000"
  };

  vendorsList.unshift(newVendor);
  saveData("zm_vendors", vendorsList);
  logActivity(`Nouvelle boutique agréée : ${name}`);
  showToast(`Boutique "${name}" agréée avec succès !`, "success");
  adminVendors();
}

/**
 * ===================================================================
 * 6. PÔLE 4 : ADMIN PRODUITS (Publications, Catégories, Modération)
 * ===================================================================
 */
function adminProducts() {
  if (!requirePermission("products")) return;
  const content = document.getElementById("adminContent");
  if (!content) return;

  content.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
      <div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="badge" style="background: #10b981; color: #ffffff; font-weight: 800;">PÔLE 4</span>
          <h3 style="font-size: 18px; font-weight: 800; color: #0f172a; margin: 0;">
            Admin Produits & Catalogue (${products.length} articles)
          </h3>
        </div>
        <p style="font-size: 13px; color: #64748b; margin-top: 4px;">
          Modération des annonces, vérification des prix en USD / Francs Congolais et suspension d'articles non conformes.
        </p>
      </div>

      <button class="btn btn-primary btn-sm" onclick="showPage('sell')">
        <i class="fa-solid fa-plus"></i> Nouveau Produit
      </button>
    </div>

    <div class="admin-table-container">
      <table class="modern-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Désignation</th>
            <th>Catégorie</th>
            <th>Ville</th>
            <th>Prix</th>
            <th>Vendeur</th>
            <th>Statut Activité</th>
            <th>Actions Propriétaire</th>
          </tr>
        </thead>
        <tbody>
          ${products.map(p => {
            const isSuspended = p.status === 'suspendu';
            return `
            <tr style="${isSuspended ? 'background: #fffbeb;' : ''}">
              <td>
                <img src="${escapeHTML(p.image || '')}" alt="${escapeHTML(p.name)}" style="width: 44px; height: 44px; object-fit: cover; border-radius: 6px;" onerror="this.src='https://via.placeholder.com/60'">
              </td>
              <td><strong>${escapeHTML(p.name)}</strong></td>
              <td><span class="badge badge-category">${escapeHTML(p.category)}</span></td>
              <td><span class="badge badge-city">${escapeHTML(p.city)}</span></td>
              <td><strong>$${Number(p.price).toFixed(2)}</strong></td>
              <td>${escapeHTML(p.sellerName || 'Inconnu')}</td>
              <td>
                <span class="badge ${isSuspended ? 'badge-warning' : 'badge-success'}">
                  ${isSuspended ? '<i class="fa-solid fa-pause"></i> Suspendu' : '<i class="fa-solid fa-check"></i> Actif en ligne'}
                </span>
              </td>
              <td>
                <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                  ${isSuspended
                    ? `<button class="btn btn-secondary btn-sm" style="color: #16a34a;" onclick="setProductStatus('${p.id}', 'disponible')">
                        <i class="fa-solid fa-play"></i> Réactiver
                       </button>`
                    : `<button class="btn btn-secondary btn-sm" style="color: #d97706;" onclick="setProductStatus('${p.id}', 'suspendu')">
                        <i class="fa-solid fa-pause"></i> Suspendre
                       </button>`
                  }
                  <button class="btn btn-danger btn-sm" onclick="deleteProduct('${p.id}')">
                    <i class="fa-solid fa-trash-can"></i> Supprimer
                  </button>
                </div>
              </td>
            </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function setProductStatus(id, newStatus) {
  const p = products.find(prod => prod.id === id);
  if (!p) return;
  p.status = newStatus;
  saveData("zm_products", products);
  const actionText = newStatus === 'suspendu' ? 'Suspension de l\'activité/produit' : 'Réactivation de l\'activité/produit';
  logActivity(`${actionText} : ${p.name} par le Super-Admin`);
  showToast(`Produit "${p.name}" : ${newStatus === 'suspendu' ? 'Activité suspendue' : 'Activité réactivée en ligne'}.`, "info");
  displayAdmin();
  adminProducts();
}

function deleteProduct(id) {
  if (!confirm("Attention : vous vous apprêtez à supprimer définitivement ce produit du système. Confirmer ?")) return;
  const p = products.find(prod => prod.id === id);
  products = products.filter(prod => prod.id !== id);
  saveData("zm_products", products);
  logActivity(`Suppression définitive du produit : ${p?.name || id} par le Super-Admin`);
  showToast("Produit définitivement supprimé de la marketplace.", "info");
  displayAdmin();
  adminProducts();
}

/**
 * ===================================================================
 * 7. PÔLE 5 : ADMIN COMMANDES (Suivi et Traitement des Commandes)
 * ===================================================================
 */
function adminOrders() {
  if (!requirePermission("orders")) return;
  const content = document.getElementById("adminContent");
  if (!content) return;

  content.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="badge" style="background: #a855f7; color: #ffffff; font-weight: 800;">PÔLE 5</span>
          <h3 style="font-size: 18px; font-weight: 800; color: #0f172a; margin: 0;">
            Admin Commandes Clients (${orders.length})
          </h3>
        </div>
        <p style="font-size: 13px; color: #64748b; margin-top: 4px;">
          Suivi des paniers validés, facturation et dispatch des expéditions en RDC.
        </p>
      </div>
    </div>

    <div class="admin-table-container">
      <table class="modern-table">
        <thead>
          <tr>
            <th>N° Commande</th>
            <th>Client</th>
            <th>Articles</th>
            <th>Montant Total</th>
            <th>Paiement</th>
            <th>Statut Commande</th>
            <th>Date & Heure</th>
            <th>Mettre à Jour</th>
          </tr>
        </thead>
        <tbody>
          ${orders.length === 0 ? '<tr><td colspan="8" style="text-align: center; color: #64748b; padding: 24px;">Aucune commande pour l\'instant.</td></tr>' : ''}
          ${orders.map(o => `
            <tr>
              <td><strong>${escapeHTML(o.id)}</strong></td>
              <td>${escapeHTML(o.customer)}<br><small style="color: #64748b;">${escapeHTML(o.customerCity || 'Kinshasa')}</small></td>
              <td>${o.items ? o.items.length : 1} article(s)</td>
              <td>
                <strong style="color: #0f172a; font-size: 14.5px;">$${Number(o.total).toFixed(2)}</strong>
                <small style="display: block; color: #64748b; font-size: 11px;">≈ ${Math.round(o.total * 2850).toLocaleString('fr-FR')} FC</small>
              </td>
              <td><span class="badge badge-warning">${escapeHTML(o.paymentMethod)}</span></td>
              <td><span class="badge badge-success">${escapeHTML(o.status)}</span></td>
              <td><small>${escapeHTML(o.date)}</small></td>
              <td>
                <select onchange="updateOrderStatus('${o.id}', this.value)" class="filter-select" style="padding: 4px 8px; font-size: 12px;">
                  <option value="Nouvelle" ${o.status === 'Nouvelle' ? 'selected' : ''}>Nouvelle</option>
                  <option value="En traitement" ${o.status === 'En traitement' ? 'selected' : ''}>En traitement</option>
                  <option value="Expédiée" ${o.status === 'Expédiée' ? 'selected' : ''}>Expédiée</option>
                  <option value="Livrée" ${o.status === 'Livrée' ? 'selected' : ''}>Livrée</option>
                  <option value="Annulée" ${o.status === 'Annulée' ? 'selected' : ''}>Annulée</option>
                </select>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function updateOrderStatus(orderId, newStatus) {
  const o = orders.find(ord => ord.id === orderId);
  if (!o) return;
  o.status = newStatus;
  saveData("zm_orders", orders);
  logActivity(`Statut commande ${orderId} passé à : ${newStatus}`);
  showToast(`Commande ${orderId} mise à jour (${newStatus}).`, "success");
}

/**
 * ===================================================================
 * 8. PÔLE 6 : ADMIN FINANCES (Commissions, Transactions, Remboursements)
 * ===================================================================
 */
function adminFinances() {
  if (!requirePermission("payments")) return;
  const content = document.getElementById("adminContent");
  if (!content) return;

  const totalRev = orders.reduce((s, o) => s + Number(o.total), 0);
  const platformCommission = totalRev * 0.05; // 5% commission plateforme
  const vendorsNet = totalRev * 0.95;

  content.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="badge" style="background: #22c55e; color: #ffffff; font-weight: 800;">PÔLE 6</span>
          <h3 style="font-size: 18px; font-weight: 800; color: #0f172a; margin: 0;">
            Admin Finances & Trésorerie
          </h3>
        </div>
        <p style="font-size: 13px; color: #64748b; margin-top: 4px;">
          Commissions Zaïre-Market (5%), reversements marchands et passerelles Mobile Money RDC.
        </p>
      </div>
    </div>

    <!-- 3 Cartes Financières Clés -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 16px; margin-bottom: 24px;">
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px;">
        <span style="font-size: 12.5px; color: #64748b; font-weight: 600;">Chiffre d'Affaires Brut Cumulé</span>
        <h2 style="font-size: 26px; color: #0f172a; margin: 6px 0 2px 0;">$${totalRev.toFixed(2)}</h2>
        <small style="color: #0284c7;">≈ ${Math.round(totalRev * 2850).toLocaleString('fr-FR')} Francs Congolais</small>
      </div>

      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px;">
        <span style="font-size: 12.5px; color: #166534; font-weight: 600;">Commission Plateforme (5% Net)</span>
        <h2 style="font-size: 26px; color: #15803d; margin: 6px 0 2px 0;">$${platformCommission.toFixed(2)}</h2>
        <small style="color: #16a34a;">Bénéfice net direct Zaïre-Market</small>
      </div>

      <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 20px;">
        <span style="font-size: 12.5px; color: #1e40af; font-weight: 600;">Net Reversé aux Vendeurs (95%)</span>
        <h2 style="font-size: 26px; color: #1d4ed8; margin: 6px 0 2px 0;">$${vendorsNet.toFixed(2)}</h2>
        <small style="color: #2563eb;">Payable par Mobile Money / Banque</small>
      </div>
    </div>

    <!-- Passerelles Mobile Money RDC -->
    <h4 style="font-size: 15px; font-weight: 700; color: #0f172a; margin-bottom: 12px;">
      <i class="fa-solid fa-mobile-screen-button"></i> Passerelles de Paiement RDC Actives
    </h4>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-bottom: 24px;">
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; display: flex; align-items: center; gap: 12px;">
        <div style="width: 40px; height: 40px; border-radius: 8px; background: #fee2e2; color: #dc2626; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 800;">M</div>
        <div>
          <strong style="display: block; font-size: 13.5px;">M-Pesa Vodacom</strong>
          <small style="color: #16a34a;"><i class="fa-solid fa-circle-check"></i> Actif & En Ligne</small>
        </div>
      </div>
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; display: flex; align-items: center; gap: 12px;">
        <div style="width: 40px; height: 40px; border-radius: 8px; background: #fee2e2; color: #dc2626; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 800;">A</div>
        <div>
          <strong style="display: block; font-size: 13.5px;">Airtel Money</strong>
          <small style="color: #16a34a;"><i class="fa-solid fa-circle-check"></i> Actif & En Ligne</small>
        </div>
      </div>
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; display: flex; align-items: center; gap: 12px;">
        <div style="width: 40px; height: 40px; border-radius: 8px; background: #ffedd5; color: #ea580c; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 800;">O</div>
        <div>
          <strong style="display: block; font-size: 13.5px;">Orange Money</strong>
          <small style="color: #16a34a;"><i class="fa-solid fa-circle-check"></i> Actif & En Ligne</small>
        </div>
      </div>
    </div>

    <!-- Journal des Transactions Financières -->
    <h4 style="font-size: 15px; font-weight: 700; color: #0f172a; margin-bottom: 12px;">
      <i class="fa-solid fa-receipt"></i> Transactions Récentes & Prélèvement des Commissions
    </h4>
    <div class="admin-table-container">
      <table class="modern-table">
        <thead>
          <tr>
            <th>Commande</th>
            <th>Client</th>
            <th>Mode de Paiement</th>
            <th>Brut Client</th>
            <th>Com. 5% Zaïre-Market</th>
            <th>Net Vendeur</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${orders.length === 0 ? '<tr><td colspan="7" style="text-align: center; color: #64748b;">Aucune transaction enregistrée.</td></tr>' : ''}
          ${orders.map(o => {
            const com = (Number(o.total) * 0.05).toFixed(2);
            const net = (Number(o.total) * 0.95).toFixed(2);
            return `
            <tr>
              <td><strong>${escapeHTML(o.id)}</strong></td>
              <td>${escapeHTML(o.customer)}</td>
              <td><span class="badge badge-warning">${escapeHTML(o.paymentMethod)}</span></td>
              <td><strong>$${Number(o.total).toFixed(2)}</strong></td>
              <td><strong style="color: #16a34a;">+$${com}</strong></td>
              <td>$${net}</td>
              <td>
                <button class="btn btn-secondary btn-sm" onclick="showToast('Reversement vendeur de $${net} validé pour ${o.id}.', 'success')">
                  <i class="fa-solid fa-paper-plane"></i> Reverser
                </button>
              </td>
            </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

/**
 * ===================================================================
 * 9. PÔLE 7 : ADMIN LIVRAISON (Livreurs, Expéditions et Suivi)
 * ===================================================================
 */
function adminDelivery() {
  if (!requirePermission("orders")) return;
  const content = document.getElementById("adminContent");
  if (!content) return;

  content.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
      <div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="badge" style="background: #06b6d4; color: #ffffff; font-weight: 800;">PÔLE 7</span>
          <h3 style="font-size: 18px; font-weight: 800; color: #0f172a; margin: 0;">
            Admin Livraison & Flotte Logistique (${deliveryList.length} colis)
          </h3>
        </div>
        <p style="font-size: 13px; color: #64748b; margin-top: 4px;">
          Expéditions urbaines et interurbaines : Kinshasa, Lubumbashi, Goma, Bukavu, Kisangani, Kolwezi.
        </p>
      </div>

      <button class="btn btn-primary btn-sm" onclick="promptNewShipment()">
        <i class="fa-solid fa-plus"></i> Nouvelle Expédition
      </button>
    </div>

    <div class="admin-table-container">
      <table class="modern-table">
        <thead>
          <tr>
            <th>N° Suivi (Tracking)</th>
            <th>Destinataire</th>
            <th>Ville & Secteur</th>
            <th>Transporteur Attribué</th>
            <th>Statut Logistique</th>
            <th>Date Dispatch</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${deliveryList.map(d => `
            <tr>
              <td><strong style="color: #0284c7;"><i class="fa-solid fa-barcode"></i> ${escapeHTML(d.trackingId)}</strong></td>
              <td><strong>${escapeHTML(d.customer)}</strong></td>
              <td><span class="badge badge-city">${escapeHTML(d.destination)}</span></td>
              <td>${escapeHTML(d.courier)}</td>
              <td>
                <span class="badge ${d.status === 'Livré' ? 'badge-success' : 'badge-warning'}">
                  ${escapeHTML(d.status)}
                </span>
              </td>
              <td><small>${escapeHTML(d.date)}</small></td>
              <td>
                <select onchange="updateDeliveryStatus('${d.trackingId}', this.value)" class="filter-select" style="padding: 4px 8px; font-size: 12px;">
                  <option value="Pris en charge au dépôt" ${d.status === 'Pris en charge au dépôt' ? 'selected' : ''}>Dépôt</option>
                  <option value="En transit interurbain" ${d.status === 'En transit interurbain' ? 'selected' : ''}>En transit</option>
                  <option value="En cours de livraison" ${d.status === 'En cours de livraison' ? 'selected' : ''}>En cours</option>
                  <option value="Livré" ${d.status === 'Livré' ? 'selected' : ''}>Livré</option>
                </select>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function updateDeliveryStatus(trackingId, newStatus) {
  const d = deliveryList.find(item => item.trackingId === trackingId);
  if (!d) return;
  d.status = newStatus;
  saveData("zm_deliveries", deliveryList);
  logActivity(`Statut livraison colis ${trackingId} mis à jour : ${newStatus}`);
  showToast(`Colis ${trackingId} : statut passé à "${newStatus}".`, "success");
}

function promptNewShipment() {
  const customer = prompt("Nom du client destinataire :");
  if (!customer) return;
  const destination = prompt("Ville et quartier de destination (ex: Kinshasa Gombe, Lubumbashi Golf...) :", "Kinshasa");
  const courier = prompt("Transporteur (Kinshasa Moto Express, Katanga Cargo, Kivu Rapide...) :", "Kinshasa Moto Express");

  const newShipment = {
    trackingId: "ZM-EXP-" + Math.floor(1000 + Math.random() * 9000),
    customer,
    destination: destination || "Kinshasa",
    courier: courier || "Kinshasa Moto Express",
    status: "Pris en charge au dépôt",
    date: new Date().toLocaleString("fr-FR")
  };

  deliveryList.unshift(newShipment);
  saveData("zm_deliveries", deliveryList);
  logActivity(`Nouvelle expédition créée : ${newShipment.trackingId}`);
  showToast(`Colis ${newShipment.trackingId} enregistré avec succès !`, "success");
  adminDelivery();
}

/**
 * ===================================================================
 * 10. PÔLE 8 : ADMIN COMMUNICATION (Messages, Assistance et Réclamations)
 * ===================================================================
 */
function adminCommunication() {
  if (!requirePermission("support")) return;
  const content = document.getElementById("adminContent");
  if (!content) return;

  content.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
      <div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="badge" style="background: #ec4899; color: #ffffff; font-weight: 800;">PÔLE 8</span>
          <h3 style="font-size: 18px; font-weight: 800; color: #0f172a; margin: 0;">
            Admin Communication, Support & Réclamations
          </h3>
        </div>
        <p style="font-size: 13px; color: #64748b; margin-top: 4px;">
          Traitement des demandes d'aide, litiges et diffusion d'annonces officielles aux utilisateurs.
        </p>
      </div>

      <button class="btn btn-primary btn-sm" onclick="promptBroadcastMessage()">
        <i class="fa-solid fa-bullhorn"></i> Diffuser un Message Flash
      </button>
    </div>

    <!-- Tableau des Tickets de Support -->
    <h4 style="font-size: 15px; font-weight: 700; color: #0f172a; margin-bottom: 12px;">
      <i class="fa-solid fa-ticket"></i> Tickets & Réclamations Clients / Vendeurs (${supportTickets.length})
    </h4>
    <div class="admin-table-container" style="margin-bottom: 24px;">
      <table class="modern-table">
        <thead>
          <tr>
            <th>N° Ticket</th>
            <th>Auteur</th>
            <th>Objet / Motif</th>
            <th>Priorité</th>
            <th>Statut</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${supportTickets.map(t => `
            <tr>
              <td><strong>${escapeHTML(t.id)}</strong></td>
              <td>${escapeHTML(t.author)}</td>
              <td>${escapeHTML(t.subject)}</td>
              <td><span class="badge ${t.priority === 'Haute' ? 'badge-danger' : 'badge-warning'}">${escapeHTML(t.priority)}</span></td>
              <td><span class="badge ${t.status === 'Résolu' ? 'badge-success' : 'badge-category'}">${escapeHTML(t.status)}</span></td>
              <td><small>${escapeHTML(t.date)}</small></td>
              <td>
                <button class="btn btn-secondary btn-sm" onclick="resolveTicket('${t.id}')">
                  <i class="fa-solid fa-check"></i> Résoudre
                </button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function resolveTicket(ticketId) {
  const t = supportTickets.find(item => item.id === ticketId);
  if (!t) return;
  t.status = "Résolu";
  saveData("zm_support_tickets", supportTickets);
  logActivity(`Ticket de réclamation ${ticketId} résolu par le Super-Admin`);
  showToast(`Ticket ${ticketId} marqué comme résolu !`, "success");
  adminCommunication();
}

function promptBroadcastMessage() {
  const message = prompt("Entrez le message officiel à diffuser à tous les utilisateurs du Zaïre-Market :");
  if (!message) return;
  logActivity(`Diffusion générale d'annonce : "${message}"`);
  showToast(`Annonce officielle diffusée : "${message}"`, "success");
}

/**
 * ===================================================================
 * 11. PÔLE 9 : ADMIN SÉCURITÉ (Fraudes, Signalements et Contrôle)
 * ===================================================================
 */
function adminSecurity() {
  if (!requirePermission("logs")) return;
  const content = document.getElementById("adminContent");
  if (!content) return;

  content.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="badge" style="background: #ef4444; color: #ffffff; font-weight: 800;">PÔLE 9</span>
          <h3 style="font-size: 18px; font-weight: 800; color: #0f172a; margin: 0;">
            Admin Sécurité, Lutte Anti-Fraude & Audit
          </h3>
        </div>
        <p style="font-size: 13px; color: #64748b; margin-top: 4px;">
          Bouclier de sécurité du Zaïre-Market : surveillance des IP, détection des abus et intégrité des transactions.
        </p>
      </div>
    </div>

    <!-- Indicateurs de Sécurité -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 16px; margin-bottom: 24px;">
      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 18px;">
        <span style="font-size: 12px; color: #166534; font-weight: 700;">ÉTAT DU SYSTÈME</span>
        <h3 style="font-size: 18px; color: #15803d; margin: 4px 0;"><i class="fa-solid fa-shield-halved"></i> Protection Optimale</h3>
        <small style="color: #16a34a;">0 faille détectée • Pare-feu actif</small>
      </div>

      <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 10px; padding: 18px;">
        <span style="font-size: 12px; color: #991b1b; font-weight: 700;">TENTATIVES BLOQUÉES</span>
        <h3 style="font-size: 18px; color: #b91c1c; margin: 4px 0;"><i class="fa-solid fa-user-xmark"></i> 3 IP Suspectes</h3>
        <small style="color: #dc2626;">Adresses mises en quarantaine</small>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px;">
        <span style="font-size: 12px; color: #475569; font-weight: 700;">CHIFFREMENT DU CODE</span>
        <h3 style="font-size: 18px; color: #0f172a; margin: 4px 0;"><i class="fa-solid fa-lock"></i> SSL / HTTPS 256-bit</h3>
        <small style="color: #64748b;">Données clients protégées</small>
      </div>
    </div>

    <!-- Alertes Récentes de Sécurité -->
    <h4 style="font-size: 15px; font-weight: 700; color: #0f172a; margin-bottom: 12px;">
      <i class="fa-solid fa-triangle-exclamation"></i> Journal des Événements de Sécurité
    </h4>
    <div class="admin-table-container">
      <table class="modern-table">
        <thead>
          <tr>
            <th>Date & Heure</th>
            <th>Type d'Événement</th>
            <th>Adresse IP Source</th>
            <th>Niveau de Risque</th>
            <th>Action Souveraine</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10/11/2026 14:45</td>
            <td>Connexion réussie du Super-Administrateur</td>
            <td>197.157.214.12 (Kinshasa)</td>
            <td><span class="badge badge-success">Sûr</span></td>
            <td><span style="color: #16a34a; font-size: 12px;"><i class="fa-solid fa-check"></i> Autorisé</span></td>
          </tr>
          <tr>
            <td>10/11/2026 11:20</td>
            <td>Tentative d'accès avec mot de passe erroné</td>
            <td>41.243.12.89 (Lubumbashi)</td>
            <td><span class="badge badge-warning">Moyen</span></td>
            <td>
              <button class="btn btn-secondary btn-sm" onclick="showToast('IP 41.243.12.89 mise sur liste noire.', 'info')">
                <i class="fa-solid fa-ban"></i> Bannir IP
              </button>
            </td>
          </tr>
          <tr>
            <td>09/11/2026 19:12</td>
            <td>Validation paiement Mobile Money Vodacom</td>
            <td>105.101.44.3 (Goma)</td>
            <td><span class="badge badge-success">Vérifié</span></td>
            <td><span style="color: #16a34a; font-size: 12px;"><i class="fa-solid fa-check"></i> Conforme</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

/**
 * ===================================================================
 * 12. PÔLE 10 : ADMIN MARKETING (Publicités, Promotions et Campagnes)
 * ===================================================================
 */
function adminMarketing() {
  if (!requirePermission("reports")) return;
  const content = document.getElementById("adminContent");
  if (!content) return;

  content.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
      <div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="badge" style="background: #f97316; color: #ffffff; font-weight: 800;">PÔLE 10</span>
          <h3 style="font-size: 18px; font-weight: 800; color: #0f172a; margin: 0;">
            Admin Marketing & Campagnes Promotionnelles
          </h3>
        </div>
        <p style="font-size: 13px; color: #64748b; margin-top: 4px;">
          Gestion des codes de réduction, bannières sponsorisées et opérations spéciales en RDC.
        </p>
      </div>

      <button class="btn btn-primary btn-sm" onclick="promptAddPromoCode()">
        <i class="fa-solid fa-plus"></i> Créer un Code Promo
      </button>
    </div>

    <!-- Tableau des Codes Promotionnels -->
    <h4 style="font-size: 15px; font-weight: 700; color: #0f172a; margin-bottom: 12px;">
      <i class="fa-solid fa-tags"></i> Codes Promo Actifs (${promoCodes.length})
    </h4>
    <div class="admin-table-container" style="margin-bottom: 24px;">
      <table class="modern-table">
        <thead>
          <tr>
            <th>Code Promo</th>
            <th>Réduction</th>
            <th>Utilisations</th>
            <th>Date Limite</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${promoCodes.map(pc => `
            <tr>
              <td><strong style="color: #0284c7; font-size: 14px; letter-spacing: 0.5px;">${escapeHTML(pc.code)}</strong></td>
              <td><strong>${escapeHTML(pc.discount)}</strong></td>
              <td>${pc.uses} clients</td>
              <td>${escapeHTML(pc.expiry)}</td>
              <td><span class="badge ${pc.status === 'Actif' ? 'badge-success' : 'badge-danger'}">${escapeHTML(pc.status)}</span></td>
              <td>
                <button class="btn btn-secondary btn-sm" onclick="togglePromoStatus('${pc.code}')">
                  ${pc.status === 'Actif' ? '<i class="fa-solid fa-pause"></i> Désactiver' : '<i class="fa-solid fa-play"></i> Réactiver'}
                </button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function promptAddPromoCode() {
  const code = prompt("Code promo (ex: SOLDESKINSHASA) :")?.toUpperCase();
  if (!code) return;
  const discount = prompt("Taux de réduction (ex: 10% ou 20%) :", "10%");

  promoCodes.unshift({
    code,
    discount: discount || "10%",
    status: "Actif",
    uses: 0,
    expiry: "31/12/2026"
  });

  saveData("zm_promo_codes", promoCodes);
  logActivity(`Création nouveau code promo : ${code} (${discount})`);
  showToast(`Code promo "${code}" créé avec succès !`, "success");
  adminMarketing();
}

function togglePromoStatus(code) {
  const pc = promoCodes.find(p => p.code === code);
  if (!pc) return;
  pc.status = pc.status === 'Actif' ? 'Inactif' : 'Actif';
  saveData("zm_promo_codes", promoCodes);
  showToast(`Code promo ${code} : statut mis à jour (${pc.status}).`, "info");
  adminMarketing();
}

/**
 * ===================================================================
 * 13. PÔLE 11 : ADMIN STATISTIQUES (Rapports, Performances et Données)
 * ===================================================================
 */
function adminStatistics() {
  if (!requirePermission("statistics")) return;
  const content = document.getElementById("adminContent");
  if (!content) return;

  const totalRev = orders.reduce((s, o) => s + Number(o.total), 0);

  content.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="badge" style="background: #eab308; color: #0f172a; font-weight: 800;">PÔLE 11</span>
          <h3 style="font-size: 18px; font-weight: 800; color: #0f172a; margin: 0;">
            Admin Statistiques, Rapports & Données Analytiques
          </h3>
        </div>
        <p style="font-size: 13px; color: #64748b; margin-top: 4px;">
          Mesure de croissance, conversion, portée géographique provinciale et performances de la marketplace.
        </p>
      </div>

      <button class="btn btn-secondary btn-sm" onclick="exportAdminReport()">
        <i class="fa-solid fa-file-export"></i> Exporter Rapport Global
      </button>
    </div>

    <!-- Synthèse Chiffrée -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 24px;">
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px;">
        <span style="font-size: 12.5px; color: #64748b;">Volume Total Traité</span>
        <h2 style="font-size: 24px; color: #0284c7; margin: 4px 0;">$${totalRev.toFixed(2)}</h2>
        <small style="color: #64748b;">Période en cours</small>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px;">
        <span style="font-size: 12.5px; color: #64748b;">Panier Moyen Client</span>
        <h2 style="font-size: 24px; color: #10b981; margin: 4px 0;">$${orders.length > 0 ? (totalRev / orders.length).toFixed(2) : '0.00'}</h2>
        <small style="color: #64748b;">Par transaction validée</small>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px;">
        <span style="font-size: 12.5px; color: #64748b;">Total Utilisateurs Enregistrés</span>
        <h2 style="font-size: 24px; color: #8b5cf6; margin: 4px 0;">${users.length}</h2>
        <small style="color: #64748b;">Acheteurs & Vendeurs RDC</small>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 18px;">
        <span style="font-size: 12.5px; color: #64748b;">Articles Actifs en Ligne</span>
        <h2 style="font-size: 24px; color: #f59e0b; margin: 4px 0;">${products.length}</h2>
        <small style="color: #64748b;">Dans 28 catégories</small>
      </div>
    </div>

    <!-- Répartition Géographique Provinciale -->
    <h4 style="font-size: 15px; font-weight: 700; color: #0f172a; margin-bottom: 12px;">
      <i class="fa-solid fa-map-location-dot"></i> Répartition des Ventes par Province en RDC
    </h4>
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
      <div style="margin-bottom: 14px;">
        <div style="display: flex; justify-content: space-between; font-size: 13.5px; margin-bottom: 4px;">
          <strong>Kinshasa (Capitale)</strong>
          <span>48% des volumes</span>
        </div>
        <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
          <div style="width: 48%; height: 100%; background: #0284c7; border-radius: 4px;"></div>
        </div>
      </div>

      <div style="margin-bottom: 14px;">
        <div style="display: flex; justify-content: space-between; font-size: 13.5px; margin-bottom: 4px;">
          <strong>Haut-Katanga (Lubumbashi, Likasi, Kolwezi)</strong>
          <span>28% des volumes</span>
        </div>
        <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
          <div style="width: 28%; height: 100%; background: #10b981; border-radius: 4px;"></div>
        </div>
      </div>

      <div style="margin-bottom: 14px;">
        <div style="display: flex; justify-content: space-between; font-size: 13.5px; margin-bottom: 4px;">
          <strong>Nord-Kivu & Sud-Kivu (Goma, Bukavu)</strong>
          <span>16% des volumes</span>
        </div>
        <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
          <div style="width: 16%; height: 100%; background: #f59e0b; border-radius: 4px;"></div>
        </div>
      </div>

      <div>
        <div style="display: flex; justify-content: space-between; font-size: 13.5px; margin-bottom: 4px;">
          <strong>Autres Provinces (Kongo-Central, Tshopo, Kasaï...)</strong>
          <span>8% des volumes</span>
        </div>
        <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
          <div style="width: 8%; height: 100%; background: #8b5cf6; border-radius: 4px;"></div>
        </div>
      </div>
    </div>
  `;
}

function exportAdminReport() {
  const totalRev = orders.reduce((s, o) => s + Number(o.total), 0);
  const data = {
    plateforme: "Zaïre-Market",
    fondateur: "Super-Administrateur",
    dateExport: new Date().toLocaleString("fr-FR"),
    statistiques: {
      chiffreAffairesTotalUSD: totalRev,
      chiffreAffairesTotalCDF: Math.round(totalRev * 2850),
      nombreCommandes: orders.length,
      nombreUtilisateurs: users.length,
      nombreProduits: products.length,
      nombreBoutiques: vendorsList.length
    }
  };

  const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
  const a = document.createElement("a");
  a.setAttribute("href", jsonStr);
  a.setAttribute("download", `Zaire_Market_Rapport_${Date.now()}.json`);
  document.body.appendChild(a);
  a.click();
  a.remove();
  showToast("Rapport analytique exporté avec succès !", "success");
}

/**
 * ===================================================================
 * 14. Gestion des Administrateurs Délégués (Super Admin Uniquement)
 * ===================================================================
 */
function adminAdministrators() {
  if (currentUser.role !== "super_admin") {
    showToast("Seul le Super Administrateur peut gérer les accès.", "error");
    return;
  }
  document.querySelectorAll(".admin-tab-btn").forEach(btn => btn.classList.remove("active"));
  document.getElementById("tabAdminManagement")?.classList.add("active");
  const content = document.getElementById("adminContent");
  if (!content) return;

  const permissionCheckboxes = Object.entries(PERMISSIONS).map(([key, label]) => `
    <label class="perm-label-check">
      <input type="checkbox" value="${key}" class="adminPermCheck" checked>
      <span>${label}</span>
    </label>
  `).join("");

  content.innerHTML = `
    <h3 style="font-size: 17px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">
      Créer un Nouvel Administrateur Délégué
    </h3>

    <form onsubmit="handleCreateAdmin(event)" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; margin-bottom: 24px;">
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;">
        <div>
          <label style="font-size: 12.5px; font-weight: 600; display: block; margin-bottom: 4px;">Nom de l'Admin</label>
          <input id="newAdminName" class="form-control" placeholder="Ex: Patrick Kalombo" required>
        </div>
        <div>
          <label style="font-size: 12.5px; font-weight: 600; display: block; margin-bottom: 4px;">Adresse Email</label>
          <input id="newAdminEmail" type="email" class="form-control" placeholder="patrick@zaire-market.cd" required>
        </div>
        <div>
          <label style="font-size: 12.5px; font-weight: 600; display: block; margin-bottom: 4px;">Mot de passe</label>
          <input id="newAdminPass" type="password" class="form-control" placeholder="••••••••" required>
        </div>
      </div>

      <div style="margin-top: 16px;">
        <label style="font-size: 13px; font-weight: 700; display: block; margin-bottom: 8px;">Permissions attribuées :</label>
        <div class="permissions-grid-check">
          ${permissionCheckboxes}
        </div>
      </div>

      <button type="submit" class="btn btn-primary" style="margin-top: 12px;">
        <i class="fa-solid fa-user-shield"></i> Enregistrer l'administrateur
      </button>
    </form>

    <h3 style="font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 14px;">
      Administrateurs Existants (${administrators.length})
    </h3>

    <div class="admin-table-container">
      <table class="modern-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Permissions</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${administrators.length === 0 ? '<tr><td colspan="5" style="text-align: center; color: #64748b;">Aucun administrateur délégué créé pour l\'instant.</td></tr>' : ''}
          ${administrators.map(a => `
            <tr>
              <td><strong>${escapeHTML(a.name)}</strong></td>
              <td>${escapeHTML(a.email)}</td>
              <td><span class="badge badge-category">${(a.permissions || []).length} permission(s)</span></td>
              <td><span class="badge ${a.status === 'blocked' ? 'badge-danger' : 'badge-success'}">${a.status}</span></td>
              <td>
                <button class="btn btn-danger btn-sm" onclick="handleDeleteAdmin('${a.id}')">
                  <i class="fa-solid fa-trash-can"></i> Supprimer
                </button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function handleCreateAdmin(event) {
  event.preventDefault();
  if (currentUser.role !== "super_admin") return;

  const name = document.getElementById("newAdminName").value.trim();
  const email = document.getElementById("newAdminEmail").value.trim().toLowerCase();
  const password = document.getElementById("newAdminPass").value;

  if (administrators.some(a => a.email === email)) {
    showToast("Cet administrateur existe déjà.", "error");
    return;
  }

  const selectedPerms = [...document.querySelectorAll(".adminPermCheck:checked")].map(i => i.value);

  const newAdmin = {
    id: generateId("ADMIN"),
    name,
    email,
    password,
    role: "admin",
    permissions: selectedPerms,
    status: "active",
    createdAt: new Date().toLocaleString("fr-FR")
  };

  administrators.push(newAdmin);
  saveData("zm_administrators", administrators);
  logActivity(`Création administrateur délégué : ${email}`);
  showToast("Administrateur créé avec succès !", "success");
  adminAdministrators();
}

function handleDeleteAdmin(id) {
  if (currentUser.role !== "super_admin") return;
  if (!confirm("Voulez-vous révoquer cet administrateur ?")) return;

  administrators = administrators.filter(a => a.id !== id);
  saveData("zm_administrators", administrators);
  logActivity(`Révocation administrateur ID : ${id}`);
  showToast("Administrateur supprimé.", "info");
  adminAdministrators();
}

/**
 * ===================================================================
 * 15. Journal d'Activité Système
 * ===================================================================
 */
function adminLogs() {
  if (!requirePermission("logs")) return;
  document.querySelectorAll(".admin-tab-btn").forEach(btn => btn.classList.remove("active"));
  document.getElementById("tabBtnAdminLogs")?.classList.add("active");
  const content = document.getElementById("adminContent");
  if (!content) return;

  content.innerHTML = `
    <h3 style="font-size: 17px; font-weight: 700; color: #0f172a; margin-bottom: 16px;">
      Journal d'Activité Système (${activityLogs.length})
    </h3>

    <div class="admin-table-container">
      <table class="modern-table">
        <thead>
          <tr>
            <th>Date & Heure</th>
            <th>Auteur</th>
            <th>Action Enregistrée</th>
          </tr>
        </thead>
        <tbody>
          ${activityLogs.map(l => `
            <tr>
              <td><small style="color: #64748b;">${escapeHTML(l.date)}</small></td>
              <td><strong>${escapeHTML(l.user)}</strong></td>
              <td>${escapeHTML(l.action)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}
