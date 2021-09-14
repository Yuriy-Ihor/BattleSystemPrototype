// TODO: try to put this shit in separated files

// _____ game constants _____ //

const TURNS_PER_PLAYER = 2;
const DEFAULT_TYPE_TIME = 0.05;
const NEXT_TURN_DELAY = 2;
const CLEAR_LOGS = true;

// ______ player objects ______ //

const playerStats = {
    hitpoints: "Hitpoints",
    mana: "Mana",
    intelligence: "Intelligence",
    defense: "Defense",
    criticalStrike: "Critical strike" // float (0-1)
}

class Player {
    name = "default name";
    playerSkills = [];
    playerStats = {};
}

// _____ skills objects _____ //

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

// ___ static game functions ___ //

function getMagicalEffectMultiplayed(baseEffect, intelligence) {
    return baseEffect * intelligence / 10;
}

function getSkillDescription(skill) {
    return skill.name + " - costs " + skill.manaRequired + " mana" + ", " + getSkillVerb(skill.skillType) + skill.targetStat.toString() + " by " + skill.effect;
} 

function getSkillVerb(skillType) {
    return skillType == SkillType.SELF ? "increase " : "decrease ";
}

// ___ html consts ___ //

const logField = document.getElementById("terminal-log-field");

// ___ html functions ___ //

function clearAllLogs() {
    if(!CLEAR_LOGS) {
        return;
    }

    let logs = logField.getElementsByClassName('terminal-log');
    let inputs = logField.getElementsByClassName('terminal-input');
    for(let i = 0; i < logs.length; i++) {
        logs[i].remove();
    }

    for(let i = 0; i < inputs.length; i++) {
        inputs[i].remove();
    }
}

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

async function showNewLog(text) {
    var newLog = document.createElement("div");
    newLog.setAttribute('class', 'terminal-log');

    logField.appendChild(newLog);

    for(let i = 0; i < text.length; i++) {
        newLog.innerHTML += text.charAt(i);
        await waitForSeconds(DEFAULT_TYPE_TIME);
    }
}

function waitForSeconds(time) {
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, time * 1000);
    })
}

function displayPlayerSkills(player) {
    for(let i = 0; i < player.playerSkills.length; i++) {
        let currentSkill = player.playerSkills[i];
        showNewLog((i + 1) + " - " + getSkillDescription(currentSkill));
    }
}

function updatePlayersUI() {
    updatePlayersDisplay('player-left', players.mainPlayer);
    updatePlayersDisplay('player-right', players.opponent);
}

function updatePlayersDisplay(playerId, playerInfo) {
    var playerPanel = document.getElementById(playerId);

    var playerName = playerPanel.getElementsByClassName("player-name")[0];
    playerName.textContent  = playerInfo.name.toString();

    updatePlayerStatUI(playerId, 'player-hp-bar', 'player-hp-amount', playerInfo.playerStats[playerStats.hitpoints]);
    updatePlayerStatUI(playerId, 'player-mana-bar', 'player-mana-amount', playerInfo.playerStats[playerStats.mana]);
    updatePlayerStatUI(playerId, 'player-intelligence-bar', 'player-intelligence-amount', playerInfo.playerStats[playerStats.intelligence]);
    updatePlayerStatUI(playerId, 'player-defense-bar', 'player-defense-amount', playerInfo.playerStats[playerStats.defense]);
    updatePlayerStatUI(playerId, 'player-criticalStrike-bar', 'player-criticalStrike-amount', playerInfo.playerStats[playerStats.criticalStrike]);
}

function updatePlayerStatUI(playerId, barClassName, textAmountClassName, amount) {
    var playerPanel = document.getElementById(playerId);

    var playerBar = playerPanel.getElementsByClassName(barClassName)[0];
    playerStatAmount = playerBar.getElementsByClassName(textAmountClassName)[0];
    playerStatAmount.textContent  = amount;
}

// ___ declarations ___ //
// ___ skills declarations ___ //

var magicalPulseSkill = new Skill("Magical Pulse", 0, SkillType.NONSELF, 2, 0, playerStats.hitpoints, );
var holyRageSkill = new Skill("Holy Rage", 1, SkillType.SELF, 5, 25, playerStats.intelligence);
var ancestorsWrathSkill = new Skill("Ancestors Wrath", 0, SkillType.NONSELF, 30, 25, playerStats.hitpoints);
var skyRevengeSkill = new Skill("Sky Revenge", 0, SkillType.NONSELF, 25, 20, playerStats.hitpoints);
var holyTouchSkill = new Skill("Holy Touch", 0, SkillType.SELF, 5, 5, playerStats.hitpoints);
var brainStormSkill = new Skill("Brain Storm", 2, SkillType.NONSELF, 1, 10, playerStats.intelligence);

// ___ player declarations ___ //

var players = {mainPlayer: null, opponent: null};

function initMainPlayer() {
    var mainPlayer = new Player();
    mainPlayer.name = "Tassadar";
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

// ___ game logic ___ //

function isGameOver() {
    return players.mainPlayer.playerStats[playerStats.hitpoints] < 0 || players.opponent.playerStats[playerStats.hitpoints] < 0;
}

async function startGame() {
    players.mainPlayer = initMainPlayer();
    players.opponent = initOpponent();
    
    updatePlayersUI();
    await showNewLog("Greetings, warriors!");
    await waitForSeconds(2);
    await showNewLog("You, " + players.mainPlayer.name + ", and you, " + players.opponent.name + ", are here to fight in a glorious battle!");
    
    while(!isGameOver()) {
        for(let i = 0; i < TURNS_PER_PLAYER; i++) {
            await handleTurnHumanPlayer(players.mainPlayer, players.opponent);
            await waitForSeconds(NEXT_TURN_DELAY);
            clearAllLogs();
        }

        for(let i = 0; i < TURNS_PER_PLAYER; i++) {
            await handleTurnAIPlayer(players.opponent, players.mainPlayer);
            clearAllLogs();
        }
    }
    
    finishGame(players.mainPlayer);
}

async function handleTurnHumanPlayer(currentPlayer, opponent) {
    await showNewLog("Your move, " + currentPlayer.name);
    displayPlayerSkills(currentPlayer);
    showNewLog("Which skill you want to select? (type number)");
    let input = await readPlayerInput();

    let selectedSkill = currentPlayer.playerSkills[input - 1];

    await castSkill(selectedSkill, currentPlayer, opponent);
}

async function handleTurnAIPlayer(currentPlayer, opponent) {
    let selectedSkill = currentPlayer.playerSkills[Math.floor(Math.random()*currentPlayer.playerSkills.length)];
    
    await castSkill(selectedSkill, currentPlayer, opponent);
}

async function castSkill(skill, player, opponent) {
    await showNewLog(player.name + " casting " + skill.name + "...");

    player.playerStats[playerStats.mana] -= skill.manaRequired;

    if(skill.skillType == SkillType.SELF) {
        skill.applyEffect(skill.targetStat, player, skill.effect);
        await showNewLog(player.name + " " + getSkillVerb(skill.skillType) + " his " + skill.targetStat + " by " + skill.effect);
    }
    else {
        skill.applyEffect(skill.targetStat, opponent, -skill.effect);
        await showNewLog(player.name + " " + getSkillVerb(skill.skillType) + skill.targetStat + " of " + opponent.name + " by " + skill.effect);
    }

    updatePlayersUI();
}

function finishGame(winner) {
    showNewLog("Congratulations, " + winner.name + "!");
}

startGame();
