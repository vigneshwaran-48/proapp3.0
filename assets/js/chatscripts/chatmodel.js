let ChatModel = (() => {

    let messagesData = [];

    let Message = function(messageId, messageContent, sentTime, isSentByMe, to){
        this.messageId = messageId;
        this.messageContent = messageContent;
        this.sentTime = sentTime;
        this.isSentByMe = isSentByMe;
        this.to = to;
    }
    
    let changeFromServerObject = serverObject => new Message(serverObject.messageId, serverObject.messageContent, serverObject.sentTime, serverObject.isSentByMe, serverObject.to);

    let addMessage = message => messagesData.push(message);

    let getMessagesData = () => messagesData;

    let getMessagesByTo = id => messagesData.filter(elem => elem.to == id);
    
    let finIndexOfMessage = id => messagesData.findIndex(elem => id == elem.messageId);

    let deleteMessage = messageId => messagesData.splice(1, finIndexOfMessage(messageId));

    return {
        addMessage : addMessage,
        getMessagesByTo : getMessagesByTo,
        getMessagesData : getMessagesData,
        deleteMessage : deleteMessage,
        changeFromServerObject : changeFromServerObject
    }
})();