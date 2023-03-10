let NotificationModel = (() => {

    let notifications = [];

    let Notification = function(nId, nContent, time, date){
        this.nId = nId;
        this.nContent = nContent;
        this.date = date;
        this.time = time;
    }

    let changeNotificationFromServer = serverObject => {
        return new Notification(serverObject.nId, serverObject.nContent, serverObject.time, serverObject.date);
    }

    let getNotificationsArray = () => notifications;

    return {
        changeNotificationFromServer : changeNotificationFromServer,
        getNotificationsArray : getNotificationsArray,
    }
})();