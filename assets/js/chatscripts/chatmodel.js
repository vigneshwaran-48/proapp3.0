let ChatModel = (() => {

    let messagesData = [];

    let Message = function(messageId, messageContent, sentDate, sentTime, from, to){
        this.messageId = messageId;
        this.messageContent = messageContent;
        this.sentTime = sentTime;
        this.from = from;
        this.to = to;
        this.sentDate = sentDate;
    }
    
    let changeFromServerObject = serverObject => new Message(serverObject.messageId, serverObject.message, serverObject.messageDate, serverObject.messageTime, serverObject.fromUser, serverObject.toUser);

    let addMessage = message => messagesData.push(message);

    let getMessagesData = () => messagesData;

    let getChatsOfTheUser = id => messagesData.filter(elem => (elem.to == id || elem.from == id));
    
    let finIndexOfMessage = id => messagesData.findIndex(elem => id == elem.messageId);

    let deleteMessage = messageId => messagesData.splice(1, finIndexOfMessage(messageId));

    let sortMessagesWithTime = messages => {
        let sortedMessagesByDate = [];
        messages.forEach(elem => {
            if(!sortedMessagesByDate.length){
                sortedMessagesByDate.push(elem);
            }
            else if(elem.sentDate > sortedMessagesByDate[sortedMessagesByDate.length -1].sentDate){
                sortedMessagesByDate.push(elem);
            }
            else {
                sortedMessagesByDate.unshift(elem);
            }
        });
        let sortedMessagesByTime = [];
        sortedMessagesByDate.forEach(elem => {
            let lastElement = sortedMessagesByTime[sortedMessagesByTime.length-1];
            if(!sortedMessagesByTime.length){
                sortedMessagesByTime.push(elem);
            }
            else if (lastElement.senTime > elem.sentTime && (lastElement.sentDate == elem.sentDate || lastElement.sentDate > elem.sentDate)){
                sortedMessagesByTime.push(elem);
            }
            else {
                sortedMessagesByTime.unshift(elem);
            }
        });
        return sortedMessagesByTime;
    }
    return {
        addMessage : addMessage,
        getMessagesData : getMessagesData,
        deleteMessage : deleteMessage,
        changeFromServerObject : changeFromServerObject,
        getChatsOfTheUser : getChatsOfTheUser,
        sortMessagesWithTime: sortMessagesWithTime
    }
})();