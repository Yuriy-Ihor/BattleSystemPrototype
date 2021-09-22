
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

    updatePlayerHealthBar(playerPanel, playerInfo.playerStats[playerStats.hitpoints], playerInfo.playerBaseStats[playerStats.hitpoints]);
    updatePlayerManaBar(playerPanel, playerInfo.playerStats[playerStats.mana], playerInfo.playerBaseStats[playerStats.mana]);
}

function updatePlayerHealthBar(display, currentValue, baseValue) {
    let hpBarText = display.getElementsByClassName('player-hp-text')[0];
    currentValue = currentValue < 0 ? 0 : currentValue;
    hpBarText.innerText = "Health: " + currentValue + " / " +  baseValue;

    let hpBarFill = display.getElementsByClassName('player-hp-amount')[0];
    let fillAmount =  (currentValue / baseValue) * 100;
    hpBarFill.style.width = (fillAmount > 0 ? fillAmount : 0) + "%";
}

function updatePlayerManaBar(display, currentValue, baseValue) {
    let manaBar = display.getElementsByClassName('player-mana-text')[0];
    currentValue = currentValue < 0 ? 0 : currentValue;
    manaBar.innerText = "Mana: " + currentValue + " / " +  baseValue;
    
    let manaBarFill = display.getElementsByClassName('player-mana-amount')[0];
    let fillAmount =  (currentValue / baseValue) * 100;
    manaBarFill.style.width = (fillAmount > 0 ? fillAmount : 0) + "%";
}
