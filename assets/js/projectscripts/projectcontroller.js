let ProjectController = ((view, model) => {

    let addProject = projectDetails => {
        model.addProject(projectDetails, true);
    }
    
    return {
        addProject : addProject
    }
})(ProjectView, ProjectModel);