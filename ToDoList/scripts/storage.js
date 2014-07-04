
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
            tasks.push(task);
            setItem(key, tasks);
        },
        get: function () {
            var tasks = getItem(key);
            if (tasks === null) {
                tasks = [];
            };
            return tasks;
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