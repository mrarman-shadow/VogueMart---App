// admin-dashboard.js
// Uses: firebase-init.js (your VogueMart project)

import { db } from "./firebase-init.js";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Firestore collections
const productsCol = collection(db, "products");
const customersCol = collection(db, "customers");
const ordersCol   = collection(db, "orders");

// -----------------------------
// 1. DASHBOARD COUNTS
// -----------------------------
async function loadCounts() {
  const [customersSnap, ordersSnap, productsSnap] = await Promise.all([
    getDocs(customersCol),
    getDocs(ordersCol),
    getDocs(productsCol),
  ]);

  document.getElementById("totalUsers").textContent    = customersSnap.size;
  document.getElementById("totalOrders").textContent   = ordersSnap.size;
  document.getElementById("totalProducts").textContent = productsSnap.size;
}

// -----------------------------
// 2. LOAD PRODUCTS
// -----------------------------
async function loadProducts() {
  const snap = await getDocs(productsCol);
  const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));

  const body = document.querySelector("#productsTable tbody");
  body.innerHTML = "";

  list.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.id}</td>
      <td>${p.name || "-"}</td>
      <td>₹${p.price ?? ""}</td>
      <td>${p.category || "-"}</td>
      <td><button class="edit-btn" data-id="${p.id}">Edit</button></td>
      <td><button class="delete-btn" data-id="${p.id}">Delete</button></td>
    `;
    body.appendChild(tr);
  });

  // Simple delete handler
  body.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;
      if (!confirm(`Delete product ${id}?`)) return;
      await deleteDoc(doc(db, "products", id));
      alert("Product deleted");
      await loadProducts();
      await loadCounts();
    });
  });

  // Simple edit (just alert for now, you can expand later)
  body.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      alert(`Edit feature demo only. Product ID: ${id}`);
    });
  });
}

// -----------------------------
// 3. ADD PRODUCT FORM
// -----------------------------
const productForm = document.getElementById("productForm");

productForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name     = document.getElementById("pName").value.trim();
  const price    = Number(document.getElementById("pPrice").value);
  const category = document.getElementById("pCategory").value.trim();
  const desc     = document.getElementById("pDesc").value.trim();
  const imageInp = document.getElementById("pImage");

  // Just store filename (no upload to Storage to keep it simple)
  const imageName = imageInp.files[0] ? imageInp.files[0].name : "";

  if (!name || !price || !category) {
    alert("Please fill all fields");
    return;
  }

  await addDoc(productsCol, {
    name,
    price,
    category,
    description: desc,
    image: imageName,
    createdAt: serverTimestamp(),
  });

  alert("Product added to Firestore!");
  productForm.reset();

  await loadProducts();
  await loadCounts();
});

// -----------------------------
// 4. LOAD CUSTOMERS
// -----------------------------
async function loadCustomers() {
  const snap = await getDocs(customersCol);
  const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));

  const body = document.querySelector("#customersTable tbody");
  body.innerHTML = "";

  list.forEach(c => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.id}</td>
      <td>${c.name || "-"}</td>
      <td>${c.email || "-"}</td>
      <td>${c.orders || 0}</td>
    `;
    body.appendChild(tr);
  });
}

// -----------------------------
// 5. LOAD ORDERS
// -----------------------------
async function loadOrders() {
  const snap = await getDocs(ordersCol);
  const list = snap.docs.map(d => ({ id: d.id, ...d.data() }));

  // Full Orders table
  const body = document.querySelector("#ordersTable tbody");
  body.innerHTML = "";

  list.forEach(o => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${o.id}</td>
      <td>${o.customer || "-"}</td>
      <td>${o.product || "-"}</td>
      <td>₹${o.total ?? ""}</td>
      <td>${o.status || "-"}</td>
      <td>${o.date || "-"}</td>
      <td><button class="view-btn" data-id="${o.id}">View</button></td>
    `;
    body.appendChild(tr);
  });

  body.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const o  = list.find(x => x.id === id);
      if (!o) return;
      alert(
        `Order ID: ${id}\n` +
        `Customer: ${o.customer}\n` +
        `Product: ${o.product}\n` +
        `Total: ₹${o.total}\n` +
        `Status: ${o.status}\n` +
        `Date: ${o.date}`
      );
    });
  });

  // Recent Orders (top 5)
  const recentBody = document.querySelector("#recentOrdersTable tbody");
  recentBody.innerHTML = "";
  list.slice(0, 5).forEach(o => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${o.id}</td>
      <td>${o.customer || "-"}</td>
      <td>₹${o.total ?? ""}</td>
      <td>${o.status || "-"}</td>
    `;
    recentBody.appendChild(tr);
  });
}

// -----------------------------
// 6. INITIAL LOAD
// -----------------------------
window.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadCounts();
    await loadProducts();
    await loadCustomers();
    await loadOrders();
  } catch (err) {
    console.error("Admin dashboard load error:", err);
    alert("Error loading admin data. Check console for details.");
  }
});
