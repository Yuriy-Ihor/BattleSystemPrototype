
const versusScreenHTML = document.getElementById('versus-screen');
const startTurnButtonHTML = document.getElementById('start-turn-button');

const versusScreenMainPlayerHTML = document.getElementById('versus-screen-player-display-top');
const versusScreenOpponentPlayerHTML = document.getElementById('versus-screen-player-display-bottom');

function updateVersusScreen(players) {
    updateVersusScreenPlayer(players.mainPlayer, versusScreenMainPlayerHTML);
    updateVersusScreenPlayer(players.opponent, versusScreenOpponentPlayerHTML);
}

function updateVersusScreenPlayer(playerInfo, display) {
    let playerNameHTML = display.getElementsByClassName('versus-screen-player-display-name')[0];
    let playerImageHTML = display.getElementsByClassName('versus-screen-player-portrait')[0];

    playerNameHTML.textContent = playerInfo.name;
    playerImageHTML.src = playerInfo.image;
    
    //updatePlayerHealthBar(display, playerInfo.playerStats[playerStats.hitpoints], playerInfo.playerBaseStats[playerStats.hitpoints]);
    //updatePlayerManaBar(display, playerInfo.playerStats[playerStats.mana], playerInfo.playerBaseStats[playerStats.mana]);
}
