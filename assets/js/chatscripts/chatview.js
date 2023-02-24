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
        fromChatMessageWrapper : "single-receive-message-wrapper",
        toChatMessageWrapper : "single-sent-message-wrapper",
        singleMessage : "single-message",
        singleSentMessage : "sent-message",
        singleReceiveMessage : "received-message",
        chatTime : "chat-time"
    }
    let getDomStrings = () => domStrings;

    let renderChattingWindow = event => {
        console.log(event.target.dataset.userId);
        _(domStrings.chattingWindow).classList.add(MainView.getDomStrings().showFromRightToLeft);
        _(domStrings.chattingUserName).textContent = event.target.id;
        _(domStrings.chattingUserImage).style.backgroundImage = `url(assets/images/usersImages/${event.target.dataset.userImage})`;
        _(domStrings.chatInput).id = event.target.dataset.userId;
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

    let renderMessages = messages => {
        messages.forEach(elem => {
            let isFrom;
            if(elem.from == USERID){
                isFrom = true;
            }
            let singleMessageWrapper = document.createElement("div");
            let singleMessage = document.createElement("div");
            let messageContent = document.createElement("p");
            let chatTime = document.createElement("div");

            if(isFrom){
                singleMessageWrapper.classList.add(domStrings)
            }
        });
    }

    return {
        getDomStrings : getDomStrings,
        renderChatPeople : renderChatPeople
    }
})();