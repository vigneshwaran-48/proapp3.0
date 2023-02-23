let TaskController = ((view, model) => {

    //This function is invoked whenever a task complete chekbox is clicked
    let finishTask = async event => {
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

    let addTask = async tasks => {
        await model.addTask(tasks, true);
        console.log("going render .....");
        view.renderTasks(ProjectModel.getProjectsArray());
    } 
    return {
        addTask : addTask,
        finishTask : finishTask
    }   
})(TaskView, TaskModel);