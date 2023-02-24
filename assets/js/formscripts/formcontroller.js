let FormController = (view => {

    let resetForm = () => {
        _(view.getDomStrings().nameInputTag).value = "";
        _(view.getDomStrings().descInputTag).innerText = "";
        _(view.getDomStrings().fromDateInputTag).valueAsDate = new Date();
        _(view.getDomStrings().toDateInputTag).valueAsDate = new Date();
        _(view.getDomStrings().peopleAddingLabel).checked = false;
        document.getElementsByName("selected-people").forEach(elem => elem.checked = false);
    }
    let getPeopleArray = peopleInput => peopleInput.map(elem => elem.id);
    
    let validateForm = () => {
        //Want to add a logic for getting project id for task adding .......
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
        if(Number.isInteger(projectId)){
            let project = ProjectModel.getDataById(projectId);
            view.renderSearchPeople("", false, _(view.getDomStrings().peopleSearchWrapper), project.users);
        }
    });
    return {
        validateForm : validateForm
    }
})(FormView);