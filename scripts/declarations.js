
var magicalPulseSkill = new Skill("Magical Pulse", 0, 2, 0, playerStats.hitpoints, );
var holyRageSkill = new Skill("Holy Rage", 0, 10, 6, playerStats.intelligence);
var ancestorsWrathSkill = new Skill("Ancestors Wrath", 0, 30, 25, playerStats.hitpoints);
var skyRevengeSkill = new Skill("Sky Revenge", 0, 40, 30, playerStats.hitpoints);
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
    mainPlayer.playerStats[playerStats.hitpoints] = 50;
    mainPlayer.playerStats[playerStats.mana] = 50;
    mainPlayer.playerStats[playerStats.defense] = 18;
    mainPlayer.playerStats[playerStats.criticalStrike] = 0.2;

    mainPlayer.playerBaseStats[playerStats.hitpoints] = 50;
    mainPlayer.playerBaseStats[playerStats.mana] = 50;
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

    opponent.playerStats[playerStats.hitpoints] = 50;
    opponent.playerStats[playerStats.mana] = 50;
    opponent.playerStats[playerStats.defense] = 8;
    opponent.playerStats[playerStats.criticalStrike] = 0.2;

    opponent.playerBaseStats[playerStats.hitpoints] = 50;
    opponent.playerBaseStats[playerStats.mana] = 50;
    opponent.playerBaseStats[playerStats.defense] = 8;
    opponent.playerBaseStats[playerStats.criticalStrike] = 0.2;
    
    return opponent;
}

const attackSilhouette = new SelectableSilhouette(silhouette_coordinate_map_side, attackSvg);
const defenseSilhouette = new SelectableSilhouette(silhouette_coordinate_map_main, defenseSvg);

const abilitySelection = new BattleSelection(battleScreenSelectionAbilityHTML);
abilitySelection.getSelected = getSelectedPlayerAbilities;

const attackSelection = new BattleSelection(battleScreenSelectionAttackHTML);
attackSelection.getSelected = () => { return attackSilhouette.selected };

const defenseSelection = new BattleSelection(battleScreenSelectionDefenseHTML);
defenseSelection.getSelected = () => { return defenseSilhouette.selected };

const battleSelectionsPanel = new BattleSelectionsPanel(
    [abilitySelection, attackSelection, defenseSelection],
    battleScreenBackButtonHTML,
    battleScreenNextButtonHTML,
    battleScreenFinishTurnButtonHTML
);

const turnSummaryDisplay = new TurnSummaryDisplay(turnSummaryDisplaySvg);