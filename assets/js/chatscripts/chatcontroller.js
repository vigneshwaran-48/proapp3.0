let ChatController = ((view, model) => {

    let addMessage = event => {
        if(event.target.id == view.getDomStrings().chatSendIcon || event.key == "Enter"){
            let formData = new FormData();
            let currentTime = new Date();
            let obj = {
                message : _(view.getDomStrings().chatInput).innerText,
                date : currentTime.toLocaleDateString(),
                time : currentTime.toLocaleTimeString(),
                fromUserId : USERID,
                toUserId : _(view.getDomStrings().chatInput).id
            }
            console.log(currentTime.toLocaleDateString());
        }
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
})(ChatView, ChatModel);