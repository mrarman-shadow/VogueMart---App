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


