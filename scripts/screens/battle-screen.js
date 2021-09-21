
const battleScreenHTML = document.getElementById("battle-screen");
const battleScreenSelectionHTML = document.getElementById('battle-screen-selections');

const battleScreenSelectionAbilityHTML = document.getElementById('battle-screen-selection-ability');
    const battleScreenAbilitiesListHTML = document.getElementById('battle-screen-selection-abilities-list');
const battleScreenSelectionAttackHTML = document.getElementById('battle-screen-selection-body-attack');
const battleScreenSelectionDefenseHTML = document.getElementById('battle-screen-selection-body-defense');

/*---  canvases ---*/
    const attackCanvas = document.getElementById('body-attack-canvas');
    attackCanvas.width = window.innerWidth;
    attackCanvas.height = canvas_height;
    const attackCanvasContext = attackCanvas.getContext("2d");

    const defenseCanvas = document.getElementById("body-defense-canvas");
    defenseCanvas.width = window.innerWidth;
    defenseCanvas.height = canvas_height;
    const defenseCanvasContext = defenseCanvas.getContext("2d");

const battleScreenBackButtonHTML = document.getElementById("battle-screen-button-back");
const battleScreenNextButtonHTML = document.getElementById("battle-screen-button-next");
const battleScreenFinishTurnButtonHTML = document.getElementById("battle-screen-button-finish-turn");

const battleSummaryScreenHTML = document.getElementById('battle-screen-summary');

const battleScreenNextTurnButtonHTML = document.getElementById('battle-screen-next-turn');

const battleScreenErrorHTML = document.getElementById("battle-screen-error-message");

class BattleSelectionsPanel {
    selections = [];
    previousSelectionButton;
    nextSelectionButton;
    currentSelection = 0;
    onSelectionChanged;

    constructor(selections, previousSelectionButton, nextSelectionButton, battleScreenFinishTurnButton) {
        this.selections = selections;
        this.previousSelectionButton = previousSelectionButton;
        this.nextSelectionButton = nextSelectionButton;
        this.finishTurnButton = battleScreenFinishTurnButton;
        this.onSelectionChanged = new Delegate();

        this.previousSelectionButton.onclick = () => this.showPreviousSelection();
        this.nextSelectionButton.onclick = () => this.showNextSelection();

        this.showFirstSelection();
    }

    showFirstSelection() {
        this.hideAllSelections();

        this.currentSelection = 0;
        this.showSelection(this.selections[this.currentSelection]);

        showElement(this.nextSelectionButton);

        hideElement(this.previousSelectionButton);
        hideElement(this.finishTurnButton);

        this.onSelectionChanged.invoke(this.selections[this.currentSelection]);
    }

    hideAllSelections() {
        for(let i = 1; i < this.selections.length; i++) {
            this.hideSelection(this.selections[i]);
        }
    }

    showPreviousSelection() {

        this.hideSelection(this.selections[this.currentSelection]);
        this.currentSelection -= 1;
        this.showSelection(this.selections[this.currentSelection]);

        showElement(this.nextSelectionButton);
        
        hideElement(this.finishTurnButton);

        if(this.currentSelection == 0) {
            hideElement(this.previousSelectionButton);
        }

        this.onSelectionChanged.invoke(this.selections[this.currentSelection]);
    }

    showNextSelection() {

        this.hideSelection(this.selections[this.currentSelection]);
        this.currentSelection += 1;
        this.showSelection(this.selections[this.currentSelection]);

        showElement(this.previousSelectionButton);

        if(this.currentSelection == this.selections.length - 1) {
            hideElement(this.nextSelectionButton);
            showElement(this.finishTurnButton);
        }

        this.onSelectionChanged.invoke(this.selections[this.currentSelection]);
    }

    hideSelection(selection) {
        hideElement(selection.selectionHTML);
    }

    showSelection(selection) {
        showElement(selection.selectionHTML);
    }
}

class BattleSelection {
    selectionHTML;

    constructor(selectionHTML) {
        this.selectionHTML = selectionHTML;
    }

    getSelected() {
        return undefined;
    }
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

function updatePlayersUI(players) {
    updatePlayerUI('player-left', players.mainPlayer);
    updatePlayerUI('player-right', players.opponent);
}

function updatePlayerUI(playerId, playerInfo) {
    let playerPanel = document.getElementById(playerId);

    let playerName = playerPanel.getElementsByClassName("player-name")[0];
    playerName.textContent  = playerInfo.name.toString();

    let playerImage = playerPanel.getElementsByClassName('player-image')[0];
    playerImage.src = playerInfo.image;

    updatePlayerStatUI(playerId, 'player-hp-bar', 'player-hp-amount', playerInfo.playerBaseStats[playerStats.hitpoints], playerInfo.playerStats[playerStats.hitpoints]);
    updatePlayerStatUI(playerId, 'player-mana-bar', 'player-mana-amount', playerInfo.playerBaseStats[playerStats.mana], playerInfo.playerStats[playerStats.mana]);
}

function updatePlayerStatUI(playerId, barClassName, textAmountClassName, baseValue, amount) {
    let playerPanel = document.getElementById(playerId);

    let playerBar = playerPanel.getElementsByClassName(barClassName)[0];
    let playerStatAmount = playerBar.getElementsByClassName(textAmountClassName)[0];

    let fillAmount =  (amount / baseValue) * 100;

    playerStatAmount.style.width = (fillAmount > 0 ? fillAmount : 0) + "%";
}

function updatePlayerSummary(playerId, playerName, playerDamage, attackedBodypart, defendedBodypart) {
    let summaryPanel = document.getElementById(playerId);

    let summaryText = playerName + ", you dealt " + playerDamage + " damage.<br />"; 
    summaryText += playerName + " selected " + attackedBodypart + " to attack and " + defendedBodypart + " to defend.";

    summaryPanel.innerHTML = summaryText;
}

function showErrorMessage(message, time) {
    battleScreenErrorHTML.innerHTML = message;
    showElementForTime(battleScreenErrorHTML, time);
}

function clearErrorMessage() {
    battleScreenErrorHTML.innerHTML = '';
}
