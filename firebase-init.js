// firebase-init.js
// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBk37JH5gkUY-JFtsFNxC0ShS1RE1M2apE",
  authDomain: "voguemart-c9d9c.firebaseapp.com",
  projectId: "voguemart-c9d9c",
  storageBucket: "voguemart-c9d9c.firebasestorage.app",
  messagingSenderId: "1089067915182",
  appId: "1:1089067915182:web:475b331760091de748da3f",
  measurementId: "G-TR1T45MCS3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, auth, db, analytics };
