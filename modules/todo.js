class Todo {
  constructor(description, completed = false, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }

  static add = (todo, todosArr) => {
    todosArr.push(todo);
    localStorage.setItem('todos', JSON.stringify(todosArr));
  }

  static remove = (index, todosArr) => {
    todosArr.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todosArr));
  }

  static update = (arr) => {
    localStorage.setItem('todos', JSON.stringify(arr));
  }
}

export default Todo;