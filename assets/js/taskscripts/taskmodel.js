let TaskModel = (() => {

    let tasksArray = [];

    let Task = function(taskId, taskName, taskDescription, fromDate, toDate, projectId, users, createdBy, status, percentage, isCompleted){
        this.taskId = taskId;
        this.taskName = taskName;
        this.taskDescription = taskDescription;
        this.status = status;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.projectId = projectId;
        this.users = users;
        this.createdBy = createdBy;
        this.percentage = percentage;
        this.isCompleted = isCompleted;
    }
    let changeServerObject = function(serverObject, isStatusAvailable){
        if(isStatusAvailable){
            return new Task(serverObject.tid, serverObject.tname, serverObject.description, serverObject.fromDate, serverObject.toDate, serverObject.projectId, serverObject.users, serverObject.createdBy, serverObject.status, serverObject.percentage, serverObject.isCompleted);
        }
        else {
            return new Task(serverObject.tid, serverObject.tname, serverObject.description, serverObject.fromDate, serverObject.toDate, serverObject.projectId, serverObject.users, serverObject.createdBy, "Yet to start");
        }
        
    }
    let getIndexOfTask = id => tasksArray.findIndex(elem =>  elem.taskId == id);

    let getDataById = id => tasksArray.find(elem => elem.taskId == id);
    
    let getTasks = () => tasksArray.slice();
    
    let createTask = taskData => {

        return new Promise(async (passed, rejected) => {
            let formData = new FormData();
            console.log(taskData);
            let tempObj = {
                taskName : taskData.name,
                description : taskData.description,
                fromDate : taskData.fromDate,
                toDate : taskData.toDate,
                projectId : taskData.projectId,
                users : taskData.people,
                createdBy : USERID
            }
            formData.append("taskData", JSON.stringify(tempObj));
            let resposne = await sendPostRequest("/ProApp/task/add", formData);
            let task =  changeServerObject(resposne);
            tasksArray.push(task);
            sendMessage(JSON.stringify({
                messageType : "taskUpdate",
                taskId : task.taskId,
                description : `You have been assigned to a task by ${USERNAME}`
            }));
            console.log("task added .....");
            passed("success");
        });
    }
    let addTask = (task, isNew) => {
        return new Promise(async (passed, rejected) => {
            if(isNew){
                await createTask(task);
                console.log("task adding function finished .....");
                passed("success");
            }
            else {
                tasksArray.push(task);
                passed("success");
            }
        });
    } 

    let getTasksByProjectId = id => tasksArray.filter(elem => elem.projectId == id );
    
    let removeTask = id => tasksArray.splice(getIndexOfTask(id), 1);

    //First time trying arrow function for reseting all tasks.
    let resetTasks = () => tasksArray = []; 

    let getTaskByTaskId = taskId => tasksArray[getIndexOfTask(taskId)];
    return {
        addTask : addTask,
        getTasks : getTasks,
        changeServerObject : changeServerObject,
        getIndexOfTask : getIndexOfTask,
        removeTask : removeTask,
        resetTasks : resetTasks,
        getTasksByProjectId : getTasksByProjectId,
        getTaskByTaskId : getTaskByTaskId,
        getDataById : getDataById
    }
})();