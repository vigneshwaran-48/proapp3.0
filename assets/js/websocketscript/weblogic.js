let sendMessage = data => {
    webSocket.send(data);
}
let processMessage = data => {
    MainView.showPopUpSymbol(data.description);
    if(data.messageType == "projectUpdate"){
        resetProjects();
        resetTasks();
    }
    else if(data.messageType == "taskUpdate"){
        resetProjects();
        resetTasks();
    }
    else if(data.messageType == "textMessage"){
    }
}