let FormView = (() => {

    let domStrings = {
        nameInputTag : "#adding-name-input-id",
        descInputTag : "#adding-desc-input-id",
        fromDateInputTag : "#adding-from-date-input-id",
        toDateInputTag : "#adding-last-date-input-id",
    }
    let getDomStrings = () => domStrings;

    return {
        getDomStrings : getDomStrings
    }
})();