const taskInput = document.getElementById('taskInput');
const addButton = document.querySelector('.add-button');
const taskList = document.getElementById('taskList');

let tasks = [];

addButton.addEventListener('click', addTask);
taskInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const task = taskInput.value.trim();

    if (task !== '') {
        tasks.push(task);
        taskInput.value = '';
        renderTaskList();
    }
}

function renderTaskList() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${task}</span>`;
        listItem.classList.add('task-item');

        const deleteButton = createButton('Eliminar', 'delete-button', () => {
            deleteTask(index);
        });

        const editButton = createButton('Editar', 'edit-button', () => {
            editTask(index);
        });

        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('far', 'fa-trash-alt');
        deleteButton.appendChild(deleteIcon);

        const editIcon = document.createElement('i');
        editIcon.classList.add('far', 'fa-edit');
        editButton.appendChild(editIcon);

        listItem.appendChild(deleteButton);
        listItem.appendChild(editButton);
        taskList.appendChild(listItem);
    });
}

function createButton(text, className, onClick) {
    const button = document.createElement('button');
    button.classList.add(className);
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTaskList();
}

function editTask(index) {
    const task = tasks[index];
    const newTask = prompt('Editar tarea', task);

    if (newTask !== null) {
        tasks[index] = newTask.trim();
        renderTaskList();
    }
}