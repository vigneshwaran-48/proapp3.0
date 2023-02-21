let FormView = (() => {

    let domStrings = {
        nameInputTag : "#adding-name-input-id",
        descInputTag : "#adding-desc-input-id",
        fromDateInputTag : "#adding-from-date-input-id",
        toDateInputTag : "#adding-last-date-input-id",
        peopleSearchInput : ".people-search-input",
        pepoleSearchLabel : "people-option",
        pepoleSearchImageDiv : "people-search-image",
        peopleSearchCheckBox : "people-search-result-input-tag",
        peopleSearchWrapper : ".search-people-wrapper",
        selectedPeopleImageDiv : "selected-people-small-image",
        selectedPeopleImageWrapper : ".selected-people-display",
        peopleAddingLabel : "#people-adding-input",
        editName : "#box-edit-name-id",
        editFromDateId : "#edit-from-date-input-id",
        editLastDateId : "#edit-last-date-input-id",
        editDescInputTag : "#edit-desc-input-id",
    }
    
    let resetPeopleSearchView = wrapper => {
        Array.from(wrapper.children).forEach(elem => {
            if(!elem.children[2].checked){
                wrapper.removeChild(elem);
            }
        });
    }
    let isPersonResultAvailable = id => {
        let elements = _(domStrings.peopleSearchWrapper).children;
        for(let i = 0;i < elements.length;i++){
            if(elements[i].children[2].id == id){
                return true;
            }
        }
        return false;
    }
    let renderSearchPeople = (searchInput, renderFull, addToElement) => {
        addToElement.innerHTML = "";
        sendGetRequest("user/getusers?id=all", function(){
            resetPeopleSearchView(_(domStrings.peopleSearchWrapper));
            JSON.parse(this.response).forEach(elem => {
                if(((elem.userName.toLowerCase().includes(searchInput.toLowerCase()) && !isPersonResultAvailable(elem.userId) || searchInput.length == 0) || renderFull) && elem.userId != USERID){
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
                    p.textContent = elem.userName;
                    imageDiv.style.backgroundImage = `url(/ProApp/assets/images/usersImages/${elem.imagePath})`;

                    labelTag.append(imageDiv, p, inputTag);
                    addToElement.append(labelTag);
                }
            });
        });
    }
    let getDomStrings = () => domStrings;

    return {
        getDomStrings : getDomStrings,
        renderSearchPeople : renderSearchPeople
    }
})();