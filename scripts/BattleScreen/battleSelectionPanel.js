class BattleSelectionsPanel {
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
        this.onSelectionChanged = new Delegate();

        this.previousSelectionButton.onclick = () => this.showPreviousSelection();
        this.nextSelectionButton.onclick = () => this.showNextSelection();

        this.showFirstSelection();
    }

    showFirstSelection() {
        this.hideAllSelections();

        this.currentSelection = 0;
        this.showSelection(this.selections[this.currentSelection]);

        showElement(this.nextSelectionButton);

        hideElement(this.previousSelectionButton);
        hideElement(this.finishTurnButton);

        this.onSelectionChanged.invoke(this.selections[this.currentSelection]);
    }

    hideAllSelections() {
        for(let i = 1; i < this.selections.length; i++) {
            this.hideSelection(this.selections[i]);
        }
    }

    showPreviousSelection() {

        this.hideSelection(this.selections[this.currentSelection]);
        this.currentSelection -= 1;
        this.showSelection(this.selections[this.currentSelection]);

        showElement(this.nextSelectionButton);
        
        hideElement(this.finishTurnButton);

        if(this.currentSelection == 0) {
            hideElement(this.previousSelectionButton);
        }

        this.onSelectionChanged.invoke(this.selections[this.currentSelection]);
    }

    showNextSelection() {

        this.hideSelection(this.selections[this.currentSelection]);
        this.currentSelection += 1;
        this.showSelection(this.selections[this.currentSelection]);

        showElement(this.previousSelectionButton);

        if(this.currentSelection == this.selections.length - 1) {
            hideElement(this.nextSelectionButton);
            showElement(this.finishTurnButton);
        }

        this.onSelectionChanged.invoke(this.selections[this.currentSelection]);
    }

    hideSelection(selection) {
        hideElement(selection.selectionHTML);
    }

    showSelection(selection) {
        showElement(selection.selectionHTML);
    }
}
