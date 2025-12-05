import { app } from "./firebase-init.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const auth = getAuth(app);

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const error = document.getElementById("login-error");

  error.textContent = "";

  try {
    await signInWithEmailAndPassword(auth, email, password);

    // Save logged-in user
    localStorage.setItem("vm_currentUser", JSON.stringify({ email }));

    // Check if admin
    if (email === "voguemart@gmail.com") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "index.html";
    }

  } catch (err) {
    error.textContent = "Invalid email or password.";
  }
});

