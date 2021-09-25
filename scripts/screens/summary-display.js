
const turnSummaryPlayerDisplaySvg = document.getElementById('battle-screen-summary-player');
const turnSummaryEnemyDisplaySvg = document.getElementById('battle-screen-summary-enemy');

class TurnSummaryDisplay {
    constructor(playerDisplay, enemyDisplay) {
        this.playerSilhouette = new SummarySilhouette(silhouette_coordinate_map_main, playerDisplay);
        this.enemySilhouette = new SummarySilhouette(silhouette_coordinate_map_side, enemyDisplay);

        this.playerDisplay = playerDisplay;
        this.enemyDisplay = enemyDisplay;
    }

    updateSummary(playerAttackedPart, playerDefendedPart, enemyAttackedPart, enemyDefendedPart) {
        
        this.playerSilhouette.showAttackedIcon(enemyAttackedPart);
        this.playerSilhouette.showDefendedIcon(playerDefendedPart);

        this.enemySilhouette.showAttackedIcon(playerAttackedPart);
        this.enemySilhouette.showDefendedIcon(enemyDefendedPart);

        //setTimeout(this.playerSilhouette.playDamageAnimation(enemyAttackedPart), 3000);
        //setTimeout(this.enemySilhouette.playDamageAnimation(playerAttackedPart), 3000);
    }
}
