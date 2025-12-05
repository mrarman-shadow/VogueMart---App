// products.js
import { db } from "./firebase-init.js";
import {
  collection, getDocs, doc, deleteDoc
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

let products = [];

async function loadProducts() {
  const snap = await getDocs(collection(db, "products"));
  products = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  renderProducts(products);
}

function renderProducts(list) {
  const body = document.getElementById("productsTableBody");
  body.innerHTML = "";

  list.forEach(p => {
    body.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.name || "-"}</td>
        <td>${p.price || 0}</td>
        <td>${p.category || "-"}</td>
        <td><button class="btn btn-primary btn-sm" onclick="editProduct('${p.id}')">Edit</button></td>
        <td><button class="btn btn-danger btn-sm" onclick="deleteProduct('${p.id}')">Delete</button></td>
      </tr>`;
  });
}

window.filterProducts = () => {
  const q = document.getElementById("searchBox").value.toLowerCase();
  const filtered = products.filter(p =>
    (p.name || "").toLowerCase().includes(q) ||
    (p.category || "").toLowerCase().includes(q)
  );
  renderProducts(filtered);
};

window.editProduct = (id) => {
  window.location.href = `add-product.html?edit=${id}`;
};

window.deleteProduct = async function (id) {
  if (!confirm("Delete this product?")) return;
  await deleteDoc(doc(db, "products", id));
  loadProducts();
};

loadProducts();
