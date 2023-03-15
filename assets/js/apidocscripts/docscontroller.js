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

        // _All(view.getDomStrings().navTag).forEach(elem => {
        //     elem.addEventListener("click", event => {
        //         let newLocation = elem.href + "-api";
        //         console.log(newLocation);
        //         let divId = newLocation.split("#")[1];
        //         console.log(divId);
        //         console.log(_("#" + divId).scrollTop);
        //         _(view.getDomStrings().descriptionSection).scrollTop = _("#" + divId).scrollHeight;
        //         _(view.getDomStrings().codeAreaSection).scrollTop = _("#" + divId).scrollHeight;
        //         // location.href = newLocation;
        //     })
        // })
    }
    init();
    return {
        init : init
    }
})(DocsView);