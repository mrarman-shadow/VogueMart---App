// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc }
  from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC-KHJ028kzoYJUkGbBRVPAvzm7u2ZoRCI",
  authDomain: "web-dev-bac39.firebaseapp.com",
  projectId: "web-dev-bac39",
  storageBucket: "web-dev-bac39.firebasestorage.app",
  messagingSenderId: "954602183053",
  appId: "1:954602183053:web:e5a0797c35b2d8a5c6c5c4",
  measurementId: "G-Q0JQ8K3LSW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// === Local data ===
let students = [];

// DOM elements
const nameInput = document.getElementById("name");
const courseInput = document.getElementById("course");
const tableBody = document.querySelector("#studentTable tbody");

// === Load data from Firestore ===
async function loadStudents() {
  tableBody.innerHTML = "<tr><td colspan='3'>Loading...</td></tr>";
  students = [];

  const querySnapshot = await getDocs(collection(db, "students"));
  querySnapshot.forEach((docSnap) => {
    students.push({ id: docSnap.id, ...docSnap.data() });
  });

  renderTable();
}

// === Render table instantly ===
function renderTable() {
  tableBody.innerHTML = "";
  students.forEach((student) => {
    const row = `
      <tr id="${student.id}">
        <td>${student.name}</td>
        <td>${student.course}</td>
        <td>
          <button onclick="editStudent('${student.id}')">Edit</button>
          <button onclick="deleteStudent('${student.id}')">Delete</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });

  if (students.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='3'>No students yet</td></tr>";
  }
}

// === Add student ===
window.addStudent = async function () {
  const name = nameInput.value.trim();
  const course = courseInput.value.trim();

  if (!name || !course) {
    alert("Please fill all fields!");
    return;
  }

  // Add locally first (instant)
  const tempId = "local_" + Date.now();
  const newStudent = { id: tempId, name, course };
  students.push(newStudent);
  renderTable();

  // Clear input
  nameInput.value = "";
  courseInput.value = "";

  // Then add to Firebase (background)
  try {
    const docRef = await addDoc(collection(db, "students"), { name, course });
    // Replace local ID with Firebase ID
    const index = students.findIndex((s) => s.id === tempId);
    if (index !== -1) students[index].id = docRef.id;
    renderTable();
  } catch (error) {
    console.error("Error adding student:", error);
    alert("Network error while saving to Firebase.");
  }
};

// === Edit student ===
window.editStudent = async function (id) {
  const student = students.find((s) => s.id === id);
  if (!student) return;

  const newName = prompt("Edit name:", student.name);
  const newCourse = prompt("Edit course:", student.course);

  if (newName && newCourse) {
    // Update instantly in local list
    student.name = newName;
    student.course = newCourse;
    renderTable();

    // Update in Firebase
    if (!id.startsWith("local_")) {
      await updateDoc(doc(db, "students", id), {
        name: newName,
        course: newCourse,
      });
    }
  }
};

// === Delete student ===
window.deleteStudent = async function (id) {
  // Remove locally first
  students = students.filter((s) => s.id !== id);
  renderTable();

  // Delete from Firebase
  if (!id.startsWith("local_")) {
    await deleteDoc(doc(db, "students", id));
  }
};

// Initial load
loadStudents();
