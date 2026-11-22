/**
 * ===================================================================
 * ZAÏRE-MARKET MOBILE — Client Réseau & Adaptateur Android
 * Communication REST Sécurisée avec WampServer / Production
 * ===================================================================
 */

const MobileApi = (function() {
  // Détermination de l'hôte par défaut :
  // - Sur émulateur Android standard : 10.0.2.2 pointe vers l'hôte PC
  // - Sur navigateur mobile / test : window.location ou localhost
  function resolveDefaultHost() {
    const saved = localStorage.getItem("zm_mobile_server_url");
    if (saved) return saved;

    // Détection de l'émulateur Android Capacitor
    if (window.Capacitor && window.Capacitor.getPlatform() === 'android') {
      return "http://10.0.2.2/zaire%20market/api";
    }

    // Si on teste dans un navigateur PC / Devtools
    if (window.location && window.location.origin) {
      if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        return `${window.location.origin}/zaire%20market/api`;
      }
    }

    return "http://localhost/zaire%20market/api";
  }

  let serverUrl = resolveDefaultHost();

  function getServerUrl() {
    return serverUrl;
  }

  function setServerUrl(url) {
    if (url && typeof url === 'string') {
      serverUrl = url.trim().replace(/\/+$/, '');
      localStorage.setItem("zm_mobile_server_url", serverUrl);
    }
  }

  function getToken() {
    return localStorage.getItem("zm_mobile_token") || "";
  }

  function setToken(token) {
    if (token) {
      localStorage.setItem("zm_mobile_token", token);
    } else {
      localStorage.removeItem("zm_mobile_token");
    }
  }

  async function request(endpoint, options = {}) {
    const cleanEndpoint = endpoint.replace(/^\/+/, '');
    const url = cleanEndpoint.startsWith("http") ? cleanEndpoint : `${serverUrl}/${cleanEndpoint}`;

    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {})
    };

    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000); // 12s timeout mobile

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal
      });
      clearTimeout(timeout);

      const json = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMsg = json?.message || `Erreur serveur HTTP ${response.status}`;
        const err = new Error(errorMsg);
        err.status = response.status;
        err.data = json;
        throw err;
      }

      return json;
    } catch (error) {
      clearTimeout(timeout);
      if (error.name === 'AbortError') {
        throw new Error("Délai d'attente réseau dépassé. Vérifiez votre connexion.");
      }
      throw error;
    }
  }

  return {
    getServerUrl,
    setServerUrl,
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
      localStorage.removeItem("zm_mobile_user");
    },

    // Catalogue Produits
    async getProducts(params = {}) {
      const query = new URLSearchParams(params).toString();
      const endpoint = query ? `products.php?${query}` : "products.php";
      const res = await request(endpoint, { method: "GET" });
      if (res?.data && Array.isArray(res.data)) {
        // Mise en cache hors-ligne
        localStorage.setItem("zm_mobile_cached_products", JSON.stringify(res.data));
      }
      return res;
    },

    getCachedProducts() {
      try {
        const raw = localStorage.getItem("zm_mobile_cached_products");
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        return [];
      }
    },

    // Vente / Publication
    async createProduct(productData) {
      return await request("products.php", {
        method: "POST",
        body: JSON.stringify(productData)
      });
    },

    // Commandes (Recalcul serveur)
    async createOrder(orderData) {
      return await request("orders.php", {
        method: "POST",
        body: JSON.stringify(orderData)
      });
    },

    async getOrders() {
      return await request("orders.php", { method: "GET" });
    }
  };
})();
