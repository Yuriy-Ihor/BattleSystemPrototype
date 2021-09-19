const startScreenHTML = document.getElementById('start-screen');
const startBattleButtonHTML = document.getElementById('start-battle-button');

const playerDescriptionNameHTML = document.getElementById('player-description-name');
const playerDescriptionImageHTML = document.getElementById('player-description-image');
const playerDescriptionRankHTML = document.getElementById('player-rating-rank');
const playerDescriptionWinsHTML = document.getElementById('player-rating-wins');

function updateStartScreen(playerInfo) {
    playerDescriptionNameHTML.innerText = playerInfo.name;
    playerDescriptionRankHTML.innerText = playerInfo.playerRating.rank;
    playerDescriptionWinsHTML.innerText = playerInfo.playerRating.wins;
    playerDescriptionImageHTML.src = playerInfo.image;
}