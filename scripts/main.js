
function isGameOver() {
    return checkIfAnyBodyPartIsDead(players.mainPlayer.bodyParts) || checkIfAnyBodyPartIsDead(players.opponent.bodyParts);
    //return players.mainPlayer.playerStats[playerStats.hitpoints] <= 0 || players.opponent.playerStats[playerStats.hitpoints] <= 0;
}

function checkIfAnyBodyPartIsDead(bodyParts) {
    for(let bodyPartName in bodyParts) {
        if(bodyParts[bodyPartName].currentLife <= 0) {
            return true;
        }
    }
    return false;
}

function getBattleWinner(players) {
    /*
    if(players.opponent.playerStats[playerStats.hitpoints] > 0) {
        return players.opponent;
    }
    else if(players.mainPlayer.playerStats[playerStats.hitpoints] > 0) {
        return players.mainPlayer;
    }
    else {
        return null;
    }
    */
}

var currentTurn = 1;

function startTurn() {
    /*
    if(currentTurn > 0) {
        restoreManaToPlayer(players.mainPlayer, 5);
        restoreManaToPlayer(players.opponent, 5);
    }*/

    updatePlayersUI(players);
    //fillPlayerAbilitiesList(players.mainPlayer);
    battleSelectionsPanel.showFirstSelection();
    showElement(battleScreenSelectionHTML);
    // showElement(battleScreenSelectionAbilityHTML);
}

function restoreManaToPlayer(player, amount) {
    let value = player.playerStats[playerStats.mana] + amount;

    if(player.playerBaseStats[playerStats.mana] < value) {
        value = player.playerBaseStats[playerStats.mana];
    }

    player.playerStats[playerStats.mana] = value;
}

function finishTurn() {
    
    // if(getSelectedPlayerAbilities().length == 0 || !attackSilhouette.isBodyPartSelected() || !defenseSilhouette.isBodyPartSelected()) {
    if(!enemySilhouette.isBodyPartSelected() || !enemySilhouette.isBodyPartSelected()) {
        showErrorMessage("You dumb idiot did something wrong!", 5);
        return;
    }

    battleSelectionsPanel.hideAllSelections();

    proceedBattleRezults();
    
    playerSilhouette.disselectBodyPart();
    enemySilhouette.disselectBodyPart();

    // battleScreenAbilitiesListHTML.innerHTML = '';

    hideElement(battleScreenSelectionHTML);
    showElement(battleSummaryScreenHTML);

    updatePlayersUI(players);
    clearErrorMessage();

    currentTurn++;
}

function proceedBattleRezults() {
    let playerAttackedPart = attackSelection.getSelected();
    let playerDefendedPart = defenseSelection.getSelected();

    let playerAttackedPartId = playerAttackedPart.id;
    let playerDefendedPartId = playerDefendedPart.id;

    let enemyAttackedPart = enemySilhouette.bodyPartsUI[ATTACKED_ENEMY_PART_ID].bodyPartImage; //defenseSilhouette.bodyParts[0].getImage();
    let enemyDefendedPart =  enemySilhouette.bodyPartsUI[DEFENDED_ENEMY_PART_ID].bodyPartImage; //attackSilhouette.bodyParts[1].getImage();

    if(playerAttackedPartId != enemyDefendedPart.id) {
        players.opponent.bodyParts[playerAttackedPartId].currentLife -= 1;
    }
    
    if(enemyAttackedPart.id != playerDefendedPartId) {
        players.mainPlayer.bodyParts[enemyAttackedPart.id].currentLife -= 1;
    }

    /*
    let totalDamage = calculateTotalMainPlayerDamage(playerAttackedPart == enemyDefendedPart);
    let totalMana = calculateTotalMainPlayerMana();

    let opponentDamage = 10;
    players.mainPlayer.playerStats[playerStats.hitpoints] -= opponentDamage;
    players.mainPlayer.playerStats[playerStats.mana] -= totalMana;

    players.opponent.playerStats[playerStats.hitpoints] -= totalDamage;
    players.opponent.playerStats[playerStats.mana] -= 7;*/

    turnSummaryDisplay.updatePlayerSilhouetteUI(enemyAttackedPart, playerDefendedPart, players.mainPlayer.bodyParts);
    turnSummaryDisplay.updateEnemySilhouetteUI(playerAttackedPart, enemyDefendedPart, players.opponent.bodyParts);

    playerSilhouette.updateUI(players.mainPlayer.bodyParts);
    enemySilhouette.updateUI(players.opponent.bodyParts);
}

function calculateTotalMainPlayerDamage(attackBlocked) {
    
    let abilities = getSelectedPlayerAbilities();

    let totalDamage = 0;
    for(let i = 0; i < abilities.length; i++) {
        totalDamage += players.mainPlayer.playerSkills[abilities[i]].effect;
    }

    return totalDamage;
    //return attackBlocked ? totalDamage * 0.1 : totalDamage;
}

function calculateTotalMainPlayerMana() {
    let abilities = getSelectedPlayerAbilities();

    let totalMana = 0;
    for(let i = 0; i < abilities.length; i++) {
        totalMana += players.mainPlayer.playerSkills[abilities[i]].manaRequired;
    }

    return totalMana;
}

function hideAllScreens() {
    hideElement(startScreenHTML);
    hideElement(versusScreenHTML);
    hideElement(battleScreenHTML);
    hideElement(battleSummaryScreenHTML);
    hideElement(winScreenHTML);
}

function startGame() {

    hideAllScreens();
    
    updateStartScreen(players.mainPlayer);
    updateVersusScreen(players);

    showElement(startScreenHTML);

    startBattleButtonHTML.onclick = () => {
        hideElement(startScreenHTML);
        showElement(versusScreenHTML);
    };
    
    startTurnButtonHTML.onclick = () => {
        hideElement(versusScreenHTML);
        showElement(battleScreenHTML);

        startTurn();
    }

    battleSelectionsPanel.finishTurnButton.onclick = finishTurn;

    battleScreenNextTurnButtonHTML.onclick = () => {
        hideElement(battleSummaryScreenHTML);

        if(isGameOver()) {
            hideElement(battleScreenHTML);

            let isMainPlayerDead = checkIfAnyBodyPartIsDead(players.mainPlayer.bodyParts);
            let isOpponentDead = checkIfAnyBodyPartIsDead(players.opponent.bodyParts);

            if(isMainPlayerDead && isOpponentDead) {
                showDrawScreen(players);
            }
            else if(isMainPlayerDead) {
                showLoseScreen(players.mainPlayer);
            }
            else if(isOpponentDead) {
                showWinScreen(players.mainPlayer);
            }
            
            /*
            let winner = getBattleWinner(players);

            if(winner == players.mainPlayer) {
                showWinScreen(players.mainPlayer);
            }
            else if(winner == players.opponent) {
                showLoseScreen(players.mainPlayer);
            }
            else {
                showDrawScreen(players);
            }*/
        }
        else {
            startTurn();
        }
    };
}

startGame();
