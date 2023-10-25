class Todo {
  constructor() {
    this.todos = [];
  }

  #generateId = () => {
    return Math.floor(Math.random() * 100).toString();
  };

  setTodosFoundInLocalStorage(localTodos) {
    this.todos = localTodos;
  }

  addTodo(val) {
    this.todos.push({ id: this.#generateId(), val });
  }

  getTodos() {
    return this.todos;
  }

  removeTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id); // (todo) has {id, val}
  }

  isEmpty() {
    return this.todos.length ? false : true;
  }
}
