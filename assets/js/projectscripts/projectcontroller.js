let ProjectController = ((view, model) => {

    let addProject = async projectDetails => {
        await model.addProject(projectDetails, true);
        view.renderProjects(model.getProjectsArray());
    }
    MainView.loadStatisticsData();
    return {
        addProject : addProject
    }
})(ProjectView, ProjectModel);