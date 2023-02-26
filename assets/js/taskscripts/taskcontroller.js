let TaskController = ((view, model) => {

    //This function is invoked whenever a task complete chekbox is clicked
    let finishTask = async event => {
        event.preventDefault();
        event.stopPropagation();
        event.target.nextElementSibling.classList.toggle(view.getDomStrings().finishTask);
        let formData = new FormData();
        formData.append("taskData", JSON.stringify({
            taskId : event.target.id.slice(4),
            userId : USERID
        }));
        let response = await sendPostRequest("/ProApp/task/user/changestatus", formData);
        if(response.status){
            resetTasks();
        }
        else {
            MainView.showErrorMessage("Oops !, something went wrong");
        }
    }
    

    let deleteTask = async taskId => {
        let response = await sendPostRequest("task/delete?taskId=" + taskId, "");
        if(response.status == "success"){
            model.removeTask(taskId);
            ProjectView.renderProjects(ProjectModel.getProjectsArray());
            view.renderTasks(ProjectModel.getProjectsArray());
            MainView.showSuccessMessage("Successfully deleted task");
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
            MainView.showSuccessMessage("Exied from task successfylly");
        }
    }

    let addTask = async tasks => {
        await model.addTask(tasks, true);
        console.log("going render .....");
        view.renderTasks(ProjectModel.getProjectsArray());
    } 
    return {
        addTask : addTask,
        finishTask : finishTask,
        deleteTask : deleteTask,
        exitTask : exitTask
    }   
})(TaskView, TaskModel);