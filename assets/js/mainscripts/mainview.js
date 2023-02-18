let MainView = (() => {
    let domStrings = {
        topSmallImage : ".top-profile-image",
        showFromRightToLeft : "show-from-right-to-left",
        rightSection : ".right-side-sections",
        rightSideCloseButton : "#right-side-section-close-button",
        fullFormSection : ".adding-form",
        newButton: ".add-project-task-button",
        formCloseButton : "#form-adding-section-close-button",
        formCreatingButton : ".add-button",
        errorMessageDiv : ".error-message-wrapper",
        errorMessagePara : ".error-message-for-user",
        errorMessageCloseButton : ".error-message-close-button",
        showPopupMessage : "show-popup-message",
        successMessageDiv : ".success-message-wrapper",
        successMessagePara : ".success-message-for-user",
        successMessageCloseButton : ".success-message-close-button"
    }
    let getDomStrings = () => domStrings;

    let showErrorMessage = message => {
        _(domStrings.errorMessagePara).innerText = message;
        _(domStrings.errorMessageDiv).classList.add(domStrings.showPopupMessage);
        setTimeout(function(){
            _(domStrings.errorMessageDiv).classList.remove(domStrings.showPopupMessage);
        }, 3000);
    }
    let showSuccessMessage = message => {
        _(domStrings.successMessagePara).innerText = message;
        _(domStrings.successMessageDiv).classList.add(domStrings.showPopupMessage);
        setTimeout(function(){
            _(domStrings.successMessageDiv).classList.remove(domStrings.showPopupMessage);
        }, 3000);
    }
    
    return {
        getDomStrings : getDomStrings,
        showErrorMessage : showErrorMessage,
        showSuccessMessage : showSuccessMessage
    }
})();