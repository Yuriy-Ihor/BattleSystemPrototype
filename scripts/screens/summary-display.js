
const turnSummaryPlayerDisplaySvg = document.getElementById('battle-screen-summary-player');
const turnSummaryEnemyDisplaySvg = document.getElementById('battle-screen-summary-enemy');

const sightImagePath = 'images/sight.png';
const shieldImagePath = 'images/shield.png';

class TurnSummaryDisplay {
    constructor(playerDisplay, enemyDisplay) {
        this.playerSilhouette = new SummarySilhouette(silhouette_coordinate_map_main, playerDisplay, sightImagePath, shieldImagePath);
        this.enemySilhouette = new SummarySilhouette(silhouette_coordinate_map_side, enemyDisplay, sightImagePath, shieldImagePath);

        this.playerDisplay = playerDisplay;
        this.enemyDisplay = enemyDisplay;
    }

    updateSummary(playerAttackedPart, playerDefendedPart, enemyAttackedPart, enemyDefendedPart) {
        this.playerSilhouette.showAttackedIcon(enemyAttackedPart);
        this.playerSilhouette.showDefendedIcon(playerDefendedPart);

        this.enemySilhouette.showAttackedIcon(playerAttackedPart);
        this.enemySilhouette.showDefendedIcon(enemyDefendedPart);
    }
}
