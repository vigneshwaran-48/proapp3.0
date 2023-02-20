let MainController = (view => {

    let init = () => {
        //Adding this listener for right side section
        _(view.getDomStrings().topSmallImage).addEventListener("click", event => {
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

            _(view.getDomStrings().topSmallImage).click();
            _(view.getDomStrings().fullFormSection).classList.add(view.getDomStrings().showFromRightToLeft);
        });
        //This is for closing add form section
        _(view.getDomStrings().formCloseButton).addEventListener("click", event => {
            _(view.getDomStrings().rightSideCloseButton).click();
            _(view.getDomStrings().fullFormSection).classList.remove(view.getDomStrings().showFromRightToLeft);
        }); 

        //This is for form adding button
        _(view.getDomStrings().formCreatingButton).addEventListener("click", event => {
            let result = FormController.validateForm();
            if(result.status){
                ProjectController.addProject(result.formDetails);
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
    }
    init();

    return {
        init : init,
    }
})(MainView);