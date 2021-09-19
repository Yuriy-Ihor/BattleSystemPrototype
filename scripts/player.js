
const playerStats = {
    hitpoints: "Hitpoints",
    mana: "Mana",
    defense: "Defense",
    criticalStrike: "Critical strike"
}

const playerRating = {
    rank: 10,
    wonBattles: 10
}

class Player {
    name = "default name";
    playerRating = Object.create(playerRating);
    playerSkills = [];
    playerStats = Object.create(playerStats);
}
