class BattleManager {
    onTurnFinished;

    abilitySelection;
    attackBodySelection;
    defenseBodySelection;

    constructor(abilitySelection, attackBodySelection, defenseBodySelection) {
        this.abilitySelection = abilitySelection;
        this.attackBodySelection = attackBodySelection;
        this.defenseBodySelection = defenseBodySelection;

        this.onTurnFinished = new Delegate();
        this.onTurnFinished.addListener(this.proceedBattleRezults);
    }

    proceedBattleRezults() {
        console.log("Calculating rezults...");
        console.log("Selected abilities: " + this.abilitySelection.getSelected());
        console.log("Select body part to attack: " + this.attackBodySelection.getSelected());
        console.log("Select body part to defend: " + this.defenseBodySelection.getSelected());
    }
}

const playerTurnInfo = { 
    turnNumber: 0,
    damageDealt: 0,
    abilitiesUsed: [],
    protectedBodyPart: undefined,
    attackedBodyPart: undefined
}
