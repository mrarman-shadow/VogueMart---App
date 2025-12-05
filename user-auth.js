// ===== SIMPLE USER AUTH (LOCALSTORAGE ONLY) =====
// Not secure – only for project demo

const USERS_KEY = "vm_users";
const CURRENT_USER_KEY = "vm_currentUser";

// Helpers
function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

// Make logout available for index.html
window.vmUserAuth = { logoutUser };

// ===== PAGE HANDLERS =====
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const errorBox = document.getElementById("error-message");

  function showError(msg) {
    if (!errorBox) return;
    errorBox.textContent = msg;
    errorBox.style.display = "block";
  }

  // ---------- LOGIN PAGE ----------
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const btn = loginForm.querySelector("button[type='submit']");

      errorBox.style.display = "none";
      errorBox.textContent = "";

      btn.disabled = true;
      btn.textContent = "Logging in...";

      const users = loadUsers();
      const user = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!user) {
        showError("Invalid email or password");
        btn.disabled = false;
        btn.textContent = "Login";
        return;
      }

      setCurrentUser({ email: user.email });

      // Go to home page after login
      window.location.href = "index.html";
    });
  }

  // ---------- REGISTER PAGE ----------
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;
      const btn = registerForm.querySelector("button[type='submit']");

      errorBox.style.display = "none";
      errorBox.textContent = "";

      if (password !== confirmPassword) {
        showError("Passwords do not match");
        return;
      }

      let users = loadUsers();
      const exists = users.some(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (exists) {
        showError("Email already registered. Please login instead.");
        return;
      }

      btn.disabled = true;
      btn.textContent = "Creating account...";

      const newUser = { email, password };
      users.push(newUser);
      saveUsers(users);
      setCurrentUser({ email });

      // Go to home after registration
      window.location.href = "index.html";
    });
  }
});
