let NotificationView = (() => {

    let domStrings = {
        notificationsWrapper : ".notifcations-list",
        singleNotification : "notification-list-option",
        notificationImage : "notification-image",
        notificationTimeWrapper : "message-time-wrapper",
        notificationContent : "notification-content",
        notificationTime : "notification-time",
        notificationDeleteWrapper : "notification-delete-icon",
        notificationDeleteIconClasses : ["fa-solid", "fa-circle-xmark"],
        emptyInbox : "empty-notifcations-list"
    }

    let deleteNotification = async event => {
        let formData = new FormData();
        formData.append("userId", USERID);
        formData.append("nid", event.target.dataset.nid);
        let status = await sendPostRequest("notification/delete", formData);
        if(status.result){
            MainView.showSuccessMessage("Notification deleted successfully");
            resetNotification();    
        }
    }

    let renderNotifications = notifications => {
        _(domStrings.notificationsWrapper).innerHTML = "";
        
        if(notifications.length){
            _(domStrings.notificationsWrapper).classList.remove(domStrings.emptyInbox);
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
                notificationDeleteWrapper.dataset.nid = elem.nId;
                notificationDeleteIcon.dataset.nid = elem.nId;

                //This listener is to delete a notifcation
                notificationDeleteWrapper.addEventListener("click", deleteNotification);
    
                //Adding elements to their respective parents
                notificationDeleteWrapper.append(notificationDeleteIcon);
                notificationTimeWrapper.append(notifcationContent, notifcationTime);
                singleNotification.append(notificationImage, notificationTimeWrapper, notificationDeleteWrapper);
                _(domStrings.notificationsWrapper).appendChild(singleNotification);
            });
        }
        else {
            _(domStrings.notificationsWrapper).classList.add(domStrings.emptyInbox);
        }
    }

    return {
        renderNotifications : renderNotifications
    }
})();