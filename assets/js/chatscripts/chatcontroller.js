let ChatController = ((view, model) => {

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
    }
    init();
})(ChatView, ChatModel);