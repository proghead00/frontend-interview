const todo = new Todo();

function clearNode(parent) {
  parent.innerHTML = "";
}

// local storage stuff
const key = "localTodo";
function saveToLocalStorage() {
  const value = JSON.stringify(todo.getTodos());
  localStorage.setItem(key, value);
}

// check on each page reload and set it from local storage if found
(() => {
  const localTodos = localStorage.getItem(key);
  if (localTodos) {
    todo.setTodosFoundInLocalStorage(JSON.parse(localTodos));
    renderList();
  }
})();

function saveOnEnter(e) {
  if (e.key === "Enter") addTodos();
}
function clearInputField() {
  const inputField = document.querySelector(".input-field");
  inputField.value = "";
  console.log(inputField.innerText);
}

function renderList() {
  const UL = document.querySelector(".todo-list-container");
  clearNode(UL);
  todo.getTodos().map((todo) => {
    // (todo) example -> {id: 34, val: 'ds'}

    const LI = document.createElement("li");
    LI.classList.add("todo-list");

    const INPUT = document.createElement("input");
    INPUT.type = "text";
    INPUT.classList.add("input-field");
    INPUT.value = todo.val;
    INPUT.setAttribute("disabled", "");
    INPUT.setAttribute("id", `input${todo.id}`);

    const CROSS = document.createElement("span");
    CROSS.classList.add("cross");
    CROSS.innerText = "❌";
    CROSS.setAttribute("id", todo.id);

    const DIV = document.createElement("div");

    DIV.appendChild(INPUT);
    DIV.appendChild(CROSS);

    LI.appendChild(DIV);
    UL.appendChild(LI);
  });

  saveToLocalStorage();
}

function addTodos() {
  const todoInput = document.querySelector(".input-field");
  const inputValue = todoInput.value;

  console.log(inputValue);

  if (inputValue === "") {
    alert("Enter a valid Todo!");
    return;
  }

  todo.addTodo(inputValue);
  console.log(todo);
  clearInputField();
  renderList();
}

function removeTodos(e) {
  if (e && e.target && e.target.nodeName === "SPAN" && e.target.id) {
    todo.removeTodo(e.target.id);
    renderList();
  }
}

function editTodo(e) {
  const id = e.target.id;
  const inputBox = document.querySelector("#" + id);
  inputBox.removeAttribute("disabled");

  // save when Enter is pressed
  inputBox.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      inputBox.setAttribute("disabled", "true");
    }
  });

  // click anywhere outside to save the edited todo
  document.addEventListener("click", function (event) {
    if (event.target !== inputBox) {
      inputBox.setAttribute("disabled", "true");
    }
  });
}
