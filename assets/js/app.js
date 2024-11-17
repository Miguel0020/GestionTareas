const taskForm = document.querySelector('#taskForm');
const taskContainer = document.querySelector('#taskContainer');
const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
const personForm = document.querySelector('#personForm');
const personList = document.querySelector('#personList ul');
const responsibleSelect = document.querySelector('#responsible');
const personArray = JSON.parse(localStorage.getItem('personArray')) || [];

document.addEventListener('DOMContentLoaded', () => {
    // Cargar personas responsables y tareas al iniciar la página
    renderPersonList();
    updateResponsibleSelect();
    renderTasks();
});

// Formulario para crear personas responsables
personForm.addEventListener('submit', event => {
    event.preventDefault();
    const personName = event.target.personName.value.trim();
    if (!personName) return;

    personArray.push(personName);
    localStorage.setItem('personArray', JSON.stringify(personArray));

    renderPersonList();
    updateResponsibleSelect();
    personForm.reset();
});

function renderPersonList() {
    personList.innerHTML = ''; 

    personArray.forEach((person, index) => {
        const li = document.createElement('li');
        li.textContent = person;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = () => deletePerson(index);

        li.appendChild(deleteButton);
        personList.appendChild(li);
    });
}

function updateResponsibleSelect() {
    responsibleSelect.innerHTML = '<option value="" disabled selected>Seleccione una persona</option>';
    personArray.forEach(person => {
        const option = document.createElement('option');
        option.value = person;
        option.textContent = person;
        responsibleSelect.appendChild(option);
    });
}

function deletePerson(index) {
    personArray.splice(index, 1);

    localStorage.setItem('personArray', JSON.stringify(personArray));

    renderPersonList();
    updateResponsibleSelect();
}


// Crear tarea 
taskForm.addEventListener('submit', event => {
    event.preventDefault();
    const selectedOptions = Array.from(event.target.responsible.selectedOptions).map(option => option.value);

    const task = {
        title: event.target.title.value,
        description: event.target.description.value,
        dueDate: event.target.dueDate.value,
        category: event.target.category.value,
        responsible: selectedOptions, 
        status: 'todo'
    };

    taskList.push(task);
    localStorage.setItem('taskList', JSON.stringify(taskList));

    renderTasks();
    taskForm.reset();
});

document.querySelector('#limpiar').addEventListener('click', () => {
    taskForm.reset();
});

// Mostrar las tareas 
function renderTasks() {
    document.querySelector('#todo').innerHTML = '<h3>Por Hacer</h3>';
    document.querySelector('#doing').innerHTML = '<h3>En Progreso</h3>';
    document.querySelector('#done').innerHTML = '<h3>Completadas</h3>';

    taskList.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        taskDiv.innerHTML = `
            <div>
                <strong>${task.title}</strong>
                <p>${task.description}</p>
                <p>Fecha Límite: ${task.dueDate}</p>
                <p>Responsable: ${task.responsible}</p>
                <p>Categoria: ${task.category}</p>                
            </div>
            <div class="task-buttons">
                ${task.status !== 'todo' ? `<button onclick="updateTaskStatus(${index}, 'todo')">Por Hacer</button>` : ''}
                ${task.status !== 'doing' ? `<button onclick="updateTaskStatus(${index}, 'doing')">En Progreso</button>` : ''}
                ${task.status !== 'done' ? `<button onclick="updateTaskStatus(${index}, 'done')">Completadas</button>` : ''}
                <button onclick="deleteTask(${index})">Eliminar</button>
            </div>
        `;

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


