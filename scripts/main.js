
function getMagicalEffectMultiplayed(baseEffect, intelligence) {
    return baseEffect * intelligence / 10;
}

function getSkillDescription(skill) {
    return skill.name + " - costs " + skill.manaRequired + " mana" + ", " + getSkillVerb(skill.skillType) + skill.targetStat.toString() + " by " + skill.effect;
} 

// ___ html functions ___ //

function displayPlayerSkills(player) {
    for(let i = 0; i < player.playerSkills.length; i++) {
        let currentSkill = player.playerSkills[i];
        
        // TODO: display skill
    }
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

function isGameOver() {
    return players.mainPlayer.playerStats[playerStats.hitpoints] < 0 || players.opponent.playerStats[playerStats.hitpoints] < 0;
}

function startGame() {
    hideElement(versusScreen);
    hideElement(battleScreen);

    startBattleButton.onclick = () => {
        hideElement(startScreen);
        showScreen(versusScreen);
    };
    
    startTurnButton.onclick = () => {
        hideElement(versusScreen);
        showScreen(battleScreen);

        drawAttackScreen();
    }
}

function hideElement(screen) {
    screen.classList.add('hidden');
}

function showScreen(screen) {
    screen.classList.remove('hidden');
}

const bodyPartSelectionScreen = is_mobile ? 
    new CombatScreenController(
        (width - screen_height) / 2,
        get_total_height() + (height - get_total_height() - get_total_height() - screen_height) / 2,
        screen_width,
        screen_height,
        true
    ) : 
    new CombatScreenController(
        (width - 3 * screen_width - 2 * screen_padding) / 2,
        get_total_height() + (height - get_total_height() - screen_height) / 2,
        screen_width,
        screen_height,
        false
    )

function drawAttackScreen() {
    bodyPartSelectionScreen.render(context);

    requestAnimationFrame(drawAttackScreen)
}

function get_total_height() {
    return Math.max(
        character_avatar_size + 2 * character_avatar_padding,
        health_bar_height + mana_bar_height + character_name_size + 2 * default_text_size + 6 * character_avatar_padding
    )
}

function get_total_width() {
    return character_avatar_size + Math.max(health_bar_width, mana_bar_width) + 3 * character_avatar_padding
}


startGame();
