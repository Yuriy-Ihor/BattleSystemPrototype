
const turnSummaryPlayerDisplaySvg = document.getElementById('battle-screen-summary-player');
const turnSummaryEnemyDisplaySvg = document.getElementById('battle-screen-summary-enemy');

class TurnSummaryDisplay {
    constructor(playerDisplay, enemyDisplay, mainPlayer, opponent) {
        this.playerSilhouette = new SummarySilhouette(silhouette_coordinate_map_main, playerDisplay, mainPlayer);
        this.enemySilhouette = new SummarySilhouette(silhouette_coordinate_map_side, enemyDisplay, opponent);

        this.playerDisplay = playerDisplay;
        this.enemyDisplay = enemyDisplay;

        this.mainPlayer = mainPlayer;
        this.opponent = opponent;
    }

    updateSilhouettesUI(playerAttackedPart, playerDefendedPart, enemyAttackedPart, enemyDefendedPart) {
        
        this.playerSilhouette.showAttackedIcon(enemyAttackedPart);
        this.playerSilhouette.showDefendedIcon(playerDefendedPart);

        this.enemySilhouette.showAttackedIcon(playerAttackedPart);
        this.enemySilhouette.showDefendedIcon(enemyDefendedPart);

        //setTimeout(this.playerSilhouette.playDamageAnimation(enemyAttackedPart), 3000);
        //setTimeout(this.enemySilhouette.playDamageAnimation(playerAttackedPart), 3000);
    }
}
