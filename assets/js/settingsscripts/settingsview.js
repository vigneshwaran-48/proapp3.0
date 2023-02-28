let SettingsView = (() => {

    let domStrings = {
        settingsUserPhoto : ".top-settings-photo",
        settingsEditProfileButton : ".edit-profile-button",
        settingsLogOutButton : ".log-out-button",
        editProfileSection : ".profile-editing-section",
        editProfileCloseButton : "#profile-edit-section-close-button",
        editProfileNameInput : "#profile-update-name",
        editPhotoInputTag : "#choose-profile-photo-input",
        editEmailIdInput : "#profile-update-email",
        editProfileOldPasswordInput : "#profile-update-old-pass",
        editProfileUpdateButton : ".profile-update-button",
        editProfileNewPassword : "#profile-update-new-pass",
        changePhotoButton : ".change-photo-button-icon"
    }
    let getDomStrings = () => domStrings;

    return {
        getDomStrings : getDomStrings
    }
})();