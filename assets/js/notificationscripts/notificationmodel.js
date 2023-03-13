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
    let sortNotificationWithTime = notifications => {
        let sortedNotificationByDate = [];
        notifications.forEach(elem => {
            if(!sortedNotificationByDate.length){
                sortedNotificationByDate.push(elem);
            }
            else if(elem.date > sortedNotificationByDate[sortedNotificationByDate.length -1].date){
                sortedNotificationByDate.push(elem);
            }
            else {
                sortedNotificationByDate.unshift(elem);
            }
        });
        let sortedNotificationWithTime = [];
        sortedNotificationByDate.forEach(elem => {
            let lastElement = sortedNotificationWithTime[sortedNotificationWithTime.length-1];
            if(!sortedNotificationWithTime.length){
                sortedNotificationWithTime.push(elem);
            }
            else if (lastElement.time > elem.time && (lastElement.date == elem.date || lastElement.date > elem.date)){
                sortedNotificationWithTime.push(elem);
            }
            else {
                sortedNotificationWithTime.unshift(elem);
            }
        });
        return sortedNotificationWithTime;
    }
    let addNotification = notification => notifications.push(notification); 

    let resetNotification = () => notifications = [];

    let getNotificationsArray = () => sortNotificationWithTime(notifications.slice());

    return {
        changeNotificationFromServer : changeNotificationFromServer,
        getNotificationsArray : getNotificationsArray,
        addNotification : addNotification,
        resetNotification : resetNotification
    }
})();