const ADMIN_EMAIL = "voguemart@gmail.com";
const ADMIN_PASSWORD = "vogueadmin123";

document.getElementById("adminLoginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("adminEmail").value.trim();
    const password = document.getElementById("adminPassword").value.trim();
    const error = document.getElementById("adminError");

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem("adminLoggedIn", "true");
        window.location.href = "admin.html";
    } else {
        error.textContent = "Invalid admin credentials!";
    }
});
// admin-login.js (simplified)
const ADMIN_EMAIL = "voguemart@gmail.com";
const ADMIN_PASSWORD = "yourpassword";

document.getElementById("adminLoginForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("adminEmail").value;
  const pass  = document.getElementById("adminPassword").value;

  if (email === ADMIN_EMAIL && pass === ADMIN_PASSWORD) {
    // remember admin is logged in
    localStorage.setItem("vm_isAdmin", "true");
    window.location.href = "admin.html";   // ✅ goes to dashboard
  } else {
    document.getElementById("adminError").textContent =
      "Invalid admin credentials!";
  }
});

