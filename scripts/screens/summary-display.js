
const turnSummaryPlayerDisplaySvg = document.getElementById('battle-screen-summary-player');
const turnSummaryEnemyDisplaySvg = document.getElementById('battle-screen-summary-enemy');

class TurnSummaryDisplay {
    constructor(playerDisplay, enemyDisplay, mainPlayer, opponent) {
        this.playerSilhouette = new SummarySilhouette(silhouette_coordinate_map_main, playerDisplay, mainPlayer, UI_SCALE);
        this.enemySilhouette = new SummarySilhouette(silhouette_coordinate_map_side, enemyDisplay, opponent, UI_SCALE);

        this.playerDisplay = playerDisplay;
        this.enemyDisplay = enemyDisplay;

        this.mainPlayer = mainPlayer;
        this.opponent = opponent;
    }

    updateEnemySilhouetteUI(attackedPart, defendedPart, bodyParts) {
        this.updateSilhouetteUI(attackedPart, defendedPart, bodyParts, this.enemySilhouette);
    }

    updatePlayerSilhouetteUI(attackedPart, defendedPart, bodyParts) {
        this.updateSilhouetteUI(attackedPart, defendedPart, bodyParts, this.playerSilhouette);
    }

    updateSilhouetteUI(attackedPart, defendedPart, bodyParts, silhouette) {
        silhouette.showAttackedIcon(attackedPart);
        silhouette.showDefendedIcon(defendedPart);

        for(let bodyPartName in bodyParts) {
            silhouette.bodyPartsUI[bodyPartName].updateHealthBarLife(bodyParts[bodyPartName].currentLife);
        }
    }
}
