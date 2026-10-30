let students = JSON.parse(localStorage.getItem("students")) || [];

const form = document.getElementById("studentForm");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const studentsList = document.getElementById("studentsList");
const emptyMsg = document.getElementById("emptyMsg");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !email) {
    alert("Please fill all fields!");
    return;
  }

  const newStudent = {
    id: Date.now(),
    name: name,
    email: email,
  };

  students.push(newStudent);

  saveToLocalStorage();

  nameInput.value = "";
  emailInput.value = "";

  alert(`✅ Student "${name}" added successfully!`);

  renderStudents();
});

function saveToLocalStorage() {
  localStorage.setItem("students", JSON.stringify(students));
}

function renderStudents() {
  studentsList.innerHTML = "";

  if (students.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }
  emptyMsg.style.display = "none";

  students.forEach((student) => {
    const li = document.createElement("li");

    li.innerHTML = `
            <div>
                <strong>${student.name}</strong><br>
                <small>${student.email}</small>
            </div>
            <button class="delete" onclick="deleteStudent(${student.id})">
                Delete
            </button>
        `;

    studentsList.appendChild(li);
  });
}

function deleteStudent(id) {
  const confirmed = confirm("Are you sure you want to delete this student?");

  if (!confirmed) return;

  students = students.filter((s) => s.id !== id);

  saveToLocalStorage();
  renderStudents();
}

const loadApiBtn = document.getElementById("loadApiBtn");
const apiList = document.getElementById("apiList");

loadApiBtn.addEventListener("click", function () {
  apiList.innerHTML = "<li>⏳ Loading...</li>";

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.json();
    })
    .then((users) => {
      apiList.innerHTML = "";
      users.forEach((user) => {
        const li = document.createElement("li");
        li.innerHTML = `
                    <div>
                        <strong>${user.name}</strong><br>
                        <small>${user.email}</small>
                    </div>
                `;
        apiList.appendChild(li);
      });
    })
    .catch((error) => {
      apiList.innerHTML = `<li style="color:red;">❌ Error: ${error.message}</li>`;
    });
});

document.getElementById("askCourseBtn").addEventListener("click", function () {
  const course = prompt("What is your course name?");

  if (course) {
    alert(`🎉 Welcome to ${course}! Good luck with your studies.`);
    document.getElementById("welcomeMsg").textContent =
      `Your course: ${course}`;
  }
});

document.getElementById("refreshBtn").addEventListener("click", function () {
  window.location.reload();
});

renderStudents();
