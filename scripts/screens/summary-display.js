
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

    updateEnemySilhouetteUI(attackedPart, defendedPart, bodyParts) {
        this.playerSilhouette.showAttackedIcon(attackedPart);
        this.playerSilhouette.showDefendedIcon(defendedPart);

    }

    updatePlayerSilhouetteUI(attackedPart, defendedPart, bodyParts) {
        this.enemySilhouette.showAttackedIcon(attackedPart);
        this.enemySilhouette.showDefendedIcon(defendedPart);

    }
}
