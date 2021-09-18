class BattleManager {
    onTurnFinished;
    battleSelectionsPanel;

    constructor(battleSelectionsPanel) {
        this.battleSelectionsPanel = battleSelectionsPanel;

        this.onTurnFinished = new Delegate();
        this.onTurnFinished.addListener(onTurnFinished);
    }

    proceedBattleRezults() {
        
    }
}