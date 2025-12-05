// ====================================
// VOGUEMART ADMIN - CUSTOMERS PAGE JS
// ====================================

import { db } from "./firebase-init.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

let customers = []; // storing list
const tableBody = document.getElementById("customersTableBody");
const searchBox = document.getElementById("searchBox");

// ====================================
// LOAD CUSTOMERS
// ====================================

async function loadCustomers() {
  try {
    const snap = await getDocs(collection(db, "customers"));

    customers = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    renderCustomers(customers);

  } catch (err) {
    console.error(err);
    notify("Error", "Failed to load customers", "error");
  }
}

// ====================================
// RENDER CUSTOMERS TABLE
// ====================================

function renderCustomers(list) {
  tableBody.innerHTML = "";

  list.forEach((c) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${c.id}</td>
      <td>${c.name || "-"}</td>
      <td>${c.email || "-"}</td>
      <td>${c.phone || "-"}</td>
      <td>${c.orders || 0}</td>
      <td>
        <a href="orders.html?user=${c.id}" class="btn btn-primary btn-sm">
          View Orders
        </a>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// ====================================
// SEARCH FILTER
// ====================================

window.filterCustomers = function () {
  const q = searchBox.value.toLowerCase();

  const filtered = customers.filter((c) =>
    (c.name || "").toLowerCase().includes(q) ||
    (c.email || "").toLowerCase().includes(q) ||
    (c.phone || "").toLowerCase().includes(q)
  );

  renderCustomers(filtered);
};

// ====================================
// SIDEBAR TOGGLE
// ====================================

menuBtn.onclick = () => {
  sidebar.classList.toggle("active");
  content.classList.toggle("moved");
  topnav.classList.toggle("moved");
};

// ====================================
// LOGOUT
// ====================================

document.getElementById("logoutBtn").onclick =
  document.getElementById("logoutBtn2").onclick = () => {
    localStorage.removeItem("adminEmail");
    notify("Logged Out", "See you soon!", "info");
    setTimeout(() => (window.location.href = "login.html"), 700);
  };

// ====================================
// TOAST SYSTEM
// ====================================

window.notify = function (title, msg, type = "success") {
  const toast = document.createElement("div");
  toast.className = "toast";

  let icon = "✔";
  if (type === "error") icon = "❌";
  if (type === "warning") icon = "⚠";
  if (type === "info") icon = "ℹ";

  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div>
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${msg}</div>
    </div>
  `;

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
};

// ====================================
// INITIAL LOAD
// ====================================

loadCustomers();
