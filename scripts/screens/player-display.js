
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

    //updatePlayerHealthBar(playerPanel, playerInfo.playerStats[playerStats.hitpoints], playerInfo.playerBaseStats[playerStats.hitpoints]);
    //updatePlayerManaBar(playerPanel, playerInfo.playerStats[playerStats.mana], playerInfo.playerBaseStats[playerStats.mana]);
}

function updatePlayerHealthBar(display, currentValue, baseValue) {
    let hpBarText = display.getElementsByClassName('player-hp-text')[0];
    currentValue = currentValue < 0 ? 0 : currentValue;
    
    hpBarText.getElementsByClassName('stat-name')[0].innerText = "Health:";
    hpBarText.getElementsByClassName('stat-value')[0].innerText = currentValue + "/" +  baseValue;

    updatePlayerFillBar('player-hp-amount', display, currentValue, baseValue);
}

function updatePlayerManaBar(display, currentValue, baseValue) {
    let manaBar = display.getElementsByClassName('player-mana-text')[0];
    currentValue = currentValue < 0 ? 0 : currentValue;

    manaBar.getElementsByClassName('stat-name')[0].innerText = "Mana:";
    manaBar.getElementsByClassName('stat-value')[0].innerText = currentValue + "/" +  baseValue;
    
    updatePlayerFillBar('player-mana-amount', display, currentValue, baseValue);
}

function updatePlayerFillBar(id, display, currentValue, baseValue) {
    let fillBar = display.getElementsByClassName(id)[0];
    let fillAmount =  (currentValue / baseValue) * 100;
    fillBar.style.width = (fillAmount > 0 ? fillAmount : 0) + "%";
}