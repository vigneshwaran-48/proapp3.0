let ProjectController = ((view, model) => {

    let addProject = async projectDetails => {
        await model.addProject(projectDetails, true);
        view.renderProjects(model.getProjectsArray());
    }
    let deleteProject = async id => {
        let result = await sendPostRequest("project/delete?projectId=" + id);
        if(result.status == "success"){
            MainView.showSuccessMessage("Successfully deleted project");
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
        deleteProject : deleteProject
    }
})(ProjectView, ProjectModel);