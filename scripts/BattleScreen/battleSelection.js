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
/*

const AbilitySelection = new BattleSelection( 
    BattleSelectionType.AbilitySelection,
    battleScreenSelectionAbility, 
    battleScreenManager
)

console.log(AbilitySelection.getSelected());


class AttackSelection extends BattleSelection {
    constructor() {
        this.init(BattleSelectionType.AttackBodySelection);
    }
}

class DefenseSelection extends BattleSelection {
    constructor() {
        this.init(BattleSelectionType.AttackBodySelection);
    }
}*/