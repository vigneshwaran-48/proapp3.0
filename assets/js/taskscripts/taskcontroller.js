let TaskController = ((view, model) => {

    //This function is invoked whenever a task complete chekbox is clicked
    let finishTask = async event => {
        event.preventDefault();
        event.stopPropagation();
        let taskId = parseInt(event.target.id.slice(4));
        event.target.nextElementSibling.classList.toggle(view.getDomStrings().finishTask);
        let formData = new FormData();
        formData.append("taskData", JSON.stringify({
            taskId : taskId,
            userId : USERID
        }));
        let response = await sendPostRequest("/ProApp/task/user/changestatus", formData);
        if(response.status){
            sendMessage(JSON.stringify({
                messageType : "taskUpdate",
                taskId : taskId,
                description : USERNAME + " working on " + model.getTaskByTaskId(taskId).taskName
            }));
            resetProjects();
            resetProjects();
        }
        else {
            MainView.showErrorMessage("Oops !, something went wrong");
        }
    }
    

    let deleteTask = async taskId => {
        let response = await sendPostRequest("task/delete?taskId=" + taskId, "");
        if(response.status == "success"){
            model.removeTask(taskId);
            resetProjects();
            resetTasks();
            MainView.showSuccessMessage("Successfully deleted task");
            sendMessage(JSON.stringify({
                messageType : "taskUpdate",
                taskId : taskId,
                description : USERNAME + " deleted the task you Were in "
            }));
        }
        else {
            MainView.showErrorMessage("Oops, something went wrong");
        }
    }
    let exitTask = async taskId => {
        let formData = new FormData();
        formData.append("userData", JSON.stringify({
            userId : USERID,
            taskId : taskId
        }));
        let response = await sendPostRequest("task/user/delete", formData);
        if(response.status == "success"){
            model.removeTask(taskId);
            console.log(taskId);
            MainView.showSuccessMessage("Exied from task successfylly");
            sendMessage(JSON.stringify({
                messageType : "taskUpdate",
                taskId : taskId,
                description : USERNAME + " exited from the task " + model.getTaskByTaskId(taskId).taskName
            }));
        }
        else {
            MainView.showErrorMessage("Oops, something went wrong");
        }
    }

    let addTask = async tasks => {
        await model.addTask(tasks, true);
        view.renderTasks(ProjectModel.getProjectsArray());
    } 
    return {
        addTask : addTask,
        finishTask : finishTask,
        deleteTask : deleteTask,
        exitTask : exitTask
    }   
})(TaskView, TaskModel);