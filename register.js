import { app } from "./firebase-init.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

const auth = getAuth(app);

document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const errorBox = document.getElementById("register-error");

  errorBox.textContent = "";

  if (password !== confirmPassword) {
    errorBox.textContent = "Passwords do not match!";
    return;
  }

  if (email === "voguemart@gmail.com") {
    errorBox.textContent = "Admin account cannot be created!";
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // SAVE USER
    localStorage.setItem("vm_currentUser", JSON.stringify({ email: email }));

    // Redirect normal user
    window.location.href = "index.html";

  } catch (error) {
    errorBox.textContent = "Registration failed! Try again.";
  }
});
