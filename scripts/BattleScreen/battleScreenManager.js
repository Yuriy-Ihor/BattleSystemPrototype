class BattleScreenManager {
    selections = [];
    previousSelectionButton;
    nextSelectionButton;
    currentSelection = 0;
    onSelectionChanged;

    constructor(selections, previousSelectionButton, nextSelectionButton, battleScreenFinishTurnButton) {
        this.selections = selections;
        this.previousSelectionButton = previousSelectionButton;
        this.nextSelectionButton = nextSelectionButton;
        this.finishTurnButton = battleScreenFinishTurnButton;
        this.onSelectionChanged = new Delegate(this.selections[this.currentSelection]);

        this.previousSelectionButton.onclick = () => this.showPreviousSelection();
        this.nextSelectionButton.onclick = () => this.showNextSelection();

        this.showFirstSelection();
    }

    showFirstSelection() {
        this.hideAllSelections();

        this.currentSelection = 0;
        showElement(this.selections[this.currentSelection]);
        showElement(this.nextSelectionButton);

        hideElement(this.previousSelectionButton);
        hideElement(this.finishTurnButton);

        onSelectionChanged(this.selections[this.currentSelection]);
    }

    hideAllSelections() {
        for(let i = 1; i < this.selections.length; i++) {
            hideElement(this.selections[i]);
        }
    }

    showPreviousSelection() {

        hideElement(this.selections[this.currentSelection]);
        this.currentSelection -= 1;
        showElement(this.selections[this.currentSelection]);

        showElement(this.nextSelectionButton);
        hideElement(this.finishTurnButton);

        if(this.currentSelection == 0) {
            hideElement(this.previousSelectionButton);
        }

        onSelectionChanged(this.selections[this.currentSelection]);
    }

    showNextSelection() {

        hideElement(this.selections[this.currentSelection]);
        this.currentSelection += 1;
        showElement(this.selections[this.currentSelection]);

        showElement(this.previousSelectionButton);

        if(this.currentSelection == this.selections.length - 1) {
            hideElement(this.nextSelectionButton);
            showElement(this.finishTurnButton);
        }

        onSelectionChanged(this.selections[this.currentSelection]);
    }
}

class BattleSelection {
    battleSelectionHTML;
    battleScreenManager;

    constructor(battleSelectionHTML, battleScreenManager) {
        this.battleSelectionHTML = battleSelectionHTML;
        this.battleScreenManager = battleScreenManager;

        this.battleScreenManager.onSelectionChanged.AddListener(checkIfSelectionIsVisible);
    }

    checkIfSelectionIsVisible = function (selection) {
        if(this.battleSelectionHTML == selection) {
            console.log("i'm not visible!");
        }
    }
}