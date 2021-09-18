const BattleSelectionType = {
    AbilitySelection: "AbilitySelection",
    AttackBodySelection: "AttackBodySelection",
    DefenseBodySelection: "DefenseBodySelection"
}

class BattleSelection {
    battleSelectionType;

    init = function (battleSelectionType) {
        this.battleSelectionType = battleSelectionType;
    }
}

class AbilitySelection extends BattleSelection {
    constructor() {
        this.init(BattleSelectionType.AbilitySelection);
    }
}

class AttackSelection extends BattleSelection {
    constructor() {
        this.init(BattleSelectionType.AttackBodySelection);
    }
}

class DefenseSelection extends BattleSelection {
    constructor() {
        this.init(BattleSelectionType.AttackBodySelection);
    }
}