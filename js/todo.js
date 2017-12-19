const todoList = {
    todos: [],
    //add a new task to todo list
    addTodo(todoText) {
	this.todos.push({
	    todoText,
	    completed: false,
	});
    },
    //change the task in todo list
    changeTodo(position, todoText) {
	this.todos[position].todoText = todoText;
    },
    //delete the task in todo list
    deleteTodo(position) {
	this.todos.splice(position, 1);
    },
    //toggle the task
    toggleCompleted(position) {
	this.todos[position].completed = !this.todos[position].completed;
    },
    //toggle all tasks
    toggleAll() {
	const statusAll = [];
	this.todos.forEach((todo) => {
	    statusAll.push(todo.completed);
	});
	this.todos.forEach((todo) => {
	    if (statusAll.indexOf(false) === -1) {
		todo.completed = false;
	    } else {
		todo.completed = true;
	    }
	});
    },
};

const handlers = {
    addTodo() {
	const addTodoTextInput = document.querySelector('.addTodo');
	todoList.addTodo(addTodoTextInput.value);
	addTodoTextInput.value = '';
	view.displayTodos();
    },
    changeTodo(position) {
	view.displayTodos(position);
    },
    saveChangeTodo(position) {
	const changeTodoTextInput = document.querySelector('.change-todo-text-input');
	todoList.changeTodo(position, changeTodoTextInput.value);
	view.displayTodos();
    },
    deleteTodo(position) {
	todoList.deleteTodo(position);
	view.displayTodos();
    },
    toggleCompleted(position) {
	todoList.toggleCompleted(position);
	view.displayTodos();
    },
    toggleAll() {
	todoList.toggleAll();
	view.displayTodos();
    },
};

const view = {
    
    displayTodos(position) {
	const todosUl = document.querySelector('ul');
	todosUl.innerHTML = '';
	
	for (let i = 0; i < todoList.todos.length; i++) {
	    const todoLi = document.createElement('li');
	    
	    todosUl.appendChild(todoLi);
	    todoLi.id = i;
	    
	    todoLi.appendChild(this.createCheckbox());
	    document.querySelector(`li:nth-of-type(${i + 1}) > input[type='checkbox']`).checked = todoList.todos[i].completed;
	    
	    if (position === i) {
		todoLi.appendChild(this.createChangeTextbox(todoList.todos[i].todoText));
		document.querySelector('.change-todo-text-input').focus();
	    } else {
		todoLi.appendChild(this.createTodoText(todoList.todos[i].todoText));
		if (todoList.todos[i].completed) {
		    document.querySelector(`li:nth-of-type(${i + 1}) > label`).style.textDecoration = 'line-through';
		}
	    }
	    todoLi.appendChild(this.createDeleteButton());
	}
    },
    createCheckbox() {
	const checkbox = document.createElement('input');
	checkbox.className = 'toggle-todo-checkbox';
	checkbox.type = 'checkbox';
	return checkbox;
    },
    createTodoText(content) {
	const label = document.createElement('label');
	label.className = 'todo-text';
	label.textContent = content;
	return label;
    },
    createDeleteButton() {
	const deleteButton = document.createElement('img');
	deleteButton.className = 'delete-button';
	deleteButton.src = 'assets/icons/delete.png';
	return deleteButton;
    },
    createChangeTextbox(content) {
	const changeTextbox = document.createElement('input');
	changeTextbox.placeholder = content;
	changeTextbox.className = 'change-todo-text-input';
	changeTextbox.type = 'text';
	return changeTextbox;
    },
    setUpEventListeners() {
	const todosUl = document.querySelector('ul');
	
	todosUl.addEventListener('click', (e) => {
	    if (e.target.className === 'delete-button') {
		handlers.deleteTodo(parseInt(e.target.parentNode.id));
	    } else if (e.target.className === 'toggle-todo-checkbox') {
		handlers.toggleCompleted(parseInt(e.target.parentNode.id));
	    } else if (e.target.className === 'todo-text') {
		handlers.changeTodo(parseInt(e.target.parentNode.id));
	    }
	});
	todosUl.addEventListener('keypress', (e) => {
	    if (e.keyCode === 13) {
		handlers.saveChangeTodo(parseInt(e.target.parentNode.id));
	    }
	});
	document.querySelector('.addTodo').addEventListener('keypress', (e) => {
	    if (e.keyCode === 13) {
		handlers.addTodo(parseInt(e.target.parentNode.id));
	    }
	});
	document.querySelector('.completeAll').addEventListener('click', () => {
	    handlers.toggleAll();
	});
    },
};

view.setUpEventListeners();
