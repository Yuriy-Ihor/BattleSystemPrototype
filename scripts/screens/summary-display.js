
const turnSummaryPlayerDisplaySvg = document.getElementById('battle-screen-summary-player');
const turnSummaryEnemyDisplaySvg = document.getElementById('battle-screen-summary-enemy');

class TurnSummaryDisplay {
    constructor(playerDisplay, enemyDisplay) {
        this.playerSilhouette = new Silhouette(silhouette_coordinate_map_main, playerDisplay);
        this.enemySilhouette = new Silhouette(silhouette_coordinate_map_side, enemyDisplay);

        this.playerDisplay = playerDisplay;
        this.enemyDisplay = enemyDisplay;
    }
}
