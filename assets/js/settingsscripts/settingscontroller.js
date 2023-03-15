let SettingsController = (view => {

    let resetProfileEditSection = () => {
        _(view.getDomStrings().editProfileNameInput).value = "";
        _(view.getDomStrings().editEmailIdInput).value = "";
        _(view.getDomStrings().editProfileOldPasswordInput).value = "";
        _(view.getDomStrings().editProfileNewPassword).value = "";
        // _(view.getDomStrings().editPhotoInputTag).value = "";
    }
    let updateUserDetails = async event => {
        let formData = new FormData();
        let editName = _(view.getDomStrings().editProfileNameInput).value.trim();
        let editEmailIdInput = _(view.getDomStrings().editEmailIdInput).value.trim();
        let editProfileOldPasswordInput = _(view.getDomStrings().editProfileOldPasswordInput).value;
        let editProfileNewPasswordInput = _(view.getDomStrings().editProfileNewPassword).value;
        // let editPhoto = _(view.getDomStrings().editPhotoInputTag).files[0];
        // let isPhotoAvailable = false;
        // if(editPhoto){
        //     isPhotoAvailable = true;
        //     formData.append("userImage", editPhoto);
        // }

        let nameRegex = new RegExp("[^a-zA-Z0-9]");
        let emailRegex = new RegExp("^[a-zA-Z0-9.]{1,}@.{4,25}.com$");

        //This if to check username does not contain special characters
        if(!nameRegex.test(editName)){
            //This if to check the length of user names
            if(editName.length <=30 && editName.length >=3){
                //This is to check the email address
                if(emailRegex.test(editEmailIdInput)){
                    //This if is to check length of user name
                    if(editProfileOldPasswordInput.length <= 20 && editProfileOldPasswordInput.length >= 3 && editProfileNewPasswordInput.length <= 20 && editProfileNewPasswordInput.length >= 3){
                        let obj = {
                            newName : editName,
                            newEmailId : editEmailIdInput,
                            oldPassword : editProfileOldPasswordInput,
                            newPassword : editProfileNewPasswordInput,
                            uid : USERID,
                            // isPhotoAvailable : isPhotoAvailable
                        }
                        // if(isPhotoAvailable){
                        //     obj.imageType =  "." + editPhoto.type.split("/")[1];
                        // }
                        formData.append("updateData", JSON.stringify(obj));
                        let response = await sendPostRequest("user/update", formData);
                        if(response.result == "Success"){
                            resetProfileEditSection();
                            getCurrentUserDetails();
                            _(view.getDomStrings().editProfileCloseButton).click();
                            MainView.showSuccessMessage("Profile updated successfully");
                        }
                        else {
                            MainView.showErrorMessage(response.result);
                        }
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
            await sendPostRequest("logout?uid=" + USERID, "", true);
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
        //This is for change photo button
        _(view.getDomStrings().singleChangePhotoInput).addEventListener("change", async event => {
            let formData = new FormData();
            let photo = _(view.getDomStrings().singleChangePhotoInput).files[0];
            formData.append("uid", USERID);
            formData.append("imageType", "." + photo.type.split("/")[1]);
            formData.append("userImage", photo);
            let response = await sendPostRequest("user/changeimage", formData);
            if(response.result){
                MainView.showSuccessMessage("Updated photo succesfully");
            }
            else {
                MainView.showErrorMessage("Oops, Something went wrong.");
            }
            console.log(MainView.getDomStrings().topSmallImage);
            console.log(_(MainView.getDomStrings().topSmallImage));
            // _(MainView.getDomStrings().topSmallImage).reload(true);
            resetUserDetails();
            resetUserDetails();
        });

        //This is for dislaying API key
        _(view.getDomStrings().apiKeyButton).addEventListener("click", async event => {
            if(_(view.getDomStrings().apiKeyButton).checked){
                console.log("Getting API key ........");
                let apiKeyResponse = await sendGetRequest("user/getapikey");
                if(apiKeyResponse.status == "success"){
                    _(view.getDomStrings().apiKeyContent).textContent = apiKeyResponse.apiKey;
                    // console.log(navigator.clipboard.readText());
                }
                else {
                    MainView.showErrorMessage("Oops, Something went wrong ....");
                }
            }
            else {
                console.log("Closing API key display .........");
            }
        });
        //This is for API key clipboard 
        _(view.getDomStrings().apiKeyClipBoard).addEventListener("click", event => {
            console.log(_(view.getDomStrings().apiKeyClipBoard).parentElement.children[0].innerText);
            navigator.clipboard.writeText(_(view.getDomStrings().apiKeyClipBoard).parentElement.children[0].innerText);
            MainView.showSuccessMessage("Copied to Clipboard");
        });
    }
    init();
})(SettingsView);