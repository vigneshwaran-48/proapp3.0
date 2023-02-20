let ProjectController = ((view, model) => {

    let addProject = projectDetails => {
        model.addProject(projectDetails, true);
    }
    MainView.loadStatisticsData();
    return {
        addProject : addProject
    }
})(ProjectView, ProjectModel);