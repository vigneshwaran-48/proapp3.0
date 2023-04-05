let sendMessage = data => {
    webSocket.send(data);
}
let processMessage = async data => {
    if(data.description){
        Notification.requestPermission().then(permission => {
            if(permission == "granted"){
                let notification = new Notification("ProApp", {
                    body: data.description,
                    icon : "https://192.168.235.32:8080/ProApp/assets/images/logo.png",
                    vibrate : [200, 100, 200]
                });
                notification.onclick = event => {
                    window.open("https://192.168.235.32:8080/ProApp/home", "_blank");
                }
            }
            else {
                MainView.showPopUpSymbol(data.description);
            }
        });
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
    if(data.messageType != "UserJoined" && data.messageType != "UserLeft"){
        console.log("Rendering notification");
        resetNotification();
    }
    else {
        console.log("Some other notifcation .......");
    }
}

//This is for handling messages coming from server
let handleTextMessage = data => {
    let messageObject = ChatController.addSingleMessage(data.messageContent, data.fromUserId, data.toUserId, data.time, data.date);
    console.log(messageObject);
    if(CURRENTMESSAGINTOPERSON == messageObject.from){
        if(_(ChatView.getDomStrings().fullMessageWrapper).children[0].classList.contains(ChatView.getDomStrings().startCoversationWrapper)){
            ChatView.renderMessages([messageObject], true);
        }
        else {
            ChatView.renderMessages([messageObject]);
        }
    }
}