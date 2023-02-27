let SettingsController = (view => {

    let updateUserDetails = event => {
        let formData = new FormData();
        let editName = _(view.getDomStrings().editProfileNameInput).value.trim();
        let editEmailIdInput = _(view.getDomStrings().editEmailIdInput).value.trim();
        let editProfilePasswordInput = _(view.getDomStrings().editProfilePasswordInput).value;
        let editPhoto = _(view.getDomStrings().editPhotoInputTag).files[0];
        console.log(editPhoto);
        let isPhotoAvailable = false;
        if(editPhoto){
            isPhotoAvailable = true;
            formData.append("userImage", editPhoto);
        }

        let nameRegex = new RegExp("[^a-zA-Z0-9]");
        let emailRegex = new RegExp("^[a-zA-Z0-9.]{1,}@.{4,25}.com$");

        //This if to check username does not contain special characters
        if(!nameRegex.test(editName)){
            //This if to check the length of user names
            if(editName.length <=30 && editName.length >=3){
                //This is to check the email address
                if(emailRegex.test(editEmailIdInput)){
                    //This if is to check length of user name
                    if(editProfilePasswordInput.length <= 20 && editProfilePasswordInput.length >= 3){
                        let obj = {
                            newName : editName,
                            newEmailId : editEmailIdInput,
                            newPassword : editProfilePasswordInput,
                            uid : USERID,
                            isPhotoAvailable : isPhotoAvailable
                        }
                        if(isPhotoAvailable){
                            obj.imageType =  "." + editPhoto.type.split("/")[1];
                        }
                        console.log(obj);
                        formData.append("updateData", JSON.stringify(obj));
                    }
                    else{
                        MainView.showErrorMessage("Password should length should be greater than 3 and lesser than 20");
                    }
                }
                else {
                    MainView.showErrorMessage("Invalid email");
                }
            }
            else {
                MainView.showErrorMessage("First name and last name should contain minimum 3 characters and maximum 30 characters");
            }
        }
        else {
            MainView.showErrorMessage("Invalid user name. User name should not contain special characters");
        }
    }
    let init = () => {
        //This is for log out action
        _(view.getDomStrings().settingsLogOutButton).addEventListener("click", async event => {
            await sendPostRequest("logout", "", true);
            location.reload();
        }); 
        //This is to open the profile editing section
        _(view.getDomStrings().settingsEditProfileButton).addEventListener("click", event => {
            _(view.getDomStrings().editProfileSection).classList.add(MainView.getDomStrings().showFromRightToLeft);
        });
        //This is to close the profile editing section
        _(view.getDomStrings().editProfileCloseButton).addEventListener("click", event => {
            _(view.getDomStrings().editProfileSection).classList.remove(MainView.getDomStrings().showFromRightToLeft);
        });
        //This is to update the user details
        _(view.getDomStrings().editProfileUpdateButton).addEventListener("click", updateUserDetails);
    }
    init();
})(SettingsView);