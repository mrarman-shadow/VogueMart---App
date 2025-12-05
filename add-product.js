// ====================================
// VOGUEMART ADMIN - ADD / EDIT PRODUCT
// ====================================

import { db } from "./firebase-init.js";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Get edit ID from URL
const editId = new URLSearchParams(window.location.search).get("edit");

// FORM ELEMENTS
const form = document.getElementById("productForm");
const title = document.getElementById("formTitle");
const btn = document.getElementById("submitBtn");

const pName = document.getElementById("pName");
const pPrice = document.getElementById("pPrice");
const pCategory = document.getElementById("pCategory");
const pDesc = document.getElementById("pDesc");

// ====================================
// LOAD PRODUCT FOR EDITING
// ====================================

if (editId) {
  title.innerText = "Edit Product";
  btn.innerText = "Update Product";
  loadProductData();
}

async function loadProductData() {
  try {
    const ref = doc(db, "products", editId);
    const snap = await getDoc(ref);

    if (!snap.exists()) return;

    const p = snap.data();

    pName.value = p.name;
    pPrice.value = p.price;
    pCategory.value = p.category;
    pDesc.value = p.description || "";

  } catch (err) {
    console.error("Error loading product:", err);
    notify("Error", "Failed to load product", "error");
  }
}

// ====================================
// SUBMIT FORM (ADD / UPDATE)
// ====================================

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = pName.value.trim();
  const price = pPrice.value.trim();
  const category = pCategory.value.trim();
  const description = pDesc.value.trim();

  if (!name || !price || !category) {
    notify("Error", "Please fill all fields!", "error");
    return;
  }

  try {
    if (editId) {
      // UPDATE PRODUCT
      await updateDoc(doc(db, "products", editId), {
        name,
        price,
        category,
        description
      });

      notify("Updated", "Product updated successfully", "info");
      setTimeout(() => {
        window.location.href = "products.html";
      }, 900);

    } else {
      // ADD NEW PRODUCT
      await addDoc(collection(db, "products"), {
        name,
        price,
        category,
        description,
        createdAt: Date.now()
      });

      notify("Added", "Product added successfully");
      form.reset();
    }

  } catch (err) {
    console.error("Error saving product:", err);
    notify("Error", "Failed to save product", "error");
  }
});
