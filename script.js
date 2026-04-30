const products = [
  { id: 1, name: "AeroFit Running Shoes", category: "Fashion", price: 2899, rating: 4.5, image: "https://placehold.co/600x400/eff4ff/1f2f58?text=Running+Shoe", description: "Breathable running shoes with responsive cushioning for daily training and walking comfort." },
  { id: 2, name: "NoiseCancel Pro Headphones", category: "Electronics", price: 4999, rating: 4.7, image: "https://placehold.co/600x400/eff4ff/1f2f58?text=Headphones", description: "Wireless over-ear headphones with active noise cancellation and 30-hour battery life." },
  { id: 3, name: "SmartBlend Mixer", category: "Home", price: 2199, rating: 4.2, image: "https://placehold.co/600x400/eff4ff/1f2f58?text=Kitchen+Mixer", description: "High-speed kitchen mixer for smoothies, sauces, and daily meal prep." },
  { id: 4, name: "Minimal Desk Lamp", category: "Home", price: 1299, rating: 4.4, image: "https://placehold.co/600x400/eff4ff/1f2f58?text=Desk+Lamp", description: "LED desk lamp with adjustable brightness and warm/cool tones." },
  { id: 5, name: "TrailPack Backpack", category: "Fashion", price: 1999, rating: 4.3, image: "https://placehold.co/600x400/eff4ff/1f2f58?text=Backpack", description: "Water-resistant backpack with laptop sleeve and travel-friendly compartments." },
  { id: 6, name: "UltraView 24-inch Monitor", category: "Electronics", price: 9999, rating: 4.6, image: "https://placehold.co/600x400/eff4ff/1f2f58?text=Monitor", description: "Full HD IPS monitor with thin bezels, ideal for work and entertainment." },
  { id: 7, name: "Organic Skin Care Kit", category: "Beauty", price: 1499, rating: 4.1, image: "https://placehold.co/600x400/eff4ff/1f2f58?text=Skin+Care", description: "Gentle daily skincare set including cleanser, toner, and moisturizer." },
  { id: 8, name: "PowerCharge 20k Bank", category: "Electronics", price: 1699, rating: 4.4, image: "https://placehold.co/600x400/eff4ff/1f2f58?text=Power+Bank", description: "Fast-charging power bank with dual output and digital battery display." },
  { id: 9, name: "Quantum Mechanical Keyboard", category: "Electronics", price: 3599, rating: 4.5, image: "https://placehold.co/600x400/eff4ff/1f2f58?text=Keyboard", description: "RGB mechanical keyboard with smooth tactile switches and hot-swappable keys." },
  { id: 10, name: "Formula Steel Bottle", category: "Home", price: 899, rating: 4.0, image: "https://placehold.co/600x400/eff4ff/1f2f58?text=Steel+Bottle", description: "Insulated stainless steel bottle that keeps drinks hot or cold for hours." },
  { id: 11, name: "Prime Cotton Hoodie", category: "Fashion", price: 1799, rating: 4.3, image: "https://placehold.co/600x400/eff4ff/1f2f58?text=Hoodie", description: "Soft cotton hoodie with a relaxed fit and all-day comfort." },
  { id: 12, name: "Geometric Wall Clock", category: "Home", price: 1290, rating: 4.2, image: "https://placehold.co/600x400/eff4ff/1f2f58?text=Wall+Clock", description: "Minimal geometric wall clock for modern interiors." },
  { id: 13, name: "PixelCam Smart Webcam", category: "Electronics", price: 2499, rating: 4.1, image: "https://placehold.co/600x400/eff4ff/1f2f58?text=Camera", description: "HD webcam with autofocus and low-light optimization for online meetings." },
  { id: 14, name: "Herbal Glow Face Serum", category: "Beauty", price: 1099, rating: 4.2, image: "https://placehold.co/600x400/eff4ff/1f2f58?text=Face+Serum", description: "Lightweight serum with botanical extracts for hydrated and glowing skin." }
];

const state = {
  user: null,
  selectedCategory: "All",
  searchQuery: "",
  cart: []
};

const el = {
  signupTab: document.getElementById("signupTab"),
  loginTab: document.getElementById("loginTab"),
  signupForm: document.getElementById("signupForm"),
  loginForm: document.getElementById("loginForm"),
  authMessage: document.getElementById("authMessage"),
  authSection: document.getElementById("authSection"),
  storeSection: document.getElementById("storeSection"),
  logoutBtn: document.getElementById("logoutBtn"),
  categoryChips: document.getElementById("categoryChips"),
  searchInput: document.getElementById("searchInput"),
  productsGrid: document.getElementById("productsGrid"),
  cartBtn: document.getElementById("cartBtn"),
  cartCount: document.getElementById("cartCount"),
  cartDrawer: document.getElementById("cartDrawer"),
  closeCartBtn: document.getElementById("closeCartBtn"),
  cartItems: document.getElementById("cartItems"),
  cartTotal: document.getElementById("cartTotal"),
  checkoutBtn: document.getElementById("checkoutBtn"),
  productModal: document.getElementById("productModal"),
  productDetails: document.getElementById("productDetails"),
  closeProductModalBtn: document.getElementById("closeProductModalBtn"),
  checkoutModal: document.getElementById("checkoutModal"),
  checkoutForm: document.getElementById("checkoutForm"),
  closeCheckoutModalBtn: document.getElementById("closeCheckoutModalBtn"),
  ordersBtn: document.getElementById("ordersBtn"),
  ordersModal: document.getElementById("ordersModal"),
  closeOrdersModalBtn: document.getElementById("closeOrdersModalBtn"),
  ordersList: document.getElementById("ordersList"),
  demoStartBtn: document.getElementById("demoStartBtn"),
  demoCheckoutBtn: document.getElementById("demoCheckoutBtn"),
  demoTrackingBtn: document.getElementById("demoTrackingBtn"),
  paymentMethod: document.getElementById("paymentMethod"),
  cardNumberWrap: document.getElementById("cardNumberWrap"),
  upiIdWrap: document.getElementById("upiIdWrap"),
  cardNumber: document.getElementById("cardNumber"),
  upiId: document.getElementById("upiId")
};

function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function getOrders(email) {
  const all = JSON.parse(localStorage.getItem("orders") || "{}");
  return all[email] || [];
}

function saveOrder(email, order) {
  const all = JSON.parse(localStorage.getItem("orders") || "{}");
  all[email] = [order, ...(all[email] || [])];
  localStorage.setItem("orders", JSON.stringify(all));
}

function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);
}

function ensureDemoUser() {
  const demoUser = {
    name: "Demo Customer",
    email: "demo@mathcart.com",
    password: "demo123"
  };
  const users = getUsers();
  if (!users.some((user) => user.email === demoUser.email)) {
    users.push(demoUser);
    saveUsers(users);
  }
  return demoUser;
}

function showAuthMessage(text, isError = false) {
  el.authMessage.textContent = text;
  el.authMessage.className = `auth-message ${isError ? "error" : "success"}`;
}

function switchTab(type) {
  const sign = type === "signup";
  el.signupTab.classList.toggle("active", sign);
  el.loginTab.classList.toggle("active", !sign);
  el.signupForm.classList.toggle("active", sign);
  el.loginForm.classList.toggle("active", !sign);
  showAuthMessage("");
}

function loginUser(user) {
  state.user = user;
  state.cart = [];
  localStorage.setItem("activeUser", JSON.stringify(user));
  el.authSection.classList.add("hidden");
  el.storeSection.classList.remove("hidden");
  el.logoutBtn.classList.remove("hidden");
  renderCategories();
  renderProducts();
  renderCart();
}

function logoutUser() {
  state.user = null;
  state.cart = [];
  localStorage.removeItem("activeUser");
  el.authSection.classList.remove("hidden");
  el.storeSection.classList.add("hidden");
  el.logoutBtn.classList.add("hidden");
  el.cartDrawer.classList.add("hidden");
  showAuthMessage("Logged out successfully.");
}

function renderCategories() {
  const categories = ["All", ...new Set(products.map((p) => p.category))];
  el.categoryChips.innerHTML = categories
    .map(
      (category) =>
        `<button class="chip ${category === state.selectedCategory ? "active" : ""}" data-category="${category}">${category}</button>`
    )
    .join("");
}

function getVisibleProducts() {
  return products.filter((product) => {
    const categoryOk = state.selectedCategory === "All" || product.category === state.selectedCategory;
    const query = state.searchQuery.trim().toLowerCase();
    const queryOk = !query || product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query);
    return categoryOk && queryOk;
  });
}

function renderProducts() {
  const visibleProducts = getVisibleProducts();
  if (visibleProducts.length === 0) {
    el.productsGrid.innerHTML = `<div class="card section-card">No products found for your filter/search.</div>`;
    return;
  }

  el.productsGrid.innerHTML = visibleProducts
    .map(
      (product) => `
      <article class="product-card">
        <img class="product-image" src="${product.image}" alt="${product.name}" onerror="this.onerror=null;this.src='product-fallback.svg';" />
        <h4>${product.name}</h4>
        <div class="meta">${product.category} | Rating: ${product.rating} / 5</div>
        <div class="price">${formatINR(product.price)}</div>
        <div class="row">
          <button class="ghost-btn" data-view="${product.id}">View Details</button>
          <button class="primary-btn" data-add="${product.id}">Add to Cart</button>
        </div>
      </article>
    `
    )
    .join("");
}

function addToCart(productId) {
  const existing = state.cart.find((item) => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    const product = products.find((item) => item.id === productId);
    state.cart.push({ ...product, qty: 1 });
  }
  renderCart();
  el.cartDrawer.classList.remove("hidden");
}

function changeQty(productId, delta) {
  const item = state.cart.find((cartItem) => cartItem.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    state.cart = state.cart.filter((cartItem) => cartItem.id !== productId);
  }
  renderCart();
}

function cartTotal() {
  return state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function renderCart() {
  const count = state.cart.reduce((sum, item) => sum + item.qty, 0);
  el.cartCount.textContent = String(count);
  el.cartTotal.textContent = formatINR(cartTotal());

  if (state.cart.length === 0) {
    el.cartItems.innerHTML = `<div class="meta">Your cart is empty.</div>`;
    return;
  }

  el.cartItems.innerHTML = state.cart
    .map(
      (item) => `
      <div class="cart-item">
        <div class="cart-item-main">
          <img class="cart-thumb" src="${item.image}" alt="${item.name}" onerror="this.onerror=null;this.src='product-fallback.svg';" />
          <div class="cart-item-top">
            <strong>${item.name}</strong>
            <span>${formatINR(item.price * item.qty)}</span>
          </div>
        </div>
        <div class="qty-controls">
          <button data-qty="${item.id}" data-delta="-1">-</button>
          <span>${item.qty}</span>
          <button data-qty="${item.id}" data-delta="1">+</button>
        </div>
      </div>
    `
    )
    .join("");
}

function showProductDetails(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;
  el.productDetails.innerHTML = `
    <img class="product-image" src="${product.image}" alt="${product.name}" onerror="this.onerror=null;this.src='product-fallback.svg';" />
    <h3>${product.name}</h3>
    <p class="meta">${product.category} | Rating ${product.rating} / 5</p>
    <p>${product.description}</p>
    <p class="price">Price: ${formatINR(product.price)}</p>
    <button class="primary-btn" data-add="${product.id}">Add to Cart</button>
  `;
  el.productModal.showModal();
}

function placeOrder(address, paymentMethod, paymentDetails) {
  const total = cartTotal();
  const statusOptions = ["Order Confirmed", "Packed", "Shipped", "Out for Delivery", "Delivered"];
  const status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
  const order = {
    id: `OD-${Date.now()}`,
    items: state.cart.map((item) => ({ name: item.name, qty: item.qty })),
    total,
    address,
    paymentMethod,
    paymentDetails,
    paymentGateway: paymentMethod === "Cash on Delivery" ? "Pay on delivery" : "Razorpay Sandbox",
    status,
    date: new Date().toLocaleString()
  };

  saveOrder(state.user.email, order);
  state.cart = [];
  renderCart();
  el.checkoutModal.close();
  el.cartDrawer.classList.add("hidden");
  renderOrders();
}

function updatePaymentInputs() {
  const method = el.paymentMethod.value;
  const isCard = method === "Card";
  const isUpi = method === "UPI";

  el.cardNumberWrap.classList.toggle("hidden", !isCard);
  el.upiIdWrap.classList.toggle("hidden", !isUpi);

  el.cardNumber.required = isCard;
  el.upiId.required = isUpi;
}

function createDemoOrder() {
  if (!state.user) return;
  state.cart = [
    { ...products[1], qty: 1 },
    { ...products[4], qty: 2 }
  ];
  renderCart();
  placeOrder("221 Demo Street, Bangalore", "UPI", "demo@upi");
}

function renderOrders() {
  if (!state.user) return;
  const orders = getOrders(state.user.email);
  if (orders.length === 0) {
    el.ordersList.innerHTML = `<div class="meta">No orders yet. Place your first order.</div>`;
    return;
  }

  el.ordersList.innerHTML = orders
    .map(
      (order) => `
      <article class="order-card">
        <div class="cart-item-top">
          <strong>${order.id}</strong>
          <span class="badge">${order.status}</span>
        </div>
        <div class="meta">${order.date}</div>
        <div class="meta">Payment: ${order.paymentMethod} (${order.paymentDetails || "N/A"})</div>
        <div class="meta">Gateway: ${order.paymentGateway || "Razorpay Sandbox"}</div>
        <div class="meta">Address: ${order.address}</div>
        <div class="meta">Items: ${order.items.map((item) => `${item.name} (x${item.qty})`).join(", ")}</div>
        <strong>Total: ${formatINR(order.total)}</strong>
      </article>
    `
    )
    .join("");
}

function bindEvents() {
  el.signupTab.addEventListener("click", () => switchTab("signup"));
  el.loginTab.addEventListener("click", () => switchTab("login"));

  el.signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim().toLowerCase();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirmPassword").value;

    if (password !== confirmPassword) {
      showAuthMessage("Password and re-typed password must match.", true);
      return;
    }

    const users = getUsers();
    if (users.some((user) => user.email === email)) {
      showAuthMessage("Account already exists. Please login.", true);
      return;
    }

    const user = { name, email, password };
    users.push(user);
    saveUsers(users);
    showAuthMessage("Account created. You can now login.");
    switchTab("login");
    el.loginForm.reset();
    document.getElementById("loginEmail").value = email;
  });

  el.loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const user = getUsers().find((u) => u.email === email && u.password === password);

    if (!user) {
      showAuthMessage("Invalid email or password.", true);
      return;
    }

    loginUser(user);
  });

  el.logoutBtn.addEventListener("click", logoutUser);

  el.categoryChips.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) return;
    const category = target.dataset.category;
    if (!category) return;
    state.selectedCategory = category;
    renderCategories();
    renderProducts();
  });

  el.searchInput.addEventListener("input", (event) => {
    state.searchQuery = event.target.value;
    renderProducts();
  });

  el.paymentMethod.addEventListener("change", updatePaymentInputs);

  document.body.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const addId = target.getAttribute("data-add");
    const viewId = target.getAttribute("data-view");
    const qtyId = target.getAttribute("data-qty");

    if (addId) {
      addToCart(Number(addId));
      return;
    }
    if (viewId) {
      showProductDetails(Number(viewId));
      return;
    }
    if (qtyId) {
      const delta = Number(target.getAttribute("data-delta"));
      changeQty(Number(qtyId), delta);
    }
  });

  el.cartBtn.addEventListener("click", () => el.cartDrawer.classList.toggle("hidden"));
  el.closeCartBtn.addEventListener("click", () => el.cartDrawer.classList.add("hidden"));

  el.checkoutBtn.addEventListener("click", () => {
    if (state.cart.length === 0) return;
    el.checkoutModal.showModal();
  });

  el.closeProductModalBtn.addEventListener("click", () => el.productModal.close());
  el.closeCheckoutModalBtn.addEventListener("click", () => el.checkoutModal.close());

  el.checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const address = document.getElementById("deliveryAddress").value.trim();
    const paymentMethod = document.getElementById("paymentMethod").value;
    const cardNumber = el.cardNumber.value.replace(/\s/g, "");
    const upiId = el.upiId.value.trim();
    let paymentDetails = "N/A";

    if (!address) return;

    if (paymentMethod === "Card") {
      if (!/^\d{16}$/.test(cardNumber)) {
        alert("Please enter a valid 16-digit card number.");
        return;
      }
      paymentDetails = `Card ending ${cardNumber.slice(-4)}`;
    } else if (paymentMethod === "UPI") {
      if (!/^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(upiId)) {
        alert("Please enter a valid UPI ID.");
        return;
      }
      paymentDetails = upiId;
    }

    placeOrder(address, paymentMethod, paymentDetails);
    el.checkoutForm.reset();
    updatePaymentInputs();
  });

  el.ordersBtn.addEventListener("click", () => {
    if (!state.user) {
      showAuthMessage("Please login first.", true);
      return;
    }
    renderOrders();
    el.ordersModal.showModal();
  });

  el.closeOrdersModalBtn.addEventListener("click", () => el.ordersModal.close());

  el.demoStartBtn.addEventListener("click", () => {
    const demoUser = ensureDemoUser();
    loginUser(demoUser);
    createDemoOrder();
    renderOrders();
    el.ordersModal.showModal();
  });

  el.demoCheckoutBtn.addEventListener("click", () => {
    if (!state.user) {
      showAuthMessage("Login first, or use the demo start button.", true);
      return;
    }
    createDemoOrder();
    el.cartDrawer.classList.add("hidden");
    alert("Demo checkout completed. Open Orders to view tracking.");
  });

  el.demoTrackingBtn.addEventListener("click", () => {
    if (!state.user) {
      showAuthMessage("Login first, or use the demo start button.", true);
      return;
    }
    renderOrders();
    el.ordersModal.showModal();
  });
}

function boot() {
  bindEvents();
  updatePaymentInputs();
  const activeUser = JSON.parse(localStorage.getItem("activeUser") || "null");
  if (activeUser) {
    loginUser(activeUser);
  }
}

boot();
