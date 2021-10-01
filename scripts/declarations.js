
var magicalPulseSkill = new Skill("Magical Pulse", 0, 2, 0, playerStats.hitpoints, );
var holyRageSkill = new Skill("Holy Rage", 0, 10, 6, playerStats.intelligence);
var ancestorsWrathSkill = new Skill("Ancestors Wrath", 0, 30, 25, playerStats.hitpoints);
var skyRevengeSkill = new Skill("Sky Revenge", 0, 40, 30, playerStats.hitpoints);
var holyTouchSkill = new Skill("Holy Touch", 0, 5, 5, playerStats.hitpoints);
var brainStormSkill = new Skill("Brain Storm", 2, 1, 10, playerStats.intelligence);

var players = {mainPlayer: null, opponent: null};

players.mainPlayer = initMainPlayer();
players.opponent = initOpponent();

function getBodypartsList (body_parts_info) {
    let bodyParts = {};
    for (var body_part_name in body_parts_info) {
        if(body_part_name == 'relevance' || body_part_name == 'unscaled-size') {
            continue;
        }
        
        let newBodyPart = Object.create(bodyPart);
        newBodyPart.baseLife = body_parts_info[body_part_name].baseLife;
        newBodyPart.currentLife = body_parts_info[body_part_name].baseLife;
        newBodyPart.shootChance = body_parts_info[body_part_name].shootChance;

        bodyParts[body_part_name] = newBodyPart;
    }
    return bodyParts;
}

function initMainPlayer() {
    let mainPlayer = new Player();
    mainPlayer.name = "Tassadar";
    mainPlayer.playerSkills = [
        magicalPulseSkill, 
        holyRageSkill, 
        skyRevengeSkill 
    ];
    mainPlayer.playerRating = {
        rank: 55,
        wins: 14
    };
    mainPlayer.bodyParts = getBodypartsList(body_parts_info);
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
    opponent.bodyParts = getBodypartsList(body_parts_info);
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

const enemyBot = new EnemyBot(players.opponent);

const playerSilhouette = new SelectableSilhouette(defenseSvg, players.mainPlayer, UI_SCALE, 'main', Math.min(MINIMAL_SCREEN_SIZE, SILHOUETTE_SIZE * UI_SCALE));
const enemySilhouette = new SelectableSilhouette(attackSvg, players.opponent, UI_SCALE, 'side', Math.min(MINIMAL_SCREEN_SIZE, SILHOUETTE_SIZE * UI_SCALE));

const playerSilhouetteSelection = new BodySelectionSilhouette(playerSelectionSilhouetteSVG, players.mainPlayer, UI_SCALE, 'main', Math.min(MINIMAL_SCREEN_SIZE / 2, SUMMARY_SILHOUETTE_SIZE / 2), playerSilhouette);
const enemySilhouetteSelection = new BodySelectionSilhouette(enemySelectionSilhouetteSVG, players.opponent, UI_SCALE, 'side', Math.min(MINIMAL_SCREEN_SIZE / 2, SUMMARY_SILHOUETTE_SIZE / 2), enemySilhouette);
        
const playerBodySelection = new PlayerBodySelection(battleScreenSelectionPlayerHTML, playerSilhouetteSelection, enemySilhouetteSelection, battleScreenSelectionDefenseHTML, battleScreenSelectionAttackHTML, battleScreenFinishTurnButtonHTML);



const attackSelection = new BattleSelection(battleScreenSelectionAttackHTML);
attackSelection.getSelected = () => { return enemySilhouette.selected; };

const defenseSelection = new BattleSelection(battleScreenSelectionDefenseHTML);
defenseSelection.getSelected = () => { return playerSilhouette.selected };

const turnSummaryDisplay = new TurnSummaryDisplay(turnSummaryPlayerDisplaySvg, turnSummaryEnemyDisplaySvg, players.mainPlayer, players.opponent);

/* CURRENTLY UNUSED */

const abilitySelection = new BattleSelection(battleScreenSelectionAbilityHTML);
abilitySelection.getSelected = getSelectedPlayerAbilities;

/*
const battleSelectionsPanel = new BattleSelectionsPanel(
    //[abilitySelection, attackSelection, defenseSelection],
    [attackSelection, defenseSelection],
    battleScreenBackButtonHTML,
    battleScreenNextButtonHTML,
    battleScreenFinishTurnButtonHTML
);
*/