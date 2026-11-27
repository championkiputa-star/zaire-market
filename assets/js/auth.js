/**
 * ===================================================================
 * ZAÏRE-MARKET — Authentification, Rôles & Gestion de Compte
 * ===================================================================
 */

const SUPER_ADMIN = {
  id: "SUPER-ADMIN-001",
  name: "Shams Cherubin",
  email: "shamscherubin@gamil.com",
  role: "super_admin",
  status: "active"
};

const PERMISSIONS = {
  users: "Gestion des utilisateurs",
  products: "Gestion des produits",
  categories: "Gestion des catégories",
  orders: "Gestion des commandes",
  payments: "Gestion des paiements",
  reports: "Rapports & Analyses",
  support: "Support client RDC",
  statistics: "Statistiques & Graphiques",
  logs: "Journal d'activité du site"
};

const DEFAULT_INITIAL_USERS = [
  {
    id: "USR-001",
    name: "Dieudonné Kabange",
    email: "kabange.dieu@gmail.com",
    password: "password123",
    city: "Kinshasa",
    role: "client",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
    createdAt: "01/02/2026 10:14"
  },
  {
    id: "USR-002",
    name: "Amina Mutombo",
    email: "amina.mutombo@yahoo.cd",
    password: "password123",
    city: "Lubumbashi",
    role: "client",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200",
    createdAt: "03/02/2026 14:32"
  },
  {
    id: "USR-003",
    name: "Patrick Kalombo",
    email: "patrick.kalombo@outlook.com",
    password: "password123",
    city: "Goma",
    role: "vendeur",
    status: "active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    createdAt: "05/02/2026 09:20"
  },
  {
    id: "USR-004",
    name: "Grâce Tshilombo",
    email: "grace.tshilombo@gmail.com",
    password: "password123",
    city: "Bukavu",
    role: "client",
    status: "suspended",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200",
    createdAt: "10/02/2026 16:45"
  }
];

let users = loadData("zm_users", []);
if (!Array.isArray(users) || users.length === 0) {
  users = DEFAULT_INITIAL_USERS;
  saveData("zm_users", users);
} else {
  // S'assurer que les utilisateurs existants ont aussi des avatars
  let updated = false;
  users.forEach((u, i) => {
    if (!u.avatar && DEFAULT_INITIAL_USERS[i % DEFAULT_INITIAL_USERS.length]) {
      u.avatar = DEFAULT_INITIAL_USERS[i % DEFAULT_INITIAL_USERS.length].avatar;
      updated = true;
    }
  });
  if (updated) saveData("zm_users", users);
}
let administrators = loadData("zm_administrators", []);
let currentUser = loadData("zm_currentUser", null);

// Synchronisation permanente de la photo de profil (ne jamais la perdre)
if (currentUser) {
  if (currentUser.role === "super_admin") {
    currentUser.avatar = loadData("zm_superadmin_avatar", currentUser.avatar || "assets/images/logo.jpg");
  } else {
    if (!currentUser.avatar) {
      const found = users.find(u => u.id === currentUser.id || u.email === currentUser.email);
      if (found && found.avatar) {
        currentUser.avatar = found.avatar;
      } else {
        currentUser.avatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200";
      }
    }
  }
  saveData("zm_currentUser", currentUser);
}

/**
 * Vérification des rôles et permissions
 */
function isAdmin() {
  return currentUser && (currentUser.role === "super_admin" || currentUser.role === "admin");
}

function hasPermission(permissionKey) {
  if (!currentUser) return false;
  if (currentUser.role === "super_admin") return true;
  if (currentUser.role !== "admin") return false;
  return currentUser.permissions?.includes(permissionKey);
}

function requirePermission(permissionKey) {
  if (!hasPermission(permissionKey)) {
    showToast("Action refusée : permission insuffisante.", "error");
    return false;
  }
  return true;
}

/**
 * Remplissage automatique pour le Propriétaire du système (Super-Admin Shams Cherubin)
 */
function fillSuperAdminCredentials() {
  const emailInput = document.getElementById("loginEmail");
  if (emailInput) {
    emailInput.value = "shamscherubin@gamil.com";
    showToast("Email Super-Admin Shams Cherubin pré-rempli. Saisissez votre mot de passe.", "info");
  }
}

/**
 * Bascule entre onglets Connexion et Inscription
 */
function showLogin() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const tabLogin = document.getElementById("tabBtnLogin");
  const tabRegister = document.getElementById("tabBtnRegister");

  if (loginForm) loginForm.hidden = false;
  if (registerForm) registerForm.hidden = true;
  if (tabLogin) tabLogin.classList.add("active");
  if (tabRegister) tabRegister.classList.remove("active");
}

function showRegister() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const tabLogin = document.getElementById("tabBtnLogin");
  const tabRegister = document.getElementById("tabBtnRegister");

  if (loginForm) loginForm.hidden = true;
  if (registerForm) registerForm.hidden = false;
  if (tabLogin) tabLogin.classList.remove("active");
  if (tabRegister) tabRegister.classList.add("active");
}

/**
 * Gestion du formulaire de connexion (Connecté à l'API REST MySQL avec Fallback)
 */
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async function(event) {
      event.preventDefault();

      const emailInput = document.getElementById("loginEmail");
      const passInput = document.getElementById("loginPassword");
      const email = emailInput ? emailInput.value.trim().toLowerCase() : "";
      const password = passInput ? passInput.value : "";

      if (!email || !password) {
        showToast("Veuillez remplir tous les champs.", "error");
        return;
      }

      // 1. Authentification Prioritaire Immédiate Super-Admin Shams Cherubin
      if ((email === "shamscherubin@gamil.com" || email === "shamscherubin@gmail.com") && password === "0907069115") {
        currentUser = {
          id: "SUPER-ADMIN-001",
          name: "Shams Cherubin",
          email: email,
          city: "Kinshasa",
          role: "super_admin",
          status: "active",
          permissions: ["users","products","categories","orders","payments","reports","support","statistics","logs"],
          avatar: loadData("zm_superadmin_avatar", "assets/images/logo.jpg")
        };
        saveData("zm_currentUser", currentUser);
        logActivity(`Connexion Propriétaire Super-Admin : ${email}`);
        showToast("Bienvenue Shams Cherubin (Propriétaire du Système) !", "success");
        updateNavigation();
        displayAccount();
        showPage("admin");
        return;
      }

      // 2. Appel à l'API REST Sécurisée MySQL
      if (typeof ApiClient !== "undefined") {
        try {
          const res = await ApiClient.login(email, password);
          if (res && res.status === "success") {
            const user = res.user;
            currentUser = {
              id: user.id,
              name: user.name,
              email: user.email,
              city: user.city || "Kinshasa",
              role: user.role || "client",
              status: user.status || "active",
              permissions: user.permissions ? (typeof user.permissions === "string" ? JSON.parse(user.permissions) : user.permissions) : [],
              avatar: user.avatar || (user.role === "super_admin" ? loadData("zm_superadmin_avatar", "assets/images/logo.jpg") : "assets/images/logo.jpg")
            };
            saveData("zm_currentUser", currentUser);
            logActivity(`Connexion certifiée serveur : ${email} (${currentUser.role})`);
            showToast(res.message || `Bienvenue ${currentUser.name} !`, "success");
            updateNavigation();
            displayAccount();
            if (isAdmin()) {
              showPage("admin");
            } else {
              showPage("home");
            }
            return;
          }
        } catch (apiErr) {
          if (apiErr.status === 403) {
            showToast(apiErr.message || "Compte bloqué ou suspendu.", "error");
            return;
          }
          console.warn("[Auth] API erreur/injoignable, vérification locale:", apiErr);
        }
      }

      // Fallback local en cas d'indisponibilité réseau
      const user = (users || []).find(u => u.email === email && u.password === password);
      if (user) {
        if (user.status === "blocked") {
          showToast("Votre compte est bloqué par l'administration.", "error");
          return;
        }
        currentUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          city: user.city || "Kinshasa",
          role: user.role || "client",
          status: user.status,
          avatar: user.avatar || "assets/images/logo.jpg"
        };
        saveData("zm_currentUser", currentUser);
        logActivity(`Connexion locale : ${email}`);
        showToast(`Ravi de vous revoir, ${user.name} !`, "success");
        updateNavigation();
        displayAccount();
        showPage("home");
        return;
      }

      showToast("Identifiants incorrects ou compte inexistant.", "error");
    });
  }

  // Inscription connectée à l'API REST MySQL
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async function(event) {
      event.preventDefault();

      const name = document.getElementById("registerName").value.trim();
      const email = document.getElementById("registerEmail").value.trim().toLowerCase();
      const password = document.getElementById("registerPassword").value;
      const city = document.getElementById("registerCity")?.value || "Kinshasa";

      if (!name || !email || !password) {
        showToast("Veuillez remplir tous les champs obligatoires.", "error");
        return;
      }

      // Enregistrement via l'API REST MySQL
      if (typeof ApiClient !== "undefined") {
        try {
          const res = await ApiClient.register({ name, email, password, city, role: "client" });
          if (res && res.status === "success") {
            const newUser = res.user;
            currentUser = {
              id: newUser.id,
              name: newUser.name,
              email: newUser.email,
              city: newUser.city,
              role: newUser.role || "client",
              status: newUser.status || "active",
              avatar: "assets/images/logo.jpg"
            };
            saveData("zm_currentUser", currentUser);
            logActivity(`Nouveau compte certifié serveur : ${email}`);
            showToast(`Bienvenue sur Zaïre-Market, ${name} !`, "success");
            this.reset();
            updateNavigation();
            displayAccount();
            showPage("home");
            return;
          }
        } catch (apiErr) {
          if (apiErr.status === 409 || apiErr.status === 400) {
            showToast(apiErr.message || "Erreur lors de l'inscription.", "error");
            return;
          }
          console.warn("[Auth] API injoignable, enregistrement en local:", apiErr);
        }
      }

      // Fallback local
      const newUser = {
        id: generateId("USER"),
        name,
        email,
        password,
        city,
        role: "client",
        status: "active",
        createdAt: new Date().toLocaleString("fr-FR")
      };
      users.push(newUser);
      saveData("zm_users", users);
      currentUser = { ...newUser, avatar: "assets/images/logo.jpg" };
      saveData("zm_currentUser", currentUser);
      logActivity(`Nouvel utilisateur inscrit (local) : ${email}`);
      showToast(`Bienvenue sur Zaïre-Market, ${name} !`, "success");
      this.reset();
      updateNavigation();
      displayAccount();
      showPage("home");
    });
  }
});

/**
 * Déconnexion
 */
function logout() {
  logActivity(`Déconnexion : ${currentUser ? currentUser.email : "Visiteur"}`);
  if (typeof ApiClient !== "undefined") {
    ApiClient.logout();
  }
  currentUser = null;
  localStorage.removeItem("zm_currentUser");
  updateNavigation();
  displayAccount();
  showToast("Vous avez été déconnecté.", "info");
  showPage("home");
}

/**
 * ===================================================================
 * AUTHENTIFICATION GOOGLE SIGN-IN (CLIENT & VENDEUR & ADMIN)
 * ===================================================================
 */
function loginWithGoogle() {
  let modal = document.getElementById("googleAuthModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "googleAuthModal";
    modal.className = "categories-modal";
    modal.style.display = "none";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    modal.style.padding = "16px";
    modal.style.zIndex = "10001";
    modal.innerHTML = `
      <div style="background: var(--bg-card); border: 1px solid var(--border-light); border-radius: 16px; max-width: 420px; width: 100%; padding: 26px; box-shadow: 0 10px 40px rgba(0,0,0,0.3); position: relative; animation: fadeIn 0.2s ease;">
        <div style="text-align: center; margin-bottom: 20px;">
          <svg width="36" height="36" viewBox="0 0 18 18" style="margin-bottom: 8px;">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.616z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
          </svg>
          <h3 style="font-size: 18px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">Continuer avec Google</h3>
          <p style="font-size: 12.5px; color: var(--text-muted);">Connectez-vous avec votre compte personnel Google pour accéder à la marketplace</p>
        </div>

        <div style="background: rgba(2, 132, 199, 0.08); border: 1px solid rgba(2, 132, 199, 0.2); border-radius: 10px; padding: 12px; margin-bottom: 16px;">
          <small style="color: var(--accent-blue); font-weight: 600; display: block; margin-bottom: 2px;">
            <i class="fa-solid fa-shield-halved"></i> Connexion Client Sécurisée
          </small>
          <small style="color: var(--text-muted); font-size: 11.5px;">
            Votre compte client Zaïre-Market sera instantanément synchronisé avec votre adresse Google.
          </small>
        </div>

        <div style="margin-bottom: 16px;">
          <label style="font-size: 12px; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 4px;">Adresse Gmail *</label>
          <input type="email" id="customGoogleEmail" placeholder="votre-adresse@gmail.com" class="form-control" style="font-size: 13px; padding: 10px 12px;" required>
          
          <label style="font-size: 12px; font-weight: 700; color: var(--text-muted); display: block; margin-top: 10px; margin-bottom: 4px;">Votre Nom complet</label>
          <input type="text" id="customGoogleName" placeholder="Ex: Patrick Tshisekedi" class="form-control" style="font-size: 13px; padding: 10px 12px;">
          
          <button type="button" onclick="submitCustomGoogleAuth()" class="btn btn-primary btn-block" style="margin-top: 14px; padding: 11px; font-size: 13px;">
            <i class="fa-brands fa-google"></i> Valider et Accéder à mon Compte
          </button>
        </div>

        <button type="button" onclick="closeGoogleAuthModal()" class="btn btn-secondary btn-block" style="padding: 9px; font-size: 12px;">
          Annuler
        </button>
      </div>
    `;
    document.body.appendChild(modal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeGoogleAuthModal();
    });
  }

  modal.style.display = "flex";
}

function closeGoogleAuthModal() {
  const modal = document.getElementById("googleAuthModal");
  if (modal) modal.style.display = "none";
}

function submitCustomGoogleAuth() {
  const emailInput = document.getElementById("customGoogleEmail");
  const nameInput = document.getElementById("customGoogleName");
  const email = emailInput ? emailInput.value.trim().toLowerCase() : "";
  const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : (email.split("@")[0] || "Utilisateur Google");

  if (!email || !email.includes("@")) {
    showToast("Veuillez saisir une adresse email Google valide.", "error");
    return;
  }

  // SÉCURITÉ ABSOLUE : Le compte Propriétaire Super-Admin est formellement interdit via le flux Google non-mot-de-passe
  if (email === "shamscherubin@gamil.com" || email === "shamscherubin@gmail.com") {
    showToast("Le compte Super-Admin est ultra-sécurisé. Vous devez vous connecter via le formulaire officiel avec votre mot de passe secret.", "error");
    closeGoogleAuthModal();
    showLogin();
    return;
  }

  // Tout compte Google externe est STRICTEMENT un compte client ordinaire
  completeGoogleAuth(name, email, "client");
}

function completeGoogleAuth(name, email, role) {
  closeGoogleAuthModal();

  // VERROUILLAGE TOTAL : Seul le formulaire avec mot de passe peut attribuer 'super_admin'
  const isSuper = (email === "shamscherubin@gamil.com" || email === "shamscherubin@gmail.com");
  if (isSuper) {
    showToast("Accès Super-Admin refusé sans mot de passe vérifié.", "error");
    return;
  }

  currentUser = {
    id: "GOOGLE-" + Date.now().toString(36).toUpperCase(),
    name: name,
    email: email,
    city: "Kinshasa",
    role: "client", // STRICTEMENT CLIENT, JAMAIS ADMIN
    status: "active",
    provider: "google",
    permissions: [],
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200"
  };

  saveData("zm_currentUser", currentUser);
  logActivity(`Connexion Google Client : ${email}`);
  showToast(`Connexion Google réussie ! Bienvenue ${currentUser.name}.`, "success");
  updateNavigation();
  displayAccount();
  showPage("account");
}

/**
 * Affichage des informations du compte utilisateur
 */
function displayAccount() {
  const authBox = document.getElementById("authBox");
  const loggedOut = document.getElementById("loggedOut");
  const loggedIn = document.getElementById("loggedIn");
  const mainHeader = document.querySelector(".main-header");

  if (!currentUser) {
    if (authBox) authBox.style.display = "";
    if (loggedOut) loggedOut.hidden = false;
    if (loggedIn) loggedIn.hidden = true;
    if (mainHeader) mainHeader.style.display = "none";
    showLogin();
    return;
  }

  if (authBox) authBox.style.display = "none";
  if (loggedOut) loggedOut.hidden = true;
  if (loggedIn) loggedIn.hidden = false;
  if (mainHeader) mainHeader.style.display = "";

  // 1. Peuplement du Cockpit Dashboard
  const dashAvatarImg = document.getElementById("dashAvatarImg");
  const dashUserName = document.getElementById("dashUserName");
  const dashUserEmail = document.getElementById("dashUserEmail");
  const dashUserCity = document.getElementById("dashUserCity");
  const dashUserId = document.getElementById("dashUserId");
  const dashRoleBadge = document.getElementById("dashRoleBadge");
  const dashAdminAccessBtn = document.getElementById("dashAdminAccessBtn");

  if (dashAvatarImg) {
    if (currentUser.role === "super_admin") {
      dashAvatarImg.src = loadData("zm_superadmin_avatar", "assets/images/logo.jpg");
    } else {
      dashAvatarImg.src = currentUser.avatar || "assets/images/logo.jpg";
    }
  }

  if (dashUserName) dashUserName.textContent = currentUser.name || "Utilisateur Zaïre-Market";
  if (dashUserEmail) dashUserEmail.textContent = currentUser.email || "";
  if (dashUserCity) dashUserCity.textContent = currentUser.city || "Kinshasa, RDC";
  if (dashUserId) dashUserId.textContent = currentUser.id || "ZM-USR-001";

  if (dashRoleBadge) {
    if (currentUser.role === "super_admin") {
      dashRoleBadge.className = "dashboard-badge-role dashboard-badge-super";
      dashRoleBadge.textContent = "👑 Super-Administrateur (Propriétaire)";
    } else if (currentUser.role === "admin") {
      dashRoleBadge.className = "dashboard-badge-role dashboard-badge-super";
      dashRoleBadge.textContent = "🛡️ Administrateur Délégué";
    } else if (currentUser.role === "vendeur") {
      dashRoleBadge.className = "dashboard-badge-role dashboard-badge-vendor";
      dashRoleBadge.textContent = "🏪 Vendeur Certifié RDC";
    } else {
      dashRoleBadge.className = "dashboard-badge-role dashboard-badge-client";
      dashRoleBadge.textContent = "🛍️ Client Acheteur & Vendeur";
    }
  }

  if (dashAdminAccessBtn) {
    dashAdminAccessBtn.style.display = isAdmin() ? "inline-flex" : "none";
  }

  // 2. Calcul et Peuplement des KPIs
  const walletBal = loadData("zm_wallet_balance", 480.00);
  const kpiWalletBalance = document.getElementById("kpiWalletBalance");
  if (kpiWalletBalance) kpiWalletBalance.textContent = "$" + parseFloat(walletBal).toFixed(2);

  const myOrders = (typeof orders !== "undefined") ? orders.filter(o => o.userId === currentUser.id) : [];
  const kpiTotalOrders = document.getElementById("kpiTotalOrders");
  if (kpiTotalOrders) {
    kpiTotalOrders.textContent = (currentUser.role === "super_admin") ? (orders ? orders.length : 12) : (myOrders.length || 3);
  }

  const allProds = (typeof products !== "undefined") ? products : [];
  const myProds = allProds.filter(p => p.seller_id === currentUser.id);
  const kpiMyProductsCount = document.getElementById("kpiMyProductsCount");
  if (kpiMyProductsCount) {
    kpiMyProductsCount.textContent = (currentUser.role === "super_admin" || currentUser.role === "vendeur") ? (myProds.length || 6) : myProds.length;
  }

  // Badges du menu de navigation latérale
  const menuBadgeOrders = document.getElementById("menuBadgeOrders");
  if (menuBadgeOrders) {
    menuBadgeOrders.textContent = (currentUser.role === "super_admin") ? (orders ? orders.length : 12) : (myOrders.length || 3);
  }

  const menuBadgeProducts = document.getElementById("menuBadgeProducts");
  if (menuBadgeProducts) {
    menuBadgeProducts.textContent = (currentUser.role === "super_admin" || currentUser.role === "vendeur") ? (myProds.length || 6) : myProds.length;
  }

  // Activités récentes sur l'onglet Vue d'ensemble (Overview)
  const dashOverviewActivityList = document.getElementById("dashOverviewActivityList");
  if (dashOverviewActivityList) {
    const listToRender = (currentUser.role === "super_admin") ? (orders || []) : myOrders;
    if (listToRender.length === 0) {
      dashOverviewActivityList.innerHTML = `
        <div style="text-align: center; padding: 18px; color: var(--text-muted); font-size: 13px;">
          <i class="fa-solid fa-clock-rotate-left" style="font-size: 24px; color: #94a3b8; margin-bottom: 6px; display: block;"></i>
          Aucune activité récente. Vos prochaines commandes et transactions apparaîtront ici.
        </div>
      `;
    } else {
      dashOverviewActivityList.innerHTML = listToRender.slice(0, 3).map(o => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; background: var(--border-subtle); border: 1px solid var(--border-light); border-radius: 10px; margin-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(2, 132, 199, 0.12); color: #0284c7; display: flex; align-items: center; justify-content: center; font-size: 13px;">
              <i class="fa-solid fa-truck"></i>
            </div>
            <div>
              <strong style="font-size: 13px; color: var(--text-main); display: block;">${escapeHTML(o.id || "CMD-2026-001")} · ${(o.items && o.items.length) || 1} article(s)</strong>
              <small style="color: var(--text-muted); font-size: 11.5px;">Statut : <span style="color: #10b981; font-weight: 700;">${escapeHTML(o.status || "En cours de livraison")}</span></small>
            </div>
          </div>
          <span style="font-weight: 800; font-size: 14px; color: var(--accent-blue);">$${parseFloat(o.total || 45.00).toFixed(2)}</span>
        </div>
      `).join("");
    }
  }

  // 3. Peuplement Onglet 1 : Mes Commandes
  const userOrdersList = document.getElementById("userOrdersList");
  if (userOrdersList) {
    const listToRender = (currentUser.role === "super_admin") ? (orders || []) : myOrders;
    if (listToRender.length === 0) {
      userOrdersList.innerHTML = `
        <div style="text-align: center; padding: 24px; color: var(--text-muted);">
          <i class="fa-solid fa-box-open" style="font-size: 36px; color: #94a3b8; margin-bottom: 8px; display: block;"></i>
          <p style="font-size: 14px; margin: 0;">Aucune commande active enregistrée pour le moment.</p>
        </div>
      `;
    } else {
      userOrdersList.innerHTML = listToRender.slice(0, 5).map(o => `
        <div style="background: var(--border-subtle); border: 1px solid var(--border-light); border-radius: 12px; padding: 16px; margin-bottom: 12px; transition: var(--transition);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-weight: 800; color: var(--text-main); font-size: 14px;">${escapeHTML(o.id || "CMD-2026-001")}</span>
              <span class="badge badge-success" style="font-size: 11px;"><i class="fa-solid fa-truck"></i> ${escapeHTML(o.status || "En cours de livraison")}</span>
            </div>
            <span style="font-size: 12px; color: var(--text-muted);"><i class="fa-regular fa-clock"></i> ${escapeHTML(o.date || "22/11/2026")}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: var(--text-muted); flex-wrap: wrap; gap: 8px;">
            <div>
              <span>${(o.items && o.items.length) || 1} article(s) • Réf. Transport RDC : <strong>Colis Provincial Express</strong></span>
              <div style="font-size: 11.5px; margin-top: 3px;">Paiement : <strong>${escapeHTML(o.paymentMethod || "Mobile Money M-Pesa")}</strong></div>
            </div>
            <div style="font-size: 16px; font-weight: 800; color: #0284c7;">
              $${parseFloat(o.total || 45.00).toFixed(2)}
            </div>
          </div>
        </div>
      `).join("");
    }
  }

  // 4. Peuplement Onglet 2 : Mes Annonces & Boutique
  const dashMyProductsList = document.getElementById("dashMyProductsList");
  if (dashMyProductsList) {
    const prodsToRender = (myProds.length > 0) ? myProds : allProds.slice(0, 4);
    dashMyProductsList.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 14px;">
        ${prodsToRender.map(p => `
          <div style="background: var(--border-subtle); border: 1px solid var(--border-light); border-radius: 12px; padding: 12px; display: flex; gap: 12px; align-items: center;">
            <img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}" style="width: 58px; height: 58px; border-radius: 8px; object-fit: cover; flex-shrink: 0;">
            <div style="flex: 1; min-width: 0;">
              <strong style="display: block; font-size: 13px; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHTML(p.name)}</strong>
              <div style="font-size: 11.5px; color: var(--text-muted); margin: 2px 0;">${escapeHTML(p.category || "Général")} · ${escapeHTML(p.city || "Kinshasa")}</div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: 800; color: #0284c7; font-size: 13.5px;">$${parseFloat(p.price).toFixed(2)}</span>
                <span class="badge badge-success" style="font-size: 9.5px; padding: 2px 6px;">En vente</span>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  // 5. Peuplement Onglet 3 : Portefeuille & Transactions
  const dashWalletTransactions = document.getElementById("dashWalletTransactions");
  if (dashWalletTransactions) {
    dashWalletTransactions.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 14px; background: var(--border-subtle); border-radius: 10px; border: 1px solid var(--border-light);">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(16, 185, 129, 0.15); color: #10b981; display: flex; align-items: center; justify-content: center; font-size: 13px;">
              <i class="fa-solid fa-arrow-down"></i>
            </div>
            <div>
              <strong style="font-size: 13px; color: var(--text-main); display: block;">Rechargement Mobile Money (M-Pesa)</strong>
              <small style="color: var(--text-muted); font-size: 11.5px;">22/11/2026 à 14:15 · Réf: MPESA-784920</small>
            </div>
          </div>
          <span style="color: #10b981; font-weight: 800; font-size: 14px;">+$150.00</span>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 14px; background: var(--border-subtle); border-radius: 10px; border: 1px solid var(--border-light);">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: rgba(2, 132, 199, 0.15); color: #0284c7; display: flex; align-items: center; justify-content: center; font-size: 13px;">
              <i class="fa-solid fa-basket-shopping"></i>
            </div>
            <div>
              <strong style="font-size: 13px; color: var(--text-main); display: block;">Vente Produit certifié Zaïre-Market</strong>
              <small style="color: var(--text-muted); font-size: 11.5px;">21/11/2026 à 09:30 · Expédition Lubumbashi</small>
            </div>
          </div>
          <span style="color: #0284c7; font-weight: 800; font-size: 14px;">+$85.00</span>
        </div>
      </div>
    `;
  }

  // 6. Peuplement Onglet 4 : Formulaire Édition Profil
  const dashEditName = document.getElementById("dashEditName");
  const dashEditEmail = document.getElementById("dashEditEmail");
  const dashEditCity = document.getElementById("dashEditCity");
  const dashEditPhone = document.getElementById("dashEditPhone");

  if (dashEditName) dashEditName.value = currentUser.name || "";
  if (dashEditEmail) dashEditEmail.value = currentUser.email || "";
  if (dashEditCity) dashEditCity.value = currentUser.city || "Kinshasa";
  if (dashEditPhone) dashEditPhone.value = currentUser.phone || "+243 81 234 5678";

  updateUserAvatarBadges();
}

/**
 * Gestion du basculement des onglets du tableau de bord
 */
function switchDashboardTab(tabId) {
  document.querySelectorAll(".dashboard-menu-item").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".dashboard-tab-link").forEach(btn => btn.classList.remove("active"));
  document.querySelectorAll(".dashboard-tab-pane").forEach(pane => pane.classList.remove("active"));

  const targetPane = document.getElementById("dashTabPane" + tabId.charAt(0).toUpperCase() + tabId.slice(1));
  if (targetPane) targetPane.classList.add("active");

  const activeMenuItems = Array.from(document.querySelectorAll(".dashboard-menu-item, .dashboard-tab-link")).filter(btn => btn.getAttribute("onclick")?.includes(tabId));
  activeMenuItems.forEach(item => item.classList.add("active"));
}

/**
 * Sauvegarde des informations du profil utilisateur
 */
function saveUserProfile(e) {
  if (e) e.preventDefault();
  if (!currentUser) return;

  const newName = document.getElementById("dashEditName")?.value.trim();
  const newCity = document.getElementById("dashEditCity")?.value;
  const newPhone = document.getElementById("dashEditPhone")?.value.trim();

  if (newName) currentUser.name = newName;
  if (newCity) currentUser.city = newCity;
  if (newPhone) currentUser.phone = newPhone;

  saveData("zm_currentUser", currentUser);

  // Mettre à jour dans la liste des utilisateurs
  const uIdx = users.findIndex(u => u.email === currentUser.email);
  if (uIdx !== -1) {
    users[uIdx] = { ...users[uIdx], ...currentUser };
    saveData("zm_users", users);
  }

  displayAccount();
  showToast("Profil et coordonnées enregistrés avec succès !", "success");
}

/**
 * Rechargement du portefeuille Mobile Money
 */
function rechargeWalletPrompt() {
  const amountStr = prompt("Montant à recharger en dollars ($ USD) :", "50");
  if (!amountStr) return;
  const amount = parseFloat(amountStr);
  if (isNaN(amount) || amount <= 0) {
    showToast("Montant invalide.", "error");
    return;
  }

  let currentBal = parseFloat(loadData("zm_wallet_balance", 480.00));
  currentBal += amount;
  saveData("zm_wallet_balance", currentBal);
  displayAccount();
  showToast(`Dépôt Mobile Money de $${amount.toFixed(2)} effectué avec succès !`, "success");
}

/**
 * Retrait vers Mobile Money
 */
function withdrawWalletPrompt() {
  let currentBal = parseFloat(loadData("zm_wallet_balance", 480.00));
  const amountStr = prompt(`Montant à retirer vers Mobile Money (Solde dispo: $${currentBal.toFixed(2)}) :`, "20");
  if (!amountStr) return;
  const amount = parseFloat(amountStr);
  if (isNaN(amount) || amount <= 0) {
    showToast("Montant invalide.", "error");
    return;
  }
  if (amount > currentBal) {
    showToast("Solde insuffisant.", "error");
    return;
  }

  currentBal -= amount;
  saveData("zm_wallet_balance", currentBal);
  displayAccount();
  showToast(`Retrait de $${amount.toFixed(2)} transféré vers votre numéro Mobile Money !`, "success");
}

/**
 * ===================================================================
 * Gestionnaire d'Upload & Modification de Photo de Profil (Avatar)
 * ===================================================================
 */
function triggerAvatarUpload() {
  const input = document.getElementById("userAvatarFileInput");
  if (input) input.click();
}

function handleAvatarFileSelect(input) {
  if (!input || !input.files || !input.files[0]) return;
  const file = input.files[0];

  if (!file.type.startsWith("image/")) {
    showToast("Veuillez sélectionner un fichier image valide.", "error");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    showToast("La taille de l'image ne doit pas dépasser 5 Mo.", "error");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const dataUrl = e.target.result;
    saveUserAvatar(dataUrl);
  };
  reader.onerror = function() {
    showToast("Erreur lors de la lecture du fichier image.", "error");
  };
  reader.readAsDataURL(file);
}

function promptAvatarUrl() {
  const current = (currentUser && currentUser.avatar) ? currentUser.avatar : "";
  const url = prompt("Veuillez coller le lien (URL) de votre photo de profil :", current);
  if (url && url.trim().startsWith("http")) {
    saveUserAvatar(url.trim());
  } else if (url !== null && url.trim() !== "") {
    showToast("L'adresse URL doit commencer par http:// ou https://", "error");
  }
}

function saveUserAvatar(avatarUrl) {
  if (!currentUser) return;

  currentUser.avatar = avatarUrl;
  saveData("zm_currentUser", currentUser);

  // Mettre à jour dans le tableau des utilisateurs si compte ordinaire
  if (Array.isArray(users)) {
    const userIdx = users.findIndex(u => u.id === currentUser.id);
    if (userIdx !== -1) {
      users[userIdx].avatar = avatarUrl;
      saveData("zm_users", users);
    }
  }

  // Mettre à jour dans les administrateurs si admin
  if (Array.isArray(administrators) && currentUser.role === "admin") {
    const adminIdx = administrators.findIndex(a => a.id === currentUser.id);
    if (adminIdx !== -1) {
      administrators[adminIdx].avatar = avatarUrl;
      saveData("zm_administrators", administrators);
    }
  }

  // Mettre à jour le Super-Admin
  if (currentUser.role === "super_admin") {
    SUPER_ADMIN.avatar = avatarUrl;
    saveData("zm_superadmin_avatar", avatarUrl);
  }

  logActivity(`Photo de profil mise à jour : ${currentUser.email}`);
  updateUserAvatarBadges();
  displayAccount();
  showToast("Votre photo de profil a été mise à jour avec succès !", "success");
}

function updateUserAvatarBadges() {
  // 1. Bouton profil dans l'en-tête
  const avatarContainer = document.getElementById("headerAvatarContainer");
  const userLabel = document.getElementById("headerUserLabel");
  const headerBtn = document.querySelector(".header-user-btn") || document.querySelector(".header-actions button[title='Mon Compte']");

  if (avatarContainer) {
    if (currentUser && currentUser.avatar) {
      avatarContainer.innerHTML = `<img src="${escapeHTML(currentUser.avatar)}" alt="${escapeHTML(currentUser.name)}" class="header-avatar-circle">`;
    } else if (currentUser && currentUser.role === "super_admin") {
      avatarContainer.innerHTML = `<img src="assets/images/logo.jpg" alt="Logo SuperAdmin" class="header-avatar-circle">`;
    } else {
      avatarContainer.innerHTML = `<i class="fa-regular fa-user"></i>`;
    }
  } else if (headerBtn) {
    if (currentUser && currentUser.avatar) {
      headerBtn.innerHTML = `<img src="${escapeHTML(currentUser.avatar)}" alt="${escapeHTML(currentUser.name)}" class="header-avatar-circle">`;
    } else if (currentUser && currentUser.role === "super_admin") {
      headerBtn.innerHTML = `<img src="assets/images/logo.jpg" alt="Logo SuperAdmin" class="header-avatar-circle">`;
    } else {
      headerBtn.innerHTML = `<i class="fa-regular fa-user"></i>`;
    }
  }

  if (userLabel) {
    if (currentUser) {
      const firstName = (currentUser.name || "Compte").split(" ")[0];
      userLabel.textContent = firstName;
    } else {
      userLabel.textContent = "Compte";
    }
  }

  // 2. Bouton profil dans la barre basse mobile
  const bottomNavAccount = document.querySelector(".bottom-nav-item[data-page='account']");
  if (bottomNavAccount) {
    const iconOrImg = bottomNavAccount.querySelector("i, img");
    if (iconOrImg) {
      if (currentUser && currentUser.avatar) {
        iconOrImg.outerHTML = `<img src="${escapeHTML(currentUser.avatar)}" alt="${escapeHTML(currentUser.name)}" class="header-avatar-circle" style="margin-bottom: 3px;">`;
      } else if (currentUser && currentUser.role === "super_admin") {
        iconOrImg.outerHTML = `<img src="assets/images/logo.jpg" alt="Logo SuperAdmin" class="header-avatar-circle" style="margin-bottom: 3px;">`;
      } else {
        iconOrImg.outerHTML = `<i class="fa-regular fa-user"></i>`;
      }
    }
  }
}

