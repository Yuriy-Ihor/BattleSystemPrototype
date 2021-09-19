
const drawScreenHTML = document.getElementById('draw-screen');
const drawScreenPortraits = document.getElementById('draw-screen-player-portraits');
const drawScreenMessageHTML = document.getElementById('draw-screen-message');

function showDrawScreen(players) {
    insertPlayerPortrait(players.mainPlayer.image);
    insertPlayerPortrait(players.opponent.image);

    showElement(drawScreenHTML);
}

function insertPlayerPortrait(playerPortrait) {
    let newPortrait = document.createElement('img');
    newPortrait.setAttribute('class', 'draw-screen-player-portrait');
    newPortrait.src = playerPortrait;

    drawScreenPortraits.appendChild(newPortrait);
}
