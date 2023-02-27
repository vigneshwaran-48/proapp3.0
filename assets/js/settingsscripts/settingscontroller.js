let SettingsController = (view => {

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
    }
    init();
})(SettingsView);