let MainController = (view => {

    let init = () => {
        //Adding this listener for right side section
        _(view.getDomStrings().topSmallImage).addEventListener("click", event => {
            view.loadStatisticsData();
            _(view.getDomStrings().rightSection).classList.toggle(view.getDomStrings().showFromRightToLeft);
        });

        //This is for closing right side section
        _(view.getDomStrings().rightSideCloseButton).addEventListener("click", event => {
            _(view.getDomStrings().rightSection).classList.remove(view.getDomStrings().showFromRightToLeft);
        })
        //This is for opening add form section
        _(view.getDomStrings().newButton).addEventListener("click", event => {
            //Setting default date values as today 
            _(FormView.getDomStrings().fromDateInputTag).valueAsDate = new Date();
            _(FormView.getDomStrings().toDateInputTag).valueAsDate = new Date();

            if(CURRENTSECTION == "Project"){
                _(FormView.getDomStrings().projectChoosingWrapper).classList.remove(FormView.getDomStrings().showProjectsChoosingWrapper);
            }
            else {
                _(FormView.getDomStrings().projectChoosingWrapper).classList.add(FormView.getDomStrings().showProjectsChoosingWrapper); 
            }
            FormView.renderProjectOption(ProjectModel.getProjectsArray());
            _(view.getDomStrings().topSmallImage).click();
            _(view.getDomStrings().fullFormSection).classList.add(view.getDomStrings().showFromRightToLeft);
        });
        //This is for closing add form section
        _(view.getDomStrings().formCloseButton).addEventListener("click", event => {
            _(view.getDomStrings().rightSideCloseButton).click();
            FormController.resetForm();
            if(_(FormView.getDomStrings().peopleAddingLabel).id == "opened"){
                _(FormView.getDomStrings().peopleAddingLabel).click();
            }
            _(view.getDomStrings().fullFormSection).classList.remove(view.getDomStrings().showFromRightToLeft);
        }); 

        //This is for form adding button
        _(view.getDomStrings().formCreatingButton).addEventListener("click", event => {
            let result = FormController.validateForm();
            if(result.status){
                if(CURRENTSECTION == "Project"){
                    console.log("going to add project ....");
                    ProjectController.addProject(result.formDetails);
                }
                else {
                    console.log("going to add task ...");
                    TaskController.addTask(result.formDetails);
                }
                _(view.getDomStrings().rightSideCloseButton).click();
                _(view.getDomStrings().fullFormSection).classList.remove(view.getDomStrings().showFromRightToLeft);
            }
        });
        //This is for error popup message closing button 
        _(view.getDomStrings().errorMessageCloseButton).addEventListener("click", event => {
            _(view.getDomStrings().errorMessageDiv).classList.remove(view.getDomStrings().showPopupMessage);
        });
        //This is for success popup message closing button 
        _(view.getDomStrings().successMessageCloseButton).addEventListener("click", event => {
            _(view.getDomStrings().successMessageDiv).classList.remove(view.getDomStrings().showPopupMessage);
        });
        //This is for popup message closing button 
        _(view.getDomStrings().popupCloseButton).addEventListener("click", event => {
            _(view.getDomStrings().popupWindow).classList.remove(view.getDomStrings().showPopupMessage);
        });

        //This is for opening in progress button 
        _(view.getDomStrings().inProgressButton).addEventListener("click", event => {
            _(view.getDomStrings().inProgressSection).classList.add(view.getDomStrings().showBoxWrapperSection);
            //Removing other sections
            _(view.getDomStrings().yetToStartSection).classList.remove(view.getDomStrings().showBoxWrapperSection);
            _(view.getDomStrings().completedSection).classList.remove(view.getDomStrings().showBoxWrapperSection);
        });
        //This is for opening in completed boxes wrapper button 
        _(view.getDomStrings().completedBoxButton).addEventListener("click", event => {
            _(view.getDomStrings().completedSection).classList.add(view.getDomStrings().showBoxWrapperSection);
            //Removing other sections
            _(view.getDomStrings().yetToStartSection).classList.remove(view.getDomStrings().showBoxWrapperSection);
            _(view.getDomStrings().inProgressSection).classList.remove(view.getDomStrings().showBoxWrapperSection);
        });
        //This is for opening in yet to start boxes wrapper button 
        _(view.getDomStrings().yetToStartButton).addEventListener("click", event => {
            _(view.getDomStrings().yetToStartSection).classList.add(view.getDomStrings().showBoxWrapperSection);
            //Removing other sections
            _(view.getDomStrings().completedSection).classList.remove(view.getDomStrings().showBoxWrapperSection);
            _(view.getDomStrings().inProgressSection).classList.remove(view.getDomStrings().showBoxWrapperSection);
        });
        //This is for closing description section
        _(view.getDomStrings().descriptionCloseButton).addEventListener("click", event => {
            _(view.getDomStrings().fullDescriptionSection).classList.remove (view.getDomStrings().showFromRightToLeft);
        }); 
        //This is for closing edit section
        _(view.getDomStrings().editBoxCloseButton).addEventListener("click", event => {
            _(view.getDomStrings().fullEditSection).classList.remove(view.getDomStrings().showFromRightToLeft);
        });

        //This is for opening projects section
        _(view.getDomStrings().projectSectionButton).addEventListener("click", event => {
            _(view.getDomStrings().chatMembersCloseButton).click();
            _(view.getDomStrings().settingCloseButton).click();
            _(view.getDomStrings().fullFilterWrapper).classList.add(view.getDomStrings().showFilter);
            _(view.getDomStrings().fullFilterWrapper).classList.remove(view.getDomStrings().hideFilter);
            _(view.getDomStrings().currentSectionHeading).textContent = "Projects";
            CURRENTSECTION = "Project";
            _(view.getDomStrings().taskSection).classList.remove(view.getDomStrings().showFromScale);
        });
        
        //This is for opening task section 
        _(view.getDomStrings().taskSectionButton).addEventListener("click", event => {
            _(view.getDomStrings().chatMembersCloseButton).click();
            _(view.getDomStrings().settingCloseButton).click();
            _(ChatView.getDomStrings().chattingWindow).click();
            _(view.getDomStrings().fullFilterWrapper).classList.remove(view.getDomStrings().showFilter);
            _(view.getDomStrings().fullFilterWrapper).classList.add(view.getDomStrings().hideFilter);
            _(view.getDomStrings().currentSectionHeading).textContent = "Tasks";
            CURRENTSECTION = "Tasks";
            _(view.getDomStrings().taskSection).classList.add(view.getDomStrings().showFromScale);
        });
        //This is for opening chat people view
        _(view.getDomStrings().chatButton).addEventListener("click", event => {
            _(view.getDomStrings().chatPeopleViewSection).classList.add(view.getDomStrings().showFromRightToLeft);
        });
        //This is to close the chat people view
        _(view.getDomStrings().chatMembersCloseButton).addEventListener("click", event => {
            _(view.getDomStrings().chatPeopleViewSection).classList.remove(view.getDomStrings().showFromRightToLeft);
        });
        //This is for notification audio 
        _(view.getDomStrings().notificationAudioButton).addEventListener("click", playNotificationSound);

        //This is for opening settings page
        _(view.getDomStrings().settingSectionButton).addEventListener("click", event => {
            _(view.getDomStrings().chatMembersCloseButton).click();
            _(SettingsView.getDomStrings().settingsUserPhoto).style.backgroundImage = `url(/ProApp/assets/images/usersImages/${CURRENTUSERPHOTO})`;
            _(view.getDomStrings().settingSection).classList.add(view.getDomStrings().showFromRightToLeft);
        });

        //This is for closing settings page
        _(view.getDomStrings().settingCloseButton).addEventListener("click", event => {
            _(view.getDomStrings().settingSection).classList.remove(view.getDomStrings().showFromRightToLeft);
        });
    }
    init();

    return {
        init : init,
    }
})(MainView);