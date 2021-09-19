function updateStartScreen(playerInfo) {
    playerDescriptionNameHTML.innerText = playerInfo.name;
    playerDescriptionRankHTML.innerText = playerInfo.playerRating.rank;
    playerDescriptionWinsHTML.innerText = playerInfo.playerRating.wins;
    playerDescriptionImageHTML.src = playerInfo.image;
}