let NotificationModel = (() => {

    let notifications = [];

    let Notification = function(nId, nContent, time, date, userId){
        this.nId = nId;
        this.nContent = nContent;
        this.date = date;
        this.time = time;
        this.userId = userId;
    }

    let changeNotificationFromServer = serverObject => {
        return new Notification(serverObject.nId, serverObject.nContent, serverObject.time, serverObject.date, serverObject.userId);
    }

    let addNotification = notification => notifications.push(notification); 

    let resetNotification = () => notifications = [];

    let getNotificationsArray = () => notifications.slice();

    return {
        changeNotificationFromServer : changeNotificationFromServer,
        getNotificationsArray : getNotificationsArray,
        addNotification : addNotification,
        resetNotification : resetNotification
    }
})();