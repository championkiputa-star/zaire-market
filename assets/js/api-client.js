/**
 * ===================================================================
 * ZAÏRE-MARKET — Client API REST & Service Réseau Centralisé
 * Passerelle Unique pour le Web (WampServer) et le Mobile (Ionic/Android)
 * ===================================================================
 */

const ApiClient = (function() {
  // Détection dynamique de l'URL de l'API
  function getDefaultApiBase() {
    // Si l'application mobile a défini une adresse personnalisée dans le stockage
    const custom = localStorage.getItem("zm_api_base_url");
    if (custom) return custom;

    // Contexte Web distant (ex: Render) ou WAMP local
    if (window.location && window.location.origin) {
      if (window.location.pathname && window.location.pathname.includes("/zaire market/")) {
        return window.location.origin + "/zaire%20market/api";
      }
      if (window.location.origin.includes("onrender.com") || (window.location.origin.startsWith("http") && !window.location.origin.includes("localhost"))) {
        return window.location.origin + "/api";
      }
    }
    // Fallback par défaut WampServer local
    return "http://localhost/zaire%20market/api";
  }

  let baseUrl = getDefaultApiBase();

  function setBaseUrl(newUrl) {
    if (newUrl && typeof newUrl === "string") {
      baseUrl = newUrl.replace(/\/+$/, "");
      localStorage.setItem("zm_api_base_url", baseUrl);
    }
  }

  function getBaseUrl() {
    return baseUrl;
  }

  function getToken() {
    return localStorage.getItem("zm_token") || "";
  }

  function setToken(token) {
    if (token) {
      localStorage.setItem("zm_token", token);
    } else {
      localStorage.removeItem("zm_token");
    }
  }

  /**
   * Méthode générique de requête HTTP avec fetch
   */
  async function request(endpoint, options = {}) {
    const url = endpoint.startsWith("http") ? endpoint : `${baseUrl}/${endpoint.replace(/^\/+/, "")}`;
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {})
    };

    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMsg = data?.message || `Erreur serveur (${response.status})`;
        const err = new Error(errorMsg);
        err.status = response.status;
        err.data = data;
        throw err;
      }

      return data;
    } catch (error) {
      console.warn(`[ApiClient] Erreur sur ${url}:`, error.message);
      throw error;
    }
  }

  return {
    getBaseUrl,
    setBaseUrl,
    getToken,
    setToken,

    // Authentification
    async login(email, password) {
      const res = await request("auth.php?action=login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });
      if (res?.token) {
        setToken(res.token);
      }
      return res;
    },

    async register(userData) {
      const res = await request("auth.php?action=register", {
        method: "POST",
        body: JSON.stringify(userData)
      });
      if (res?.token) {
        setToken(res.token);
      }
      return res;
    },

    async getMe() {
      return await request("auth.php?action=me", { method: "GET" });
    },

    logout() {
      setToken("");
      localStorage.removeItem("zm_currentUser");
    },

    // Produits & Catalogue
    async getProducts(params = {}) {
      const query = new URLSearchParams(params).toString();
      const endpoint = query ? `products.php?${query}` : "products.php";
      return await request(endpoint, { method: "GET" });
    },

    async createProduct(productData) {
      return await request("products.php", {
        method: "POST",
        body: JSON.stringify(productData)
      });
    },

    // Commandes
    async createOrder(orderData) {
      return await request("orders.php", {
        method: "POST",
        body: JSON.stringify(orderData)
      });
    },

    async getOrders() {
      return await request("orders.php", { method: "GET" });
    },

    // Statistiques & Dashboard Admin
    async getStats() {
      return await request("stats.php", { method: "GET" });
    }
  };
})();
