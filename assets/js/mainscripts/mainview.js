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
        yetToStartStats : ".yet-to-start-stats",
        statCircleValue : ".stats-percentage-value",
        statOuterCircle : ".percentage-circle"
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
        let total = currentSection.getTotalCount();
        let completed = currentSection.getStatCount("Completed");
        _(domStrings.statsSectionName).textContent = currentSection.getSectionName();
        _(domStrings.totalStats).textContent = total;
        _(domStrings.inProgressStats).textContent = currentSection.getStatCount("On Progress");
        _(domStrings.completedStats).textContent = completed;
        _(domStrings.yetToStartStats).textContent = currentSection.getStatCount("Yet To Start");
        loadStatisticsCircle(total, completed);
    }
    let loadStatisticsCircle = (total, completed) => {
        let percentage = Math.round((completed / total) * 100);
        let degree = percentage / 100 * 360;


        _(domStrings.statCircleValue).textContent = percentage + "%";
        console.log(degree);
        _(domStrings.statOuterCircle).style.background = `conic-gradient(green ${degree}deg, red ${360 - degree}deg)`;
    }
    
    return {
        getDomStrings : getDomStrings,
        showErrorMessage : showErrorMessage,
        showSuccessMessage : showSuccessMessage,
        loadStatisticsData : loadStatisticsData,
    }
})();