
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
    if(players.opponent.playerStats[playerStats.hitpoints] > 0) {
        return players.opponent;
    }
    else if(players.mainPlayer.playerStats[playerStats.hitpoints] > 0) {
        return players.mainPlayer;
    }
    else {
        return null;
    }
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
    if(!playerSilhouette.isBodyPartSelected() || !enemySilhouette.isBodyPartSelected()) {
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
    turnSummaryDisplay.clearSummaries();

    let playerAttackedPart = attackSelection.getSelected();
    let playerDefendedPart = defenseSelection.getSelected();

    let enemyAttackedPart = enemyBot.getBodyPartToAttack(enemySilhouette.bodyPartsUI).bodyPartImage; 
    let enemyDefendedPart =  enemyBot.getBodyPartToDefend(enemySilhouette.bodyPartsUI).bodyPartImage; 

    if(playerAttackedPart.id != enemyDefendedPart.id) {
        let shootSucceed = applyDamageToBodyPart(players.opponent.bodyParts[playerAttackedPart.id], 1);
        let killedBodyPart = players.opponent.bodyParts[playerAttackedPart.id].currentLife <= 0;

        turnSummaryDisplay.updateMainPlayerAttackSummary(players.mainPlayer.name, playerAttackedPart.id, !shootSucceed, killedBodyPart);
    }
    else {
        turnSummaryDisplay.updateOpponentDefendSummary(players.mainPlayer.name, players.opponent.name, playerAttackedPart.id);
    }
    
    if(enemyAttackedPart.id != playerDefendedPart.id) {
        let shootSucceed = applyDamageToBodyPart(players.mainPlayer.bodyParts[enemyAttackedPart.id], 1);
        let killedBodyPart = players.mainPlayer.bodyParts[enemyAttackedPart.id].currentLife <= 0;

        turnSummaryDisplay.updateOpponentAttackSummary(players.opponent.name, enemyAttackedPart.id, !shootSucceed, killedBodyPart);
    }
    else {
        turnSummaryDisplay.updateMainPlayerDefendSummary(players.opponent.name, players.mainPlayer.name, enemyAttackedPart.id);
    }

    /*
    let totalDamage = calculateTotalMainPlayerDamage(playerAttackedPart == enemyDefendedPart);
    let totalMana = calculateTotalMainPlayerMana();

    let opponentDamage = 10;
    players.mainPlayer.playerStats[playerStats.hitpoints] -= opponentDamage;
    players.mainPlayer.playerStats[playerStats.mana] -= totalMana;

    players.opponent.playerStats[playerStats.hitpoints] -= totalDamage;
    players.opponent.playerStats[playerStats.mana] -= 7;*/

    var delay = animate_all_icons(
        playerAttackedPart.id,
        playerDefendedPart.id,
        enemyAttackedPart.id,
        enemyDefendedPart.id
    );

    delay = 3;
    
    setTimeout(
        () => {
            turnSummaryDisplay.updatePlayerSilhouetteUI(enemyAttackedPart, playerDefendedPart, players.mainPlayer.bodyParts[enemyAttackedPart.id]);
            turnSummaryDisplay.updateEnemySilhouetteUI(playerAttackedPart, enemyDefendedPart, players.opponent.bodyParts[playerAttackedPart.id]);
        
            playerSilhouette.updateBodyPartUI(enemyAttackedPart.id, players.mainPlayer.bodyParts[enemyAttackedPart.id]);
            enemySilhouette.updateBodyPartUI(playerAttackedPart.id, players.opponent.bodyParts[playerAttackedPart.id]);
        }, delay * 1000
    );



}

function applyDamageToBodyPart(bodyPart, damage) {
    let shootChance = Math.random(); 
    if(shootChance <= bodyPart.shootChance ) {
        bodyPart.currentLife -= damage;
        return true;
    }
    return false;
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