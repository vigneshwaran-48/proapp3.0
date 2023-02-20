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
        successMessageCloseButton : ".success-message-close-button",
        statsSectionName : ".current-section-heading",
        totalStats : ".total-number-of-stats",
        inProgressStats : ".in-progress-stats",
        completedStats : ".completed-stats",
        yetToStartStats : ".yet-to-start-stats"
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
    let loadStatisticsData = () => {
        let currentSection;
        if(CURRENTSECTION == "Project"){
            currentSection = ProjectModel;
        }
        //This will be done when task section is finished.
        // else {
        //     currentSection 
        // }
        _(domStrings.statsSectionName).textContent = currentSection.getSectionName();
        _(domStrings.totalStats).textContent = currentSection.getTotalCount();
        _(domStrings.inProgressStats).textContent = currentSection.getStatCount("On Progress");
        _(domStrings.completedStats).textContent = currentSection.getStatCount("Completed");
        _(domStrings.yetToStartStats).textContent = currentSection.getStatCount("Yet To Start");
    }
    
    return {
        getDomStrings : getDomStrings,
        showErrorMessage : showErrorMessage,
        showSuccessMessage : showSuccessMessage,
        loadStatisticsData : loadStatisticsData
    }
})();