
function getMagicalEffectMultiplayed(baseEffect, intelligence) {
    return baseEffect * intelligence / 10;
}

function getSkillDescription(skill) {
    return skill.name + " - costs " + skill.manaRequired + " mana" + ", " + getSkillVerb(skill.skillType) + skill.targetStat.toString() + " by " + skill.effect;
} 

// ___ html functions ___ //

function fillPlayerAbilitiesList(player) {
    
    for(let i = 0; i < player.playerSkills.length; i++) {
        let currentSkill = player.playerSkills[i];
        createPlayerAbilityListElement(currentSkill, i);
    }

}

function createPlayerAbilityListElement(skillInfo, text) {
    let newAbility = document.createElement('button');
    newAbility.setAttribute('class', 'player-ability');
    newAbility.innerText = 'Ability ' + text;
    
    battleScreenAbilitiesList.appendChild(newAbility);
}

function updatePlayersUI() {
    updatePlayersDisplay('player-left', players.mainPlayer);
    updatePlayersDisplay('player-right', players.opponent);
}

function updatePlayersDisplay(playerId, playerInfo) {
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

var currentTurn = 1;

function isGameOver() {
    return players.mainPlayer.playerStats[playerStats.hitpoints] < 0 || players.opponent.playerStats[playerStats.hitpoints] < 0;
}

function startGame() {
    fillPlayerAbilitiesList(players.mainPlayer);
    hideElement(versusScreen);
    hideElement(battleScreen);

    startBattleButton.onclick = () => {
        hideElement(startScreen);
        showElement(versusScreen);
    };
    
    startTurnButton.onclick = () => {
        hideElement(versusScreen);
        showElement(battleScreen);
        
        startTurn(currentTurn);
    }

    battleScreenNextTurnButton.onclick = () => {
        hideElement(battleSummaryScreen);
        startTurn(currentTurn);
    };
}

function startTurn(currentTurn) {
    battleScreenManager.showFirstSelection();
    showElement(battleScreenSelection);
    showElement(battleScreenSelectionAbility);
}

battleScreenManager.finishTurnButton.onclick = finishTurn;

function finishTurn() {
    battleScreenManager.hideAllSelections();
    hideElement(battleScreenSelection);
    showElement(battleSummaryScreen);
    currentTurn++;
}

function drawAttackScreen() {
    bodyPartSelectionScreen.render(context);

    requestAnimationFrame(drawAttackScreen)
}

startGame();
