
const ATTACK_BODY_PART_ID = 'head';
const DEFEND_BODY_PART_ID = 'torso';

class EnemyBot {
    constructor(botInfo) {
        this.botInfo = botInfo;
    }

    getBodyPartToAttack(bodyPartsUI) {
        console.log(this.botInfo);

        if(STUPID_BOT) {
            return bodyPartsUI[ATTACK_BODY_PART_ID];
        }
        else {
            return getRandomBodyPart(bodyPartsUI);
        }
    }

    getBodyPartToDefend(bodyPartsUI) {
        if(STUPID_BOT) {
            return bodyPartsUI[DEFEND_BODY_PART_ID];
        }
        else {
            return getRandomBodyPart(bodyPartsUI);
        }
    }
    
    getRandomBodyPart(bodyParts) {
        var keys = Object.keys(bodyParts);
        return bodyParts[keys[ keys.length * Math.random() << 0]];
    }
}

