
function fillPlayerAbilitiesList(player) {
    for(let i = 0; i < player.playerSkills.length; i++) {
        let currentSkill = player.playerSkills[i];
        createPlayerAbilitiesListElement(currentSkill, i);
    }
}

function createPlayerAbilitiesListElement(skillInfo) {
    let newAbility = document.createElement('button');
    newAbility.setAttribute('class', 'player-ability');

    let manaRequiredText = skillInfo.manaRequired == 0 ? "free" : skillInfo.manaRequired + " mana";

    newAbility.innerText = skillInfo.name + " — " + manaRequiredText;

    newAbility.onclick = () => {
        newAbility.classList.toggle('selected');
    };
    
    battleScreenAbilitiesListHTML.appendChild(newAbility);
}

function updatePlayersUI() {
    updatePlayerUI('player-left', players.mainPlayer);
    updatePlayerUI('player-right', players.opponent);
}

function updatePlayerUI(playerId, playerInfo) {
    let playerPanel = document.getElementById(playerId);

    let playerName = playerPanel.getElementsByClassName("player-name")[0];
    playerName.textContent  = playerInfo.name.toString();

    updatePlayerStatUI(playerId, 'player-hp-bar', 'player-hp-amount', playerInfo.playerStats[playerStats.hitpoints]);
    updatePlayerStatUI(playerId, 'player-mana-bar', 'player-mana-amount', playerInfo.playerStats[playerStats.mana]);
}

function updatePlayerStatUI(playerId, barClassName, textAmountClassName, amount) {
    let playerPanel = document.getElementById(playerId);

    let playerBar = playerPanel.getElementsByClassName(barClassName)[0];
    let playerStatAmount = playerBar.getElementsByClassName(textAmountClassName)[0];
    playerStatAmount.textContent  = amount;
}

// ___ game logic ___ //

function isGameOver() {
    return players.mainPlayer.playerStats[playerStats.hitpoints] < 0 || players.opponent.playerStats[playerStats.hitpoints] < 0;
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

function startGame() {
    hideElement(versusScreenHTML);
    hideElement(battleScreenHTML);

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
            showElement(winScreenHTML);
        }
        else {
            hideElement(battleSummaryScreenHTML);
            startTurn();
        }
    };
}

function startTurn() {
    updatePlayersUI();
    fillPlayerAbilitiesList(players.mainPlayer);
    battleSelectionsPanel.showFirstSelection();
    showElement(battleScreenSelectionHTML);
    showElement(battleScreenSelectionAbilityHTML);
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

    battleScreenAbilitiesListHTML.innerHTML = '';

    hideElement(battleScreenSelectionHTML);
    showElement(battleSummaryScreenHTML);

    updatePlayersUI();
    clearErrorMessage();

    currentTurn++;
}

function proceedBattleRezults() {
    console.log("Selected abilities: " + abilitySelection.getSelected());
    console.log("Select body part to attack: " + attackSelection.getSelected());
    console.log("Select body part to defend: " + defenseSelection.getSelected());

    let totalDamage = calculateTotalMainPlayerDamage();
    let totalMana = calculateTotalMainPlayerMana();
    players.mainPlayer.playerStats[playerStats.hitpoints] -= Math.floor(Math.random() * 10);
    players.mainPlayer.playerStats[playerStats.mana] -= totalMana;

    players.opponent.playerStats[playerStats.hitpoints] -= totalDamage;
    players.opponent.playerStats[playerStats.mana] -= Math.floor(Math.random() * 10);

    updateSummary(players.mainPlayer.name, totalDamage, players.opponent.name, 5);
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

startGame();