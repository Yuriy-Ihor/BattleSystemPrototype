
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
    let playerHPBarHTML = display.getElementsByClassName('player-hp-bar')[0];
    let playerManaBarHTML = display.getElementsByClassName('player-mana-bar')[0];

    playerNameHTML.textContent = playerInfo.name;
    playerImageHTML.src = playerInfo.image;
    playerHPBarHTML.max = playerInfo.playerStats[playerStats.hitpoints];
    playerHPBarHTML.value = playerInfo.playerStats[playerStats.hitpoints];
    playerManaBarHTML.value = playerInfo.playerStats[playerStats.mana];
}
