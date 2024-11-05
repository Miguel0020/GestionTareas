const taskForm = document.querySelector('#taskForm');
const taskContainer = document.querySelector('#taskContainer');
const taskList = JSON.parse(localStorage.getItem('taskList')) || [];

taskForm.addEventListener('submit', event => {
    event.preventDefault();

    const task = {
        title: event.target.title.value,
        description: event.target.description.value,
        dueDate: event.target.dueDate.value,
        category: event.target.category.value,
        status: "todo" 
    };

    taskList.push(task);
    localStorage.setItem('taskList', JSON.stringify(taskList));

    renderTasks();
    taskForm.reset();
});

document.querySelector('#clear').addEventListener('click', () => {
    taskForm.reset();
});

function renderTasks() {
    document.querySelector('#todo').innerHTML = "<h3>To Do</h3>";
    document.querySelector('#doing').innerHTML = "<h3>Doing</h3>";
    document.querySelector('#done').innerHTML = "<h3>Done</h3>";

    taskList.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.innerHTML = `
            <div>
                <strong>${task.title}</strong>
                <p>${task.description}</p>
                <p>Due: ${task.dueDate}</p>
            </div>
            <div class="task-buttons">
                ${task.status !== 'todo' ? `<button onclick="updateTaskStatus(${index}, 'todo')">To Do</button>` : ''}
                ${task.status !== 'doing' ? `<button onclick="updateTaskStatus(${index}, 'doing')">Doing</button>` : ''}
                ${task.status !== 'done' ? `<button onclick="updateTaskStatus(${index}, 'done')">Done</button>` : ''}
                <button onclick="deleteTask(${index})">Eliminar</button>
            </div>
        `;

        // Se añade la tarea a la columna correspondiente según su estado
        document.querySelector(`#${task.status}`).appendChild(taskDiv);
    });
}

function updateTaskStatus(index, newStatus) {
    taskList[index].status = newStatus;
    localStorage.setItem('taskList', JSON.stringify(taskList));
    renderTasks(); 
}

function deleteTask(index) {
    taskList.splice(index, 1);
    localStorage.setItem('taskList', JSON.stringify(taskList));
    renderTasks();
}

renderTasks();
