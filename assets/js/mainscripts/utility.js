let _ = element => document.querySelector(element);

let _All = element => document.querySelectorAll(element);

let CURRENTSECTION = "Project";
let USERID;
let USERNAME;
let CURRENTUSERPHOTO;
let webSocket;

let getCurrentUserDetails = () => {
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
        _(".current-user-name").textContent = USERNAME;
        webSocket = new WebSocket("ws://192.168.1.8:8787/ProApp/chat?uid=" + USERID);
        webSocket.onmessage = (event) => {
            MainView.showPopUpSymbol(JSON.parse(event.data).description);
        }
    }
}
let playNotificationSound = () => {
    new Audio("assets/audio/notification_sound.mp3").play();
}
let sendGetRequest = (url, onloadFunction) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();
    xhr.onload = onloadFunction;
}
let sendPostRequest = (url, data, onloadFunction) => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.send(data);
    xhr.onload = onloadFunction;
}
let resetProjects = () => {
    sendGetRequest("/ProApp/project/getall", function(){
        ProjectModel.resetProject();
        JSON.parse(this.response).forEach(elem => {
            ProjectModel.addProject(ProjectModel.changeServerObject(elem), false);
        });
        ProjectView.renderProjects(ProjectModel.getProjectsArray());
        MainView.loadStatisticsData();
    });
}

getCurrentUserDetails();
resetProjects();