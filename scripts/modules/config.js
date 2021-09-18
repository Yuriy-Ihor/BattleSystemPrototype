
const width = $(window).width()
const height = $(window).height()

const attackCanvas = document.getElementById('body-attack-canvas');
attackCanvas.width = window.innerWidth;
attackCanvas.height = window.innerHeight / 2;
const attackCanvasContext = attackCanvas.getContext("2d");

const defenseCanvas = document.getElementById("body-defense-canvas");
defenseCanvas.width = window.innerWidth;
defenseCanvas.height = window.innerHeight / 2;
const defenseCanvasContext = defenseCanvas.getContext("2d");

const silhouette_padding = 60

const screen_width = 400
const screen_height = 400
const screen_border_width = 5
const screen_border_color = "#000000"

class Delegate {
    listeners = [];

    constructor() {
        this.listeners = [];
    }

    addListener = function(newListener) {
        this.listeners.push(newListener);
    }

    removeListener = function(listener) {
        if(this.listeners.contains(listener)) {
            this.listeners.remove(listener);
        }
    }

    invoke = function(argument) {
        if(this.listeners.length == 0) {
            return;
        }

        for(let i = 0; i < this.listeners.length; i++) {
            this.listeners[i](argument);
        }
    }
}