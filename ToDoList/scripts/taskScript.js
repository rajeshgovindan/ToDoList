

//Model
function Task(name, description, dueDate) {

   // var taskId = this.generateId();
    //this.Id = taskId;
    this.name = name;
    this.description = description,
    this.dueDate = dueDate;
    this.taskDate = new Date();
    this.status = "New";
    this.generateId();

};

Task.prototype.generateId = function(){
    this.id = 1;
};
Task.prototype.Save = function(){
    var task = {id : this.id,
        name : this.name,
        description : this.description,
        dueDate : this.dueDate,
        taskDate : this.taskDate,
        status : this.status
    }
    //taskStorage.setItem("ToDOTask", task);
    var taskDb = taskStorage("task");
    taskDb.Add(task);
};

//View
var view = {

    readInputValue: function () {
       
        var taskName = document.getElementById("taskNameTextBox").value;
        var taskDescription = document.getElementById("taskDescriptionTextArea").value;
        var taskDueDate = document.getElementById("dueDateTextBox").value;
        return  new Task(taskName, taskDescription, taskDueDate);

    },
    displayTasks: function (tasks) {
        var taskGridTable = document.getElementById("taskGridTable");
        
        taskGridTable.innerHTML = grid.Header
        for (var task in tasks) {
            taskGridTable.innerHTML = taskGridTable.innerHTML + grid.row(tasks[task]);
        }
        //taskGridTable.innerHTML = grid.Header + rows;
    },
    displayMessage: function (message, type) {
    },
    validate: function () {

    }
};

//Controller
function taskController() {
    var dbStorage = taskStorage("task");
    return {

        getById: function (taskId) {
        },
        getAll: function () {
            return dbStorage.get();
        },
        save: function (task) {
        },
        statusUpdate: function (taskId, status) {
        },

    };
};


//View_Events
function init() {
    var saveButton = document.getElementById("saveButton");
    saveButton.onclick = saveButton_clicked;
    var tasks = taskController().getAll();
    view.displayTasks(tasks);
};

function saveButton_clicked(){
    var task = view.readInputValue();
    task.Save();
    view.displayTasks(taskController().getAll());
};


var grid = {
    Header : "<tr><th>TaskName</th><th>Date</th><th>Due on</th><th>Status</th></tr>",
    row : function(task){
        var row = "<tr><td>" + task.name + "</td>";
        row = row + "<td>" + task.taskDate.toShortString() + "</td>";
        row = row + "<td>" + task.dueDate.toShortString() + "</td>";
        row = row + "<td>" + task.status + "</td>";
        row = row + "</tr>";
        return row ;
    },

};

//Unit testing Methods
function TestView_readInputvalue() {

    alert("called js function ");
    var task = view.readInputValue();
    task.Save();

};

function TestView_displayTasks() {
    var task = new Task("Task1", "Description 1", new Date("07/31/2014"));
    var tasks = [];
    tasks.push(task);

    tasks.push(new Task("Task2", "Description 2", new Date("01/02/2015")));
    view.displayTasks(tasks);
};

function TestModel_Task_Save() {
    var task = new Task("Task3", "Description 3", new Date("07/31/2014"));
    task.Save(task);
};

function TestController_GetAll() {
    
   // var task = new Task("Task4", "Description 4", new Date("07/31/2014"));
    var tasks = taskController().getAll();
    view.displayTasks(tasks);
};


window.onload = init;
//TestView_displayTasks();
//localStorage.removeItem("task");
//TestModel_Task_Save();
//TestController_GetAll();
