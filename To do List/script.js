
let tasks = [];


const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const totalTasksSpan = document.getElementById('total-tasks');
const completedTasksSpan = document.getElementById('completed-tasks');
const progressBar = document.getElementById('progress');
const numbersDiv = document.getElementById('numbers');

// Add task
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const text = taskInput.value.trim();
    
    if (text) {
        tasks.push({
            text: text,
            completed: false
        });
        taskInput.value = '';
        updateTasksList();
        updateStats();
    }
});

// Update tasks list
function updateTasksList() {
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'task-item';
        
        listItem.innerHTML = `
            <div class="task">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            </div>
            <button class="delete-btn" onclick="deleteTask(${index})">×</button>
        `;
        
        taskList.appendChild(listItem);
    });
}


function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
}


function deleteTask(index) {
    tasks.splice(index, 1);
    updateTasksList();
    updateStats();
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    
    totalTasksSpan.textContent = total;
    completedTasksSpan.textContent = completed;
    numbersDiv.textContent = `${completed}/${total}`;
    
 
    if (total > 0) {
        const percentage = (completed / total) * 100;
        progressBar.style.width = percentage + '%';
    } else {
        progressBar.style.width = '0%';
    }
}


updateStats();
