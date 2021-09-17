
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
    newAbility.innerText = skillInfo.name + " — " + skillInfo.manaRequired + " mana";

    newAbility.onclick = () => {
        newAbility.classList.toggle('selected');
    };
    
    battleScreenAbilitiesList.appendChild(newAbility);
}

function getSelectedPlayerAbilities() {
    let selectedAbilitiesTags = battleScreenAbilitiesList.getElementsByClassName('player-ability');

    let rezult = [];

    for(let i = 0; i < selectedAbilitiesTags.length; i++) {
        if(selectedAbilitiesTags[i].classList.contains('selected')) {
            rezult.push(i);
        }
    }

    return rezult;
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
    hideElement(versusScreen);
    hideElement(battleScreen);

    startBattleButton.onclick = () => {
        hideElement(startScreen);
        showElement(versusScreen);
    };
    
    startTurnButton.onclick = () => {
        hideElement(versusScreen);
        showElement(battleScreen);

        drawAttackScreen();
        drawDefenseScreen();
        startTurn(currentTurn);
    }

    battleScreenNextTurnButton.onclick = () => {
        hideElement(battleSummaryScreen);
        startTurn(currentTurn);
    };
}

function startTurn(currentTurn) {
    updatePlayersUI();
    fillPlayerAbilitiesList(players.mainPlayer);
    battleScreenManager.showFirstSelection();
    showElement(battleScreenSelection);
    showElement(battleScreenSelectionAbility);
}

battleScreenManager.finishTurnButton.onclick = finishTurn;

function finishTurn() {
    battleScreenManager.hideAllSelections();
    hideElement(battleScreenSelection);
    showElement(battleSummaryScreen);

    let totalDamage = calculateTotalMainPlayerDamage();
    console.log(totalDamage);

    battleScreenAbilitiesList.innerHTML = '';

    currentTurn++;
}

function calculateTotalMainPlayerDamage() {
    let abilities = getSelectedPlayerAbilities();

    let totalDamage = 0;
    for(let i = 0; i < abilities.length; i++) {
        totalDamage += players.mainPlayer.playerSkills[abilities[i]].effect;
    }

    return totalDamage;
}

function drawAttackScreen() {
    bodyPartSelectionScreen.renderScreen(attackCanvasContext, BodyScreenType.AttackTargetSelection);
    
    //requestAnimationFrame(drawAttackScreen)
}

function drawDefenseScreen() {
    bodyPartSelectionScreen.renderScreen(defenseCanvasContext, 1);

    //requestAnimationFrame(drawDefenseScreen)
}

startGame();
