
function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};

function getItem(key) {
    return JSON.parse(localStorage.getItem(key), dateConvertor("dueDate","taskDate"));
};


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


//var taskStorage = {
//    setItem: function (key, value) {
//        localStorage.setItem(key, JSON.stringify(value));
//    },
//    getItem: function (key) {
//        return JSON.parse(localStorage.getItem(key));
//    },
//    removeItem: function (key) {
//    }
//};