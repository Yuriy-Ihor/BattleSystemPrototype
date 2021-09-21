
function isGameOver() {
    return players.mainPlayer.playerStats[playerStats.hitpoints] < 0 || players.opponent.playerStats[playerStats.hitpoints] < 0;
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

function drawAttackScreen() {
    attackBodySilhouette.render(attackCanvasContext);
    
    requestAnimationFrame(drawAttackScreen)
}

function drawDefenseScreen() {
    defenseBodySilhouette.render(defenseCanvasContext);

    requestAnimationFrame(drawDefenseScreen)
}

function startTurn() {
    if(currentTurn > 0) {
        restoreManaToPlayer(players.mainPlayer, 5);
        restoreManaToPlayer(players.opponent, 5);
    }

    updatePlayersUI(players);
    fillPlayerAbilitiesList(players.mainPlayer);
    battleSelectionsPanel.showFirstSelection();
    showElement(battleScreenSelectionHTML);
    showElement(battleScreenSelectionAbilityHTML);
}

function restoreManaToPlayer(player, amount) {
    let value = player.playerStats[playerStats.mana] + amount;

    if(player.playerBaseStats[playerStats.mana] < value) {
        value = player.playerBaseStats[playerStats.mana];
    }

    player.playerStats[playerStats.mana] = value;
}

function finishTurn() {
    if(getSelectedPlayerAbilities().length == 0 || !attackBodySilhouette.isBodyPartSelected() || !defenseBodySilhouette.isBodyPartSelected()) {
        showErrorMessage("You dumb idiot did something wrong!", 5);
        return;
    }

    battleSelectionsPanel.hideAllSelections();

    proceedBattleRezults();
    
    attackBodySilhouette.disselectBodyPart();
    defenseBodySilhouette.disselectBodyPart();

    attackBodySilhouette.silhouette.hovering = null;
    defenseBodySilhouette.silhouette.hovering = null;

    battleScreenAbilitiesListHTML.innerHTML = '';

    hideElement(battleScreenSelectionHTML);
    showElement(battleSummaryScreenHTML);

    updatePlayersUI(players);
    clearErrorMessage();

    currentTurn++;
}

function proceedBattleRezults() {
    console.log("Selected abilities: " + abilitySelection.getSelected());

    let totalDamage = calculateTotalMainPlayerDamage();
    let totalMana = calculateTotalMainPlayerMana();

    //let opponentDamage = Math.floor(Math.random() * 10) + 5;
    let opponentDamage = 10;
    players.mainPlayer.playerStats[playerStats.hitpoints] -= opponentDamage;
    players.mainPlayer.playerStats[playerStats.mana] -= totalMana;

    players.opponent.playerStats[playerStats.hitpoints] -= totalDamage;
    players.opponent.playerStats[playerStats.mana] -= 7;

    updatePlayerSummary('battle-screen-summary-first-player', players.mainPlayer.name, totalDamage, attackSelection.getSelected(), defenseSelection.getSelected());
    updatePlayerSummary('battle-screen-summary-second-player', players.opponent.name, opponentDamage, "head", "torso");
}

function calculateTotalMainPlayerDamage() {
    let abilities = getSelectedPlayerAbilities();

    let totalDamage = 0;
    for(let i = 0; i < abilities.length; i++) {
        totalDamage += players.mainPlayer.playerSkills[abilities[i]].effect;
    }

    return totalDamage;
}

function calculateTotalMainPlayerMana() {
    let abilities = getSelectedPlayerAbilities();

    let totalMana = 0;
    for(let i = 0; i < abilities.length; i++) {
        totalMana += players.mainPlayer.playerSkills[abilities[i]].manaRequired;
    }

    return totalMana;
}

function startGame() {
    updateStartScreen(players.mainPlayer);
    updateVersusScreen(players);

    showElement(startScreenHTML);

    hideElement(versusScreenHTML);
    hideElement(battleScreenHTML);
    hideElement(battleSummaryScreenHTML);
    hideElement(winScreenHTML);

    startBattleButtonHTML.onclick = () => {
        hideElement(startScreenHTML);
        showElement(versusScreenHTML);
    };
    
    startTurnButtonHTML.onclick = () => {
        hideElement(versusScreenHTML);
        showElement(battleScreenHTML);

        drawAttackScreen();
        drawDefenseScreen();
        startTurn();
    }

    battleSelectionsPanel.finishTurnButton.onclick = finishTurn;

    battleScreenNextTurnButtonHTML.onclick = () => {
        hideElement(battleSummaryScreenHTML);

        if(isGameOver()) {
            hideElement(battleScreenHTML);
            
            let winner = getBattleWinner(players);

            if(winner == players.mainPlayer) {
                showWinScreen(players.mainPlayer);
            }
            else if(winner == players.opponent) {
                showLoseScreen(players.mainPlayer);
            }
            else {
                showDrawScreen(players);
            }
        }
        else {
            startTurn();
        }
    };
}

startGame();
