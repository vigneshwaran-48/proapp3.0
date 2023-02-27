let ChatView = (() => {

    let domStrings = {
        chatPeopleSearchInput : "#chat-memebers-search-input",
        chatAllPeopleWrapper : ".members-list",
        singlePeopleWrapper : "single-member-display-wrapper",
        personPhotoDiv : "chat-member-photo",
        personName : "chat-member-search-name",
        chatIconClasses : ["fa-regular", "fa-message"],
        chattingWindow : ".chatting-window-section",
        chattingWindowCloseButton : "#chatting-window-close-button",
        chattingUserImage : ".chatting-user-photo",
        chattingUserName : ".chatting-user-name",
        chatInput : ".chat-message-input",
        chatSendIcon : "send-message-button",
        fromChatMessageWrapper : "single-sent-message-wrapper",
        toChatMessageWrapper : "single-receive-message-wrapper",
        singleMessage : "single-message",
        singleSentMessage : "sent-message",
        singleReceiveMessage : "received-message",
        chatPara : "chat-content",
        chatTime : "chat-time",
        fullMessageWrapper : ".message-body"
    }
    let getDomStrings = () => domStrings;

    let renderChattingWindow = event => {
        _(domStrings.chattingWindow).classList.add(MainView.getDomStrings().showFromRightToLeft);
        _(domStrings.chattingUserName).textContent = event.target.id;
        _(domStrings.chattingUserImage).style.backgroundImage = `url(assets/images/usersImages/${event.target.dataset.userImage})`;
        _(domStrings.chatInput).id = event.target.dataset.userId;
        renderMessages(ChatModel.getChatsOfTheUser(event.target.dataset.userId), true);
        CURRENTMESSAGINTOPERSON = event.target.dataset.userId;
    }
    let renderChatPeople = users => {
        _(domStrings.chatAllPeopleWrapper).innerHTML = "";
        users.forEach(elem => {
            let personWrapper = document.createElement("div");
            let personPhoto = document.createElement("div");
            let personName = document.createElement("p");
            let chatIcon = document.createElement("i");

            //Adding classes to the created elements
            personWrapper.classList.add(domStrings.singlePeopleWrapper);
            personWrapper.classList.add("x-axis-flex");
            personName.classList.add(domStrings.personName);
            personPhoto.classList.add(domStrings.personPhotoDiv);
            domStrings.chatIconClasses.forEach(ele => {
                chatIcon.classList.add(ele);
            });

            //Adding content to the created elements here 
            personName.id = elem.userName;
            personName.dataset.userImage = elem.imagePath;
            personName.dataset.userId = elem.userId;
            personName.textContent = elem.userName;
            personPhoto.style.backgroundImage = `url(assets/images/usersImages/${elem.imagePath})`;
            personPhoto.id = elem.userName;
            personPhoto.dataset.userImage = elem.imagePath;
            personPhoto.dataset.userId = elem.userId;
            chatIcon.id = elem.userName;
            chatIcon.dataset.userImage = elem.imagePath;
            chatIcon.dataset.userId = elem.userId;
            personWrapper.id = elem.userName;
            personWrapper.dataset.userImage = elem.imagePath;
            personWrapper.dataset.userId = elem.userId;

            //Adding elements to their respective parent 
            personWrapper.append(personPhoto, personName, chatIcon);
            personWrapper.addEventListener("click", renderChattingWindow);
            _(domStrings.chatAllPeopleWrapper).append(personWrapper);
        });
    }

    let renderMessages = (messages, isReset) => {
        messages = ChatModel.sortMessagesWithTime(messages);
        if(isReset){
            _(domStrings.fullMessageWrapper).innerHTML = "";
        }
        messages.forEach(elem => {
            let isFrom;
            if(elem.from == USERID){
                isFrom = true;
            }
            else {
                isFrom = false;
            }
            
            //Creating elements
            let singleMessageWrapper = document.createElement("div");
            let singleMessage = document.createElement("div");
            let messageContent = document.createElement("p");
            let chatTime = document.createElement("div");
            let chatTimePara = document.createElement("p");

            //Adding classes to created elements 
            singleMessage.classList.add(domStrings.singleMessage);
            singleMessage.classList.add("x-axis-flex");
            messageContent.classList.add(domStrings.chatPara);
            chatTime.classList.add(domStrings.chatTime);
            if(isFrom){
                singleMessageWrapper.classList.add(domStrings.fromChatMessageWrapper);
                singleMessage.classList.add(domStrings.singleSentMessage);
            }
            else {
                singleMessageWrapper.classList.add(domStrings.toChatMessageWrapper);
                singleMessage.classList.add(domStrings.singleReceiveMessage);
            }
            singleMessageWrapper.classList.add("x-axis-flex");

            //Setting contents of the created elemets
            messageContent.textContent = elem.messageContent;
            chatTimePara.textContent = elem.sentTime.slice(0, 5);

            //Adding elements to their parents
            chatTime.append(chatTimePara);
            singleMessage.append(messageContent, chatTime);
            singleMessageWrapper.append(singleMessage);

            _(domStrings.fullMessageWrapper).append(singleMessageWrapper);
        });
        _(domStrings.fullMessageWrapper).scrollTop = _(domStrings.fullMessageWrapper).scrollHeight;
    }

    return {
        getDomStrings : getDomStrings,
        renderChatPeople : renderChatPeople,
        renderMessages : renderMessages
    }
})();