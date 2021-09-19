
/*--- Start screen */

function updateStartScreen(playerInfo) {
    playerDescriptionNameHTML.innerText = playerInfo.name;
    playerDescriptionRankHTML.innerText = playerInfo.playerRating.rank;
    playerDescriptionWinsHTML.innerText = playerInfo.playerRating.wins;
    playerDescriptionImageHTML.src = playerInfo.image;
}

/*--- Battle screen ---*/

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

    updatePlayerStatUI(playerId, 'player-hp-bar', 'player-hp-amount', playerInfo.playerStats[playerStats.hitpoints]);
    updatePlayerStatUI(playerId, 'player-mana-bar', 'player-mana-amount', playerInfo.playerStats[playerStats.mana]);
}

function updatePlayerStatUI(playerId, barClassName, textAmountClassName, amount) {
    let playerPanel = document.getElementById(playerId);

    let playerBar = playerPanel.getElementsByClassName(barClassName)[0];
    let playerStatAmount = playerBar.getElementsByClassName(textAmountClassName)[0];
    playerStatAmount.textContent  = amount;
}

/*--- Summary screen --- */

function updateSummary(firstPlayerName, firstPlayerDamage, secondPlayerName, secondPlayerDamage) {
    battleSummaryScreenFirstPlayerHTML.innerHTML = firstPlayerName + ', you dealt ' + firstPlayerDamage + ' damage to ' + secondPlayerName;
    battleSummaryScreenSecondPlayerHTML.innerHTML = secondPlayerName + ', dealt ' + secondPlayerDamage + ' damage to you';
}