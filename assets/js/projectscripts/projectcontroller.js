let ProjectController = ((view, model) => {

    let addProject = async projectDetails => {
        await model.addProject(projectDetails, true);
        view.renderProjects(model.getProjectsArray());
    }
    let deleteProject = async id => {
        let result = await sendPostRequest("project/delete?projectId=" + id);
        if(result.status == "success"){
            MainView.showSuccessMessage("Successfully deleted project");
            resetProjects();
            resetProjects();
        }
        else {
            MainView.showErrorMessage("Oops, something went wrong");
        }
    }
    let exitProject = async id => {
        let formData = new FormData();
        let obj = {
            projectId : id,
            userId : USERID
        }
        formData.append("userData", JSON.stringify(obj));
        let result = await sendPostRequest("project/user/delete", formData);
        if(result.status == "success"){
            MainView.showSuccessMessage("Successfully exited project");
            model.removeProject(id);
            view.renderProjects(ProjectModel.getProjectsArray());
        }
        else {
            MainView.showErrorMessage("Oops, something went wrong");
        }
    }
    MainView.loadStatisticsData();
    return {
        addProject : addProject,
        deleteProject : deleteProject,
        exitProject : exitProject
    }
})(ProjectView, ProjectModel);