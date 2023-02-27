let SettingsView = (() => {

    let domStrings = {
        settingsUserPhoto : ".top-settings-photo",
        settingsEditProfileButton : ".edit-profile-button",
        settingsLogOutButton : ".log-out-button",
        editProfileSection : ".profile-editing-section",
        editProfileCloseButton : "#profile-edit-section-close-button"
    }
    let getDomStrings = () => domStrings;

    return {
        getDomStrings : getDomStrings
    }
})();