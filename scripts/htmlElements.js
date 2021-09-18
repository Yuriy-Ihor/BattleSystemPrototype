/*--- Start screen */

const startScreenHTML = document.getElementById('start-screen');
const startBattleButtonHTML = document.getElementById('start-battle-button');


/*--- Versus screen */

const versusScreenHTML = document.getElementById('versus-screen');
const startTurnButtonHTML = document.getElementById('start-turn-button');


/*--- Battle screen */

const battleScreenHTML = document.getElementById("battle-screen");
const battleScreenSelectionHTML = document.getElementById('battle-screen-selection');

const battleScreenSelectionAbilityHTML = document.getElementById('battle-screen-selection-ability');
    const battleScreenAbilitiesListHTML = document.getElementById('battle-screen-selection-abilities-list');
const battleScreenSelectionAttackHTML = document.getElementById('battle-screen-selection-body-attack');
const battleScreenSelectionDefenseHTML = document.getElementById('battle-screen-selection-body-defense');

const battleScreenBackButtonHTML = document.getElementById("battle-screen-button-back");
const battleScreenNextButtonHTML = document.getElementById("battle-screen-button-next");
const battleScreenFinishTurnButtonHTML = document.getElementById("battle-screen-button-finish-turn");

const battleSummaryScreenHTML = document.getElementById('battle-screen-summary');
    const battleSummaryScreenFirstPlayerHTML = document.getElementById('battle-screen-summary-first-player');
    const battleSummaryScreenSecondPlayerHTML = document.getElementById('battle-screen-summary-second-player');

const battleScreenNextTurnButtonHTML = document.getElementById('battle-screen-next-turn');

const battleScreenErrorHTML = document.getElementById("battle-screen-error-message");


/*--- Win screen ---*/

const winScreenHTML = document.getElementById('win-screen');
const winScreenMessageHTML = document.getElementById('win-screen-message');


/*--- Functions */

const hideElement = function(element) {
    if(!hasClass(element, 'hidden')) { 
        element.classList.add('hidden');
    }
}

function isElementParentVisible(element) {
    return !element.parentNode.classList.contains('hidden')
}

function hasClass(element, clsName) {
    return(' ' + element.className + ' ').indexOf(' ' + clsName + ' ') > -1;
  }

function showElement(element) {
    element.classList.remove('hidden');
}

function showErrorMessage(message, time) {
    battleScreenErrorHTML.innerHTML = message;
    showElementForTime(battleScreenErrorHTML, time);
}

function clearErrorMessage() {
    battleScreenErrorHTML.innerHTML = '';
}

function showElementForTime(element, seconds) {
    showElement(element);
    setTimeout(function() {
        hideElement(element);
    }, seconds * 1000);
}