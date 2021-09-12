
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
    applyEffect: function(player) {
        // this skill does something
    },
    removeEffect: function(player) {
        // if skill is not permanent, we can remove effect in the future
    }
}

// ______ player objects ______ //

const playerStats = {
    hitpoints: 100,
    mana: 50,
    intelligence: 10,
    defense: 10,
    strength: 10,
    criticalStrike: 0.5
}

const player = {
    name: "default name",
    playerSkills: [],
    playerStats: {}
}

// ___ html consts ___ //

const logField = document.getElementById("terminal-log-field");

// ___ misc functions ___ //

function showNewLog(text) {
    var newLog = document.createElement("div");
    newLog.setAttribute('class', 'terminal-log');
    newLog.innerHTML = text;

    logField.appendChild(newLog);
}

// ___ declarations ___ //
// ___ skills declarations ___ //

var magicAttackSkill = Object.create(skill);
magicAttackSkill.name = "Magic attack";
magicAttackSkill.duration = 0;  
magicAttackSkill.skillType = skillType.NONSELF;
magicAttackSkill.effect = 10;
magicAttackSkill.applyEffect = function(player) {
    player.hitpoints -= magicAttackSkill.effect;
};

var holyRageSkill = Object.create(skill);
magicAttackSkill.name = "Magic attack";
magicAttackSkill.duration = 0;  
magicAttackSkill.skillType = skillType.NONSELF;
magicAttackSkill.effect = 10;
magicAttackSkill.applyEffect = function(player) {
    player.hitpoints -= magicAttackSkill.effect;
};


// ___ player declarations ___ //

var players = [];

function initHuman() {
    var human = Object.create(player);
    human.name = "Tassadar";
    human.playerSkills = [
        {

        }
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


// ___ game logic ___ //

function startGame() {
    
    //showNewLog("Greetings! <br /> You," + +" are here to fight with your opponent");
    
}



function initBot() {

}

startGame();
