const playerTargetIconReference = document.getElementById("player-target-icon");
const playerShieldIconReference = document.getElementById("player-shield-icon");
const enemyTargetIconReference = document.getElementById("enemy-target-icon");
const enemyShieldIconReference = document.getElementById("enemy-shield-icon");

const resetTransform = 1;
const targetTransform = 0.4;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function hide_icon(iconReference) {
    iconReference.setAttribute("fill-opacity", 0);
}

async function animate_summary_icon(iconReference, targetX, targetY, framerate, duration) {
    const frameDuration = 1 / framerate;
    const frameCount = duration / frameDuration;

    iconReference.setAttribute('transform', `translate(${targetX}, ${targetY})`);
    var targetOpacity = iconReference.getAttribute("id").includes("shield") ? 0.9 : 1;

    var nextFrame = function(frameIndex) {
        var opacity = String(frameIndex / frameCount).slice(0, 4) * targetOpacity;
        console.log(targetOpacity);
        iconReference.setAttribute("fill-opacity", opacity);
    }

    for (var i = 0; i < frameCount; i++) {
        nextFrame(i);
        await sleep(frameDuration * 1000);
    }

    iconReference.setAttribute("fill-opacity", targetOpacity);

}

async function animate_all_icons(playerAttackedPartId, playerDefendedPartId, enemyAttackedPartId, enemyDefendedPartId, delay=1, duration=0.1, framerate=60) {
    hide_icon(playerTargetIconReference);
    hide_icon(playerShieldIconReference);
    hide_icon(enemyTargetIconReference);
    hide_icon(enemyShieldIconReference);
    
    setTimeout(
        () => {
            animate_summary_icon(
                playerShieldIconReference,
                silhouette_icon_coordinate_map_main[playerDefendedPartId]["shield"]["left"],
                silhouette_icon_coordinate_map_main[playerDefendedPartId]["shield"]["top"],
                framerate,
                duration
            );
            animate_summary_icon(
                enemyShieldIconReference,
                silhouette_icon_coordinate_map_side[enemyDefendedPartId]["shield"]["left"],
                silhouette_icon_coordinate_map_side[enemyDefendedPartId]["shield"]["top"],
                framerate,
                duration
            );
        }, (delay + duration) * 1000
    );

    setTimeout(
        () => {
            animate_summary_icon(
                playerTargetIconReference,
                silhouette_icon_coordinate_map_main[enemyAttackedPartId]["target"]["left"],
                silhouette_icon_coordinate_map_main[enemyAttackedPartId]["target"]["top"],
                framerate,
                duration
            );
            animate_summary_icon(
                enemyTargetIconReference,
                silhouette_icon_coordinate_map_side[playerAttackedPartId]["target"]["left"],
                silhouette_icon_coordinate_map_side[playerAttackedPartId]["target"]["top"],
                framerate,
                duration
            );
        }, (delay * 2 + duration) * 1000
    );
    
}

// animate_summary_icon(
//     enemyShieldIconReference, 
//     silhouette_icon_coordinate_map_side[enemyDefendedPart.getAttribute("id")]["shield"]["left"], 
//     silhouette_icon_coordinate_map_side[enemyDefendedPart.getAttribute("id")]["shield"]["top"], 
//     100, 
//     1
// );
// animate_summary_icon(
//     enemyTargetIconReference, 
//     silhouette_icon_coordinate_map_side[playerAttackedPart.getAttribute("id")]["target"]["left"], 
//     silhouette_icon_coordinate_map_side[playerAttackedPart.getAttribute("id")]["target"]["top"], 
//     100, 
//     1
// );