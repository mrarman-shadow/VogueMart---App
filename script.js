let students = [];

function addStudent() {
  const name = document.getElementById("name").value;
  const course = document.getElementById("course").value;

  if (name === "" || course === "") {
    alert("Please fill all fields!");
    return;
  }

  const student = { name, course };
  students.push(student);
  displayStudents();
  document.getElementById("name").value = "";
  document.getElementById("course").value = "";
}

function displayStudents() {
  const tableBody = document.querySelector("#studentTable tbody");
  tableBody.innerHTML = "";

  students.forEach((student, index) => {
    const row = `
      <tr>
        <td>${student.name}</td>
        <td>${student.course}</td>
        <td>
          <button onclick="editStudent(${index})">Edit</button>
          <button onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

function editStudent(index) {
  const newName = prompt("Edit name:", students[index].name);
  const newCourse = prompt("Edit course:", students[index].course);
  if (newName && newCourse) {
    students[index].name = newName;
    students[index].course = newCourse;
    displayStudents();
  }
}

function deleteStudent(index) {
  students.splice(index, 1);
  displayStudents();
}
