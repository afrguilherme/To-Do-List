const button = document.querySelector(".button-add-task");
const input = document.querySelector(".input-task");
const completeList = document.querySelector(".tasks-list");

let MyTaskList = [];

function addNewTask() {
  MyTaskList.push({
    task: input.value,
    complete: false,
  });

  input.value = "";

  showNewTask();
}

function showNewTask() {
  let newList = "";

  MyTaskList.forEach((item, index) => {
    newList =
      newList +
      `
    <li class="task ${item.complete && "done"}">
    <img src="./assets/checked.png" alt="checked-icon" onclick="completeTask(${index})"/>
    <p>${item.task}</p>
    <img src="./assets/trash.png" alt="delete-icon" onclick="deleteItem(${index})" />
    </li>
    `;
  });

  completeList.innerHTML = newList;

  localStorage.setItem("list", JSON.stringify(MyTaskList));
}

function completeTask(index) {
  MyTaskList[index].complete = !MyTaskList[index].complete;

  showNewTask();
}

function deleteItem(index) {
  MyTaskList.splice(index, 1);

  showNewTask();
}

function resetTasks() {
  const localStorageTasks = localStorage.getItem("list");

  if (localStorageTasks) {
    MyTaskList = JSON.parse(localStorageTasks);
  }

  showNewTask();
}

resetTasks();
button.addEventListener("click", addNewTask);
