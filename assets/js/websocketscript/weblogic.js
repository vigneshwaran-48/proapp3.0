let sendMessage = data => {
    webSocket.send(data);
}
let processMessage = data => {
    if(data.messageType == "projectUpdate"){
        MainView.showPopUpSymbol(data.description);
        ProjectView.renderProjects(ProjectModel.getProjectsArray());
    }
    else if(data.messageType == "textMessage"){
        MainView.showPopUpSymbol(data.description);
    }
}