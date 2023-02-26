let sendMessage = data => {
    webSocket.send(data);
}
let processMessage = data => {
    if(data.messageType == "projectUpdate"){
        MainView.showPopUpSymbol(data.description);
        resetProjects();
        resetTasks();
    }
    else if(data.messageType == "textMessage"){
        MainView.showPopUpSymbol(data.description);
    }
}