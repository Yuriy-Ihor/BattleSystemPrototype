class BattleScreenManager {
    selections = [];
    previousSelectionButton;
    nextSelectionButton;
    currentScreen = 0;

    constructor(selections, previousSelectionButton, nextSelectionButton, battleScreenFinishTurnButton) {
        this.selections = selections;
        this.previousSelectionButton = previousSelectionButton;
        this.nextSelectionButton = nextSelectionButton;
        this.finishTurnButton = battleScreenFinishTurnButton;

        this.previousSelectionButton.onclick = () => this.showPreviousSelection();
        this.nextSelectionButton.onclick = () => this.showNextSelection();

        this.showFirstSelection();
    }

    showFirstSelection() {
        this.hideAllSelections();

        this.currentScreen = 0;
        showElement(this.selections[this.currentScreen]);
        showElement(this.nextSelectionButton);

        hideElement(this.previousSelectionButton);
        hideElement(this.finishTurnButton);
    }

    hideAllSelections() {
        for(let i = 1; i < this.selections.length; i++) {
            hideElement(this.selections[i]);
        }
    }

    showPreviousSelection() {

        hideElement(this.selections[this.currentScreen]);
        this.currentScreen -= 1;
        showElement(this.selections[this.currentScreen]);

        showElement(this.nextSelectionButton);
        hideElement(this.finishTurnButton);

        if(this.currentScreen == 0) {
            hideElement(this.previousSelectionButton);
        }
    }

    showNextSelection() {

        hideElement(this.selections[this.currentScreen]);
        this.currentScreen += 1;
        showElement(this.selections[this.currentScreen]);

        showElement(this.previousSelectionButton);

        if(this.currentScreen == this.selections.length - 1) {
            hideElement(this.nextSelectionButton);
            showElement(this.finishTurnButton);
        }
    }
}