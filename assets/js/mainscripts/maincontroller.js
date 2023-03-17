let MainController = (view => {

    _(view.getDomStrings().projectSectionButton).classList.add(view.getDomStrings().iconClickEffect);

    //This is for resetting the icon effect in the side nav bar
    let resetIconEffect = activeElement => {
        let chatIcon =  _(view.getDomStrings().chatButton);
        let projectIcon = _(view.getDomStrings().projectSectionButton);
        let taskIcon = _(view.getDomStrings().taskSectionButton);
        let overdueIcon = _(view.getDomStrings().overDueIcon);
        let iconsArray = [chatIcon, projectIcon, taskIcon, overdueIcon];
        iconsArray.forEach(elem => {
            if(elem != activeElement){
                elem.classList.remove(view.getDomStrings().iconClickEffect);
            }
        })
    }
    
    let resetRightWindows = activeElement => {
        let chatOuterWindow = _(view.getDomStrings().chatPeopleViewSection);
        let settingsSection = _(view.getDomStrings().settingSection);
        let profileOverviewWindow = _(view.getDomStrings().rightSection);

        if(activeElement != chatOuterWindow) {
            _(view.getDomStrings().chatButton).classList.remove(view.getDomStrings().iconClickEffect);
        }
        
        let windows = [chatOuterWindow, profileOverviewWindow, settingsSection];
        console.log(windows);
        windows.forEach(elem => {
            if(elem != activeElement){
                elem.classList.remove(view.getDomStrings().showFromRightToLeft);
                console.log(elem);
            }
        })
    }

    let resetMainWindows = activeWindow => {
        let taskSection = _(view.getDomStrings().taskSection);
        let overdueSection = _(view.getDomStrings().overDueSection);

        let windowsArray = [taskSection, overdueSection];
        if(!activeWindow){
            _(view.getDomStrings().newButton).classList.remove(view.getDomStrings().hideComponent);
            _(view.getDomStrings().fullFilterWrapper).classList.remove(view.getDomStrings().hideComponent);
        }
        windowsArray.forEach(elem => {
            if(elem != activeWindow){
                elem.classList.remove(view.getDomStrings().showFromRightToLeft);
                elem.classList.remove(view.getDomStrings().showFromScale);
            }
        });
    }
    let init = () => {
        //Adding this listener for right side section
        _(view.getDomStrings().profileButton).addEventListener("click", event => {
            view.loadStatisticsData();
            _(view.getDomStrings().chatMembersCloseButton).click();
            _(ChatView.getDomStrings().chattingWindowCloseButton).click();
            resetRightWindows(_(view.getDomStrings().rightSection));
            _(view.getDomStrings().rightSection).classList.toggle(view.getDomStrings().showFromRightToLeft);
            // _(view.getDomStrings().topRightOptionsInput).checked = false;
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
                _(view.getDomStrings().fullFormSection).classList.add(view.getDomStrings().showFromRightToLeft);
            }
            else {
                if(ProjectModel.getProjectsArray().length){
                    _(FormView.getDomStrings().projectChoosingWrapper).classList.add(FormView.getDomStrings().showProjectsChoosingWrapper); 
                    _(view.getDomStrings().fullFormSection).classList.add(view.getDomStrings().showFromRightToLeft);
                    FormView.renderProjectOption(ProjectModel.getProjectsArray());
                }
                else {
                    view.showErrorMessage("Create Project first ...");
                }
            }
            // _(view.getDomStrings().topSmallImage).click();
            
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
            _(view.getDomStrings().projectSectionButton).classList.add(view.getDomStrings().iconClickEffect);
            resetIconEffect(_(view.getDomStrings().projectSectionButton));
            _(ChatView.getDomStrings().chattingWindowCloseButton).click();
            _(view.getDomStrings().chatMembersCloseButton).click();
            _(view.getDomStrings().settingCloseButton).click();
            _(view.getDomStrings().fullFilterWrapper).classList.add(view.getDomStrings().showFilter);
            _(view.getDomStrings().fullFilterWrapper).classList.remove(view.getDomStrings().hideFilter);
            _(view.getDomStrings().currentSectionHeading).textContent = "Projects";
            CURRENTSECTION = "Project";
            resetMainWindows(null);
            _(view.getDomStrings().descriptionCloseButton).click();
            _(view.getDomStrings().editBoxCloseButton).click();
        });
        
        //This is for opening task section 
        _(view.getDomStrings().taskSectionButton).addEventListener("click", event => {
            _(view.getDomStrings().taskSectionButton).classList.add(view.getDomStrings().iconClickEffect);
            resetIconEffect(_(view.getDomStrings().taskSectionButton));
            _(ChatView.getDomStrings().chattingWindowCloseButton).click();
            _(view.getDomStrings().chatMembersCloseButton).click();
            _(view.getDomStrings().settingCloseButton).click();
            _(ChatView.getDomStrings().chattingWindow).click();
            _(view.getDomStrings().fullFilterWrapper).classList.remove(view.getDomStrings().showFilter);
            _(view.getDomStrings().fullFilterWrapper).classList.add(view.getDomStrings().hideFilter);
            _(view.getDomStrings().currentSectionHeading).textContent = "Tasks";
            CURRENTSECTION = "Tasks";
            resetMainWindows(_(view.getDomStrings().taskSection));
            _(view.getDomStrings().taskSection).classList.add(view.getDomStrings().showFromScale);
            _(view.getDomStrings().descriptionCloseButton).click();
            _(view.getDomStrings().editBoxCloseButton).click();
         });
        //This is for opening chat people view
        _(view.getDomStrings().chatButton).addEventListener("click", event => {
            _(view.getDomStrings().settingCloseButton).click();
            _(view.getDomStrings().rightSideCloseButton).click();
            _(view.getDomStrings().chatButton).classList.add(view.getDomStrings().iconClickEffect);
            resetIconEffect(_(view.getDomStrings().chatButton));
            _(view.getDomStrings().chatPeopleViewSection).classList.add(view.getDomStrings().showFromRightToLeft);
            _(view.getDomStrings().descriptionCloseButton).click();
            _(view.getDomStrings().editBoxCloseButton).click();
        });
        //This is to close the chat people view
        _(view.getDomStrings().chatMembersCloseButton).addEventListener("click", event => {
            _(view.getDomStrings().chatPeopleViewSection).classList.remove(view.getDomStrings().showFromRightToLeft);
            _(view.getDomStrings().chatButton).classList.remove(view.getDomStrings().iconClickEffect);
        });
        //This is for notification audio 
        _(view.getDomStrings().notificationAudioButton).addEventListener("click", playNotificationSound);

        //This is for opening settings page
        _All(view.getDomStrings().settingSectionButton).forEach(elem => {
            console.log("Opening settings page ........");
            elem.addEventListener("click", event => {
                _(ChatView.getDomStrings().chattingWindowCloseButton).click();
                _(view.getDomStrings().chatMembersCloseButton).click();
                resetRightWindows(_(view.getDomStrings().settingSection));
                // _(view.getDomStrings().topRightOptionsInput).checked = false;
                _(SettingsView.getDomStrings().settingsUserPhoto).style.backgroundImage = `url(/ProApp/assets/images/usersImages/${CURRENTUSERPHOTO})`;
                _(view.getDomStrings().settingSection).classList.add(view.getDomStrings().showFromRightToLeft);
            });
        });

        //This is for closing settings page
        _(view.getDomStrings().settingCloseButton).addEventListener("click", event => {
            _(view.getDomStrings().settingSection).classList.remove(view.getDomStrings().showFromRightToLeft);
        });

        //This is for opening overdue section
        _(view.getDomStrings().overDueIcon).addEventListener("click", event => {
            _(view.getDomStrings().overDueIcon).classList.add(view.getDomStrings().iconClickEffect);
            resetIconEffect(_(view.getDomStrings().overDueIcon));
            _(ChatView.getDomStrings().chattingWindowCloseButton).click();
            _(view.getDomStrings().overDueSection).classList.add(view.getDomStrings().showFromScale);
            CURRENTSECTION = "OverDue";
            resetMainWindows(_(view.getDomStrings().overDueSection))
            _(view.getDomStrings().currentSectionHeading).textContent = "OverDue";
            _(view.getDomStrings().newButton).classList.add(view.getDomStrings().hideComponent);
            _(view.getDomStrings().fullFilterWrapper).classList.add(view.getDomStrings().hideComponent);
            _(view.getDomStrings().chatMembersCloseButton).click();
            _(view.getDomStrings().settingCloseButton).click();
            _(view.getDomStrings().descriptionCloseButton).click();
            _(view.getDomStrings().editBoxCloseButton).click();
        });

        //This is for handling top profile and notification button's actions
        _(view.getDomStrings().topProfilePhotoLabel).addEventListener("click", event => {
            if(_(view.getDomStrings().notificationLabel).nextElementSibling.checked){
                _(view.getDomStrings().notificationLabel).click();
            }  
        });
        // _(view.getDomStrings().notificationLabel).addEventListener("click", event => {
        //     if(_(view.getDomStrings().topProfilePhotoLabel).nextElementSibling.checked){
        //         _(view.getDomStrings().topProfilePhotoLabel).click();
        //     }
        // });
    }
    init();

    return {
        init : init,
    }
})(MainView);