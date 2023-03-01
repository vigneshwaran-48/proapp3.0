let _ = elem => document.querySelector(elem);
let _All = elem => document.querySelectorAll(elem);

let DocsView = (() => {

    let domStrings = {
        hamburgerMenu : ".hamburger-menu-button",
        sideNavBar : ".side-nav-bar",
        showNavBar : "show-section",
        codeAreaButton : ".code-section-button",
        codeAreaSection : ".code-section",
        showCodeArea : "show-code-area",
    }
    let getDomStrings = () => domStrings;

    return {
        getDomStrings : getDomStrings
    }
})();