/**
 * ===================================================================
 * ZAÏRE-MARKET MOBILE — Application Mobile Native Ionic / Capacitor
 * Logique Métier, Panier Réactif, Haptics & Gestion des Vues
 * ===================================================================
 */

let mobileProducts = [];
let mobileCart = loadMobileData("zm_mobile_cart", []);
let mobileCurrentUser = loadMobileData("zm_mobile_user", null);

function loadMobileData(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function saveMobileData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`[Storage] Erreur sauvegarde ${key}:`, e);
  }
}

// -------------------------------------------------------------------
// 1. NAVIGATION & INITIALISATION
// -------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initMobileApp();
});

async function initMobileApp() {
  updateServerUrlDisplay();
  updateMobileCartBadge();
  updateMobileAccountView();

  // Chargement initial du catalogue depuis l'API MySQL
  await loadMobileCatalog();

  // Écouteurs de pull-to-refresh
  const homeRefresher = document.getElementById("homeRefresher");
  if (homeRefresher) {
    homeRefresher.addEventListener("ionRefresh", async (event) => {
      await loadMobileCatalog();
      event.target.complete();
    });
  }

  const catalogRefresher = document.getElementById("catalogRefresher");
  if (catalogRefresher) {
    catalogRefresher.addEventListener("ionRefresh", async (event) => {
      await loadMobileCatalog();
      event.target.complete();
    });
  }

  // Écouteurs de recherche et filtres
  setupFilters();
}

function switchMobileTab(tabName) {
  const tabs = document.getElementById("mainTabs");
  if (tabs && typeof tabs.select === "function") {
    tabs.select(tabName);
  }
}

function updateServerUrlDisplay() {
  const elem = document.getElementById("serverUrlDisplay");
  if (elem) {
    elem.textContent = `Serveur actif : ${MobileApi.getServerUrl()}`;
  }
}

// -------------------------------------------------------------------
// 2. CHARGEMENT & AFFICHAGE DES PRODUITS (MYSQL & OFFLINE-FIRST)
// -------------------------------------------------------------------
async function loadMobileCatalog() {
  try {
    const res = await MobileApi.getProducts();
    if (res && res.status === "success" && Array.isArray(res.data)) {
      mobileProducts = res.data;
    } else {
      mobileProducts = MobileApi.getCachedProducts();
    }
  } catch (err) {
    console.warn("[Mobile] Impossible de joindre l'API, chargement cache local:", err.message);
    mobileProducts = MobileApi.getCachedProducts();
  }

  renderHomeProducts();
  renderCatalogProducts();
}

function renderProductCardHTML(p) {
  const priceUSD = Number(p.price).toFixed(2);
  const priceCDF = Math.round(Number(p.price) * 2850).toLocaleString("fr-FR");
  const imgUrl = p.image || "assets/logo.jpg";
  const city = p.city || "RDC";

  return `
    <div class="mobile-product-card">
      <div class="mobile-product-thumb-wrapper">
        <img class="mobile-product-thumb" src="${imgUrl}" alt="${p.name}" loading="lazy" onerror="this.src='assets/logo.jpg'" />
        <span class="mobile-product-city-badge"><i class="fa-solid fa-location-dot"></i> ${city}</span>
      </div>
      <div class="mobile-product-body">
        <div class="mobile-product-name">${p.name}</div>
        <div class="mobile-product-price-row">
          <span class="mobile-product-price-usd">$${priceUSD}</span>
          <span class="mobile-product-price-cdf">≈ ${priceCDF} FC</span>
        </div>
        <ion-button expand="block" size="small" class="mobile-btn-add-cart" onclick="addToMobileCart('${p.id}')">
          <i class="fa-solid fa-cart-plus" style="margin-right: 6px;"></i> Ajouter
        </ion-button>
      </div>
    </div>
  `;
}

function renderHomeProducts() {
  const container = document.getElementById("homeProductsGrid");
  if (!container) return;

  const slice = mobileProducts.slice(0, 10);
  if (slice.length === 0) {
    container.innerHTML = `<p style="grid-column: span 2; text-align: center; color: #94a3b8; font-size: 13px;">Chargement des articles certifiés...</p>`;
    return;
  }

  container.innerHTML = slice.map(renderProductCardHTML).join("");
}

function renderCatalogProducts() {
  const container = document.getElementById("catalogProductsGrid");
  if (!container) return;

  const searchInput = (document.getElementById("catalogSearchBar")?.value || "").toLowerCase().trim();
  const cityFilter = document.getElementById("catalogCitySelect")?.value || "all";
  const catFilter = document.getElementById("catalogCategorySelect")?.value || "all";

  const filtered = mobileProducts.filter(p => {
    const matchSearch = !searchInput || p.name.toLowerCase().includes(searchInput) || (p.description || "").toLowerCase().includes(searchInput);
    const matchCity = (cityFilter === "all") || (p.city && p.city.toLowerCase() === cityFilter.toLowerCase());
    const matchCat = (catFilter === "all") || (p.category && p.category.toLowerCase() === catFilter.toLowerCase());
    return matchSearch && matchCity && matchCat;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: span 2; text-align: center; padding: 30px; color: #94a3b8; font-size: 13px;">Aucun article ne correspond à ces critères.</div>`;
    return;
  }

  container.innerHTML = filtered.map(renderProductCardHTML).join("");
}

function setupFilters() {
  const searchBar = document.getElementById("catalogSearchBar");
  if (searchBar) {
    searchBar.addEventListener("ionInput", () => renderCatalogProducts());
  }

  const homeSearch = document.getElementById("homeSearchBar");
  if (homeSearch) {
    homeSearch.addEventListener("ionInput", (e) => {
      const val = e.target.value;
      const catSearch = document.getElementById("catalogSearchBar");
      if (catSearch) catSearch.value = val;
      switchMobileTab("tab-catalog");
      renderCatalogProducts();
    });
  }

  const citySelect = document.getElementById("catalogCitySelect");
  if (citySelect) {
    citySelect.addEventListener("ionChange", () => renderCatalogProducts());
  }

  const catSelect = document.getElementById("catalogCategorySelect");
  if (catSelect) {
    catSelect.addEventListener("ionChange", () => renderCatalogProducts());
  }
}

// -------------------------------------------------------------------
// 3. GESTION DU PANIER & VIBRATIONS HAPTIQUES
// -------------------------------------------------------------------
function triggerHapticFeedback() {
  // Vibration native Android Capacitor
  if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.Haptics) {
    window.Capacitor.Plugins.Haptics.impact({ style: "MEDIUM" }).catch(() => {});
  } else if (navigator.vibrate) {
    navigator.vibrate(30);
  }
}

function addToMobileCart(productId) {
  triggerHapticFeedback();

  const product = mobileProducts.find(p => String(p.id) === String(productId));
  if (!product) {
    showMobileToast("Produit indisponible.", "danger");
    return;
  }

  const existing = mobileCart.find(item => String(item.id) === String(productId));
  if (existing) {
    existing.quantity = (Number(existing.quantity) || 1) + 1;
  } else {
    mobileCart.push({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.image || "assets/logo.jpg",
      quantity: 1
    });
  }

  saveMobileData("zm_mobile_cart", mobileCart);
  updateMobileCartBadge();
  renderMobileCartView();
  showMobileToast(`"${product.name}" ajouté au panier !`, "success");
}

function updateMobileCartBadge() {
  const count = mobileCart.reduce((total, item) => total + (Number(item.quantity) || 1), 0);
  const badge = document.getElementById("mobileCartTabBadge");
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? "inline-block" : "none";
  }
}

function renderMobileCartView() {
  const list = document.getElementById("cartItemsList");
  const emptyState = document.getElementById("cartEmptyState");
  const footer = document.getElementById("cartFooter");
  const paymentSec = document.getElementById("cartPaymentSection");

  if (!list) return;

  if (mobileCart.length === 0) {
    if (emptyState) emptyState.style.display = "block";
    if (footer) footer.style.display = "none";
    if (paymentSec) paymentSec.style.display = "none";
    list.innerHTML = "";
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  if (footer) footer.style.display = "block";
  if (paymentSec) paymentSec.style.display = "block";

  let totalUSD = 0;
  list.innerHTML = mobileCart.map(item => {
    const subtotal = item.price * item.quantity;
    totalUSD += subtotal;

    return `
      <ion-item class="mobile-cart-item">
        <ion-thumbnail slot="start" style="--size: 48px; border-radius: 8px; overflow: hidden;">
          <img src="${item.image}" alt="${item.name}" onerror="this.src='assets/logo.jpg'" />
        </ion-thumbnail>
        <ion-label>
          <h3 style="font-size: 13px; font-weight: 700; color: #ffffff;">${item.name}</h3>
          <p style="color: #38bdf8; font-weight: 700;">$${item.price.toFixed(2)} × ${item.quantity} = $${subtotal.toFixed(2)}</p>
        </ion-label>
        <div slot="end" style="display: flex; align-items: center; gap: 4px;">
          <ion-button fill="clear" size="small" onclick="updateMobileCartItemQty('${item.id}', -1)">
            <i class="fa-solid fa-minus" style="font-size: 12px; color: #94a3b8;"></i>
          </ion-button>
          <span style="font-weight: 700; font-size: 13px; min-width: 18px; text-align: center;">${item.quantity}</span>
          <ion-button fill="clear" size="small" onclick="updateMobileCartItemQty('${item.id}', 1)">
            <i class="fa-solid fa-plus" style="font-size: 12px; color: #38bdf8;"></i>
          </ion-button>
          <ion-button fill="clear" size="small" color="danger" onclick="removeMobileCartItem('${item.id}')">
            <i class="fa-solid fa-trash-can" style="font-size: 14px;"></i>
          </ion-button>
        </div>
      </ion-item>
    `;
  }).join("");

  const totalUSDElement = document.getElementById("mobileCartTotalUSD");
  const totalCDFElement = document.getElementById("mobileCartTotalCDF");
  if (totalUSDElement) totalUSDElement.textContent = `$${totalUSD.toFixed(2)}`;
  if (totalCDFElement) totalCDFElement.textContent = `≈ ${Math.round(totalUSD * 2850).toLocaleString("fr-FR")} FC`;
}

function updateMobileCartItemQty(id, delta) {
  const item = mobileCart.find(i => String(i.id) === String(id));
  if (!item) return;

  item.quantity = (Number(item.quantity) || 1) + delta;
  if (item.quantity <= 0) {
    mobileCart = mobileCart.filter(i => String(i.id) !== String(id));
  }

  saveMobileData("zm_mobile_cart", mobileCart);
  updateMobileCartBadge();
  renderMobileCartView();
}

function removeMobileCartItem(id) {
  mobileCart = mobileCart.filter(i => String(i.id) !== String(id));
  saveMobileData("zm_mobile_cart", mobileCart);
  updateMobileCartBadge();
  renderMobileCartView();
  showMobileToast("Article retiré du panier.", "warning");
}

// -------------------------------------------------------------------
// 4. TUNNEL DE COMMANDE SÉCURISÉ (RECALCUL SERVEUR MYSQL)
// -------------------------------------------------------------------
async function processMobileCheckout() {
  if (mobileCart.length === 0) {
    showMobileToast("Votre panier est vide.", "danger");
    return;
  }

  const paymentRadio = document.getElementById("cartPaymentRadio");
  const paymentMethod = paymentRadio ? paymentRadio.value : "Paiement à la livraison (Cash)";

  const btn = document.getElementById("btnMobileCheckout");
  if (btn) btn.disabled = true;

  try {
    const orderPayload = {
      customer: mobileCurrentUser ? mobileCurrentUser.name : "Client Mobile Android",
      phone: mobileCurrentUser ? (mobileCurrentUser.phone || "") : "",
      shippingCity: mobileCurrentUser ? (mobileCurrentUser.city || "Kinshasa") : "Kinshasa",
      paymentMethod: paymentMethod,
      items: mobileCart.map(it => ({
        productId: it.id,
        quantity: it.quantity
      }))
    };

    const res = await MobileApi.createOrder(orderPayload);
    if (res && res.status === "success" && res.order) {
      triggerHapticFeedback();

      // Vider le panier
      mobileCart = [];
      saveMobileData("zm_mobile_cart", mobileCart);
      updateMobileCartBadge();
      renderMobileCartView();

      // Alerte native de confirmation
      const alert = document.createElement("ion-alert");
      alert.header = "Commande Certifiée 🇨🇩";
      alert.subHeader = `N° ${res.order.id}`;
      alert.message = `Montant recalculé et validé par le serveur : $${Number(res.order.total).toFixed(2)} (≈ ${Number(res.order.totalCDF).toLocaleString("fr-FR")} FC).\nMode : ${paymentMethod}.\nNotre équipe de livraison en RDC prend en charge votre colis.`;
      alert.buttons = [{
        text: "Super !",
        handler: () => {
          switchMobileTab("tab-home");
        }
      }];
      document.body.appendChild(alert);
      await alert.present();
    }
  } catch (err) {
    console.error("[Checkout] Erreur:", err);
    showMobileToast(`Erreur commande : ${err.message}`, "danger");
  } finally {
    if (btn) btn.disabled = false;
  }
}

// -------------------------------------------------------------------
// 5. AUTHENTIFICATION & COMPTE
// -------------------------------------------------------------------
function updateMobileAccountView() {
  const loggedOut = document.getElementById("mobileLoggedOutView");
  const loggedIn = document.getElementById("mobileLoggedInView");

  if (!mobileCurrentUser) {
    if (loggedOut) loggedOut.style.display = "block";
    if (loggedIn) loggedIn.style.display = "none";
    return;
  }

  if (loggedOut) loggedOut.style.display = "none";
  if (loggedIn) loggedIn.style.display = "block";

  const nameElem = document.getElementById("mobileUserName");
  const emailElem = document.getElementById("mobileUserEmail");
  const badgeElem = document.getElementById("mobileUserRoleBadge");

  if (nameElem) nameElem.textContent = mobileCurrentUser.name;
  if (emailElem) emailElem.textContent = mobileCurrentUser.email;
  if (badgeElem) badgeElem.textContent = mobileCurrentUser.role === "super_admin" ? "Super Administrateur" : "Client Certifié";

  loadUserOrders();
}

async function handleMobileLoginSubmit(e) {
  e.preventDefault();
  const email = document.getElementById("mobileLoginEmail")?.value.trim().toLowerCase();
  const password = document.getElementById("mobileLoginPassword")?.value;

  if (!email || !password) return;

  try {
    const res = await MobileApi.login(email, password);
    if (res && res.status === "success" && res.user) {
      mobileCurrentUser = res.user;
      saveMobileData("zm_mobile_user", mobileCurrentUser);
      showMobileToast(`Ravi de vous revoir, ${res.user.name} !`, "success");
      updateMobileAccountView();
    }
  } catch (err) {
    showMobileToast(err.message || "Identifiants invalides.", "danger");
  }
}

function handleMobileLogout() {
  MobileApi.logout();
  mobileCurrentUser = null;
  saveMobileData("zm_mobile_user", null);
  updateMobileAccountView();
  showMobileToast("Vous êtes déconnecté.", "warning");
}

async function loadUserOrders() {
  const list = document.getElementById("mobileUserOrdersList");
  if (!list || !mobileCurrentUser) return;

  try {
    const res = await MobileApi.getOrders();
    if (res && res.status === "success" && Array.isArray(res.data)) {
      if (res.data.length === 0) {
        list.innerHTML = `<p style="font-size: 12px; color: #94a3b8; text-align: center;">Aucune commande pour le moment.</p>`;
        return;
      }

      list.innerHTML = res.data.map(o => `
        <ion-item class="mobile-cart-item">
          <ion-label>
            <h3 style="font-size: 13px; font-weight: 700; color: #ffffff;">Commande ${o.id}</h3>
            <p style="color: #94a3b8; font-size: 11px;">${o.date} • ${o.paymentMethod}</p>
          </ion-label>
          <div slot="end" style="text-align: right;">
            <div style="color: #38bdf8; font-weight: 800;">$${Number(o.total).toFixed(2)}</div>
            <ion-badge color="success" style="font-size: 10px;">${o.status || 'Validée'}</ion-badge>
          </div>
        </ion-item>
      `).join("");
    }
  } catch (e) {
    console.warn("[Orders] Inaccessibles:", e.message);
  }
}

// -------------------------------------------------------------------
// 6. PUBLICATION D'UN PRODUIT (ONGLET VENDRE)
// -------------------------------------------------------------------
async function handleMobileSellSubmit(e) {
  e.preventDefault();

  if (!mobileCurrentUser) {
    showMobileToast("Vous devez être connecté pour vendre un produit.", "danger");
    switchMobileTab("tab-account");
    return;
  }

  const name = document.getElementById("sellName")?.value.trim();
  const price = Number(document.getElementById("sellPrice")?.value);
  const category = document.getElementById("sellCategory")?.value;
  const city = document.getElementById("sellCity")?.value;
  const image = document.getElementById("sellImage")?.value.trim();
  const description = document.getElementById("sellDescription")?.value.trim();

  if (!name || !price || !category) {
    showMobileToast("Veuillez renseigner les champs obligatoires.", "warning");
    return;
  }

  try {
    const res = await MobileApi.createProduct({
      name,
      price,
      category,
      city,
      image,
      description
    });

    if (res && res.status === "success" && res.product) {
      showMobileToast("Votre article a été publié sur Zaïre-Market !", "success");
      document.getElementById("mobileSellForm")?.reset();
      await loadMobileCatalog();
      switchMobileTab("tab-catalog");
    }
  } catch (err) {
    showMobileToast(err.message || "Erreur lors de la publication.", "danger");
  }
}

// -------------------------------------------------------------------
// 7. UTILITAIRES TOAST & MODAL CONFIGURATION RÉSEAU
// -------------------------------------------------------------------
async function showMobileToast(message, color = "primary") {
  const toast = document.createElement("ion-toast");
  toast.message = message;
  toast.duration = 2500;
  toast.color = color;
  toast.position = "bottom";
  document.body.appendChild(toast);
  return toast.present();
}

async function openServerConfigModal() {
  const alert = document.createElement("ion-alert");
  alert.header = "Configuration du Serveur WAMP";
  alert.subHeader = "Adresse de l'API Zaïre-Market";
  alert.message = "Pour tester depuis un vrai téléphone Android en Wi-Fi, entrez l'adresse IP de votre PC (ex: http://192.168.1.50/zaire market/api). Pour l'émulateur standard, laissez 10.0.2.2.";
  alert.inputs = [
    {
      name: "serverUrl",
      type: "url",
      placeholder: "http://192.168.X.X/zaire market/api",
      value: MobileApi.getServerUrl()
    }
  ];
  alert.buttons = [
    {
      text: "Annuler",
      role: "cancel"
    },
    {
      text: "Enregistrer",
      handler: (data) => {
        if (data.serverUrl) {
          MobileApi.setServerUrl(data.serverUrl);
          updateServerUrlDisplay();
          showMobileToast("Adresse du serveur mise à jour !", "success");
          loadMobileCatalog();
        }
      }
    }
  ];
  document.body.appendChild(alert);
  await alert.present();
}
