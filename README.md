ToDoList
========

Javascript sample Programing 

Features:

1. Add Todo tasks. Task contains Task name, description , task date , due date and status.  Screen accepts  task name , description and Due date. Task date and status are derived by the application.
2. Display tasks in the grid. Grid allows to edit and complete the tasks.

Pending features

1. Clear/Remove tasks
2. Sorting and Pagination for Task grid.
3. user input validations
4. error Handling


High-level design

1. ToDoList.html
	The page contains divs to capture the user inputs and display the tasks list. Tasks are stored in html5 local 	storage.
	Page includes following Javascript files
	a. taskScript
	b. extension
	c. storage
2. scripts/taskScript
	taskScript js file is responsible to handle events perform tasks process. This file refer extension.js and 		storage.js.
	This js file contains view, model and controller. 
	a. view : in-line object which contains following methods
		i. TaskManagement
		ii.readInputValue
		iii.setTaskData
		iv. displayTasks
		v. displayMessage
		vi. validate
	b. Task (model) : constructor function contains the properties and methods to create tasks.
	c. taskController (controller) : function contains below methods 
		i. getById
		ii. getAll
		iii. save 
		iv. statusUpdate
	d. other event handlers methods 
		i. init
		ii. saveButton_clicked
		iii. taskRowEdit_clicked
		iv. taskRowCompleted_Clicked
		v. Grid : variable to generate task grid table.
	e. unit testing methods.
3. scripts/extension
	Added an extension method for Date object to change the date format to dd/mm/yyyy.
4. scripts/storage
	Responsible for storing data in local storage. contains following methods
	taskStorage : method wraps the storage methods which contains the following methods
	1.Add
	2. get
	3. update
	4. getIndex
	5. NextId
	

Chanlleges faced
1. while seralize the javascript objects to json, the date properties are changed to string type. Need to convert back to     date object while parsing the json string.
2. while seralize the js objects methods are not de-seralizing while parsing.
3. Correct way of using function and function expressions.
4. Building Grid dynamically and handling Grid events.
5. Segregation of Javascript files.