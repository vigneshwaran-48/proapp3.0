let TaskView = (() => {

    let domStrings = {
        taskMiddleSectionBody : ".task-middle-section-body",
        singleProjectTaskWrapper : "single-project-task-wrapper",
        singleProjectsTaskHeading : "single-projects-task-heading",
        singleTaskWrapper : "single-task-wrapper",
        singleTask : "single-task",
        taskNameCheckboxWrapper : "task-name-checkbox-wrapper",
        taskCheckBox : "common-task-check-input",
        singleTaskHeading : "single-task-heading",
        taskButtonsPhotoWrapper : "task-buttons-photos-wrapper",
        taskButtonWrapper : "task-buttons-wrapper",
        singleTaskIcon : "single-task-icon",
        trashIconClasses : ["fa-solid", "fa-trash"],
        exitIconClasses : ["fa-solid", "fa-right-from-bracket"],
        threeDotsIconClasses : ["fa-solid", "fa-ellipsis-vertical"],
        allTaskPeopleImageWrapper : "all-task-people-wrapper",
        personImageWrapper : "person-image-wrapper",
        personImage : "person-image",
        taskOptionsWrapper : "task-options-wrapper",
        taskOption : "task-option",
        taskEditButton : "task-edit-button",
        taskMoreInfoButton : "task-more-info-button",
        taskCompleteButton : "task-complete-button",
        finishTask : "finish-task",
        noTaskHeading : "no-task-heading",
        showTwoOptions : "show-two-option",
        showOneOption : "show-one-option",
        threeDotsInput : "three-dots-task-input",
        threeDotsLabel : "task-three-dots-label"
    }
    let getDomStrings = () => domStrings;

    //This method is used to check whether there is a task in given object of array.
    let isTasksAvailable = projectTasks => {
        let objectKeys = Object.keys(projectTasks)
        for(let i = 0;i < objectKeys.length;i++){
            if(projectTasks[objectKeys[i]].length){
                return true;
            }
        }
        return false;
    }
    let renderTasks = projects => {
        let tasks = {};
        projects.forEach(elem => {
            tasks[elem.projectName] = TaskModel.getTasksByProjectId(elem.id);
        });
        _(domStrings.taskMiddleSectionBody).innerHTML = "";
        //This if condition is to check any tasks available in any project
        if(isTasksAvailable(tasks)){
            Object.keys(tasks).forEach(singleProject => {
                //This if condition is to check the current project in loop has a task
                if(tasks[singleProject].length){
                    //This elements are for whole single task wrapper for a specific project
                    let singleProjectTaskSection = document.createElement("section");
                    let projectNameTag = document.createElement("h1");
                    let tasksWrapper = document.createElement("div");

                    singleProjectTaskSection.classList.add(domStrings.singleProjectTaskWrapper);
                    singleProjectTaskSection.classList.add("semi-light-theme");
                    singleProjectTaskSection.classList.add("y-axis-flex");

                    projectNameTag.classList.add(domStrings.singleProjectsTaskHeading);
                    tasksWrapper.classList.add(domStrings.singleTaskWrapper);
                    tasksWrapper.classList.add("semi-light-theme");
                    tasksWrapper.classList.add("y-axis-flex");
                    projectNameTag.textContent = singleProject;

                    singleProjectTaskSection.append(projectNameTag, tasksWrapper);
                    tasks[singleProject].forEach(task => {
                        //Creating elements for a single task starts here
                        let singleTask = document.createElement("div");

                        let taskNameCheckboxWrapper = document.createElement("div");
                        let taskCheckBox = document.createElement("input");
                        let taskHeadingTag = document.createElement("h2");

                        let taskButtonsPhotosWrapper = document.createElement("div");
                        let taskButtonsWrapper = document.createElement("div");
                        let taskTrashIconSpan = document.createElement("span");
                        taskTrashIconSpan.id = "delete-task" + task.taskId;
                        let taskTrashIcon = document.createElement("i");
                        taskTrashIcon.id = "delete-task" + task.taskId;
                        let taskExitIconSpan = document.createElement("span")
                        taskTrashIconSpan.id = "delete-task" + task.taskId;
                        let taskExitIcon = document.createElement("i");
                        taskExitIcon.id = "delete-task" + task.taskId;
                        let taskPeopleWrapper = document.createElement("div");
                        //Setting photos for people
                        ProjectView.getPhotoSection(task.users, taskPeopleWrapper, domStrings.personImageWrapper, domStrings.personImage, true);

                        let threeDotsWrapper = document.createElement("div");
                        let iTag = document.createElement("i");
                        let dotsLabel = document.createElement("label");
                        let dotsInput = document.createElement("input");
                        dotsInput.type = "checkbox";
                        dotsInput.id = "task-dots-" + task.taskId;
                        dotsLabel.setAttribute("for", "task-dots-" + task.taskId);
                        let taskOptionsWrapper = document.createElement("ul");
                        let taskOption1 = document.createElement("li");
                        let taskOption2 = document.createElement("li");
                        //Creating elements for a single task ends here

                        //Adding classes to created task components starts here
                        singleTask.classList.add(domStrings.singleTask);
                        singleTask.classList.add("light-theme");
                        singleTask.classList.add("x-axis-flex");

                        taskNameCheckboxWrapper.classList.add(domStrings.taskNameCheckboxWrapper);
                        taskNameCheckboxWrapper.classList.add("x-axis-flex");
                        taskCheckBox.classList.add(domStrings.taskCheckBox);
                        taskCheckBox.id = "task" + task.taskId;
                        taskCheckBox.type = "checkbox";
                        taskHeadingTag.classList.add(domStrings.singleTaskHeading);
                        
                        taskButtonsPhotosWrapper.classList.add(domStrings.taskButtonsPhotoWrapper);
                        taskButtonsPhotosWrapper.classList.add("x-axis-flex");
                        taskButtonsWrapper.classList.add(domStrings.taskButtonWrapper);
                        taskButtonsWrapper.classList.add("x-axis-flex");
                        taskTrashIconSpan.classList.add(domStrings.singleTaskIcon);
                        taskExitIconSpan.classList.add(domStrings.singleTaskIcon);
                        domStrings.trashIconClasses.forEach(elem => {
                            taskTrashIcon.classList.add(elem);
                        });
                        domStrings.exitIconClasses.forEach(elem => {
                            taskExitIcon.classList.add(elem);
                        });

                        taskOptionsWrapper.classList.add(ProjectView.getDomStrings().threeDotsOptionsWrapper);
                        taskOptionsWrapper.classList.add("light-theme");
                        taskOption1.classList.add(ProjectView.getDomStrings().threeDotsOption);
                        taskOption1.classList.add(ProjectView.getDomStrings().threeDotsEditOption);
                        taskOption1.id = "edit" + task.taskId;
                        taskOption2.classList.add(ProjectView.getDomStrings().threeDotsOption);
                        taskOption2.classList.add(ProjectView.getDomStrings().threeDotsMoreInfoOption);
                        taskOption2.id = "more" + task.taskId;
                        dotsLabel.classList.add(domStrings.threeDotsLabel);
                        
                        taskPeopleWrapper.classList.add(domStrings.allTaskPeopleImageWrapper);
                        taskPeopleWrapper.classList.add("x-axis-flex");
                        domStrings.threeDotsIconClasses.forEach(iconClass => {
                            iTag.classList.add(iconClass);
                        });
                        dotsInput.classList.add(domStrings.threeDotsInput);
                        //Making the task div checked if it is completed here
                        if(task.isCompleted){
                            taskCheckBox.checked = true;
                            taskHeadingTag.classList.add(domStrings.finishTask);
                        }

                        //Adding contents and listeners to the created elements
                        taskOption1.textContent = "Edit";
                        taskOption2.textContent = "More Info";
                        taskCheckBox.addEventListener("click", TaskController.finishTask);
                        taskHeadingTag.textContent = task.taskName;
                        taskTrashIconSpan.addEventListener("click", event => {
                            event.preventDefault();
                            event.stopPropagation();
                            TaskController.deleteTask(event.target.id.slice(11));
                        });
                        taskExitIconSpan.addEventListener("click", event => {
                            event.preventDefault();
                            event.stopPropagation();
                            TaskController.exitTask(event.target.id.slice(11));
                        });
                        threeDotsWrapper.addEventListener("click", event => {
                            if(event.target.id.startsWith("more")){
                                _(MainView.getDomStrings().fullDescriptionSection).classList.add(MainView.getDomStrings().showFromRightToLeft);
                                MainView.renderDescriptionDetails(event.target.id.slice(4), false);
                                event.target.parentElement.classList.remove(ProjectView.getDomStrings().showBoxOptions);
                            }
                            else if (event.target.id.startsWith("edit")){
                                _(MainView.getDomStrings().fullEditSection).classList.add(MainView.getDomStrings().showFromRightToLeft);
                                MainView.renderEditSection(event.target.id.slice(4), false);
                                event.target.parentElement.classList.remove(ProjectView.getDomStrings().showBoxOptions);
                            }
                            else {
                                if(event.target.tagName == "I"){
                                    event.preventDefault();
                                    event.stopPropagation();
                                    if(event.target.parentElement.nextElementSibling.nextElementSibling.children.length > 1){
                                        event.target.parentElement.nextElementSibling.nextElementSibling.classList.toggle(ProjectView.getDomStrings().showBoxOptions); 
                                    }
                                    else {
                                        event.target.parentElement.nextElementSibling.nextElementSibling.classList.toggle(ProjectView.getDomStrings().showNormalUserBoxOption);
                                    }
                                }
                                else if (event.target.tagName == "DIV"){
                                    if(event.target.children[2].children.length > 1){
                                        event.target.children[2].classList.toggle(ProjectView.getDomStrings().showBoxOptions);
                                    }
                                    else {
                                        event.target.children[2].classList.toggle(ProjectView.getDomStrings().showNormalUserBoxOption);
                                    }
                                }
                                else {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    if(event.target.nextElementSibling.nextElementSibling.children.length > 1){
                                        event.target.nextElementSibling.nextElementSibling.classList.toggle(ProjectView.getDomStrings().showBoxOptions);
                                    }
                                    else {
                                        event.target.nextElementSibling.nextElementSibling.classList.toggle(ProjectView.getDomStrings().showNormalUserBoxOption);
                                    }
                                }
                            }
                        });
                        //Inserting elements to its respective parent
                        taskNameCheckboxWrapper.append(taskCheckBox, taskHeadingTag);
                        taskTrashIconSpan.append(taskTrashIcon);
                        taskExitIconSpan.append(taskExitIcon);
                        if(USERID == task.createdBy){
                            taskButtonsWrapper.append(taskTrashIconSpan);
                            taskOptionsWrapper.append(taskOption1, taskOption2);
                        }
                        else {
                            taskButtonsWrapper.append(taskExitIconSpan);
                            taskOptionsWrapper.append(taskOption2);
                        }
                        taskButtonsPhotosWrapper.append(taskButtonsWrapper, taskPeopleWrapper);
                        dotsLabel.append(iTag);
                        threeDotsWrapper.append(dotsLabel, dotsInput, taskOptionsWrapper);

                        singleTask.append(taskNameCheckboxWrapper, taskButtonsPhotosWrapper, threeDotsWrapper);
                        tasksWrapper.append(singleTask);
                    });
                    _(domStrings.taskMiddleSectionBody).append(singleProjectTaskSection);
                }
                
            });
        }
        else {
            let h1Tag = document.createElement("h1");
            h1Tag.textContent = "You have no tasks yet";
            h1Tag.classList.add(domStrings.noTaskHeading);
            _(domStrings.taskMiddleSectionBody).append(h1Tag);
        }
    }

    return {
        getDomStrings : getDomStrings,
        renderTasks : renderTasks
    }
})();