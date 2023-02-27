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
        editProfilePasswordInput : "#profile-update-pass",
        editProfileUpdateButton : ".profile-update-button"
    }
    let getDomStrings = () => domStrings;

    return {
        getDomStrings : getDomStrings
    }
})();