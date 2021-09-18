class BattleManager {
    battleSelections = [];
    onTurnFinished;

    constructor(battleSelections) {
        this.battleSelections = battleSelections;

        this.onTurnFinished = new Delegate();
        this.onTurnFinished.addListener(onTurnFinished);
    }

    finishTurn = function() {

    }
}