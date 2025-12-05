// ===================== PRODUCT DATABASE =====================
const PRODUCTS = [
  {
    id: 1,
    name: "Oversized Cotton Blend T-Shirt",
    price: 292,
    category: "Men",
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTIMAKaQw-2NKByVrwD8w053ekp8bFtC6qWfcbfKlWuq6gf0dIBx0RKcxvek8yxenzHQDldhm5b8timS86eTHaCxmEJ9lpaxZF2mTsUkkaUiWipVi16OyURVg",
  },
  {
    id: 2,
    name: "Women Palazzo Pants",
    price: 499,
    category: "Women",
    image:
      "https://myprisma.in/cdn/shop/products/2_82f71496-73fe-4546-9a0b-c5bbe3973b52.jpg?v=1679139767&width=1100",
  },
  {
    id: 3,
    name: "Men Stretch Formal Pant",
    price: 314,
    category: "Men",
    image:
      "https://www.subtract.in/cdn/shop/files/Trouser3_9_1080x.jpg?v=1754677668",
  },
  {
    id: 4,
    name: "Girls Maxi Black Dress",
    price: 599,
    category: "Kids",
    image:
      "https://rukminim2.flixcart.com/image/480/640/xif0q/kids-dress/h/4/o/4-5-years-shivani-black-charvi-original-imahaq6ewfvsu59x.jpeg?q=90",
  },
  {
    id: 5,
    name: "Men Hoodie Black",
    price: 699,
    category: "Men",
    image:
      "https://fastcolors.in/cdn/shop/files/printed_Sweatshirt_hoodies_for_men_Black-BACK.jpg?v=1751898394",
  },
  {
    id: 6,
    name: "Men Kurta Blue",
    price: 650,
    category: "Ethnic",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCoESrZVSx_f3zq38JKuBbuhO02WyLW7M-bw&s",
  },
  {
    id: 7,
    name: "Women Blue Lehanga Set",
    price: 1199,
    category: "Women",
    image:
      "https://nitikagujral.com/cdn/shop/files/4_Custom_106e29b9-072d-41db-b1fe-7a68e51e180c_800x.jpg?v=1736937405",
  },
  {
    id: 8,
    name: "Luxurious Bags",
    price: 9917,
    category: "Accessories",
    image:
      "https://img.businessoffashion.com/resizer/v2/SP4JP7RSCJCVPDRAHFOHJFJKGE.png?auth=fa53af05877fcd5ba1cfd09c6dd10be6f0a80fe1e1219f5dc28458d40de81d59&width=1920&smart=true",
  },
];

// ===================== RENDER PRODUCTS (SHOP PAGE) =====================
function renderProducts(list) {
  const container = document.querySelector(".products-container");
  if (!container) return;

  container.innerHTML = list
    .map(
      (item) => `
    <div class="product-card">
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p class="price">₹${item.price}</p>

      <button onclick="addToCart('${item.name}', ${item.price}, '${item.image}')">
        Add to Cart
      </button>

      <div class="product-buttons">
        <button class="wish-btn" onclick="addToWishlist('${item.name}', ${item.price}, '${item.image}')">
          <i class="fa-regular fa-heart"></i>
        </button>
      </div>
    </div>
  `
    )
    .join("");
}

// ===================== CART & WISHLIST (GLOBAL) =====================
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existing = cart.find((item) => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, image, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`Added "${name}" to Cart 🛒`);
}

function addToWishlist(name, price, image) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const exists = wishlist.find((item) => item.name === name);

  if (!exists) {
    wishlist.push({ name, price, image });
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Added to Wishlist ❤️");
  } else {
    alert("Already in Wishlist ❤️");
  }
}

// ===================== TOAST NOTIFICATION =====================
function notify(title, msg, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  let icon = "✔️";
  if (type === "error") icon = "❌";
  if (type === "warning") icon = "⚠️";
  if (type === "info") icon = "ℹ️";

  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${msg}</div>
    </div>
  `;

  document.body.appendChild(toast);

  setTimeout(() => toast.remove(), 4000);
}

// ===================== ADMIN DASHBOARD (SAFE) =====================
const API_BASE = "http://localhost:4000/api/admin";

const usersCountEl = document.getElementById("usersCount");
const ordersCountEl = document.getElementById("ordersCount");
const productsCountEl = document.getElementById("productsCount");
const ordersTbody = document.getElementById("ordersTbody");
const productForm = document.getElementById("productForm");
const logoutBtn = document.getElementById("logoutBtn");

// Admin side nav buttons (only if present)
document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".nav-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const target = btn.dataset.target;
    document.querySelectorAll("main .section").forEach((sec) => {
      if (sec.id === target) sec.classList.remove("hidden");
      else sec.classList.add("hidden");
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

async function loadDashboard() {
  // If there is no dashboard element, skip (normal pages)
  if (!usersCountEl && !ordersCountEl && !productsCountEl && !ordersTbody)
    return;

  try {
    const res = await fetch(`${API_BASE}/dashboard`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();

    if (usersCountEl) usersCountEl.innerText = data.totalUsers ?? 0;
    if (ordersCountEl) ordersCountEl.innerText = data.totalOrders ?? 0;
    if (productsCountEl) productsCountEl.innerText = data.totalProducts ?? 0;

    if (ordersTbody && Array.isArray(data.recentOrders)) {
      ordersTbody.innerHTML = "";
      data.recentOrders.slice(0, 10).forEach((o) => {
        const tr = document.createElement("tr");
        const id = o.id ?? o._id ?? "—";
        const user = o.userName ?? o.user ?? o.customer ?? "—";
        const total = o.total ?? o.amount ?? 0;
        const status = o.status ?? "—";
        tr.innerHTML = `<td>${id}</td><td>${user}</td><td>₹${total}</td><td>${status}</td>`;
        ordersTbody.appendChild(tr);
      });
    }
  } catch (err) {
    console.error("Dashboard Error:", err);
    notify("Error Loading Data", "Dashboard could not be refreshed.", "error");
  }
}

// Add product (admin) – only if form exists
if (productForm) {
  productForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("name", document.getElementById("pname").value.trim());
      fd.append("price", document.getElementById("pprice").value);
      fd.append("category", document.getElementById("pcat").value.trim());
      fd.append("description", document.getElementById("pdesc").value.trim());
      const fileEl = document.getElementById("pimage");
      if (!fileEl.files.length) {
        notify("No Image Selected", "Please upload a product image.", "warning");
        return;
      }
      fd.append("image", fileEl.files[0]);

      const res = await fetch(`${API_BASE}/products`, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Add product failed: ${res.status} ${txt}`);
      }

      await res.json();
      notify("Product Added", "Your product was successfully created.", "success");
      productForm.reset();
      loadDashboard();
    } catch (err) {
      console.error("Add Product Error:", err);
      notify("Error Adding Product", "Something went wrong while saving.", "error");
    }
  });
}

// Logout (admin)
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    notify("Logged Out", "See you again!", "info");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1200);
  });
}

// ===================== PAGE INITIALISATION =====================
document.addEventListener("DOMContentLoaded", () => {
  // -------- Shop page: render all products --------
  if (document.querySelector(".products-container")) {
    renderProducts(PRODUCTS);
  }

  // -------- Shop Search --------
  const shopSearch = document.getElementById("shop-search");
  if (shopSearch) {
    shopSearch.addEventListener("input", () => {
      const text = shopSearch.value.toLowerCase();
      const filtered = PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(text)
      );
      renderProducts(filtered);
    });
  }

  // -------- Category Filter (Shop vm-chip buttons) --------
  const chips = document.querySelectorAll(".vm-chip");
  if (chips.length) {
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chips.forEach((c) => c.classList.remove("vm-chip-active"));
        chip.classList.add("vm-chip-active");

        const category = chip.textContent.trim();
        if (category === "All") {
          renderProducts(PRODUCTS);
        } else {
          const filtered = PRODUCTS.filter((p) => p.category === category);
          renderProducts(filtered);
        }
      });
    });
  }

  // -------- Home: "Shop Now" scroll (only if button exists) --------
  const heroShop = document.getElementById("heroShop");
  if (heroShop) {
    heroShop.addEventListener("click", () => {
      const productsSection = document.getElementById("products");
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = "shop.html";
      }
    });
  }

  // Old shopBtn (if still used anywhere)
  const shopBtn = document.getElementById("shopBtn");
  if (shopBtn) {
    shopBtn.addEventListener("click", () => {
      window.location.href = "shop.html";
    });
  }

  // -------- Dark Mode Toggle --------
  const toggle = document.getElementById("themeToggle");

  if (toggle) {
    // Apply saved theme on load
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
      toggle.textContent = "☀️";
    }

    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");

      if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        toggle.textContent = "☀️";
      } else {
        localStorage.setItem("theme", "light");
        toggle.textContent = "🌙";
      }
    });
  }

  // -------- Dashboard load (only on admin page) --------
  loadDashboard();

  // -------- Demo notification on normal pages --------
  if (!usersCountEl && !ordersCountEl && !productsCountEl && !ordersTbody) {
    notify("VogueMart", "Premium Notification Working!", "info");
  }
});
const themeToggleMobile = document.getElementById("themeToggleMobile");

if (themeToggleMobile) {

  // Apply saved theme on load
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggleMobile.textContent = "☀️";
  }

  themeToggleMobile.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      themeToggleMobile.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      themeToggleMobile.textContent = "🌙";
    }
  });
}




