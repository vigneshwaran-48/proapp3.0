let ProjectView = (() => {

    let domStrings = {
        yetToStartSection : ".yet-to-start-box-wrapper",
        inProgressSection : ".in-progress-box-wrapper",
        completedSection : ".completed-box-wrapper",
        mainBox : "main-box",
        topBoxDetail : "top-box-detail",
        boxName : "box-name",
        threeDotsWrapper : "three-dots-wrapper",
        threeDotsLabel : "three-dotthree-dots-task-input-label",
        iconClass1 : "fa-solid",
        iconClass2 : "fa-ellipsis",
        showBoxOptions : "show-box-options",
        showNormalUserBoxOption : "show-normal-user-box-option",
        threeDotsInputId : "three-dots",
        threeDotsOptionsWrapper : "three-dots-options-wrapper",
        threeDotsOption : "three-dots-option",
        boxDescription : "box-description",
        boxPercentageWrapper : "box-percentage-wrapper",
        boxPercentageValue : "box-percentage-value",
        allPeopleWrapper : "all-people-wrapper",
        personImageWrapper : "person-image-wrapper",
        personImage : "person-image",
        morePerson : "more-person",
        threeDotsEditOption : "three-dots-edit-option",
        threeDotsMoreInfoOption : "three-dots-more-info",
        threeDotsCompleteOption : "three-dots-complete-option"
    }
    let getDomStrings = () => domStrings;
    
    let getPhotoSection = (users, allPeopleWrapper, personImageWrapperClass, personImageClass, isTask) => {
        let photoWrapperSubText;
        let morePersonClass;
        if(isTask){
            photoWrapperSubText = "task-person-";
            morePersonClass = "more-person-task";
        }
        else {
            photoWrapperSubText = "person-";
            morePersonClass = "more-person";
        }
        let peopleCount = 1;
            users.forEach(element => {
                let personImageWrapper = document.createElement("div");
                personImageWrapper.classList.add(personImageWrapperClass);
                if(peopleCount <= 3){
                    personImageWrapper.classList.add(photoWrapperSubText + peopleCount++);
                    let personImage = document.createElement("div");
                    personImage.classList.add(personImageClass);
                    personImage.style.backgroundImage = `url("assets/images/usersImages/${element.imagePath}")`;
                    personImageWrapper.append(personImage);
                    allPeopleWrapper.append(personImageWrapper);
                }
                else {
                    if(peopleCount == 4){
                        personImageWrapper.classList.add(morePersonClass);
                        personImageWrapper.append(document.createElement("div").textContent = "+1"); 
                        allPeopleWrapper.append(personImageWrapper);
                    }
                    else {
                        console.log(imageCount);
                        allPeopleWrapper.children[3].children[0].textContent = "+" + (imageCount - 3);
                    }
                }
            })
    }
    
    let renderProjects = projects => {

        //Reseting all projects section
        _(domStrings.yetToStartSection).innerHTML = "";
        _(domStrings.inProgressSection).innerHTML = "";
        _(domStrings.completedSection).innerHTML = "";

        projects.forEach(elem => {
            //Creating elements starts here
            let parentTag;
            if(elem.status == "Yet To Start"){
                parentTag = _(domStrings.yetToStartSection);
            }
            else if (elem.status == "On Progress"){
                parentTag = _(domStrings.inProgressSection);
            }
            else if (elem.status == "Completed"){
                parentTag = _(domStrings.completedSection);
            }
            let mainBox = document.createElement("div");

            let topBoxDetail = document.createElement("div");
            let boxName = document.createElement("h2");
            let iTag = document.createElement("i");
            let threeDotsWrapper = document.createElement("div");
            let threeDotsLabel = document.createElement("label");
            let threeDotsInput = document.createElement("input");
            let threeDotsOptionsWrapper = document.createElement("ul");
            let threeDotsOption1 = document.createElement("li");
            let threeDotsOption2 = document.createElement("li");
            let threeDotsOption3 = document.createElement("li");
            let threeDotsOption4 = document.createElement("li");

            let boxDescription = document.createElement("div");
            let boxPercentageWrapper = document.createElement("div");
            let boxPercentageValue = document.createElement("div");

            let allPeopleWrapper = document.createElement("div");
            //Creating elements ends here

            //Adding classes to the elements starts here 
            mainBox.classList.add(domStrings.mainBox);
            mainBox.classList.add("y-axis-flex");

            topBoxDetail.classList.add(domStrings.topBoxDetail);
            topBoxDetail.classList.add("x-axis-flex");

            boxName.classList.add(domStrings.boxName);
            iTag.classList.add(domStrings.iconClass1);
            iTag.classList.add(domStrings.iconClass2);
            threeDotsWrapper.classList.add(domStrings.threeDotsWrapper);
            threeDotsLabel.classList.add(domStrings.threeDotsLabel);
            threeDotsInput.classList.add(domStrings.threeDotsInputId);
            threeDotsInput.id = domStrings.threeDotsInputId + elem.id;
            threeDotsOptionsWrapper.classList.add(domStrings.threeDotsOptionsWrapper);
            threeDotsOptionsWrapper.classList.add("light-theme");
            threeDotsOption1.classList.add(domStrings.threeDotsOption);
            threeDotsOption1.classList.add(domStrings.threeDotsEditOption);
            threeDotsOption1.id = "edit" + elem.id;
            threeDotsOption2.classList.add(domStrings.threeDotsOption);
            threeDotsOption2.classList.add(domStrings.threeDotsMoreInfoOption);
            threeDotsOption2.id = "more" + elem.id;
            threeDotsOption3.classList.add(domStrings.threeDotsOption);
            threeDotsOption3.classList.add(domStrings.threeDotsCompleteOption);
            threeDotsOption3.id = "delete" + elem.id;
            threeDotsOption4.classList.add(domStrings.threeDotsOption);
            threeDotsOption4.id = "exit" + elem.id;

            boxDescription.classList.add(domStrings.boxDescription);
            boxPercentageWrapper.classList.add(domStrings.boxPercentageWrapper);
            boxPercentageValue.classList.add(domStrings.boxPercentageValue);

            allPeopleWrapper.classList.add(domStrings.allPeopleWrapper);
            allPeopleWrapper.classList.add("x-axis-flex");
            //Adding classes to the elements ends here

            //Creating photo div here
            getPhotoSection(elem.users, allPeopleWrapper, domStrings.personImageWrapper, domStrings.personImage);
            
            //Setting contents of the created element starts here
            boxName.textContent = elem.projectName;
            boxDescription.textContent = elem.projectDesc;
            threeDotsLabel.setAttribute("for", domStrings.threeDotsInputId + elem.id);
            threeDotsOption1.textContent = "Edit";
            threeDotsOption2.textContent = "More Info";
            threeDotsOption3.textContent = "Delete";
            threeDotsOption4.textContent = "Exit";
            boxPercentageValue.textContent = elem.percentage + "%";
            boxPercentageValue.style.width = elem.percentage + "%";

            threeDotsWrapper.addEventListener("click", event => {
                if(event.target.id.startsWith("more")){
                    _(MainView.getDomStrings().fullDescriptionSection).classList.add(MainView.getDomStrings().showFromRightToLeft);
                    MainView.renderDescriptionDetails(event.target.id.slice(4), true);
                    event.target.parentElement.classList.remove(domStrings.showBoxOptions);
                }
                else if (event.target.id.startsWith("delete")){
                    console.log("completed action ........");
                    ProjectController.deleteProject(event.target.id.slice(6), true)
                    event.target.parentElement.classList.remove(domStrings.showBoxOptions);
                }
                else if (event.target.id.startsWith("edit")){
                    _(MainView.getDomStrings().fullEditSection).classList.add(MainView.getDomStrings().showFromRightToLeft);
                    MainView.renderEditSection(event.target.id.slice(4), true);
                    event.target.parentElement.classList.remove(domStrings.showBoxOptions);
                }
                else if (event.target.id.startsWith("exit")){
                    console.log("completed action ........");
                    ProjectController.exitProject(event.target.id.slice(4), true)
                    event.target.parentElement.classList.remove(domStrings.showBoxOptions);
                }
                else {
                    if(event.target.tagName == "I"){
                        event.preventDefault();
                        event.stopPropagation();
                        if(event.target.parentElement.nextElementSibling.nextElementSibling.children.length > 1){
                            event.target.parentElement.nextElementSibling.nextElementSibling.classList.toggle(domStrings.showBoxOptions); 
                        }
                        else {
                            event.target.parentElement.nextElementSibling.nextElementSibling.classList.toggle(domStrings.showNormalUserBoxOption);
                        }
                    }
                    else if (event.target.tagName == "DIV"){
                        if(event.target.children[2].children.length > 1){
                            event.target.children[2].classList.toggle(domStrings.showBoxOptions);
                        }
                        else {
                            event.target.children[2].classList.toggle(domStrings.showNormalUserBoxOption);
                        }
                    }
                    else {
                        event.preventDefault();
                        event.stopPropagation();
                        if(event.target.nextElementSibling.nextElementSibling.children.length > 1){
                            event.target.nextElementSibling.nextElementSibling.classList.toggle(domStrings.showBoxOptions);
                        }
                        else {
                            event.target.nextElementSibling.nextElementSibling.classList.toggle(domStrings.showNormalUserBoxOption);
                        }
                    }
                }
            });

            //Setting contents of the created element ends here

            //Appending elements to its respective parent element starts here
            threeDotsLabel.append(iTag);

            if(USERID == elem.createdBy){
                threeDotsOptionsWrapper.append(threeDotsOption1, threeDotsOption2, threeDotsOption3);
            }
            else {
                threeDotsOptionsWrapper.append(threeDotsOption2, threeDotsOption4);
            }
            threeDotsWrapper.append(threeDotsLabel, threeDotsInput, threeDotsOptionsWrapper);

            topBoxDetail.append(boxName, threeDotsWrapper);
            boxPercentageWrapper.append(boxPercentageValue);

            mainBox.append(topBoxDetail, boxDescription, boxPercentageWrapper, allPeopleWrapper);
            parentTag.append(mainBox);
            //Appending elements to its respective parent element ends here
        });
    }

    return {
        getDomStrings : getDomStrings,
        renderProjects : renderProjects,
        getPhotoSection : getPhotoSection
    }
})();