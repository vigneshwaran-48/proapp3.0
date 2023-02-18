let _ = element => document.querySelector(element);

let _All = element => document.querySelectorAll(element);

let CURRENTSECTION = "Project";
let USERID;
let USERNAME;
let CURRENTUSERPHOTO;

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
        // _(".bottom-icon-profile").style.backgroundImage = `url(/ProApp/assets/images/usersImages/${CURRENTUSERPHOTO})`;
    }
}
getCurrentUserDetails();