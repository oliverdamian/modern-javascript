const
	form = document.querySelector('#task-form'),
	taskList = document.querySelector('.collection'),
	clearBtn = document.querySelector('.clear-tasks'),
	filter = document.querySelector('#filter'),
	taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners() {
	document.addEventListener('DOMContentLoaded', getTasks);

	form.addEventListener('submit', addTask);
	taskList.addEventListener('click', removeTask);
	clearBtn.addEventListener('click', clearTasks);

	filter.addEventListener('keyup', filterTasks);
}

function createTaskElement(task) {
	const li = document.createElement('li');
	const link = document.createElement('a');

	li.className = 'collection-item';
	li.appendChild(document.createTextNode(task || taskInput.value));

	link.className = 'delete-item secondary-content';
	link.innerHTML = '<i class="fa fa-remove"></i>';
	li.appendChild(link);

	taskList.appendChild(li);
}

function getTasks() {
	let tasks;

	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	}
	else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function (task) {
		createTaskElement(task);
	});
}

function addTask(e) {
	if (taskInput.value === '') {
		alert('Please add a task.');
	}

	createTaskElement(taskInput.value);
	storeTaskInLocalStorage(taskInput.value);
	taskInput.value = '';

	e.preventDefault();
}

function storeTaskInLocalStorage(task) {
	let tasks;

	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	}
	else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if (confirm('Are you sure?')) {
			e.target.parentElement.parentElement.remove();
			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

function removeTaskFromLocalStorage(taskItem) {
	let tasks;

	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	}
	else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function (task, index) {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
	taskList.innerHTML = '';
	clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
	localStorage.clear();
}

function filterTasks(e) {
	const text = e.target.value.toLowerCase();

	document.querySelectorAll('.collection-item').forEach(function (task) {
		const item = task.firstChild.textContent;

		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = 'block';
		}
		else {
			task.style.display = 'none';
		}
	});
}