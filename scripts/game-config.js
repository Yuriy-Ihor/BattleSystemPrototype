
const BODY_PART_SHOOT_CHANCE = 1;
const BODY_PART_LIFE = 4;

const ATTACKED_ENEMY_PART_ID = 'head';
const DEFENDED_ENEMY_PART_ID = 'torso';

const SILHOUETTE_SIZE = 256; 

const UI_SCALE_MULTIPLAYER = 0.45;
const MAX_UI_SCALE = 1.7;

var UI_SCALE = getUiScale();

function getUiScale() {
    let minimalSize = Math.min(window.innerHeight, window.innerWidth);

    if(SILHOUETTE_SIZE > minimalSize) {
        return UI_SCALE_MULTIPLAYER *  minimalSize / SILHOUETTE_SIZE;
    }
    else {
        return Math.min((minimalSize / SILHOUETTE_SIZE), MAX_UI_SCALE);
    }
}