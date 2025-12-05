// ====================================
// VOGUEMART ADMIN - ORDERS PAGE SCRIPT
// ====================================

import { db } from "./firebase-init.js";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// TABLE BODY
const tableBody = document.getElementById("ordersTableBody");
const searchBox = document.getElementById("searchBox");

let orders = []; // stored list

// ====================================
// LOAD ORDERS
// ====================================

async function loadOrders() {
  try {
    const snap = await getDocs(collection(db, "orders"));

    orders = snap.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));

    renderOrders(orders);

  } catch (err) {
    console.error(err);
    notify("Error", "Failed to load orders", "error");
  }
}

// ====================================
// RENDER TABLE
// ====================================

function renderOrders(list) {
  tableBody.innerHTML = "";

  list.forEach(o => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${o.id}</td>
      <td>${o.customer || "-"}</td>
      <td>${o.product || "-"}</td>
      <td>${o.date || "-"}</td>

      <td>
        <select class="form-select form-select-sm"
                onchange="updateStatus('${o.id}', this.value)">
          <option ${o.status === "Pending" ? "selected" : ""}>Pending</option>
          <option ${o.status === "Processing" ? "selected" : ""}>Processing</option>
          <option ${o.status === "Shipped" ? "selected" : ""}>Shipped</option>
          <option ${o.status === "Delivered" ? "selected" : ""}>Delivered</option>
          <option ${o.status === "Cancelled" ? "selected" : ""}>Cancelled</option>
        </select>
      </td>

      <td>₹${o.total || 0}</td>

      <td>
        <button class="btn btn-danger btn-sm" onclick="deleteOrder('${o.id}')">Delete</button>
        <button class="btn btn-primary btn-sm" onclick="viewOrder('${o.id}')">View</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

// ====================================
// SEARCH FILTER
// ====================================

window.filterOrders = function () {
  const q = searchBox.value.toLowerCase();

  const filtered = orders.filter(o =>
    o.id.toLowerCase().includes(q) ||
    (o.customer || "").toLowerCase().includes(q) ||
    (o.status || "").toLowerCase().includes(q)
  );

  renderOrders(filtered);
};

// ====================================
// UPDATE ORDER STATUS
// ====================================

window.updateStatus = async function (id, status) {
  try {
    await updateDoc(doc(db, "orders", id), { status });

    notify("Updated", `Order ${id} → ${status}`, "info");

  } catch (err) {
    console.error(err);
    notify("Error", "Failed to update status", "error");
  }
};

// ====================================
// DELETE ORDER
// ====================================

window.deleteOrder = async function (id) {
  if (!confirm(`Delete order ${id}?`)) return;

  try {
    await deleteDoc(doc(db, "orders", id));

    notify("Deleted", `Order ${id} deleted`, "error");
    loadOrders();

  } catch (err) {
    console.error(err);
    notify("Error", "Failed to delete order", "error");
  }
};

// ====================================
// VIEW ORDER POPUP
// ====================================

window.viewOrder = function (id) {
  const o = orders.find(x => x.id === id);
  if (!o) return;

  alert(`
Order ID: ${id}
Customer: ${o.customer}
Product: ${o.product}
Total: ₹${o.total}
Status: ${o.status}
Date: ${o.date}
  `);
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
  notify("Logged Out", "See you next time!", "info");
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

loadOrders();
