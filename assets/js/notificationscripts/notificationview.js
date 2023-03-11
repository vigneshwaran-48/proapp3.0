let NotificationView = (() => {

    let domStrings = {
        notificationsWrapper : ".notifcations-list",
        singleNotification : "notification-list-option",
        notificationImage : "notification-image",
        notificationTimeWrapper : "message-time-wrapper",
        notificationContent : "notification-content",
        notificationTime : "notification-time",
        notificationDeleteWrapper : "notification-delete-icon",
        notificationDeleteIconClasses : ["fa-solid", "fa-comment-slash"]
    }

    let renderNotifications = notifications => {
        _(domStrings.notificationsWrapper).innerHTML = "";
        if(notifications.length){
            notifications.forEach(elem => {
                let singleNotification = document.createElement("li");
                let notificationImage = document.createElement("div");
                let notificationTimeWrapper = document.createElement("div");
                let notifcationContent = document.createElement("p");
                let notifcationTime = document.createElement("p");
                let notificationDeleteWrapper = document.createElement("div");
                let notificationDeleteIcon = document.createElement("i");
    
                //Adding classes to created elements 
                singleNotification.classList.add(domStrings.singleNotification);
                singleNotification.classList.add("x-axis-flex");
                notificationImage.classList.add(domStrings.notificationImage);
                notificationTimeWrapper.classList.add(domStrings.notificationTimeWrapper);
                notificationTimeWrapper.classList.add("y-axis-flex");
                notifcationContent.classList.add(domStrings.notificationContent);
                notifcationTime.classList.add(domStrings.notificationTime);
                notificationDeleteWrapper.classList.add(domStrings.notificationDeleteWrapper);
                notificationDeleteWrapper.classList.add("x-axis-flex");
                domStrings.notificationDeleteIconClasses.forEach(elem => {
                    notificationDeleteIcon.classList.add(elem);
                });
    
                //Adding contents to created elements 
                notifcationContent.textContent = elem.nContent;
                notifcationTime.textContent = elem.date + " " + elem.time;
    
    
                //Adding elements to their respective parents
                notificationDeleteWrapper.append(notificationDeleteIcon);
                notificationTimeWrapper.append(notifcationContent, notifcationTime);
                singleNotification.append(notificationImage, notificationTimeWrapper, notificationDeleteWrapper);
                _(domStrings.notificationsWrapper).appendChild(singleNotification);
            });
        }
        else {
            console.log("No Notification ......");
        }
    }

    return {
        renderNotifications : renderNotifications
    }
})();