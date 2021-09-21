
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
    let mainPlayer = new Player();
    mainPlayer.name = "Tassadar";
    mainPlayer.playerSkills = [
        magicalPulseSkill, 
        holyRageSkill, 
        skyRevengeSkill 
    ];
    mainPlayer.playerRating = {
        rank: 77,
        wins: 14
    };
    mainPlayer.image = 'images/protoss.jpg';
    mainPlayer.playerStats[playerStats.hitpoints] = 100;
    mainPlayer.playerStats[playerStats.mana] = 222;
    mainPlayer.playerStats[playerStats.defense] = 18;
    mainPlayer.playerStats[playerStats.criticalStrike] = 0.2;

    mainPlayer.playerBaseStats[playerStats.hitpoints] = 100;
    mainPlayer.playerBaseStats[playerStats.mana] = 222;
    mainPlayer.playerBaseStats[playerStats.defense] = 18;
    mainPlayer.playerBaseStats[playerStats.criticalStrike] = 0.2;

    return mainPlayer;
}

function initOpponent() {
    let opponent = new Player();
    opponent.name = "K'Rashnar";
    opponent.playerSkills = [
        magicalPulseSkill, 
        holyRageSkill, 
        skyRevengeSkill
    ];
    opponent.playerRating = {
        rank: 66,
        wins: 13
    };
    opponent.image = 'images/undead.jpg';
    opponent.playerStats[playerStats.hitpoints] = 80;
    opponent.playerStats[playerStats.mana] = 110;
    opponent.playerStats[playerStats.defense] = 8;
    opponent.playerStats[playerStats.criticalStrike] = 0.2;

    opponent.playerBaseStats[playerStats.hitpoints] = 80;
    opponent.playerBaseStats[playerStats.mana] = 110;
    opponent.playerBaseStats[playerStats.defense] = 8;
    opponent.playerBaseStats[playerStats.criticalStrike] = 0.2;
    
    return opponent;
}

const attackBodySilhouette = 
    new BodyScreen(
        (width - canvas_height) / 2, 0, screen_width, canvas_height,
        BodyScreenType.AttackTargetSelection,
        screen_border_width,
        attackCanvas
    );

const defenseBodySilhouette = 
    new BodyScreen(
        (width - canvas_height) / 2, 0, screen_width, canvas_height,
        BodyScreenType.DefenseTargetSelection,
        screen_border_width,
        defenseCanvas
    );
    
const abilitySelection = new BattleSelection(battleScreenSelectionAbilityHTML);
abilitySelection.getSelected = getSelectedPlayerAbilities;

const attackSelection = new BattleSelection(battleScreenSelectionAttackHTML);
attackSelection.getSelected = () => { return attackBodySilhouette.getSelectedBodyPart() };

const defenseSelection = new BattleSelection(battleScreenSelectionDefenseHTML);
defenseSelection.getSelected = () => { return defenseBodySilhouette.getSelectedBodyPart() };

const battleSelectionsPanel = new BattleSelectionsPanel(
    [abilitySelection, attackSelection, defenseSelection],
    battleScreenBackButtonHTML,
    battleScreenNextButtonHTML,
    battleScreenFinishTurnButtonHTML
);
