
const loseScreenHTML = document.getElementById('lose-screen');
const loseScreenMessageHTML = document.getElementById('lose-screen-message');

const loserPortrait = document.getElementById('lose-screen-loser-portrait');

function showLoseScreen(loser) {
    loseScreenMessageHTML.innerText = 'You are loser, ' + loser.name + "!";
    loserPortrait.src = loser.image;

    showElement(loseScreenHTML);
}