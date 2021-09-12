// TODO: try to put this shit in separated files

// _____ game constants _____ //

const TURNS_PER_PLAYER = 2;

// ______ player objects ______ //

const playerStats = {
    hitpoints: 100,
    mana: 50,
    intelligence: 10,
    defense: 10,
    criticalStrike: 0.5
}

const player = {
    name: "default name",
    playerSkills: [],
    playerStats: {}
}

// _____ skills objects _____ //

const skillType = {
    SELF: 'Self',
    NONSELF: 'Nonself'
}

const skill = {
    name: "default skill name",
    duration: 0, // 0 - permanent 
    skillType: skillType.SELF,
    effect : 0,
    manaRequired: 5,
    targetStat: playerStats.hitpoints,
    applyEffect: function(player, effect) {
        player.playerStats.targetStat += effect;
    },
    removeEffect: function(player, effect) {
        player.playerStats.targetStat -= effect;
    }
}

// ___ static game function ___ //

function getMagicalEffectMultiplayed(baseEffect, intelligence) {
    return baseEffect * intelligence / 10;
}

// ___ html consts ___ //

const logField = document.getElementById("terminal-log-field");

// ___ html functions ___ //

function showNewLog(text) {
    var newLog = document.createElement("div");
    newLog.setAttribute('class', 'terminal-log');
    newLog.innerHTML = text; // TODO: make typing effect

    logField.appendChild(newLog);
}

function initPlayersUI() {
    fillPlayersDisplay('player-left', players.human);
    fillPlayersDisplay('player-right', players.bot);
}

function fillPlayersDisplay(playerId, playerInfo) {
    var playerPanel = document.getElementById(playerId);

    var playerName = playerPanel.getElementsByClassName("player-name")[0];
    playerName.textContent  = playerInfo.name.toString();
    
    var playerHPBar = playerPanel.getElementsByClassName("player-hp-bar")[0];
    playerHPBarText = playerHPBar.getElementsByClassName("player-hp-amount")[0];
    playerHPBarText.textContent  = playerInfo.playerStats.hitpoints.toString();

    var playerManaBar = playerPanel.getElementsByClassName("player-mana-bar")[0];
    playerManaBarText = playerManaBar.getElementsByClassName("player-mana-amount")[0];
    playerManaBarText.textContent  = playerInfo.playerStats.mana.toString();
}

// ___ declarations ___ //
// ___ skills declarations ___ //

var magicalPulseSkill = Object.create(skill);
magicalPulseSkill.name = "Magical Pulse";
magicalPulseSkill.duration = 0;  
magicalPulseSkill.skillType = skillType.NONSELF;
magicalPulseSkill.effect = 2;
magicalPulseSkill.targetStat = playerStats.hitpoints;
magicalPulseSkill.manaRequired = 0;

var holyRageSkill = Object.create(skill);
holyRageSkill.name = "Holy Rage";
holyRageSkill.duration = 1;  
holyRageSkill.skillType = skillType.SELF;
holyRageSkill.effect = 5;
holyRageSkill.targetStat = playerStats.intelligence;
holyRageSkill.manaRequired = 15;

var ancestorsWrathSkill = Object.create(skill);
ancestorsWrathSkill.name = "Ancestors Wrath";
ancestorsWrathSkill.duration = 0;  
ancestorsWrathSkill.skillType = skillType.NONSELF;
ancestorsWrathSkill.effect = 30;
ancestorsWrathSkill.targetStat = playerStats.hitpoints;
ancestorsWrathSkill.manaRequired = 25;

var skyRevengeSkill = Object.create(skill);
skyRevengeSkill.name = "Sky Revenge";
skyRevengeSkill.duration = 0;  
skyRevengeSkill.skillType = skillType.NONSELF;
skyRevengeSkill.effect = 25;
skyRevengeSkill.targetStat = playerStats.hitpoints;
skyRevengeSkill.manaRequired = 20;

var holyTouchSkill = Object.create(skill);
holyTouchSkill.name = "Holy Touch";
holyTouchSkill.duration = 0;  
holyTouchSkill.skillType = skillType.SELF;
holyTouchSkill.effect = 5;
holyTouchSkill.targetStat = playerStats.hitpoints;
holyTouchSkill.manaRequired = 5;

var brainStormSkill = Object.create(skill);
brainStormSkill.name = "Brain Storm";
brainStormSkill.duration = 2;  
brainStormSkill.skillType = skillType.NONSELF;
brainStormSkill.effect = 1;
brainStormSkill.targetStat = playerStats.intelligence;
brainStormSkill.manaRequired = 10;

// ___ player declarations ___ //

var players = {human: null, bot: null};

function initHuman() {
    var human = Object.create(player);
    human.name = "Tassadar";
    human.playerSkills = [
        skill1 = magicalPulseSkill, 
        skill2 = holyRageSkill, 
        skill3 = skyRevengeSkill, 
        skill3 = holyTouchSkill
    ]
    human.playerStats = {
        hitpoints: 78,
        mana: 125,
        intelligence: 26,
        defense: 8,
        strength: 3,
        criticalStrike: 0.2
    };

    return human;
}

function initBot() {
    var bot = Object.create(player);
    bot.name = "Zeratul";
    bot.playerSkills = [
        skill1 = magicalPulseSkill, 
        skill2 = holyRageSkill, 
        skill3 = skyRevengeSkill, 
        skill3 = holyTouchSkill
    ]
    bot.playerStats = {
        hitpoints: 80,
        mana: 120,
        intelligence: 20,
        defense: 12,
        strength: 4,
        criticalStrike: 0.15
    };

    return bot;
}

players.human = initHuman();
players.bot = initBot();

// ___ game logic ___ //

function isGameOver() {
    return players.human.hitpoints > 0 || players.bot.hitpoints > 0;
}

function startGame() {
    initHuman();
    initBot();
    initPlayersUI();
    showNewLog("Greetings, warriors! <br /> You, " + players.human.name + ", and you, " + players.bot.name + ", are here to fight in a glorious battle!");
    
    var winner;
    while(!isGameOver) {
        for(let i = 0; i < TURNS_PER_PLAYER; i++) {
            handleTurn(players.human);
        }
        for(let i = 0; i < TURNS_PER_PLAYER; i++) {
            handleTurn(players.bot);
        }
    }
    
    finishGame(players.human);
}

function handleTurn() {
    // TODO: handling turn logic for both ai and player (same logic for everyone, but for ai make random spell selection)
}

function finishGame(winner) {
    showNewLog("Congratulations, " + winner.name + "!");
}

startGame();
