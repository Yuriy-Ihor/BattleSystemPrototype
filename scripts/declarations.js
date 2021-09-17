
const TURNS_PER_PLAYER = 2;
const DEFAULT_TYPE_TIME = 0.05;
const NEXT_TURN_DELAY = 2;
const CLEAR_LOGS = true;

const battleScreen = document.getElementById("players-battle-screen");
const startScreen = document.getElementById('start-screen');
const versusScreen = document.getElementById('versus-screen');
const startBattleButton = document.getElementById('start-battle-button');
const startTurnButton = document.getElementById('start-turn-button');

const playerStats = {
    hitpoints: "Hitpoints",
    mana: "Mana",
    intelligence: "Intelligence",
    defense: "Defense",
    criticalStrike: "Critical strike" // float (0-1)
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
class SkillType {
    static SELF = 'Self';
    static NONSELF = 'Nonself';
}
class Skill {
    constructor (name, duration, skillType, effect, manaRequired, targetStat) {
        this.name = name;
        this.duration = duration;
        this.skillType = skillType;
        this.effect = effect;
        this.manaRequired = manaRequired;
        this.targetStat = targetStat;
    }
    name = "default skill name";
    duration = 0; // 0 - permanent 
    skillType = SkillType.SELF;
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

var magicalPulseSkill = new Skill("Magical Pulse", 0, SkillType.NONSELF, 2, 0, playerStats.hitpoints, );
var holyRageSkill = new Skill("Holy Rage", 1, SkillType.SELF, 5, 25, playerStats.intelligence);
var ancestorsWrathSkill = new Skill("Ancestors Wrath", 0, SkillType.NONSELF, 30, 25, playerStats.hitpoints);
var skyRevengeSkill = new Skill("Sky Revenge", 0, SkillType.NONSELF, 25, 20, playerStats.hitpoints);
var holyTouchSkill = new Skill("Holy Touch", 0, SkillType.SELF, 5, 5, playerStats.hitpoints);
var brainStormSkill = new Skill("Brain Storm", 2, SkillType.NONSELF, 1, 10, playerStats.intelligence);

var players = {mainPlayer: null, opponent: null};

players.mainPlayer = initMainPlayer();
players.opponent = initOpponent();

function initMainPlayer() {
    var mainPlayer = new Player();
    mainPlayer.name = "Tassadar";
    mainPlayer.playerRating.b
    mainPlayer.playerSkills = [
        magicalPulseSkill, 
        holyRageSkill, 
        skyRevengeSkill, 
        holyTouchSkill
    ];
    mainPlayer.playerStats[playerStats.hitpoints] = 100;
    mainPlayer.playerStats[playerStats.mana] = 222;
    mainPlayer.playerStats[playerStats.intelligence] = 26;
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
    opponent.playerStats[playerStats.intelligence] = 19;
    opponent.playerStats[playerStats.defense] = 8;
    opponent.playerStats[playerStats.criticalStrike] = 0.2;
    
    return opponent;
}
