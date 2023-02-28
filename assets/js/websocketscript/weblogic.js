let sendMessage = data => {
    webSocket.send(data);
}
let processMessage = async data => {
    if(data.description){
        MainView.showPopUpSymbol(data.description);
    }
    if(data.messageType == "projectUpdate"){
        resetProjects();
        resetTasks();
    }
    else if(data.messageType == "taskUpdate"){
        resetProjects();
        resetTasks();
    }
    else if(data.messageType == "textMessage"){
        handleTextMessage(data);
    }
    else if(data.messageType == "UserJoined" || data.messageType == "UserLeft"){
        let users = await sendGetRequest("user/getusers?id=all");
        ChatView.renderStatusOfPeople(users);
    }
}

//This is for handling messages coming from server
let handleTextMessage = data => {
    let messageObject = ChatController.addSingleMessage(data.messageContent, data.fromUserId, data.toUserId, data.time, data.date);
    console.log(messageObject);
    if(CURRENTMESSAGINTOPERSON == messageObject.from){
        ChatView.renderMessages([messageObject]);
    }
}