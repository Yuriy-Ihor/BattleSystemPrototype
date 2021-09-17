const canvas = document.getElementById("canvas")
const width = $(window).width()
const height = $(window).height()
canvas.width = window.innerWidth
canvas.height = window.innerHeight / 2
const context = canvas.getContext("2d")

const is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
const current_ui_scale = is_mobile ? 2 : 1

const background_color = "#000000"
const text_color = "#ffffff"

const health_fill_color = "#00d62e"
const health_stroke_color = "#00ab25"
const health_stroke_width = current_ui_scale * 3

const mana_fill_color = "#0003c7"
const mana_stroke_color = "#0003ab"
const mana_stroke_width = current_ui_scale * 3

const character_avatar_size = current_ui_scale * 175
const character_avatar_padding = current_ui_scale * 12

const approximate_size_width_ratio = 0.6

const default_text_size = current_ui_scale * 24
const character_name_size = current_ui_scale * 36

const health_bar_width = current_ui_scale * 250
const health_bar_height = current_ui_scale * 20
const mana_bar_width = current_ui_scale * 250
const mana_bar_height = current_ui_scale * 20

const silhouette_size = current_ui_scale * 300
const silhouette_padding = current_ui_scale * 60

const cursor_width = 5
const cursor_height = default_text_size
const cursor_color = "#ffffff"
const cursor_frequency = 1

var override_cursor = false
var repeated_override_cursor = false

const character_name_style = `${character_name_size}px courier new`
const default_text_style = `${default_text_size}px courier new`

const screen_padding = current_ui_scale * 12
const screen_terminal_padding = current_ui_scale * 24
const screen_border_width = current_ui_scale * 5
const screen_border_color = "#000000"
const screen_width = current_ui_scale * 400
const screen_height = current_ui_scale * 400
const terminal_tab_character_value = "  "
const terminal_button_margin = current_ui_scale * 24








const character_1_avatar = document.getElementById("character-1-avatar")
const character_2_avatar = document.getElementById("character-2-avatar")

// const character_2_avatar = new Image(character_avatar_size, character_avatar_size)
// character_2_avatar.src =
//     "https://raw.githubusercontent.com/Oleg-Smal-git/Combat-UI-Draft/master/css/images/character-avatars/character-2-avatar.jpg"

const character_1_name = "Oleg"
const character_2_name = "Nick"

const character_1_max_health = 200
const character_1_max_mana = 150

const character_2_max_health = 250
const character_2_max_mana = 100