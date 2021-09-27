
const turnSummaryPlayerDisplaySvg = document.getElementById('battle-screen-summary-player-svg');
const turnSummaryEnemyDisplaySvg = document.getElementById('battle-screen-summary-enemy-svg');

class TurnSummaryDisplay {
    constructor(playerDisplay, enemyDisplay, mainPlayer, opponent) {
        this.playerSilhouette = new SummarySilhouette(silhouette_coordinate_map_main, playerDisplay, mainPlayer, UI_SCALE);
        this.enemySilhouette = new SummarySilhouette(silhouette_coordinate_map_side, enemyDisplay, opponent, UI_SCALE);

        this.playerDisplay = playerDisplay;
        this.enemyDisplay = enemyDisplay;

        this.mainPlayer = mainPlayer;
        this.opponent = opponent;
    }

    updatePlayerSummary() {

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

function updatePlayerSummary(playerId, playerName, playerDamage, attackedBodypart, defendedBodypart) {
    let summaryPanel = document.getElementById(playerId);

    let summaryText = playerName + ", you dealt " + playerDamage + " damage.<br />"; 
    summaryText += playerName + " selected " + attackedBodypart + " to attack and " + defendedBodypart + " to defend.";

    summaryPanel.innerHTML = summaryText;
}
