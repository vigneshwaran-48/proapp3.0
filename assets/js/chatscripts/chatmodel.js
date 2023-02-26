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

    let getMessagesByTo = id => messagesData.filter(elem => elem.to == id);

    let getMessagesByFrom = id => messagesData.filter(elem => elem.from == id);
    
    let finIndexOfMessage = id => messagesData.findIndex(elem => id == elem.messageId);

    let deleteMessage = messageId => messagesData.splice(1, finIndexOfMessage(messageId));

    let getChatsOfTheUser = id => {
        let messages = [];
        let toMessages = getMessagesByTo(id)
        let fromMessages = getMessagesByFrom(id);
        if(toMessages.length){
            toMessages.forEach(elem => {
                messages.push(elem);
            });
        }
        if(fromMessages.length){
            fromMessages.forEach(elem => {
                messages.push(elem);
            });
        }
        return messages;
    }

    return {
        addMessage : addMessage,
        getMessagesByTo : getMessagesByTo,
        getMessagesData : getMessagesData,
        deleteMessage : deleteMessage,
        changeFromServerObject : changeFromServerObject,
        getChatsOfTheUser : getChatsOfTheUser
    }
})();