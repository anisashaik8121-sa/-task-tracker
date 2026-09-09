
// Store all tasks in an array
let tasks = [];


// Get elements from HTML
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");


// Add a new task
addTaskBtn.addEventListener("click", addTask);


// Also add task when Enter key is pressed
taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});


// Function to add a task
function addTask() {

    const taskText = taskInput.value.trim();

    // Check if input is empty
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Create a task object
    const newTask = {
        id: Date.now(),
        description: taskText,
        completed: false
    };

    // Add task to the array
    tasks.push(newTask);

    // Clear input
    taskInput.value = "";

    // Display tasks
    renderTasks();
}


// Function to display tasks
function renderTasks() {

    // Remove old tasks from the page
    taskList.innerHTML = "";

    // Put pending tasks first and completed tasks at the end
    const sortedTasks = [...tasks].sort(function(a, b) {
        return a.completed - b.completed;
    });


    // Create HTML for each task
    sortedTasks.forEach(function(task) {

        const li = document.createElement("li");
        li.className = "task-item";

        // Add completed class
        if (task.completed) {
            li.classList.add("completed");
        }


        const leftSide = document.createElement("div");
        leftSide.className = "task-left";


        // Create checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;


        // When checkbox is changed
        checkbox.addEventListener("change", function() {
            toggleTask(task.id);
        });


        // Create task text
        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.description;


        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";


        // Delete task when button is clicked
        deleteButton.addEventListener("click", function() {
            deleteTask(task.id);
        });


        // Add elements to the page
        leftSide.appendChild(checkbox);
        leftSide.appendChild(span);

        li.appendChild(leftSide);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}


// Function to mark/unmark a task
function toggleTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });

    renderTasks();
}


// Function to delete a task
function deleteTask(id) {

    tasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    renderTasks();
}
