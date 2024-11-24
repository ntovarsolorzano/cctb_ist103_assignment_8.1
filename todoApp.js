// Array to hold task objects
let tasks = [];

// Add a new task
function addTask(description, priority) {
    if (!description || !priority) {
        alert("Description and priority are required.");
        return;
    }

    if (!["high", "medium", "low"].includes(priority.toLowerCase())) {
        alert("Priority must be 'high', 'medium', or 'low'.");
        return;
    }

    const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1; // Generate unique ID
    tasks.push({ id, description, priority: priority.toLowerCase() });
    alert(`Task Added: ${description} (${priority})`);
    displayTasksInHTML();
}

// Display all tasks
function displayTasks() {
    console.clear();
    console.log("To-Do List:");
    if (tasks.length === 0) {
        console.log("No tasks available.");
    } else {
        tasks.forEach(task => {
            console.log(`ID: ${task.id}, Description: ${task.description}, Priority: ${task.priority}`);
        });
    }
}

// Delete a task by ID
function deleteTask(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        alert(`Task with ID ${id} not found.`);
        return;
    }
    tasks.splice(taskIndex, 1);
    alert(`Task with ID ${id} deleted.`);
    displayTasksInHTML();
}

// Show tasks by priority
function filterByPriority(priority) {
    const filteredTasks = tasks.filter(task => task.priority === priority.toLowerCase());
    if (filteredTasks.length === 0) {
        alert(`No tasks found with priority: ${priority}`);
    } else {
        let message = `Tasks with priority '${priority}':\n`;
        filteredTasks.forEach(task => {
            message += `ID: ${task.id}, Description: ${task.description}\n`;
        });
        alert(message);
    }
}

// Interactive menu using dialog boxes
function interactiveMenu() {
    let option;
    do {
        option = prompt(`Choose an option:
        1. Add Task
        2. View All Tasks
        3. Delete Task
        4. Filter by Priority
        5. Exit`);

        switch (option) {
            case '1':
                const description = prompt("Enter task description:");
                const priority = prompt("Enter task priority (high, medium, low):");
                addTask(description, priority);
                break;
            case '2':
                displayTasks();
                break;
            case '3':
                const idToDelete = parseInt(prompt("Enter Task ID to delete:"));
                if (!isNaN(idToDelete)) {
                    deleteTask(idToDelete);
                } else {
                    alert("Invalid ID.");
                }
                break;
            case '4':
                const priorityToFilter = prompt("Enter priority to filter (high, medium, low):");
                filterByPriority(priorityToFilter);
                break;
            case '5':
                alert("Exiting application.");
                break;
            default:
                alert("Invalid option!");
        }
    } while (option !== '5');
}

// Display tasks in the HTML document
function displayTasksInHTML() {
    const taskContainer = document.getElementById("task-container");
    taskContainer.innerHTML = ""; // Clear previous tasks
    if (tasks.length === 0) {
        taskContainer.innerHTML = "<li>No tasks available.</li>";
    } else {
        tasks.forEach(task => {
            const listItem = document.createElement("li");
            listItem.textContent = `ID: ${task.id}, Description: ${task.description}, Priority: ${task.priority}`;
            taskContainer.appendChild(listItem);
        });
    }
}
