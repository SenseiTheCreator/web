let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const sortDone = document.getElementById("sort-done-btn");
const sortUndone = document.getElementById("sort-undone-btn");

let sortMode = "undone";

sortUndone.addEventListener("click", () => {
  sortMode = "undone";
  renderTasks();
});

sortDone.addEventListener("click", () => {
  sortMode = "done";
  renderTasks();
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const text = input.value.trim();
    if (text !== "") {
      tasks.push({
        id: Date.now(),
        text: text,
        date: formatDate(new Date()),
        done: false,
      });
      input.value = "";
      saveTasks();
      renderTasks();
    }
  }
});

function renderTasks() {
  list.innerHTML = "";

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortMode === "undone") {
      return a.done - b.done; // undone sort up
    } else {
      return b.done - a.done; // done sort up
    }
  });
  sortedTasks.forEach((task) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
      task.done = true;
      saveTasks();
      renderTasks();
    });

    const textSpan = document.createElement("span");
    textSpan.className = "task-text";
    textSpan.textContent = task.text;

    textSpan.addEventListener("dblclick", () => {
      const editInput = document.createElement("input");
      editInput.className = "edit-input";
      editInput.value = task.text;

      textSpan.replaceWith(editInput);
      editInput.focus();

      editInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const newText = editInput.value.trim();
          if (newText !== "") {
            task.text = newText;
            saveTasks();
          }
          renderTasks();
        }
      });
    });

    const dateSpan = document.createElement("span");
    dateSpan.className = "task-date";
    dateSpan.textContent = task.date;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "✕";
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    if (task.done) {
      li.classList.add("done");
      li.append(textSpan, dateSpan, deleteBtn);
    } else {
      li.append(checkbox, textSpan, dateSpan, deleteBtn);
    }

    list.append(li);
  });
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year}, ${hours}:${minutes}`;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

renderTasks();
