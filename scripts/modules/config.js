
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
