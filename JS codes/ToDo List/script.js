document.getElementById('add-btn').addEventListener('click', addTask);
document.getElementById('next-btn').addEventListener('click', strikeNextTask);
document.getElementById('all-btn').addEventListener('click', strikeAllTasks);
document.getElementById('incomplete-btn').addEventListener('click', showIncompleteTasks);
document.getElementById('complete-btn').addEventListener('click', showCompletedTasks);
let tasks = [];
let lastCompletedIndex = -1; // Keeps track of the last completed task index
function  addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
    const task = {
        text: taskText,
        completed: false
    };
    tasks.push(task);
    taskInput.value = ''; // Clear input
    renderTasks();
}
function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.toggle('completed', task.completed);
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskItem.appendChild(taskText);
        const deleteBtn = document.createElement('buƩon');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTask(index));
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
    }
          );
}
function deleteTask(index) {
    tasks.splice(index, 1);
    if (index <= lastCompletedIndex) {
        lastCompletedIndex--;
    }
    renderTasks();
}
function strikeNextTask() {
    // Find the next incomplete task aŌer the last completed one
    const nextTask = tasks.find((task, index) => !task.completed && index > lastCompletedIndex);
    if (nextTask) {
        nextTask.completed = true;
        lastCompletedIndex = tasks.indexOf(nextTask); // Update the last completed task index
        renderTasks();
    }
}
function strikeAllTasks() {
    tasks.forEach(task => task.completed = true); // Mark all tasks as completed
    lastCompletedIndex = tasks.length - 1; // Update the last completed task index to the last task
    renderTasks();
}
function showAllTasks() {
    renderTasks();
}
function showIncompleteTasks() {
    const incompleteTasks = tasks.filter(task => !task.completed);
    renderFilteredTasks(incompleteTasks);
}
function showCompletedTasks() {
    const completedTasks = tasks.filter(task => task.completed);
    renderFilteredTasks(completedTasks);
}
function renderFilteredTasks(filteredTasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.toggle('completed', task.completed);
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        taskItem.appendChild(taskText);
        const deleteBtn = document.createElement('buƩon');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTask(index));
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
    });
}
