

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
    this.id = taskStorage().NextId();
};
Task.prototype.save = function(){
    var task = {id : this.id,
        name : this.name,
        description : this.description,
        dueDate : this.dueDate,
        taskDate : this.taskDate,
        status : this.status
    }
    //taskStorage.setItem("ToDOTask", task);
    var taskDb = taskStorage("task");
    var taskIndex = taskDb.getIndex(task.id); 
    if (taskIndex >= 0) {
        taskDb.update(taskIndex, task);
    }
    else {
        taskDb.Add(task);
    }
};

//View
var view = {
    TaskManagement: function () {
        return  {
            clear : function(){
                document.getElementById("taskNameTextBox").value = "";
                document.getElementById("taskDescriptionTextArea").value = "";
                document.getElementById("dueDateTextBox").value = "";
            }

        }
        
    },
    readInputValue: function () {
       
        var taskName = document.getElementById("taskNameTextBox").value;
        var taskDescription = document.getElementById("taskDescriptionTextArea").value;
        var taskDueDate = document.getElementById("dueDateTextBox").value;
        return  new Task(taskName, taskDescription, taskDueDate);

    },

    setTaskData : function(task){
        document.getElementById("taskNameTextBox").value = task.name;
        document.getElementById("taskDescriptionTextArea").value = task.description;
        document.getElementById("dueDateTextBox").value = task.dueDate.toShortString();
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
    var tasks = dbStorage.get();
    return {

        getById: function (taskId) {
            
            for (var taskIndex in tasks) {
                if (tasks[taskIndex].id == taskId) {
                    return tasks[taskIndex];
                };
            };
            return [];
        },
        getAll: function () {
            return tasks;
        },
       
        save : function(){
            var task = {id : this.id,
                name : this.name,
                description : this.description,
                dueDate : this.dueDate,
                taskDate : this.taskDate,
                status : this.status
            }
            //taskStorage.setItem("ToDOTask", task);
            var taskDb = taskStorage("task");
            var taskIndex = taskDB.getIndex(task.id); 
            if (taskIndex >= 0) {
                taskDb.update(taskIndex, task);
            }
            else {
                taskDb.Add(task);
            }
        },
        statusUpdate: function (taskId, status) {
            var taskIndex = dbStorage.getIndex(taskId);
            if (taskIndex >= 0) {
                var task = tasks[taskIndex];
                if (task != null) {
                    task.status = status;
                    dbStorage.update(taskIndex,task);
                }
            }
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
    task.save();
    view.displayTasks(taskController().getAll());
    view.TaskManagement().clear();
};

function taskRowEdit_Clicked(taskId) {
    view.setTaskData(taskController().getById(taskId));
};

function taskRowCompleted_Clicked(taskId) {
    taskController().statusUpdate(taskId, "Completed");
    view.displayTasks(taskController().getAll());
};

var grid = {
    Header : "<tr><th>TaskName</th><th>Date</th><th>Due on</th><th>Status</th></tr>",
    row : function(task){
        var row = "<tr><td>" + task.name + "</td>";
        row = row + "<td>" + task.taskDate.toShortString() + "</td>";
        row = row + "<td>" + task.dueDate.toShortString() + "</td>";
        row = row + "<td>" + task.status + "</td>";
        row = row + "<td><a href='#'onclick=taskRowEdit_Clicked(" + task.id + ")>Edit</a></td>";
        row = row + "<td><a href='#'onclick=taskRowCompleted_Clicked(" + task.id + ")>Complete</a></td>";
        row = row + "</tr>";
        return row ;
    },

};

//Unit testing Methods
function TestView_readInputvalue() {

    alert("called js function ");
    var task = view.readInputValue();
    task.save();

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
    task.save(task);
};

function TestController_GetAll() {
    
   // var task = new Task("Task4", "Description 4", new Date("07/31/2014"));
    var tasks = taskController().getAll();
    view.displayTasks(tasks);
};


window.onload = init;
//TestView_displayTasks();
// localStorage.clear();
//TestModel_Task_Save();
//TestController_GetAll();
