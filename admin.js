// Dummy Data
let products = [
  { id: 1, name: "Phone", price: 15000, category: "Electronics" },
  { id: 2, name: "Shoes", price: 2000, category: "Fashion" }
];

let customers = [
  { id: 101, name: "Arun", email: "arun@gmail.com", totalOrders: 3 },
  { id: 102, name: "Priya", email: "priya@gmail.com", totalOrders: 5 }
];

let orders = [
  { id: "O001", user: "Arun", product: "Phone", amount: 15000, status: "Paid", date: "2024-02-10" },
  { id: "O002", user: "Priya", product: "Shoes", amount: 2000, status: "Pending", date: "2024-02-12" }
];

// Update Dashboard
function refreshStats() {
  totalUsers.innerText = customers.length;
  totalOrders.innerText = orders.length;
  totalProducts.innerText = products.length;
}

// Render all tables
function renderTables() {
  // Products
  let pt = document.querySelector("#productsTable tbody");
  pt.innerHTML = "";
  products.forEach(p => {
    pt.innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>₹${p.price}</td>
        <td>${p.category}</td>
        <td><button onclick="editProduct(${p.id})">Edit</button></td>
        <td><button onclick="deleteProduct(${p.id})">Delete</button></td>
      </tr>`;
  });

  // Customers
  let ct = document.querySelector("#customersTable tbody");
  ct.innerHTML = "";
  customers.forEach(c => {
    ct.innerHTML += `
      <tr>
        <td>${c.id}</td>
        <td>${c.name}</td>
        <td>${c.email}</td>
        <td>${c.totalOrders}</td>
      </tr>`;
  });

  // Orders
  let ot = document.querySelector("#ordersTable tbody");
  ot.innerHTML = "";
  orders.forEach(o => {
    ot.innerHTML += `
      <tr>
        <td>${o.id}</td>
        <td>${o.user}</td>
        <td>${o.product}</td>
        <td>₹${o.amount}</td>
        <td>${o.status}</td>
        <td>${o.date}</td>
        <td><button>Update</button></td>
      </tr>`;
  });
}

// Add Product
productForm.addEventListener("submit", e => {
  e.preventDefault();

  products.push({
    id: products.length + 1,
    name: pName.value,
    price: pPrice.value,
    category: pCategory.value
  });

  alert("Product Added!");
  refreshStats();
  renderTables();
  e.target.reset();
});

// Section Switching
function showSection(id) {
  document.querySelectorAll(".section").forEach(s =>
    s.classList.add("hidden")
  );
  document.getElementById(id).classList.remove("hidden");

  document.querySelectorAll(".sidebar ul li").forEach(li =>
    li.classList.remove("active")
  );
  event.target.classList.add("active");
}

// Initialize
refreshStats();
renderTables();
function logoutAdmin() {
    localStorage.removeItem("adminEmail");
    alert("Logged Out Successfully!");

    // Redirect to login page
    window.location.href = "login.html";
}
function renderOrders() {
  const ordersTable = document.querySelector("#ordersTable tbody");
  ordersTable.innerHTML = "";

  orders.forEach(o => {
    ordersTable.innerHTML += `
      <tr>
        <td>${o.id}</td>
        <td>${o.user}</td>
        <td>${o.product}</td>
        <td>₹${o.amount}</td>
        <td>${o.status}</td>
        <td>${o.date}</td>
        <td>
          <button class="delete-btn" onclick="deleteOrder('${o.id}')">Delete</button>
          <button class="view-btn" onclick="viewOrder('${o.id}')">View</button>
        </td>
      </tr>
    `;
  });
}
function deleteOrder(id) {
  if (!confirm("Are you sure you want to delete order " + id + "?")) return;

  orders = orders.filter(o => o.id !== id);
  alert("Order " + id + " deleted.");
  renderOrders();
}

function viewOrder(id) {
  alert("Opening details page for order " + id);
  // If you have a separate page:
  // window.location.href = `view-order.html?id=${id}`;
}
document.querySelector(".logoutBtn").onclick = () => {
    localStorage.removeItem("adminEmail");
    window.location.href = "login.html";
};
function logout() {
  localStorage.removeItem("adminEmail");
  window.location.href = "login.html";
}
