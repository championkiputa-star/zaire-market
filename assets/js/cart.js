/**
 * ===================================================================
 * ZAÏRE-MARKET — Gestionnaire du Panier & Paiement Mobile Money
 * ===================================================================
 */

let cart = loadData("zm_cart", []);

/**
 * Met à jour le compteur visuel d'articles du panier
 */
function updateCartBadges() {
  if (!Array.isArray(cart)) {
    cart = loadData("zm_cart", []) || [];
  }
  const count = cart.reduce((total, item) => total + (Number(item.quantity) || 1), 0);
  const badges = document.querySelectorAll(".cart-counter-badge");
  badges.forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? "inline-flex" : "none";
    b.classList.remove("badge-pulse");
    // Trigger reflow pour relancer l'animation
    void b.offsetWidth;
    b.classList.add("badge-pulse");
  });
}

/**
 * Ajouter un produit au panier avec retour visuel immédiat
 */
function addToCart(productId, btnElement = null) {
  if (typeof event !== "undefined" && event && event.stopPropagation) {
    event.stopPropagation();
  }

  if (!Array.isArray(cart)) {
    cart = loadData("zm_cart", []) || [];
  }

  // Vérifier la liste des produits
  if (typeof products === "undefined" || !Array.isArray(products) || products.length === 0) {
    products = loadData("zm_products", []) || [];
  }

  const product = products.find(p => String(p.id) === String(productId));
  if (!product) {
    showToast("Produit indisponible pour le moment.", "error");
    return;
  }

  const existing = cart.find(item => String(item.id) === String(productId));
  if (existing) {
    existing.quantity = (Number(existing.quantity) || 1) + 1;
  } else {
    cart.push({
      id: product.id,
      quantity: 1
    });
  }

  saveData("zm_cart", cart);
  updateCartBadges();

  // Animation et retour visuel immédiat sur le bouton cliqué
  if (!btnElement && typeof event !== "undefined" && event && event.target) {
    btnElement = event.target.closest(".btn-add-cart") || event.target;
  }

  if (btnElement && btnElement.tagName === "BUTTON") {
    const originalHtml = btnElement.innerHTML;
    btnElement.innerHTML = `<i class="fa-solid fa-check"></i> Ajouté au panier !`;
    btnElement.style.background = "#10b981";
    btnElement.style.borderColor = "#10b981";
    btnElement.style.color = "#ffffff";
    btnElement.disabled = true;

    setTimeout(() => {
      btnElement.innerHTML = originalHtml;
      btnElement.style.background = "";
      btnElement.style.borderColor = "";
      btnElement.style.color = "";
      btnElement.disabled = false;
    }, 1300);
  }

  showToast(`"${product.name}" ajouté au panier avec succès !`, "success");

  // Si on est déjà sur la page panier, actualiser
  if (document.getElementById("cart")?.classList.contains("active")) {
    displayCart();
  }
}

/**
 * Modifier la quantité d'un produit (+1 / -1)
 */
function updateCartQuantity(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveData("zm_cart", cart);
  updateCartBadges();
  displayCart();
}

/**
 * Supprimer un article du panier
 */
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveData("zm_cart", cart);
  updateCartBadges();
  displayCart();
  showToast("Article retiré du panier.", "info");
}

/**
 * Affiche l'interface complète du panier
 */
function displayCart() {
  const container = document.getElementById("cartItems");
  const summaryBox = document.getElementById("cartSummaryBox");
  if (!container) return;

  updateCartBadges();

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 48px 20px;">
        <i class="fa-solid fa-cart-shopping" style="font-size: 50px; color: #cbd5e1; margin-bottom: 16px;"></i>
        <h3 style="font-size: 18px; color: var(--text-main); margin-bottom: 8px;">Votre panier est vide</h3>
        <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 20px;">Découvrez nos articles et profitez des meilleures offres en RDC.</p>
        <button class="btn btn-primary" onclick="showPage('products')">
          <i class="fa-solid fa-bag-shopping"></i> Découvrir les produits
        </button>
      </div>
    `;
    if (summaryBox) summaryBox.style.display = "none";
    return;
  }

  if (summaryBox) summaryBox.style.display = "block";

  let totalUSD = 0;

  const itemsHtml = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return "";

    const subtotal = product.price * item.quantity;
    totalUSD += subtotal;

    return `
      <div class="cart-item-row">
        <img
          src="${escapeHTML(product.image || 'https://via.placeholder.com/100')}"
          alt="${escapeHTML(product.name)}"
          class="cart-item-thumb"
        >
        <div class="cart-item-details">
          <h4 class="cart-item-name">${escapeHTML(product.name)}</h4>
          <div class="cart-item-meta">${escapeHTML(product.category)} • ${escapeHTML(product.city)}</div>
          <div class="cart-item-price">$${Number(product.price).toFixed(2)}</div>
        </div>

        <div class="qty-stepper">
          <button class="qty-btn" onclick="updateCartQuantity('${product.id}', -1)">-</button>
          <span class="qty-val">${item.quantity}</span>
          <button class="qty-btn" onclick="updateCartQuantity('${product.id}', 1)">+</button>
        </div>

        <div style="text-align: right; min-width: 70px;">
          <strong style="color: var(--text-main); font-size: 15px;">$${subtotal.toFixed(2)}</strong>
        </div>

        <button class="cart-item-remove-btn" onclick="removeFromCart('${product.id}')" title="Supprimer">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `;
  }).join("");

  container.innerHTML = itemsHtml;

  // Calculs totaux
  const totalCDF = Math.round(totalUSD * 2850).toLocaleString("fr-FR");
  const subtotalElem = document.getElementById("cartSubtotalUSD");
  const totalElem = document.getElementById("cartTotalUSD");
  const totalCdfElem = document.getElementById("cartTotalCDF");

  if (subtotalElem) subtotalElem.textContent = `$${totalUSD.toFixed(2)}`;
  if (totalElem) totalElem.textContent = `$${totalUSD.toFixed(2)}`;
  if (totalCdfElem) totalCdfElem.textContent = `≈ ${totalCDF} FC`;
}

/**
 * Valider la commande (Enregistrement Transactionnel API REST MySQL & Fallback)
 */
async function checkout() {
  if (!currentUser) {
    showToast("Création de compte obligatoire : vous devez créer un compte utilisateur ou vous connecter pour passer votre commande.", "error");
    showPage("account");
    showRegister();
    return;
  }

  if (currentUser.status === "suspended") {
    showToast("Commande refusée : votre compte est temporairement suspendu par le propriétaire.", "error");
    return;
  }

  if (currentUser.status === "blocked") {
    showToast("Commande refusée : votre compte est bloqué par le propriétaire.", "error");
    return;
  }

  if (cart.length === 0) {
    showToast("Votre panier est vide.", "error");
    return;
  }

  const selectedPaymentInput = document.querySelector('input[name="paymentMethod"]:checked');
  const paymentMethod = selectedPaymentInput ? selectedPaymentInput.value : "Paiement à la livraison (Cash)";

  // Préparation des articles pour le recalcul serveur
  const orderItemsPayload = cart.map(item => ({
    productId: item.id,
    quantity: Number(item.quantity) || 1
  }));

  let confirmedOrder = null;

  // Envoi à l'API REST MySQL avec recalcul strict côté serveur
  if (typeof ApiClient !== "undefined") {
    try {
      const res = await ApiClient.createOrder({
        customer: currentUser.name,
        customerPhone: currentUser.phone || "",
        shippingCity: currentUser.city || "Kinshasa",
        paymentMethod: paymentMethod,
        items: orderItemsPayload
      });

      if (res && res.status === "success" && res.order) {
        confirmedOrder = res.order;
      }
    } catch (apiErr) {
      console.warn("[Cart] API MySQL indisponible, enregistrement local de secours:", apiErr);
    }
  }

  const orderId = confirmedOrder ? confirmedOrder.id : generateId("CMD");
  const finalTotalUSD = confirmedOrder ? Number(confirmedOrder.total) : cart.reduce((sum, item) => {
    const p = (products || []).find(prod => prod.id === item.id);
    return sum + (p ? Number(p.price) * item.quantity : 0);
  }, 0);
  const finalTotalCDF = confirmedOrder ? confirmedOrder.totalCDF : Math.round(finalTotalUSD * 2850);

  const localOrderRecord = {
    id: orderId,
    userId: currentUser.id,
    customer: currentUser.name,
    customerEmail: currentUser.email,
    customerCity: currentUser.city || "Kinshasa",
    items: cart.map(i => {
      const prod = (products || []).find(p => p.id === i.id);
      return {
        productId: i.id,
        productName: prod?.name || "Article",
        quantity: i.quantity,
        price: prod?.price || 0,
        subtotal: (prod?.price || 0) * i.quantity
      };
    }),
    total: finalTotalUSD,
    paymentMethod,
    status: "Nouvelle",
    paymentStatus: paymentMethod.includes("livraison") ? "En attente à la livraison" : "En attente de confirmation",
    date: new Date().toLocaleString("fr-FR"),
    serverCertified: Boolean(confirmedOrder)
  };

  orders.unshift(localOrderRecord);
  saveData("zm_orders", orders);
  logActivity(`Nouvelle commande validée : ${orderId} ($${finalTotalUSD.toFixed(2)}) via ${paymentMethod}`);

  // Vider le panier
  cart = [];
  saveData("zm_cart", cart);
  updateCartBadges();
  displayCart();

  showToast(`Commande ${orderId} validée avec succès !`, "success");

  // Afficher message récapitulatif
  alert(
    `Félicitations ${currentUser.name} !\n` +
    `Votre commande n° ${orderId} d'un montant de $${finalTotalUSD.toFixed(2)} (≈ ${Number(finalTotalCDF).toLocaleString("fr-FR")} FC) a été enregistrée avec succès.\n` +
    `Mode sélectionné : ${paymentMethod}.\nNotre équipe vous contactera pour la livraison en RDC.`
  );

  showPage("home");
}
