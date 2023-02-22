let TaskController = ((view, model) => {

    let addTask = async tasks => {
        await model.addTask(tasks, true);
        console.log("going render .....");
        view.renderTasks(model.getTasks());
    } 
    return {
        addTask : addTask
    }   
})(TaskView, TaskModel);