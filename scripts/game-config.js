
/*--- Game constants ---*/

const STUPID_BOT = false;
const ATTACK_BODY_PART_ID = 'head';
const DEFEND_BODY_PART_ID = 'torso';

/*--- UI constants ---*/

const SILHOUETTE_SIZE = 256; 
const SUMMARY_SILHOUETTE_SIZE = 1000; 

const UI_SCALE_MULTIPLAYER = 0.45;
const MAX_UI_SCALE = 1.5;

const MINIMAL_SCREEN_SIZE = Math.min(window.innerHeight, window.innerWidth);

var UI_SCALE = getUiScale();

function getUiScale() {
    console.log(SILHOUETTE_SIZE);
    console.log(MINIMAL_SCREEN_SIZE);

    if(MINIMAL_SCREEN_SIZE / SILHOUETTE_SIZE > MAX_UI_SCALE) {
        console.log('ui scale is less');
    } 
    else {
        console.log('ui scale is bigger');
    }
    
    return MAX_UI_SCALE;
}
