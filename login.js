// login.js
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { app } from "./firebase-init.js";

const auth = getAuth(app);

// Get form elements
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    loginError.innerText = "Please enter email and password";
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Login successful
      alert("Login Successful!");
      window.location.href = "index.html"; // redirect to homepage
    })
    .catch((error) => {
      console.error(error);
      loginError.innerText = "Login failed: " + error.message;
    });
});
