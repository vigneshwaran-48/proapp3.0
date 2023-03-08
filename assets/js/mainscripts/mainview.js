let MainView = (() => {
    let domStrings = {
        topSmallImage : ".top-profile-image",
        showFromRightToLeft : "show-from-right-to-left",
        rightSection : ".right-side-sections",
        rightSideCloseButton : "#right-side-section-close-button",
        fullFormSection : ".adding-form",
        projectSectionButton : ".project-section-button",
        fullDescriptionSection : ".box-description-section",
        fullEditSection : ".box-edit-section",
        newButton: ".add-project-task-button",
        currentSectionHeading : ".common-middle-section-heading",
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
        statOuterCircle : ".percentage-circle",
        yetToStartButton : ".yet-to-start-button",
        inProgressButton : ".in-progress-button",
        completedBoxButton : ".completed-box-button",
        showBoxWrapperSection : "show-box-wrapper-section",
        yetToStartSection : ".yet-to-start-section",
        inProgressSection : ".in-progress-section",
        completedSection : ".completed-section",
        popupWindow : ".pop-up-message-wrapper",
        popupMessage : ".pop-up-message",
        popupCloseButton : ".pop-up-message-close-button",
        descriptionCloseButton : "#box-desc-section-close-button",
        descName : ".box-desc-name-value",
        descFromDate : ".desc-from-date-value",
        descToDate : ".desc-last-date-value",
        descPeopleSearchLabel : "desc-people-option",
        descPeoplSearchImage : "desc-people-search-image",
        descPeopleWrapper : ".desc-search-people-wrapper",
        descDescription : ".desc-description-value",
        descPeopleSearchInput : ".desc-people-search-input",
        editBoxCloseButton : "#box-edit-section-close-button",
        editPeopleSearchInput : ".people-edit-search-input",
        editSearchPeopleWrapper : ".edit-search-people-wrapper",
        taskSectionButton : ".task-section-button",
        taskSection : ".task-middle-section-body",
        showFromScale : "show-from-scale",
        chatPeopleViewSection : ".chat-people-view-section",
        chatButton : ".chat-section-button",
        chatMembersCloseButton : "#chat-members-view-close-button",
        notificationAudioButton : ".audio-button",
        settingSectionButton : ".settings-section-button",
        settingSection : ".setting-section",
        settingCloseButton : "#settings-section-close-button",
        fullFilterWrapper : ".full-filter-wrapper",
        showFilter : "show-filter",
        hideFilter : "hide-filter"
    }
    let getDomStrings = () => domStrings;

    let renderSearchPeople = (searchName, id, isProject, renderFull) => {
        let boxModel;
        if(isProject){
            boxModel = ProjectModel;
        }
        else {
            boxModel = TaskModel;
        }
        _(domStrings.descPeopleWrapper).innerHTML = "";
        boxModel.getDataById(id).users.forEach(elem => {
            if((elem.userName.toLowerCase().includes(searchName.toLowerCase()) || searchName.length == 0) || renderFull){
                let labelTag = document.createElement("label");
                let imageDiv = document.createElement("div");
                let p = document.createElement("p");

                //Adding classes to the elements
                labelTag.classList.add(domStrings.descPeopleSearchLabel);
                labelTag.classList.add("x-axis-flex");
                imageDiv.classList.add(domStrings.descPeoplSearchImage);
                
                labelTag.for = elem.userId;
                labelTag.dataset.imagePath = `url(/ProApp/assets/images/usersImages/${elem.imagePath})`;    
                p.textContent = elem.userName;
                imageDiv.style.backgroundImage = `url(/ProApp/assets/images/usersImages/${elem.imagePath})`;

                labelTag.append(imageDiv, p);
                console.log(labelTag);
                _(domStrings.descPeopleWrapper).append(labelTag);
            }
        });
    }
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
    let showPopUpSymbol = message => {
        _(domStrings.popupMessage).innerText = message;
        _(domStrings.popupWindow).classList.add(domStrings.showPopupMessage);
        //This is for playing sound (Because we can't directly play the audio in js, the user want to click a button for it).
        _(domStrings.notificationAudioButton).click();
        setTimeout(function(){
            _(domStrings.popupWindow).classList.remove(domStrings.showPopupMessage);
        }, 3000);
    }
    let loadStatisticsData = () => {
        let currentSection;
        currentSection = ProjectModel;
        let total = currentSection.getTotalCount();
        let completed = currentSection.getStatCount("Completed");
        _(domStrings.statsSectionName).textContent = currentSection.getSectionName();
        _(domStrings.totalStats).textContent = total;
        _(domStrings.inProgressStats).textContent = currentSection.getStatCount("On Progress");
        _(domStrings.completedStats).textContent = completed;
        _(domStrings.yetToStartStats).textContent = currentSection.getStatCount("Yet To Start");
        loadStatisticsCircle(total, completed);
    }
    //This functoin is for statistics circle
    let loadStatisticsCircle = (total, completed) => {
        let percentage = Math.round((completed / total) * 100);
        let degree = percentage / 100 * 360;
        if(isNaN(percentage)){
            _(domStrings.statCircleValue).textContent = "0%";
        }
        else {
            _(domStrings.statCircleValue).textContent = percentage + "%";
        }
        let count = 0;
        let intervalId = setInterval(() => {
            if(count <= degree){
                _(domStrings.statOuterCircle).style.background = `conic-gradient(rgb(64,142,238) 0deg, rgb(64,142,238) ${count}deg, rgb(235, 237, 239) ${count}deg, rgb(235, 237, 239) ${360 - count}deg)`;
            }
            else {
                clearInterval(intervalId);
            }
            count ++;
        }, 5);
    }
    let renderDescriptionDetails = (id, isProject) => {
        if(isProject){
            let projectData = ProjectModel.getDataById(id);
            _(domStrings.descName).innerText = projectData.projectName;
            _(domStrings.descFromDate).innerText = projectData.fromDate;
            _(domStrings.descToDate).innerText = projectData.toDate;
            _(domStrings.descDescription).innerText = projectData.projectDesc;
            renderSearchPeople("", id, true, true);
            _(domStrings.descPeopleSearchInput).addEventListener("input", event => {
                renderSearchPeople(event.target.value, id, true);
            });
        }
        else {
            let taskData = TaskModel.getTaskByTaskId(id);
            _(domStrings.descName).innerText = taskData.taskName;
            _(domStrings.descFromDate).innerText = taskData.fromDate;
            _(domStrings.descToDate).innerText = taskData.toDate;
            _(domStrings.descDescription).innerText = taskData.taskDescription;
            renderSearchPeople("", id, false, true);
            _(domStrings.descPeopleSearchInput).addEventListener("input", event => {
                renderSearchPeople(event.target.value, id, false);
            });
        }
    }   
    let renderEditSection = (id, isProject) => {
        console.log("Is project? " + isProject);
        if(isProject){
            _(FormView.getDomStrings().editBoxButton).dataset.projectId = id;
            let projectData = ProjectModel.getDataById(id);
            _(FormView.getDomStrings().editName).value = projectData.projectName;
            _(FormView.getDomStrings().editFromDateId).value = projectData.fromDate;
            _(FormView.getDomStrings().editLastDateId).value = projectData.toDate;
            _(FormView.getDomStrings().editDescInputTag).innerText = projectData.projectDesc;
            _(FormView.getDomStrings().peopleEditLabel).dataset.projectId = id;
            renderSearchPeople("", id, true, true);
            _(domStrings.editPeopleSearchInput).addEventListener("input", async event => {
                let response = await sendGetRequest("user/getusers?id=all");
                FormView.renderSearchPeople(event.target.value, false, _(domStrings.editSearchPeopleWrapper), response);
            }); 
        }
        else {
            let taskData = TaskModel.getTaskByTaskId(id);
            console.log(taskData)
            _(FormView.getDomStrings().editName).value = taskData.taskName;
            _(FormView.getDomStrings().editFromDateId).value = taskData.fromDate;
            _(FormView.getDomStrings().editLastDateId).value = taskData.toDate;
            _(FormView.getDomStrings().editDescInputTag).innerText = taskData.taskDescription;
            renderSearchPeople("", id, false, true);
            _(FormView.getDomStrings().editBoxButton).dataset.projectId = taskData.projectId;
            _(FormView.getDomStrings().peopleEditLabel).dataset.taskId = taskData.taskId;
            _(FormView.getDomStrings().peopleEditInput).dataset.taskId = taskData.taskId;
            _(domStrings.editPeopleSearchInput).addEventListener("input", async event => {
                console.log(event.target.dataset.taskId);
                let projectId = TaskModel.getTaskByTaskId(event.target.dataset.taskId).projectId;
                let response = await sendGetRequest("user/getusers/project?id=" + projectId);
                FormView.renderSearchPeople(event.target.value, false, _(domStrings.editSearchPeopleWrapper), response);
            }); 
        }
        _(FormView.getDomStrings().editBoxButton).id = id;
    }
    return {
        getDomStrings : getDomStrings,
        showErrorMessage : showErrorMessage,
        showSuccessMessage : showSuccessMessage,
        loadStatisticsData : loadStatisticsData,
        showPopUpSymbol : showPopUpSymbol,
        renderDescriptionDetails : renderDescriptionDetails,
        renderEditSection : renderEditSection
    }
})();