let FormView = (() => {

    let domStrings = {
        nameInputTag : "#adding-name-input-id",
        descInputTag : "#adding-desc-input-id",
        fromDateInputTag : "#adding-from-date-input-id",
        toDateInputTag : "#adding-last-date-input-id",
        peopleSearchInput : ".people-search-input",
        peopleAddingInputId : "#people-adding-input",
        pepoleSearchLabel : "people-option",
        pepoleSearchImageDiv : "people-search-image",
        peopleSearchCheckBox : "people-search-result-input-tag",
        peopleSearchWrapper : ".search-people-wrapper",
        selectedPeopleImageDiv : "selected-people-small-image",
        selectedPeopleImageWrapper : ".selected-people-display",
        peopleAddingLabel : ".people-adding-label",
        editName : "#box-edit-name-id",
        editFromDateId : "#edit-from-date-input-id",
        editLastDateId : "#edit-last-date-input-id",
        editDescInputTag : "#edit-desc-input-id",
        projectChoosingWrapper : ".project-choosing-wrapper",
        projectOptionsWrapper : "#project-drop-down-id",
        showProjectsChoosingWrapper : "show-project-choosing-wrapper",
        editBoxButton : ".edit-box-button",
        peopleEditLabel : ".people-edit-label",
        peopleEditInput : ".people-edit-search-input"
    }
    let renderProjectOption = projects => {
        _(domStrings.projectOptionsWrapper).innerHTML = "";

        let defaultOption = document.createElement("option");
        defaultOption.textContent = "Default";
        defaultOption.value = "default";
        _(domStrings.projectOptionsWrapper).append(defaultOption);

        projects.forEach(elem => {
            let projectOption = document.createElement("option");
            projectOption.value = "project-option-" + elem.id;
            projectOption.textContent = elem.projectName;
            _(domStrings.projectOptionsWrapper).append(projectOption);
        });
    }
    let resetPeopleSearchView = wrapper => {
        Array.from(wrapper.children).forEach(elem => {
            if(!elem.children[2].checked){
                wrapper.removeChild(elem);
            }
        });
    }
    let isPersonResultAvailable = (id, peoplWrapper) => {
        let elements = peoplWrapper.children;
        for(let i = 0;i < elements.length;i++){
            if(elements[i].children[2].id == id){
                return true;
            }
        }
        return false;
    }
    let renderSearchPeople = async (searchInput, renderFull, addToElement, people, isChecked) => {
        resetPeopleSearchView(addToElement);
        people.forEach(elem => {
            if(((elem.userName.toLowerCase().includes(searchInput.toLowerCase()) || renderFull ) && !isPersonResultAvailable(elem.userId, addToElement)) && elem.userId != USERID){
                let labelTag = document.createElement("label");
                let inputTag = document.createElement("input");
                let imageDiv = document.createElement("div");
                let p = document.createElement("p");

                //Adding classes to the elements
                labelTag.classList.add(domStrings.pepoleSearchLabel);
                labelTag.classList.add("x-axis-flex");
                imageDiv.classList.add(domStrings.pepoleSearchImageDiv);
                inputTag.classList.add(domStrings.peopleSearchCheckBox);

                labelTag.for = elem.userId;
                labelTag.dataset.imagePath = `url(/ProApp/assets/images/usersImages/${elem.imagePath})`;    
                inputTag.type = "checkbox";
                inputTag.name = "selected-people";
                inputTag.id = elem.userId;
                if(isChecked){
                    inputTag.checked = true;
                }
                else {
                    inputTag.checked = false;
                }
                p.textContent = elem.userName;
                imageDiv.style.backgroundImage = `url(/ProApp/assets/images/usersImages/${elem.imagePath})`;

                labelTag.append(imageDiv, p, inputTag);
                addToElement.append(labelTag);
            }
        });
    }
    let getDomStrings = () => domStrings;

    return {
        getDomStrings : getDomStrings,
        renderSearchPeople : renderSearchPeople,
        renderProjectOption : renderProjectOption
    }
})();