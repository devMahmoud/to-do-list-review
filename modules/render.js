import Todo from './todo.js';
import updateStatus from './todo-status.js';

const todosList = document.querySelector('.todos-list');
const todoInput = document.querySelector('.add-todo');
const addBtn = document.querySelector('.add');
const clearCompletedBtn = document.querySelector('.clear');
let todosArr = [];

const updateIndex = () => {
  for (let i = 0; i < todosArr.length; i += 1) {
    todosArr[i].index = i + 1;
  }
};

const updateCheckBox = (index, bool) => {
  updateStatus(index, bool, todosArr);
};

const removeTodo = (arrIndex) => {
  Todo.remove(arrIndex, todosArr);
  updateIndex();
  Todo.update(todosArr);
};

const render = () => {
  todosList.innerHTML = null;
  if (localStorage.getItem('todos')) {
    todosArr = JSON.parse(localStorage.getItem('todos'));
  }

  const editDescription = (index, ele) => {
    todosArr[index].description = ele.value;
    Todo.update(todosArr);
    render();
  };

  for (let i = 0; i < todosArr.length; i += 1) {
    const todoDiv = document.createElement('div');
    todoDiv.className = 'todo';

    const checkAndDesc = document.createElement('div');
    checkAndDesc.className = 'todo-check-desc';
    const todoCheck = document.createElement('input');
    todoCheck.type = 'checkbox';
    todoCheck.className = 'todo-check';
    const todoDesc = document.createElement('input');
    todoDesc.value = todosArr[i].description;
    todoDesc.className = 'todo-desc';
    todoDesc.readOnly = true;
    checkAndDesc.append(todoCheck, todoDesc);

    const todoOptions = document.createElement('i');
    todoOptions.classList.add('fa-solid', 'fa-ellipsis-vertical', 'todo-options');

    todoDiv.append(checkAndDesc, todoOptions);
    todosList.append(todoDiv);

    if (todosArr[i].completed) {
      todoDesc.style.textDecoration = 'line-through';
      todoCheck.checked = true;
    }

    todoDesc.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        editDescription(i, todoDesc);
      }
    });

    todoOptions.addEventListener('click', () => {
      todoDiv.style.background = '#dfdeac';
      todoDesc.readOnly = false;
      todoDesc.focus();
      if (todoOptions.classList.contains('fa-trash-can')) {
        todoDiv.remove();
        removeTodo(i);
      }
      todoOptions.classList.toggle('fa-ellipsis-vertical');
      todoOptions.classList.toggle('fa-trash-can');
    });

    todoCheck.addEventListener('change', () => {
      if (todoCheck.checked) {
        updateCheckBox(i, true);
        todoDesc.style.textDecoration = 'line-through';
      } else {
        updateCheckBox(i, false);
      }
    });
  }
};

clearCompletedBtn.addEventListener('click', () => {
  todosArr = todosArr.filter((todo) => !todo.completed);
  updateIndex();
  Todo.update(todosArr);
  render();
});

const addTodo = () => {
  if (todoInput.value) {
    const todo = new Todo(todoInput.value, false, todosArr.length + 1);
    Todo.add(todo, todosArr);
    render();
  } else {
    alert('Task description can not be empty');
  }
};

addBtn.addEventListener('click', () => {
  addTodo();
});

todoInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
});

export default render;
