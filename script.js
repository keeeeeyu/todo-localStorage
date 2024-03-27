"use strict";

// Elements
const listsEl = document.querySelector(".lists");
const inputEl = document.querySelector(".form-input");
const alertEl = document.querySelector(".alert-text");
const btnAddEl = document.querySelector(".btn--add");
const btnClearEl = document.querySelector(".btn--clear-all");
const spanEl = document.querySelector("span");

const storage = localStorage;
let uniqueId = 0;

// storage.clear();
// Event listener
btnAddEl.addEventListener("click", addTask);
btnClearEl.addEventListener("click", clearAll);
listsEl.addEventListener("click", toggleListChecked);

// Functions

function addTask() {
  const task = inputEl.value.trim();

  if (task) {
    while (true) {
      if (!storage.getItem(uniqueId)) {
        storage.setItem(uniqueId, task);
        inputEl.value = "";
        break;
      } else {
        uniqueId++;
      }
    }

    createAndDisplayTask(uniqueId);
    alertEl.style.opacity = 0;
    uniqueId++;
  } else {
    alertEl.style.opacity = 1;
  }

  inputEl.value = "";
}

function createAndDisplayTask(id) {
  const listEl = document.createElement("li");
  const spanEl = document.createElement("span");
  const iconEl = document.createElement("ion-icon");

  listEl.classList.add("list");
  iconEl.classList.add("icon");
  iconEl.setAttribute("name", "checkmark-outline");

  listsEl.appendChild(listEl);
  listEl.appendChild(spanEl);
  spanEl.textContent = storage.getItem(id);
  listEl.appendChild(iconEl);
}

function displayStoredTasks() {
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);

    createAndDisplayTask(key);
  }
}

displayStoredTasks();

function clearAll() {
  storage.clear();
  uniqueId = 0;

  window.location.reload();
}

function toggleListChecked(e) {
  const selectedTask = e.target;
  if (selectedTask.classList.contains("icon")) {
    const parent = selectedTask.parentElement;
    selectedTask.classList.toggle("list-icon-check");
    parent.querySelector("span").classList.toggle("list-text");
  }
}
