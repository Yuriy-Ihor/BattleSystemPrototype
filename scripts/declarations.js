
const startScreen = document.getElementById('start-screen');
const startBattleButton = document.getElementById('start-battle-button');

const versusScreen = document.getElementById('versus-screen');
const startTurnButton = document.getElementById('start-turn-button');

const battleScreen = document.getElementById("battle-screen");
const battleScreenSelection = document.getElementById('battle-screen-selection');

const battleScreenSelectionAbility = document.getElementById('battle-screen-selection-ability');
const battleScreenSelectionAttack = document.getElementById('battle-screen-selection-body-attack');
const battleScreenSelectionDefense = document.getElementById('battle-screen-selection-body-defense');

const battleScreenBackButton = document.getElementById("battle-screen-button-back");
const battleScreenNextButton = document.getElementById("battle-screen-button-next");
const battleScreenFinishTurnButton = document.getElementById("battle-screen-button-finish-turn");

const battleSummaryScreen = document.getElementById('battle-screen-summary');
const battleScreenNextTurnButton = document.getElementById('battle-screen-next-turn');

function hideElement(element) {
    if(!hasClass(element, 'hidden')) { 
        element.classList.add('hidden');
    }
}

function hasClass(element, clsName) {
    return(' ' + element.className + ' ').indexOf(' ' + clsName + ' ') > -1;
  }

function showElement(element) {
    element.classList.remove('hidden');
}

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

function get_total_height() {
    return Math.max(
        character_avatar_size + 2 * character_avatar_padding,
        health_bar_height + mana_bar_height + character_name_size + 2 * default_text_size + 6 * character_avatar_padding
    )
}

function get_total_width() {
    return character_avatar_size + Math.max(health_bar_width, mana_bar_width) + 3 * character_avatar_padding
}

const bodyPartSelectionScreen = is_mobile ? 
    new BodyScreenController(
        (width - screen_height) / 2,
        get_total_height() + (height - get_total_height() - get_total_height() - screen_height) / 2,
        screen_width,
        screen_height,
        true
    ) : 
    new BodyScreenController(
        (width - 3 * screen_width - 2 * screen_padding) / 2,
        get_total_height() + (height - get_total_height() - screen_height) / 2,
        screen_width,
        screen_height,
        false
    )

class BattleScreenManager {
    selections = [];
    previousSelectionButton;
    nextSelectionButton;
    currentScreen = 0;

    constructor(selections, previousSelectionButton, nextSelectionButton, battleScreenFinishTurnButton) {
        this.selections = selections;
        this.previousSelectionButton = previousSelectionButton;
        this.nextSelectionButton = nextSelectionButton;
        this.finishTurnButton = battleScreenFinishTurnButton;

        this.previousSelectionButton.onclick = () => this.showPreviousSelection();
        this.nextSelectionButton.onclick = () => this.showNextSelection();

        this.showFirstSelection();
    }

    showFirstSelection() {
        this.hideAllSelections();

        this.currentScreen = 0;
        showElement(this.selections[this.currentScreen]);
        showElement(this.nextSelectionButton);

        hideElement(this.previousSelectionButton);
        hideElement(this.finishTurnButton);
    }

    hideAllSelections() {
        for(let i = 1; i < this.selections.length; i++) {
            hideElement(this.selections[i]);
        }
    }

    showPreviousSelection() {

        hideElement(this.selections[this.currentScreen]);
        this.currentScreen -= 1;
        showElement(this.selections[this.currentScreen]);

        showElement(this.nextSelectionButton);
        hideElement(this.finishTurnButton);

        if(this.currentScreen == 0) {
            hideElement(this.previousSelectionButton);
        }
    }

    showNextSelection() {

        hideElement(this.selections[this.currentScreen]);
        this.currentScreen += 1;
        showElement(this.selections[this.currentScreen]);

        showElement(this.previousSelectionButton);

        if(this.currentScreen == this.selections.length - 1) {
            hideElement(this.nextSelectionButton);
            showElement(this.finishTurnButton);
        }
    }
}

const battleScreenManager = new BattleScreenManager(
    [battleScreenSelectionAbility, battleScreenSelectionAttack, battleScreenSelectionDefense],
    battleScreenBackButton,
    battleScreenNextButton,
    battleScreenFinishTurnButton
);
