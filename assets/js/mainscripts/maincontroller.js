let MainController = ((view) => {

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
            _(view.getDomStrings().topSmallImage).click();
            _(view.getDomStrings().fullFormSection).classList.add(view.getDomStrings().showFromRightToLeft);
        });
        //This is for closing add form section
        _(view.getDomStrings().formCloseButton).addEventListener("click", event => {
            _(view.getDomStrings().rightSideCloseButton).click();
            _(view.getDomStrings().fullFormSection).classList.remove(view.getDomStrings().showFromRightToLeft);
        }); 
    }
    init();
})(MainView);