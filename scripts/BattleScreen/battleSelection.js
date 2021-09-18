const BattleSelectionType = {
    AbilitySelection: "AbilitySelection",
    AttackBodySelection: "AttackBodySelection",
    DefenseBodySelection: "DefenseBodySelection"
}

class BattleSelection {
    selectionType;
    selectionHTML;
    battleScreenManager;

    constructor(selectionType, selectionHTML, battleScreenManager) {
        this.selectionType = selectionType;
        this.selectionHTML = selectionHTML;
        this.battleScreenManager = battleScreenManager;

        this.battleScreenManager.onSelectionChanged.AddListener(checkIfSelectionIsVisible);
    }

    checkIfSelectionIsVisible = function (selection) {
        if(this.selectionHTML == selection) {
            console.log("i'm not visible!");
        }
    }

    getSelected() {
        return 123;
    }
}
