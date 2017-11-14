function updateCounters() {
  // Total number of todos
  var totalCount = document.getElementById('total-count');
  var totalTodos = document.getElementsByClassName("todo").length;
  totalCount.innerHTML = totalTodos;

  // Total number of completed todos
  var completedCount = document.getElementById('completed-count');
  var completedTodos = document.getElementsByClassName("completed").length;
  completedCount.innerHTML = completedTodos;

  // Total number of uncompleted todos
  var todoCount = document.getElementById('todo-count');
  var uncompletedTodos = totalTodos - completedTodos;
  todoCount.innerHTML = uncompletedTodos;
}

function toggleDone() {
  var checkbox = this;

  // check the checked status of the checkbox
  if (checkbox.checked) {
    // the "completed" class is set on the parent element, the <li>
    checkbox.parentElement.className = "todo completed";
  } else {
    checkbox.parentElement.className = "todo";
  }

  updateCounters();
}
function submitTodo() {
  var inputField = document.getElementById("new-todo");
  var newTodoTitle = inputField.value;
  createTodo(newTodoTitle);

  // reset the value of the inputField to make it empty and
  // ready to create new todos
  inputField.value = null;

  updateCounters();

}
function createTodo(title) {
  // create a list item
  var listItem = document.createElement("li");
  listItem.className = "todo";

  // create a checkbox and add it to the list item
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "todo-" + nextTodoId();
  checkbox.checked = false;
  // assign the toggleDone function on the checkbox's onchange event
  checkbox.onchange = toggleDone.bind(checkbox);
  listItem.appendChild(checkbox);

  // create some whitespace to put between the checkbox and the label
  var space = document.createTextNode(" ");
  listItem.appendChild(space);

  // create a label that holds the title and add it to the list item
  var label = document.createElement("label");
  label.htmlFor = checkbox.id;
  label.innerHTML = title;
  listItem.appendChild(label);

  // add the list item with the checkbox, the whitespace and the label to
  // the list
  var list = document.getElementById("todolist");
  list.appendChild(listItem);
}

// Every todo has it's own id so we can add that to the corresponding label's
// "for" attribute to make sure that when we click the label, the checkbox
// toggles
function nextTodoId() {
  return document.getElementsByClassName("todo").length + 1;
}

function cleanUpDoneTodos() {
  var list = document.getElementById("todolist");
  var doneItems = document.getElementsByClassName("completed");

  // Reverse loop through the done todo items so we can remove them without changing the index of the remaining items when we remove them
  for (var i = doneItems.length; i > 0; i--) {
    list.removeChild(doneItems[i-1]);
  }

  updateCounters();
}
