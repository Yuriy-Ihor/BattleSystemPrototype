
const turnSummaryPlayerDisplaySvg = document.getElementById('battle-screen-summary-player-svg');
const turnSummaryEnemyDisplaySvg = document.getElementById('battle-screen-summary-enemy-svg');

const turnSummaryPlayer = document.getElementById('battle-screen-summary-player');
const turnSummaryEnemy = document.getElementById('battle-screen-summary-enemy');

class TurnSummaryDisplay {
    constructor(playerDisplay, enemyDisplay, mainPlayer, opponent) {
        this.playerSilhouette = new SummarySilhouette(playerDisplay, mainPlayer, UI_SCALE, 'main',Math.min(MINIMAL_SCREEN_SIZE / 2, SUMMARY_SILHOUETTE_SIZE / 2));
        this.enemySilhouette = new SummarySilhouette(enemyDisplay, opponent, UI_SCALE, 'side', Math.min(MINIMAL_SCREEN_SIZE / 2, SUMMARY_SILHOUETTE_SIZE / 2));

        this.playerDisplay = playerDisplay;
        this.enemyDisplay = enemyDisplay;

        this.mainPlayer = mainPlayer;
        this.opponent = opponent;
    }

    clearSummaries() {
        turnSummaryPlayer.innerHTML = '';
        turnSummaryEnemy.innerHTML = '';
    }

    updateMainPlayerDefendSummary(playerName, defendedPartId) {
        this.updatePlayerDefendSummary(turnSummaryEnemy, playerName, defendedPartId);
    }

    updateOpponentDefendSummary(playerName, defendedPartId) {
        this.updatePlayerDefendSummary(turnSummaryPlayer, playerName, defendedPartId);
    }

    updatePlayerDefendSummary(playerDisplay, playerName, defendedPartId) {
        playerDisplay.innerHTML = `${playerName} defended ${defendedPartId}!`;
    }

    updateMainPlayerAttackSummary(playerName, attackedPartId, missed) {
        this.updatePlayerAttackSummary(turnSummaryPlayer, playerName, attackedPartId, missed);
    }

    updateOpponentAttackSummary(playerName, attackedPartId, missed) {
        this.updatePlayerAttackSummary(turnSummaryEnemy, playerName, attackedPartId, missed);
    }

    updatePlayerAttackSummary(playerDisplay, playerName, attackedPartId, missed) {
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
        //silhouette.showAttackedIcon(attackedPart);
        //silhouette.showDefendedIcon(defendedPart);

        silhouette.updateBodyPartUI(attackedPart.id, bodyPartInfo);
    }
}
