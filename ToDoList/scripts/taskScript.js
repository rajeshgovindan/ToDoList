
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
    // code to save the task object in isolated storage.
};
var view = {

    readInputValue: function () {
       
        var taskName = document.getElementById("taskNameTextBox").value;
        var taskDescription = document.getElementById("taskDescriptionTextArea").value;
        var taskDueDate = document.getElementById("dueDateTextBox").value;
        return  new Task(taskName, taskDescription, taskDueDate);

    },
    displayTasks: function (tasks) {
    },
    displayMessage: function (message, type) {
    }
};


function TestView_readInputvalue() {

    alert("called js function ");
    console.log(view.readInputValue());
    
};

function init() {
    var saveButton = document.getElementById("saveButton");
    saveButton.onclick = TestView_readInputvalue;
};



window.onload = init;