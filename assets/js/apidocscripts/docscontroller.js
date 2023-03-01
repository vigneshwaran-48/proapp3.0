let DocsController = (view => {

    let init = () => {
        //This is for hamburger menu action
        _(view.getDomStrings().hamburgerMenu).addEventListener("click", event => {
            _(view.getDomStrings().sideNavBar).classList.toggle(view.getDomStrings().showNavBar);
        });
        //This is for code area button to show code area section
        _(view.getDomStrings().codeAreaButton).addEventListener("click", event => {
            _(view.getDomStrings().codeAreaSection).classList.toggle(view.getDomStrings().showCodeArea);
        });
    }
    init();
    return {
        init : init
    }
})(DocsView);