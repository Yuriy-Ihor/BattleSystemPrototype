
const playerStats = {
    hitpoints: "Hitpoints",
    mana: "Mana",
    defense: "Defense",
    criticalStrike: "Critical strike"
}
class Player {
    name = "default name";
    playerRating = Object.create(playerRating);
    playerSkills = [];
    playerStats = Object.create(playerStats);
}
const playerRating = {
    rank: 10,
    wonBattles: 10
}

class Skill {
    constructor (name, duration, effect, manaRequired, targetStat) {
        this.name = name;
        this.duration = duration;
        this.effect = effect;
        this.manaRequired = manaRequired;
        this.targetStat = targetStat;
    }
    name = "default skill name";
    duration = 0; // 0 - permanent 
    effect = 0;
    manaRequired = 5;
    targetStat = playerStats.hitpoints;
    applyEffect = function(targetStat, player, effect) {
        player.playerStats[targetStat] += effect;
    };
    removeEffect = function(targetStat, player, effect) {
        player.playerStats[targetStat] -= effect;
    };
}

var magicalPulseSkill = new Skill("Magical Pulse", 0, 2, 0, playerStats.hitpoints, );
var holyRageSkill = new Skill("Holy Rage", 1, 5, 25, playerStats.intelligence);
var ancestorsWrathSkill = new Skill("Ancestors Wrath", 0, 30, 25, playerStats.hitpoints);
var skyRevengeSkill = new Skill("Sky Revenge", 0, 25, 20, playerStats.hitpoints);
var holyTouchSkill = new Skill("Holy Touch", 0, 5, 5, playerStats.hitpoints);
var brainStormSkill = new Skill("Brain Storm", 2, 1, 10, playerStats.intelligence);

var players = {mainPlayer: null, opponent: null};

players.mainPlayer = initMainPlayer();
players.opponent = initOpponent();

function initMainPlayer() {
    var mainPlayer = new Player();
    mainPlayer.name = "Tassadar";
    mainPlayer.playerSkills = [
        magicalPulseSkill, 
        holyRageSkill, 
        skyRevengeSkill 
    ];
    mainPlayer.playerStats[playerStats.hitpoints] = 100;
    mainPlayer.playerStats[playerStats.mana] = 222;
    mainPlayer.playerStats[playerStats.defense] = 18;
    mainPlayer.playerStats[playerStats.criticalStrike] = 0.2;

    return mainPlayer;
}

function initOpponent() {
    var opponent = new Player();
    opponent.name = "K'Rashnar";
    opponent.playerSkills = [
        magicalPulseSkill, 
        holyRageSkill, 
        skyRevengeSkill
    ];
    opponent.playerStats[playerStats.hitpoints] = 80;
    opponent.playerStats[playerStats.mana] = 110;
    opponent.playerStats[playerStats.defense] = 8;
    opponent.playerStats[playerStats.criticalStrike] = 0.2;
    
    return opponent;
}
