let ChatController = ((view, model) => {

    let addMessage = event => {
        if(event.target.id == view.getDomStrings().chatSendIcon || event.key == "Enter"){
            let currentTime = new Date();
            let messageContent = _(view.getDomStrings().chatInput).innerText;
            let toUserId = _(view.getDomStrings().chatInput).id;
            let date = currentTime.toLocaleDateString();
            let time = currentTime.toLocaleTimeString();
            let obj = {
                messageType : "textMessage",
                messageContent : messageContent,
                date : date,
                time : time,
                fromUserId : USERID,
                toUserId : toUserId,
                description :  `${USERNAME} sent you a message`
            }
            sendMessage(JSON.stringify(obj));
            console.log("reseted message input ....");
            event.preventDefault();
            _(view.getDomStrings().chatInput).innerHTML = "";
            view.renderMessages([addSingleMessage(messageContent, USERID, toUserId, time, date)]);
        }
    }

    let addSingleMessage = (message, from, to, time, date) => {
        let obj = {
            message : message,
            messageId : "-",
            messageDate : date.replaceAll("-", "/"),
            messageTime : time,
            fromUser : from,
            toUser : to
        }
        let messageObject = ChatModel.changeFromServerObject(obj);
        ChatModel.addMessage(messageObject);
        return messageObject;
    }
    let init = () => {
        //This is for loading users when chat section button is clicked
        _(MainView.getDomStrings().chatButton).addEventListener("click", async event => {
            let users = await sendGetRequest("user/getusers?id=all");
            view.renderChatPeople(users);
        });
        //This is for loading users with entered search input
        _(view.getDomStrings().chatPeopleSearchInput).addEventListener("input", async event => {
            let users = await sendGetRequest("user/getusers?id=all");
            view.renderChatPeople(users.filter(elem => {
                return elem.userName.toLowerCase().includes(event.target.value.trim().toLowerCase());
            }));
        });
        //This is for closing chatting window
        _(view.getDomStrings().chattingWindowCloseButton).addEventListener("click", event => {
            _(view.getDomStrings().chattingWindow).classList.remove(MainView.getDomStrings().showFromRightToLeft);
        });
        //This is for sending message with  keyboard event
        _(view.getDomStrings().chatInput).addEventListener("keydown", addMessage);

        //This is for sending message with send button
        _("#" + view.getDomStrings().chatSendIcon).addEventListener("click", addMessage);
    }
    init();

    return {
        addSingleMessage : addSingleMessage
    }
})(ChatView, ChatModel);