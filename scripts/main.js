
function fillPlayerAbilitiesList(player) {
    for(let i = 0; i < player.playerSkills.length; i++) {
        let currentSkill = player.playerSkills[i];
        createPlayerAbilityListElement(currentSkill, i);
    }
}

function updateSummary(firstPlayerName, firstPlayerDamage, secondPlayerName, secondPlayerDamage) {
    battleSummaryScreenFirstPlayerHTML.innerHTML = firstPlayerName + ', you dealt ' + firstPlayerDamage + ' damage to ' + secondPlayerName;
    battleSummaryScreenSecondPlayerHTML.innerHTML = secondPlayerName + ', dealt ' + secondPlayerDamage + ' damage to you';
}

function createPlayerAbilityListElement(skillInfo) {
    let newAbility = document.createElement('button');
    newAbility.setAttribute('class', 'player-ability');
    newAbility.innerText = skillInfo.name + " — " + skillInfo.manaRequired + " mana";

    newAbility.onclick = () => {
        newAbility.classList.toggle('selected');
    };
    
    battleScreenAbilitiesListHTML.appendChild(newAbility);
}

function getSelectedPlayerAbilities() {
    let selectedAbilitiesTags = battleScreenAbilitiesListHTML.getElementsByClassName('player-ability');

    let rezult = [];

    for(let i = 0; i < selectedAbilitiesTags.length; i++) {
        if(selectedAbilitiesTags[i].classList.contains('selected')) {
            rezult.push(i);
        }
    }

    return rezult;
}

function disSelectBodyParts(screen) {
    let silhouette = screen.silhouette; 
    
    silhouette.selected_body_part = null;
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

var currentTurn = 1;

const attackBodySilhouette = 
    new BodyScreen(
        (width - screen_height) / 2, 0, screen_width, screen_height,
        BodyScreenType.AttackTargetSelection,
        screen_border_width, screen_border_color
    );

const defenseBodySilhouette = 
    new BodyScreen(
        (width - screen_height) / 2, 0, screen_width, screen_height,
        BodyScreenType.DefenseTargetSelection,
        screen_border_width, screen_border_color
    );
    
const abilitySelection = new BattleSelection(battleScreenSelectionAbilityHTML);
abilitySelection.getSelected = getSelectedPlayerAbilities;

const attackSelection = new BattleSelection(battleScreenSelectionAttackHTML);
attackSelection.getSelected = () => { return attackBodySilhouette.getSelectedBodyPart() };

const defenseSelection = new BattleSelection(battleScreenSelectionDefenseHTML);
defenseSelection.getSelected = () => { return defenseBodySilhouette.getSelectedBodyPart() };

const battleManager = new BattleManager(abilitySelection, attackSelection, defenseSelection);
    
const battleSelectionsPanel = new BattleSelectionsPanel(
    [abilitySelection, attackSelection, defenseSelection],
    battleScreenBackButtonHTML,
    battleScreenNextButtonHTML,
    battleScreenFinishTurnButtonHTML
);

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

function isGameOver() {
    return players.mainPlayer.playerStats[playerStats.hitpoints] < 0 || players.opponent.playerStats[playerStats.hitpoints] < 0;
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
        startTurn(currentTurn);
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
            startTurn(currentTurn);
        }
    };
}

function startTurn(currentTurn) {
    updatePlayersUI();
    fillPlayerAbilitiesList(players.mainPlayer);
    battleSelectionsPanel.showFirstSelection();
    showElement(battleScreenSelectionHTML);
    showElement(battleScreenSelectionAbilityHTML);
}

function finishTurn() {
    battleSelectionsPanel.hideAllSelections();

    battleManager.proceedBattleRezults();
    
    attackBodySilhouette.disselectBodyPart();
    defenseBodySilhouette.disselectBodyPart();

    let totalDamage = calculateTotalMainPlayerDamage();
    let totalMana = calculateTotalMainPlayerMana();
    players.mainPlayer.playerStats[playerStats.hitpoints] -= Math.floor(Math.random() * 10);
    players.mainPlayer.playerStats[playerStats.mana] -= totalMana;

    players.opponent.playerStats[playerStats.hitpoints] -= totalDamage;
    players.opponent.playerStats[playerStats.mana] -= Math.floor(Math.random() * 10);

    updateSummary(players.mainPlayer.name, totalDamage, players.opponent.name, 5);
    battleScreenAbilitiesListHTML.innerHTML = '';

    hideElement(battleScreenSelectionHTML);
    showElement(battleSummaryScreenHTML);

    updatePlayersUI();

    currentTurn++;
}

function drawAttackScreen() {
    attackBodySilhouette.render(attackCanvasContext);
    
    requestAnimationFrame(drawAttackScreen)
}

function drawDefenseScreen() {
    defenseBodySilhouette.render(defenseCanvasContext);

    requestAnimationFrame(drawDefenseScreen)
}

startGame();