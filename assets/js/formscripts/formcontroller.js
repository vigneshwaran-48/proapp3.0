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
                    people : people
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
    _(view.getDomStrings().peopleAddingLabel).addEventListener("click", event => {
        view.renderSearchPeople(event.target.value, true, _(view.getDomStrings().peopleSearchWrapper));
    });
    _(view.getDomStrings().peopleSearchInput).addEventListener("input", event => {
        view.renderSearchPeople(event.target.value, false, _(view.getDomStrings().peopleSearchWrapper));
    });
    return {
        validateForm : validateForm
    }
})(FormView);