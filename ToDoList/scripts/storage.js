
/*
Method to set object in local storage. the value will be seralized to json string and store in local storage.
*/
function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};

/*
Method to get Item from local storage. Parse the json string and convert it to object.
While serializing the date property will be stored as string , dateConvertor convert the date string to date object while parsing the json string.
*/
function getItem(key) {
    return JSON.parse(localStorage.getItem(key), dateConvertor("dueDate","taskDate"));
};

/* 
Accepts multiple column names (date) to convert from string to date
*/
function dateConvertor(keyNames)
{
    var args = Array.prototype.slice.call(arguments);
    return function (k, v) {
        if (args.indexOf(k) >= 0) {
           var parsedDate = Date.parse(v);
            //alert(parsedDate);
            return new Date(parsedDate);
        }
        return v;
    }
}

/* 
Method wraps  the storage methods (setItem and getItem) to store and retrieve the data from local storage.
*/
function taskStorage(key) {

    var tasks = getItem(key);
    if (tasks === null) {
        tasks = [];
    }
    return {

        Add: function (task) {
           // tasks = getItem(key);
            tasks.push(task);
            setItem(key, tasks);
        },
        get: function () {
            //var tasks = getItem(key);
            if (tasks === null) {
                tasks = [];
            };
            return tasks;
        },
        update: function (taskIndex, task) {
            //var tasks = getItem(key);
            tasks[taskIndex] = task;
            setItem(key, tasks);
        },
        getIndex: function (taskId) {
            //var tasks = getItem(key);
            for (var task in tasks) {
                if (tasks[task].id == taskId) {
                    return task;
                }
            };
            return -1;
        },
        NextId: function () {
            var id = getItem("MaxId");
            if (id === null) {
                id = 0;
            };

            id = id + 1;

            setItem("MaxId", id);
            return id;

        }

    };
};


