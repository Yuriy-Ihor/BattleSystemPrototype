// TODO: try to put this shit in separated files

// _____ game constants _____ //

const TURNS_PER_PLAYER = 2;

// ______ player objects ______ //

const playerStats = {
    hitpoints: "Hitpoints",
    mana: "Mana",
    intelligence: "Intelligence",
    defense: "Defense",
    criticalStrike: "Critical strike" // float (0-1)
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

// ___ game objects ___ //


// ___ static game functions ___ //

function getMagicalEffectMultiplayed(baseEffect, intelligence) {
    return baseEffect * intelligence / 10;
}

// ___ html consts ___ //

const logField = document.getElementById("terminal-log-field");

// ___ html functions ___ //


async function readPlayerInput() {
    return new Promise(resolve => {
        const onKeyDown = event => {
            if (event.keyCode === 13) {
                event.preventDefault();
                let result = event.target.textContent;
                resolve(result);
            }
        };

        var newInput = document.createElement("div");
        newInput.setAttribute('class', 'terminal-input');
        newInput.setAttribute('contenteditable', 'true');
        newInput.addEventListener("keydown", onKeyDown);
        logField.appendChild(newInput);
        
        newInput.focus();
    });
}


function showNewLog(text) {
    var newLog = document.createElement("div");
    newLog.setAttribute('class', 'terminal-log');
    newLog.innerHTML = text; // TODO: make typing effect

    logField.appendChild(newLog);
}

function initPlayersUI() {
    fillPlayersDisplay('player-left', players.mainPlayer);
    fillPlayersDisplay('player-right', players.opponent);
}

function fillPlayersDisplay(playerId, playerInfo) {
    var playerPanel = document.getElementById(playerId);

    var playerName = playerPanel.getElementsByClassName("player-name")[0];
    playerName.textContent  = playerInfo.name.toString();
    
    updatePlayersHPUI(playerId, playerInfo.playerStats.hitpoints);
    updatePlayersManaUI(playerId, playerInfo.playerStats.mana);
}

function updatePlayersHPUI(playerId, hpAmount) {
    var playerPanel = document.getElementById(playerId);

    var playerHPBar = playerPanel.getElementsByClassName("player-hp-bar")[0];
    playerHPBarText = playerHPBar.getElementsByClassName("player-hp-amount")[0];
    playerHPBarText.textContent  = hpAmount;
}

function updatePlayersManaUI(playerId, manaAmount) {
    var playerPanel = document.getElementById(playerId);

    var playerManaBar = playerPanel.getElementsByClassName("player-mana-bar")[0];
    playerManaBarText = playerManaBar.getElementsByClassName("player-mana-amount")[0];
    playerManaBarText.textContent  = manaAmount;
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

var players = {mainPlayer: null, opponent: null};

function initMainPlayer() {
    var mainPlayer = Object.create(player);
    mainPlayer.name = "Tassadar";
    mainPlayer.playerSkills = [
        magicalPulseSkill, 
        holyRageSkill, 
        skyRevengeSkill, 
        holyTouchSkill
    ]
    mainPlayer.playerStats = {
        hitpoints: 78,
        mana: 125,
        intelligence: 26,
        defense: 8,
        strength: 3,
        criticalStrike: 0.2
    };

    return mainPlayer;
}

function initOpponent() {
    var opponent = Object.create(player);
    opponent.name = "Zeratul";
    opponent.playerSkills = [
        magicalPulseSkill, 
        holyRageSkill, 
        skyRevengeSkill, 
        holyTouchSkill
    ]
    opponent.playerStats = {
        hitpoints: 80,
        mana: 120,
        intelligence: 20,
        defense: 12,
        strength: 4,
        criticalStrike: 0.15
    };

    return opponent;
}

// ___ game logic ___ //

function isGameOver() {
    return players.mainPlayer.hitpoints > 0 || players.opponent.hitpoints > 0;
}

async function startGame() {
    players.mainPlayer = initMainPlayer();
    players.opponent = initOpponent();

    initPlayersUI();
    showNewLog("Greetings, warriors! <br /> You, " + players.mainPlayer.name + ", and you, " + players.opponent.name + ", are here to fight in a glorious battle!");
    
    while(!isGameOver()) {
        for(let i = 0; i < TURNS_PER_PLAYER; i++) {
            await handleTurnMainPlayer(players.mainPlayer);
        }
        for(let i = 0; i < TURNS_PER_PLAYER; i++) {
            await handleTurnOpponent(players.opponent);
        }
    }
    
    finishGame(players.mainPlayer);
}

async function handleTurnMainPlayer(currentPlayer) {
    displayPlayerSkills(currentPlayer);

    showNewLog("Which skill you want to select? (type number)");
    let input = await readPlayerInput();

    showNewLog("You selected " + currentPlayer.playerSkills[input - 1].name);
}

function displayPlayerSkills(player) {
    showNewLog(player.name + ", you have these abilities available:");
    
    for(let i = 0; i < player.playerSkills.length; i++) {
        let currentSkill = player.playerSkills[i];
        
        showNewLog((i + 1) + " - " + getSkillDescription(currentSkill));
    }
}

function getSkillDescription(skill) {
    let skillVerb = skill.skillType == skillType.SELF ? "increase your " : "decrease enemy's ";
    return skill.name + " - costs " + skill.manaRequired + " mana" + ", " + skillVerb + skill.targetStat.toString() + " by " + skill.effect;
} 

async function handleTurnOpponent(currentPlayer) {

    showNewLog(currentPlayer.name + " does nothing...");
}

function finishGame(winner) {
    showNewLog("Congratulations, " + winner.name + "!");
}

startGame();
