
const battleScreenHTML = document.getElementById("battle-screen");
const battleScreenSelectionHTML = document.getElementById('battle-screen-selections');

const battleScreenSelectionPlayerHTML = document.getElementById('battle-screen-player-selection');
    const playerSelectionSilhouetteSVG = document.getElementById('battle-screen-selection-player-svg');
    const enemySelectionSilhouetteSVG = document.getElementById('battle-screen-selection-enemy-svg');

const battleScreenSelectionAttackHTML = document.getElementById('battle-screen-selection-body-attack');
    const attackSvg = document.getElementById('attack-selection-silhouette');
const battleScreenSelectionDefenseHTML = document.getElementById('battle-screen-selection-body-defense');
    const defenseSvg = document.getElementById('defense-selection-silhouette');

const battleScreenBackButtonHTML = document.getElementById("battle-screen-button-back");
const battleScreenNextButtonHTML = document.getElementById("battle-screen-button-next");
const battleScreenFinishTurnButtonHTML = document.getElementById("battle-screen-button-finish-turn");

const battleSummaryScreenHTML = document.getElementById('battle-screen-summary');

const battleScreenNextTurnButtonHTML = document.getElementById('battle-screen-next-turn');

const battleScreenErrorHTML = document.getElementById("battle-screen-error-message");

const onTurnEnd = new Event('endturn');

class PlayerBodySelection {
    constructor(displayHTML, playerSilhouetteSVG, enemySilhouetteSVG, playerBodyPartSelection, enemyBodyPartSelection, finishTurnButton) {
        this.displayHTML = displayHTML;
        this.playerSilhouette = new BodySelectionSilhouette(playerSilhouetteSVG, players.mainPlayer, UI_SCALE, 'main', Math.min(MINIMAL_SCREEN_SIZE / 2, SUMMARY_SILHOUETTE_SIZE / 2));
        this.enemySilhouette = new BodySelectionSilhouette(enemySilhouetteSVG, players.opponent, UI_SCALE, 'side', Math.min(MINIMAL_SCREEN_SIZE / 2, SUMMARY_SILHOUETTE_SIZE / 2));
        this.playerBodyPartSelection = playerBodyPartSelection;
        this.enemyBodyPartSelection = enemyBodyPartSelection;

        playerSilhouetteSVG.addEventListener('bodyselected', () => {
            hideElement(this.displayHTML);
            showElement(this.playerBodyPartSelection);
            showElement(battleScreenBackButtonHTML);
        });

        enemySilhouetteSVG.addEventListener('bodyselected', () => {
            hideElement(this.displayHTML);
            showElement(this.enemyBodyPartSelection);
            showElement(battleScreenBackButtonHTML);
        });

        battleScreenBackButtonHTML.onclick = () => {
            hideElement(battleScreenBackButtonHTML);
            hideElement(this.playerBodyPartSelection);
            hideElement(this.enemyBodyPartSelection);
            showElement(this.displayHTML);
        };
    }
}

class BodyPartSelection {
    constructor(mainScreen, displaySVG, silhouette, backButton, finishTurnButton) {
        this.displaySVG = displaySVG;
        this.silhouette = silhouette;
        this.backButton = backButton;
        this.mainScreen = mainScreen;

        this.backButton.onclick = () => {
            hideElement(displaySVG);
            hideElement(backButton);
            showElement(mainScreen);
        };
        this.finishTurnButton = finishTurnButton;
        this.finishTurnButton.addEventListener(() => {
            hideElement(backButton);
            hideElement(displaySVG);
        });
    }

    getSelected() {
        return this.silhouette.selected;
    }
}

function showErrorMessage(message, time) {
    battleScreenErrorHTML.innerHTML = message;
    showElementForTime(battleScreenErrorHTML, time);
}

function clearErrorMessage() {
    battleScreenErrorHTML.innerHTML = '';
}

/* CURRENTLY UNUSED */

const battleScreenSelectionAbilityHTML = document.getElementById('battle-screen-selection-ability');
    const battleScreenAbilitiesListHTML = document.getElementById('battle-screen-selection-abilities-list');

class BattleSelectionsPanel {
    constructor(selections, previousSelectionButton, nextSelectionButton, battleScreenFinishTurnButton) {
        this.selections = selections;
        this.previousSelectionButton = previousSelectionButton;
        this.nextSelectionButton = nextSelectionButton;
        this.finishTurnButton = battleScreenFinishTurnButton;

        this.previousSelectionButton.onclick = () => this.showPreviousSelection();
        this.nextSelectionButton.onclick = () => this.showNextSelection();

        this.currentSelection = 0;
        this.showFirstSelection();
    }

    showFirstSelection() {
        this.hideAllSelections();

        this.currentSelection = 0;
        this.showSelection(this.selections[this.currentSelection]);

        showElement(this.nextSelectionButton);

        hideElement(this.previousSelectionButton);
        hideElement(this.finishTurnButton);
    }

    hideAllSelections() {
        for(let i = 1; i < this.selections.length; i++) {
            this.hideSelection(this.selections[i]);
        }
    }

    showPreviousSelection() {

        this.hideSelection(this.selections[this.currentSelection]);
        this.currentSelection--;
        this.showSelection(this.selections[this.currentSelection]);

        showElement(this.nextSelectionButton);
        
        hideElement(this.finishTurnButton);

        if(this.currentSelection == 0) {
            hideElement(this.previousSelectionButton);
        }
    }

    showNextSelection() {

        this.hideSelection(this.selections[this.currentSelection]);
        this.currentSelection++;
        this.showSelection(this.selections[this.currentSelection]);

        showElement(this.previousSelectionButton);

        if(this.currentSelection == this.selections.length - 1) {
            hideElement(this.nextSelectionButton);
            showElement(this.finishTurnButton);
        }
    }

    hideSelection(selection) {
        hideElement(selection.selectionHTML);
    }

    showSelection(selection) {
        showElement(selection.selectionHTML);
    }
}

class BattleSelection {
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
