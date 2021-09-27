
const turnSummaryPlayerDisplaySvg = document.getElementById('battle-screen-summary-player-svg');
const turnSummaryEnemyDisplaySvg = document.getElementById('battle-screen-summary-enemy-svg');

const turnSummaryPlayer = document.getElementById('battle-screen-summary-player');
const turnSummaryEnemy = document.getElementById('battle-screen-summary-enemy');

class TurnSummaryDisplay {
    constructor(playerDisplay, enemyDisplay, mainPlayer, opponent) {
        this.playerSilhouette = new SummarySilhouette(silhouette_coordinate_map_main, playerDisplay, mainPlayer, UI_SCALE);
        this.enemySilhouette = new SummarySilhouette(silhouette_coordinate_map_side, enemyDisplay, opponent, UI_SCALE);

        this.playerDisplay = playerDisplay;
        this.enemyDisplay = enemyDisplay;

        this.mainPlayer = mainPlayer;
        this.opponent = opponent;
    }

    clearSummaries() {
        turnSummaryPlayer.innerHTML = '';
        turnSummaryEnemy.innerHTML = '';
    }

    updateMainPlayerSummary(playerName, attackedPartId, missed) {
        this.updatePlayerSummary(turnSummaryPlayer, playerName, attackedPartId, missed);
    }

    updateOpponentSummary(playerName, attackedPartId, missed) {
        this.updatePlayerSummary(turnSummaryEnemy, playerName, attackedPartId, missed);
    }

    updatePlayerSummary(playerDisplay, playerName, attackedPartId, missed) {
        let summaryText;
        if(missed) {
            summaryText = playerName + " missed!";
        }
        else {
            summaryText = playerName + " successfully shoot " + attackedPartId + "!";
        }
        playerDisplay.innerHTML = summaryText;
    }

    updateEnemySilhouetteUI(attackedPart, defendedPart, bodyPartInfo) {
        this.updateSilhouetteUI(attackedPart, defendedPart, bodyPartInfo, this.enemySilhouette);
    }

    updatePlayerSilhouetteUI(attackedPart, defendedPart, bodyPartInfo) {
        this.updateSilhouetteUI(attackedPart, defendedPart, bodyPartInfo, this.playerSilhouette);
    }

    updateSilhouetteUI(attackedPart, defendedPart, bodyPartInfo, silhouette) {
        silhouette.showAttackedIcon(attackedPart);
        silhouette.showDefendedIcon(defendedPart);

        silhouette.updateBodyPartUI(attackedPart.id, bodyPartInfo);
    }
}
