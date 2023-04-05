let _ = element => document.querySelector(element);

let _All = element => document.querySelectorAll(element);

document.addEventListener("keydown", event => {
    if(event.code == "Tab"){
        event.preventDefault();
    }
});
let CURRENTSECTION = "Project";
let USERID;
let USERNAME;
let CURRENTUSERPHOTO;
let webSocket;
let CURRENTMESSAGINTOPERSON;
let APIKEY;

let resetUserDetails = () => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "user/currentuser");
    xhr.send();
    xhr.onload = () => {
        let temp = JSON.parse(xhr.response);
        USERID = temp.currentUserId;
        USERNAME = temp.currentUserName;
        CURRENTUSERPHOTO= temp.imagePath;
        _(".top-profile-image").style.backgroundImage = `url(/ProApp/assets/images/usersImages/${CURRENTUSERPHOTO})`;
        _(".big-profile-image").style.backgroundImage = `url(/ProApp/assets/images/usersImages/${CURRENTUSERPHOTO})`;
        _(".top-settings-photo").style.backgroundImage = `url(/ProApp/assets/images/usersImages/${CURRENTUSERPHOTO})`;
        _(".current-user-name").textContent = USERNAME;
    }
}
let sendGetRequest = async url => {
    return new Promise((resolved, rejected) => {
        let xhr = new XMLHttpRequest();
        let formData = new FormData();
        formData.append("userId", USERID);
        xhr.open("GET", url);
        xhr.setRequestHeader("ApiKey", APIKEY);
        xhr.send(formData);
        xhr.onload = () => {    
            resolved(JSON.parse(xhr.response));   
        }
        xhr.onerror = () => {
            rejected(xhr.status);
        }
    })

}
let getCurrentUserDetails = async () => {
    let xhr = new XMLHttpRequest();
        xhr.open("GET", "user/currentuser");
        xhr.send();
        xhr.onload = () => {
            let temp = JSON.parse(xhr.response);
            USERID = temp.currentUserId;
            USERNAME = temp.currentUserName;
            CURRENTUSERPHOTO= temp.imagePath;
            _(".top-profile-image").style.backgroundImage = `url(/ProApp/assets/images/usersImages/${CURRENTUSERPHOTO})`;
            _(".big-profile-image").style.backgroundImage = `url(/ProApp/assets/images/usersImages/${CURRENTUSERPHOTO})`;
            _(".top-profile-image-desktop").style.backgroundImage = `url(/ProApp/assets/images/usersImages/${CURRENTUSERPHOTO})`;
            _(".current-user-name").textContent = USERNAME;
            webSocket = new WebSocket("wss://192.168.235.32:8080/ProApp/chat?uid=" + USERID);
            webSocket.onmessage = (event) => {
                processMessage(JSON.parse(event.data));
            }
        resetNotification();
    }
    apiKeyResult = await sendGetRequest("user/getapikey");
    APIKEY = apiKeyResult.apiKey;
    console.log(APIKEY);
    resetProjects();
    
}
let playNotificationSound = () => {
    let audio = new Audio("assets/audio/notification_sound.mp3");
    audio.play();
}

let sendPostRequest = (url, data, stopParsing) => {
    return new Promise((resolved, rejected) => {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader("ApiKey", APIKEY);
        xhr.send(data);
        xhr.onload = () => {
            if(!stopParsing){
                resolved(JSON.parse(xhr.response));
            }
            else {
                resolved("success");
            }
        }
        xhr.onerror = () => {
            rejected(xhr.status);
        }
    });
}
let resetProjects = async () => {
    let response = await sendGetRequest("/ProApp/project/getall?uid=" + USERID);
    ProjectModel.resetProject();
    if(response && response.length){
        response.forEach(elem => {
            ProjectModel.addProject(ProjectModel.changeServerObject(elem), false);
        });
        MainView.loadStatisticsData();
        resetTasks();
    }  
    ProjectView.renderProjects(ProjectModel.getProjectsArray());
    resetTasks();
    getMessagesOfUser();
}
let resetTasks = async () => {
    let response = await sendGetRequest("/ProApp/task/getall");
    TaskModel.resetTasks();
    console.log(response);
    if(response && response.length){
        response.forEach(elem => {
            TaskModel.addTask(TaskModel.changeServerObject(elem, true), false);
        });      
    }
    TaskView.renderTasks(ProjectModel.getProjectsArray());
}
let getMessagesOfUser = async () => {
    let userMessages = await sendGetRequest("user/chats?userId=" + USERID);
    if(userMessages && userMessages.length){
        userMessages.forEach(elem => {
            elem.messageDate = elem.messageDate.replaceAll("-", "/");
            ChatModel.addMessage(ChatModel.changeFromServerObject(elem));
        });
    } 
}
let resetNotification = async () => {
    let userNotifications = await sendGetRequest("notification/getall?userId=" + USERID);
    NotificationModel.resetNotification();
    if(userNotifications && userNotifications.length){
        userNotifications.forEach(elem => {
            NotificationModel.addNotification(NotificationModel.changeNotificationFromServer(elem));
        });  
    }
    NotificationView.renderNotifications(NotificationModel.getNotificationsArray());
}
// let note = Notification.requestPermission();
// note.then(permission => {
//     console.log(permission);
//     if(permission == "granted"){
//         let notification = new Notification("ProApp", {
//             body: "Hello there",
//             icon : "https://10.52.0.38:9191/ProApp/assets/images/logo.png",
//             vibrate : [200, 100, 200],
//         });
//         notification.onclick = event => {
//             window.open("https://10.52.0.38:9191/ProApp/home", "_blank");
//         }
//     }
// })

getCurrentUserDetails();