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
          <p style="font-size: 12.5px; color: var(--text-muted);">Sélectionnez votre compte pour accéder à Zaïre-Market</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
          <button type="button" onclick="completeGoogleAuth('Shams Cherubin', 'shamscherubin@gmail.com', 'super_admin')" class="btn" style="display: flex; align-items: center; gap: 12px; padding: 10px 14px; background: rgba(2, 132, 199, 0.08); border: 1px solid rgba(2, 132, 199, 0.25); border-radius: 10px; text-align: left; width: 100%;">
            <div style="width: 38px; height: 38px; border-radius: 50%; background: #0f172a; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">SC</div>
            <div style="flex: 1; min-width: 0;">
              <strong style="display: block; font-size: 13.5px; color: var(--text-main);">Shams Cherubin <span style="font-size: 10px; background: #dc2626; color: #fff; padding: 1px 6px; border-radius: 10px; font-weight: 800;">Super-Admin</span></strong>
              <small style="color: var(--text-muted); font-size: 11.5px;">shamscherubin@gmail.com</small>
            </div>
          </button>

          <button type="button" onclick="completeGoogleAuth('Dieudonné Kabange', 'kabange.dieu@gmail.com', 'client')" class="btn" style="display: flex; align-items: center; gap: 12px; padding: 10px 14px; background: var(--border-subtle); border: 1px solid var(--border-light); border-radius: 10px; text-align: left; width: 100%;">
            <div style="width: 38px; height: 38px; border-radius: 50%; background: #0284c7; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0;">DK</div>
            <div style="flex: 1; min-width: 0;">
              <strong style="display: block; font-size: 13.5px; color: var(--text-main);">Dieudonné Kabange</strong>
              <small style="color: var(--text-muted); font-size: 11.5px;">kabange.dieu@gmail.com</small>
            </div>
          </button>
        </div>

        <div class="auth-divider" style="margin: 14px 0 12px 0;">
          <span>ou saisir une autre adresse Gmail</span>
        </div>

        <div style="margin-bottom: 16px;">
          <input type="email" id="customGoogleEmail" placeholder="votre-compte@gmail.com" class="form-control" style="font-size: 13px; padding: 10px 12px;">
          <input type="text" id="customGoogleName" placeholder="Votre nom complet (optionnel)" class="form-control" style="font-size: 13px; padding: 10px 12px; margin-top: 8px;">
          <button type="button" onclick="submitCustomGoogleAuth()" class="btn btn-primary btn-block" style="margin-top: 10px; padding: 10px; font-size: 13px;">
            <i class="fa-brands fa-google"></i> Valider la connexion Google
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

  const role = (email === "shamscherubin@gamil.com" || email === "shamscherubin@gmail.com") ? "super_admin" : "client";
  completeGoogleAuth(name, email, role);
}

function completeGoogleAuth(name, email, role) {
  closeGoogleAuthModal();

  const isSuper = (email === "shamscherubin@gamil.com" || email === "shamscherubin@gmail.com" || role === "super_admin");
  currentUser = {
    id: isSuper ? "SUPER-ADMIN-001" : ("GOOGLE-" + Date.now().toString(36)),
    name: isSuper ? "Shams Cherubin" : name,
    email: email,
    city: "Kinshasa",
    role: isSuper ? "super_admin" : (role || "client"),
    status: "active",
    provider: "google",
    permissions: isSuper ? ["users","products","categories","orders","payments","reports","support","statistics","logs"] : [],
    avatar: isSuper ? loadData("zm_superadmin_avatar", "assets/images/logo.jpg") : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200"
  };

  saveData("zm_currentUser", currentUser);
  logActivity(`Connexion Google certifiée : ${email} (${currentUser.role})`);
  showToast(`Connexion Google réussie ! Bienvenue ${currentUser.name}.`, "success");
  updateNavigation();
  displayAccount();

  if (isAdmin()) {
    showPage("admin");
  } else {
    showPage("home");
  }
}

/**
 * Affichage des informations du compte utilisateur
 */
function displayAccount() {
  const loggedOut = document.getElementById("loggedOut");
  const loggedIn = document.getElementById("loggedIn");
  const profileInfo = document.getElementById("profileInfo");
  const userOrdersList = document.getElementById("userOrdersList");
  const mainHeader = document.querySelector(".main-header");

  if (!currentUser) {
    if (loggedOut) loggedOut.hidden = false;
    if (loggedIn) loggedIn.hidden = true;
    if (mainHeader) mainHeader.style.display = "none";
    showLogin();
    return;
  }

  if (loggedOut) loggedOut.hidden = true;
  if (loggedIn) loggedIn.hidden = false;
  if (mainHeader) mainHeader.style.display = "";

  let roleLabel = "Client Marketplace (Acheteur / Vendeur)";
  let roleBadgeClass = "badge-category";
  let ownerExtra = "";

  if (currentUser.role === "admin") {
    roleLabel = "Administrateur Délégué";
    roleBadgeClass = "badge-warning";
  } else if (currentUser.role === "super_admin") {
    roleLabel = "👑 Propriétaire du Système (Super-Administrateur)";
    roleBadgeClass = "badge-danger";
    ownerExtra = `
      <div style="background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; padding: 12px; margin-top: 14px; text-align: left;">
        <strong style="color: #ef4444; font-size: 13px; display: block; margin-bottom: 4px;">
          <i class="fa-solid fa-crown"></i> Droits Souverains du Propriétaire :
        </strong>
        <p style="color: var(--text-muted); font-size: 12px; line-height: 1.4;">
          Vous détenez l'autorité suprême sur la plateforme : suspendre, bloquer ou supprimer n'importe quel compte utilisateur ou n'importe quelle publication/activité.
        </p>
        <button class="btn btn-primary btn-sm" style="margin-top: 10px;" onclick="showPage('admin')">
          <i class="fa-solid fa-gauge-high"></i> Ouvrir le Panneau de Contrôle Suprême
        </button>
      </div>
    `;
  }

  let avatarContent = "";
  if (currentUser.avatar) {
    avatarContent = `<img src="${escapeHTML(currentUser.avatar)}" alt="Photo de profil" class="profile-avatar-img">`;
  } else if (currentUser.role === "super_admin") {
    avatarContent = `<img src="assets/images/logo.jpg" alt="Logo SuperAdmin" class="profile-avatar-img">`;
  } else {
    avatarContent = `<span>${(currentUser.name || "U").charAt(0).toUpperCase()}</span>`;
  }

  if (profileInfo) {
    profileInfo.innerHTML = `
      <div class="profile-card">
        <div class="profile-avatar-wrap">
          <div class="profile-avatar-circle" id="profileAvatarCircle" style="${currentUser.role === 'super_admin' && !currentUser.avatar ? 'background: #000;' : ''}">
            ${avatarContent}
          </div>
          <button type="button" class="avatar-edit-badge" onclick="triggerAvatarUpload()" title="Changer ma photo de profil" aria-label="Changer ma photo de profil">
            <i class="fa-solid fa-camera"></i>
          </button>
          <input type="file" id="userAvatarFileInput" accept="image/*" style="display: none;" onchange="handleAvatarFileSelect(this)">
        </div>

        <div style="text-align: center; margin-bottom: 12px; display: flex; justify-content: center; gap: 8px;">
          <button type="button" class="btn btn-secondary btn-sm" onclick="triggerAvatarUpload()" style="font-size: 11px; padding: 4px 10px; border-radius: 20px;">
            <i class="fa-solid fa-cloud-arrow-up"></i> Choisir une photo
          </button>
          <button type="button" class="btn btn-secondary btn-sm" onclick="promptAvatarUrl()" style="font-size: 11px; padding: 4px 10px; border-radius: 20px;">
            <i class="fa-solid fa-link"></i> Lien image
          </button>
        </div>

        <div style="margin: 8px 0 14px 0; text-align: center;">
          <span style="font-size: 11px; color: #64748b; display: block; margin-bottom: 6px;">Ou choisissez un avatar rapide :</span>
          <div style="display: flex; justify-content: center; gap: 10px;">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120" class="avatar-quick-choice" onclick="saveUserAvatar(this.src)" title="Choisir cet avatar">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120" class="avatar-quick-choice" onclick="saveUserAvatar(this.src)" title="Choisir cet avatar">
            <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120" class="avatar-quick-choice" onclick="saveUserAvatar(this.src)" title="Choisir cet avatar">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120" class="avatar-quick-choice" onclick="saveUserAvatar(this.src)" title="Choisir cet avatar">
          </div>
        </div>

        <h2 style="font-size: 20px; color: var(--text-main); margin-bottom: 4px;">${escapeHTML(currentUser.name)}</h2>
        <p style="color: var(--text-muted); font-size: 13.5px; margin-bottom: 12px;">${escapeHTML(currentUser.email)}</p>
        <div>
          <span class="badge ${roleBadgeClass}">${roleLabel}</span>
          ${currentUser.city ? `<span class="badge badge-city" style="margin-left: 6px;"><i class="fa-solid fa-location-dot"></i> ${escapeHTML(currentUser.city)}</span>` : ''}
        </div>
        ${ownerExtra}
      </div>
    `;
  }

  // Affichage des commandes de l'utilisateur (s'il n'est pas le super-admin)
  if (userOrdersList) {
    if (currentUser.role === "super_admin") {
      userOrdersList.innerHTML = `
        <div style="background: var(--border-subtle); border: 1px solid var(--border-light); border-radius: 8px; padding: 16px; text-align: center;">
          <p style="color: var(--text-main); font-size: 13.5px; margin-bottom: 10px;">
            En tant que propriétaire, vous supervisez l'ensemble des <strong>${orders.length} commande(s)</strong> de la plateforme.
          </p>
          <button class="btn btn-secondary btn-sm" onclick="showPage('admin'); adminOrders();">
            <i class="fa-solid fa-receipt"></i> Gérer toutes les commandes
          </button>
        </div>
      `;
    } else {
      const myOrders = orders.filter(o => o.userId === currentUser.id);
      if (myOrders.length === 0) {
        userOrdersList.innerHTML = `<p style="color: var(--text-muted); font-size: 14px; text-align: center; padding: 20px;">Vous n'avez pas encore passé de commande.</p>`;
      } else {
        userOrdersList.innerHTML = myOrders.map(o => `
          <div style="background: var(--border-subtle); border: 1px solid var(--border-light); border-radius: 8px; padding: 14px; margin-bottom: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <strong style="color: var(--text-main);">${escapeHTML(o.id)}</strong>
              <span class="badge badge-success">${escapeHTML(o.status)}</span>
            </div>
            <div style="font-size: 13px; color: var(--text-muted);">
              <span>${o.items.length} article(s) • Total: <strong>$${o.total.toFixed(2)}</strong></span>
              <div style="font-size: 12px; margin-top: 2px;">Paiement : ${escapeHTML(o.paymentMethod)} (${escapeHTML(o.date)})</div>
            </div>
          </div>
        `).join("");
      }
    }
  }

  updateUserAvatarBadges();
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

