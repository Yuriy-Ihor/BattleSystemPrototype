const turnSummaryDisplaySvg = document.getElementById('battle-screen-summary-display');

class TurnSummaryDisplay {
    constructor(display) {
        this.playerSilhouette = new Silhouette(silhouette_coordinate_map_main, display);
        this.enemySilhouette = new Silhouette(silhouette_coordinate_map_side, display);

        this.display = display;
    }
}
