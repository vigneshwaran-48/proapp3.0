let MainView = (() => {
    let domStrings = {
        topSmallImage : ".top-profile-image",
        showFromRightToLeft : "show-from-right-to-left",
        rightSection : ".right-side-sections",
        rightSideCloseButton : "#right-side-section-close-button",
        fullFormSection : ".adding-form",
        newButton: ".add-project-task-button",
        formCloseButton : "#form-adding-section-close-button"
    }
    let getDomStrings = () => domStrings;
    
    return {
        getDomStrings : getDomStrings
    }
})();