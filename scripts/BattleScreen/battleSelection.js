const BattleSelectionType = {
    AbilitySelection: "AbilitySelection",
    AttackBodySelection: "AttackBodySelection",
    DefenseBodySelection: "DefenseBodySelection"
}

class BattleSelection {
    battleSelectionType;
    battleSelectionHTML;
    battleScreenManager;

    constructor(battleSelectionType, battleSelectionHTML, battleScreenManager) {
        this.battleSelectionType = battleSelectionType;
        this.battleSelectionHTML = battleSelectionHTML;
        this.battleScreenManager = battleScreenManager;

        this.battleScreenManager.onSelectionChanged.AddListener(checkIfSelectionIsVisible);
    }

    checkIfSelectionIsVisible = function (selection) {
        if(this.battleSelectionHTML == selection) {
            console.log("i'm not visible!");
        }
    }

    getSelected() {
        return 123;
    }
}
