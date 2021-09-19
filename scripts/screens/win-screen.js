
const winScreenHTML = document.getElementById('win-screen');
const winScreenMessageHTML = document.getElementById('win-screen-message');
const winnerPortrait = document.getElementById('win-screen-winner-portrait');

function showWinScreen(winner) {
    winScreenMessageHTML.innerText = 'Congrats, ' + winner.name + "!!! :)";
    winnerPortrait.src = winner.image;

    showElement(winScreenHTML);
}
