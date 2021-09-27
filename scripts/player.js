
const playerStats = {
    hitpoints: "Hitpoints",
    mana: "Mana",
    defense: "Defense",
    criticalStrike: "Critical strike"
}

const bodyPart = {
    baseLife: 100,
    currentLife: 100,
    shootChance: 0.5
}

const playerRating = {
    rank: 10,
    wins: 10
}

class Player {
    name = "default name";
    image = 'src/.png';
    playerRating = Object.create(playerRating);
    bodyParts = {};
    playerSkills = [];
    playerBaseStats = Object.create(playerStats);
    playerStats = Object.create(playerStats);
}
