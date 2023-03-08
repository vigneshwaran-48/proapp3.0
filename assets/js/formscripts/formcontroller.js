let FormController = (view => {

    let resetForm = () => {
        _(view.getDomStrings().nameInputTag).value = "";
        _(view.getDomStrings().descInputTag).innerText = "";
        _(view.getDomStrings().fromDateInputTag).valueAsDate = new Date();
        _(view.getDomStrings().toDateInputTag).valueAsDate = new Date();
        _(view.getDomStrings().peopleAddingLabel).checked = false;
        document.getElementsByName("selected-people").forEach(elem => elem.checked = false);
        console.log(_(view.getDomStrings().peopleSearchWrapper));   
        _(view.getDomStrings().peopleSearchWrapper).innerHTML = "";
    }
    let getPeopleArray = peopleInput => peopleInput.map(elem => elem.id);
    
    let validateForm = () => {
        let projectId;
        if(CURRENTSECTION == "Tasks"){
            projectId = (_(view.getDomStrings().projectOptionsWrapper).value.slice(15));
        }
        let nameInput = _(view.getDomStrings().nameInputTag).value.trim();
        let descInput = _(view.getDomStrings().descInputTag).innerText.trim();
        let fromDateInput = _(view.getDomStrings().fromDateInputTag).value;
        let toDateInput = _(view.getDomStrings().toDateInputTag).value;
        let peopleInput = Array.from(document.getElementsByName("selected-people")).filter(elem => {
            return elem.checked;
        });
        let people = getPeopleArray(peopleInput);
        people.push(USERID);
        console.log(fromDateInput < toDateInput);

        if(nameInput.length && descInput.length && peopleInput.length){
            resetForm();
            return {
                status : true,
                formDetails : {
                    name : nameInput,
                    description : descInput,
                    fromDate : fromDateInput,
                    toDate : toDateInput,
                    people : people,
                    projectId : projectId
                }
            }
        }
        else {
            MainView.showErrorMessage("Please fill all the details in the form");
            return {
                status: false
            }
        }
    }
    let getUsersOfSelectedProject = () => {
        let projectId = _(view.getDomStrings().projectOptionsWrapper).value.slice(15);
        if(typeof(Number(projectId)) == 'number' && projectId > 0){
            let project = ProjectModel.getDataById(projectId);
            return project.users;
        }
        else {
            return false;
        }
    }
    //This is for people adding label click action
    _(view.getDomStrings().peopleAddingLabel).addEventListener("click", async event => {
        if(!event.target.nextElementSibling.checked){
            _(view.getDomStrings().peopleAddingLabel).id = "opened";
            if(CURRENTSECTION != "Project"){
                let status = getUsersOfSelectedProject();
                if(status){
                    view.renderSearchPeople("", false, _(view.getDomStrings().peopleSearchWrapper), status);
                }
                else {
                    _(view.getDomStrings().peopleAddingInputId).checked = false;
                    MainView.showErrorMessage("please select a project");
                }
            }
            else {
                let response = await sendGetRequest("user/getusers?id=all");
                view.renderSearchPeople("", true, _(view.getDomStrings().peopleSearchWrapper), response);
            } 
        }
        else {
            _(view.getDomStrings().peopleAddingLabel).id = "closed";
        }
    });  
    //This is for people input searching
    _(view.getDomStrings().peopleSearchInput).addEventListener("input", async event => {
        if(CURRENTSECTION != "Project"){
            let status = getUsersOfSelectedProject();
            if(status){
                view.renderSearchPeople("", false, _(view.getDomStrings().peopleSearchWrapper), status);
            }
            else {
                MainView.showErrorMessage("please select a project");
            }
        }
        else {
            let response = await sendGetRequest("user/getusers?id=all");
            view.renderSearchPeople(event.target.value, false, _(view.getDomStrings().peopleSearchWrapper), response);
        }   
    });
    //This is for project options
    _(view.getDomStrings().projectOptionsWrapper).addEventListener("change", async event => {
        let projectId = event.target.value.slice(15);
        //These two lines are for triggering input event in search bar to reset people
        let manualEvent = new Event("input", {bubbles : true});
        _(view.getDomStrings().peopleSearchInput).dispatchEvent(manualEvent);
        if(Number.isInteger(projectId)){
            let project = ProjectModel.getDataById(projectId);
            view.renderSearchPeople("", false, _(view.getDomStrings().peopleSearchWrapper), project.users);
        }
        else {
            _(view.getDomStrings().peopleSearchWrapper).innerHTML = "";
            _(view.getDomStrings().peopleAddingLabel).click();
        }
    });

    //This is for people editing label click action
    _(view.getDomStrings().peopleEditLabel).addEventListener("click", async event => {
        if(!event.target.nextElementSibling.checked){
            _(view.getDomStrings().peopleEditLabel).id = "opened";
            if(CURRENTSECTION != "Project"){
                let users = TaskModel.getTaskByTaskId(event.target.dataset.taskId).users;
                view.renderSearchPeople("", true, _(MainView.getDomStrings().editSearchPeopleWrapper), users, true);
            }
            else {
                let response = await sendGetRequest("user/getusers/project?id=" + event.target.dataset.projectId);
                view.renderSearchPeople("", true, _(MainView.getDomStrings().editSearchPeopleWrapper), response, true);
            } 
        }
        else {
            _(view.getDomStrings().peopleEditLabel).id = "closed";
        }
    });  
    let findRemovedUsers = (id, newUsers) => {
        let oldArray;
        if(CURRENTSECTION == "Tasks"){
            oldArray = TaskModel.getTaskByTaskId(id).users;
        }
        else {
            oldArray = ProjectModel.getDataById(id).users;
        }
        let removedUsers = [];
        oldArray.forEach(elem => {
            if(!newUsers.includes(elem.userId)){
                removedUsers.push(elem.userId);
            }
        });
        return removedUsers;
    }
    //This is for box updating button
    _(view.getDomStrings().editBoxButton).addEventListener("click", async event => {
        let formData = new FormData();
        let peopleInput = Array.from(document.getElementsByName("selected-people")).filter(elem => {
            return elem.checked;
        });
        
        let people = getPeopleArray(peopleInput);
        people.push("" + USERID);
        let removedUsers = findRemovedUsers(event.target.id, people);
        let obj = {
            "name" : _(view.getDomStrings().editName).value,
            "id" : event.target.id,
            "description" : _(view.getDomStrings().editDescInputTag).innerText,
            "fromDate" : _(view.getDomStrings().editFromDateId).value,
            "toDate" : _(view.getDomStrings().editLastDateId).value,
            "users" : people,
            "projectId" : event.target.dataset.projectId
        }
        formData.append("updateData", JSON.stringify(obj));
        let response;
        if(CURRENTSECTION == "Tasks"){
            response = await sendPostRequest("task/update", formData);
        }
        else {
            response = await sendPostRequest("project/update", formData);
        }
        //The below conditions are for sending notification to all users about the update
        if(response.result == "Success"){
            MainView.showSuccessMessage("updated successfully");
            if(CURRENTSECTION == "Tasks"){
                sendMessage(JSON.stringify({
                    messageType : "taskUpdate",
                    taskId : parseInt(event.target.id),
                    description : `${USERNAME} updated a task in which you have been participated`,
                    removedUsers : removedUsers
                }));
            }
            else {
                sendMessage(JSON.stringify({
                    messageType : "projectUpdate",
                    projectId : parseInt(event.target.id),
                    description : `${USERNAME} updated a project in which you have been participated`
                }));
            }
            resetProjects();
            _(MainView.getDomStrings().editBoxCloseButton).click();
        }
        else {
            MainView.showErrorMessage("Oops, something went wrong");
        }
    });
    return {
        validateForm : validateForm,
        resetForm : resetForm
    }
})(FormView);