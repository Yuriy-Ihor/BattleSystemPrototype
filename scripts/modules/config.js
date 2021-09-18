
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

const is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const current_ui_scale = 1

const silhouette_padding = current_ui_scale * 60

const screen_width = current_ui_scale * 400
const screen_height = current_ui_scale * 400
