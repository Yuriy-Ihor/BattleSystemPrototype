
const versusScreenHTML = document.getElementById('versus-screen');
const startTurnButtonHTML = document.getElementById('start-turn-button');

const versusScreenMainPlayerHTML;
const versusScreenOpponentPlayerHTML;

function updateVersusScreen(players) {
    updateVersusScreenPlayer(players.mainPlayer, versusScreenMainPlayerHTML);
    updateVersusScreenPlayer(players.opponent, versusScreenOpponentPlayerHTML);
}

updateVersusScreenPlayer = function(playerInfo, display) {

}
