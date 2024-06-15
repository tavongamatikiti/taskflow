const modal = document.querySelector(".modal");
const modalBtn = document.querySelector(".add-btn");
const modalClose = document.getElementById("modal-close");
const tasks = document.getElementById("tasks");
const textInput = document.getElementById("textInput");
const dateInput = document.getElementById("dateInput");
const textArea = document.getElementById("textarea");
const message = document.getElementById("message");
const form = document.getElementById("modal-body");
const updateBtn = document.getElementById("update");
const addBtn = document.getElementById("add");

let data = [];
let currentEditIndex = null;

function saveDataToLocalStorage() {
  localStorage.setItem("tasksData", JSON.stringify(data));
}

function loadDataFromLocalStorage() {
  const tasksData = localStorage.getItem("tasksData");
  if (tasksData) {
    data = JSON.parse(tasksData);
    createTaskList();
  }
}

function openModal() {
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
  resetForm();
}

function createTask(e) {
  e.preventDefault();
  if (textInput.value.trim() === "") {
    message.innerHTML = "Task Title cannot be empty";
    message.style.color = "";
    return message;
  }

  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textArea.value,
  });

  createTaskList();
  closeModal();
  saveDataToLocalStorage();
}

function updateTask(e) {
  e.preventDefault();
  if (textInput.value.trim() === "") {
    message.innerHTML = "Task Title cannot be empty";
    return message;
  }

  data[currentEditIndex] = {
    text: textInput.value,
    date: dateInput.value,
    description: textArea.value,
  };

  createTaskList();
  closeModal();
  saveDataToLocalStorage();
  currentEditIndex = null;
}

function createTaskList() {
  let taskContent = "";

  data.forEach((task, index) => {
    taskContent += `
      <div class="task-content" id="task-${index}">
        <span class="task-subheading">${task.text}</span>
        <span class="task-date">${task.date}</span>
        <p class="task-description">${task.description}</p>
  
        <span class="task-options">
          <i onclick="editTask(${index})" class="fas fa-edit" id="update"></i>
          <i onclick="deleteTask(${index})" class="fas fa-trash-alt"></i>
          <i onclick="toggleComplete(${index})" class="fas ${task.completed ? "fa-undo" : "fa-check"}"></i>
        </span>
      </div>
    `;
  });
  tasks.innerHTML = taskContent;
}

function resetForm() {
  textInput.value = "";
  dateInput.value = "";
  textArea.value = "";
  message.innerHTML = "";
  addBtn.style.display = "block";
  updateBtn.style.display = "none";
  form.removeEventListener("submit", updateTask);
  form.addEventListener("submit", createTask);
}

function editTask(index) {
  currentEditIndex = index;
  const task = data[index];
  textInput.value = task.text;
  dateInput.value = task.date;
  textArea.value = task.description;

  addBtn.style.display = "none";
  updateBtn.style.display = "block";
  form.removeEventListener("submit", createTask);
  form.addEventListener("submit", updateTask);
  openModal();
  console.log("Edit task with index", index);
}

function deleteTask(index) {
  data.splice(index, 1);
  saveDataToLocalStorage();
  createTaskList();
}

function toggleComplete(index) {
  data[index].completed = !data[index].completed;
  saveDataToLocalStorage();
  createTaskList();
}

modalBtn.addEventListener("click", openModal);
modalClose.addEventListener("click", closeModal);
window.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeModal();
  }
});
window.addEventListener("DOMContentLoaded", function () {
  loadDataFromLocalStorage();
});
form.addEventListener("submit", createTask);
