let ProjectController = ((view, model) => {

    let addProject = projectDetails => {
        model.addProject(projectDetails);
    }

    return {
        addProject : addProject
    }
})(ProjectView, ProjectModel);