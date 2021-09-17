const CombatScreenType = {
    ActionSelection: 0,
    AttackTargetSelection: 1,
    DefenseTargetSelection: 2,
}

const SwitchButtonName = {
    Left: "$left",
    Right: "$right"
}

class CombatScreen {
    constructor(_x, _y, _width, _height, _type, _border_width, _border_color, _is_stacked) {
        this.x = _x
        this.y = _y
        this.width = _width
        this.height = _height
        this.type = _type
        this.border_width = _border_width
        this.border_color = _border_color
        this.is_stacked = _is_stacked
        this.content = {}
        switch (_type) {
            case CombatScreenType.ActionSelection:
                this.content["cascading-text"] = []
                break
            case CombatScreenType.AttackTargetSelection:
                this.content["attack-silhouette"] = new Silhouette(
                    _x + silhouette_padding,
                    _y + silhouette_padding,
                    Math.min(
                        _width - 2 * silhouette_padding,
                        _height - 2 * silhouette_padding
                    ),
                    silhouette_coordinate_map_main
                )
                break
            case CombatScreenType.DefenseTargetSelection:
                this.content["defence-silhouette"] = new Silhouette(
                    _x + silhouette_padding,
                    _y + silhouette_padding,
                    Math.min(
                        _width - 2 * silhouette_padding,
                        _height - 2 * silhouette_padding
                    ),
                    silhouette_coordinate_map_side
                )
                break
        }
    }

    render_screen_switch_button(_context, _button_name) {
        _context.fillStyle = text_color
        _context.font = `bold ${default_text_style}`
        switch (_button_name) {
            case SwitchButtonName.Left:
                _context.fillText(
                    "<_",
                    this.x + screen_terminal_padding,
                    this.y + this.height - 1.5 * screen_terminal_padding
                )
                break
            case SwitchButtonName.Right:
                _context.fillText(
                    "_>",
                    this.x + this.width - screen_terminal_padding - "<_".length * default_text_size * approximate_size_width_ratio,
                    this.y + this.height - 1.5 * screen_terminal_padding
                )
                break
        }
    }

    render(_context) {
        _context.fillStyle = background_color
        _context.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        )
        _context.strokeStyle = this.border_color
        _context.lineWidth = this.border_width
        _context.strokeRect(
            this.x, this.y, this.width, this.height 
        )
        for (var element_name in this.content) {
            switch (element_name) {
                case "attack-silhouette":
                    this.content[element_name].render(_context)
                    if (this.is_stacked) {
                        this.render_screen_switch_button(_context, SwitchButtonName.Left)
                        this.render_screen_switch_button(_context, SwitchButtonName.Right)
                    }
                    break
                case "defence-silhouette":
                    this.content[element_name].render(_context)
                    if (this.is_stacked) {
                        this.render_screen_switch_button(_context, SwitchButtonName.Left)
                    }
                    break
            }
        }
    }
}

class CombatScreenController {
    constructor(_x, _y, _width, _height, _layered) {
        this.x = _x
        this.y = _y
        this.width = _width
        this.height = _height
        this.layered = _layered

        this.screens = [
            new CombatScreen(
                _x, _y, _width, _height,
                CombatScreenType.AttackTargetSelection,
                screen_border_width, screen_border_color,
                true
            ),
            new CombatScreen(
                _x, _y, _width, _height,
                CombatScreenType.DefenseTargetSelection,
                screen_border_width, screen_border_color,
                true
            )
        ]
        this.active = CombatScreenType.AttackTargetSelection

        if (_layered) {
            document.addEventListener(
                "mousedown",
                (event) => {
                    this.check_switch_button_click(event.offsetX, event.offsetY)
                }
            )
        }
    }

    check_switch_button_click(_x, _y) {
        if (
            this.x + screen_terminal_padding - terminal_button_margin <= _x &&
            _x <= this.x + screen_terminal_padding + "<_".length * default_text_size * approximate_size_width_ratio + terminal_button_margin &&

            this.y + this.height - 1.5 * screen_terminal_padding - default_text_size - terminal_button_margin <= _y &&
            _y <= this.y + this.height - 1.5 * screen_terminal_padding + terminal_button_margin
        ) {
            if (this.active != 0) {
                this.active -= 1
            }
        }
        if (
            this.x + this.width - screen_terminal_padding - "<_".length * default_text_size * approximate_size_width_ratio - terminal_button_margin <= _x &&
            _x <= this.x + this.width - screen_terminal_padding + terminal_button_margin &&

            this.y + this.height - 1.5 * screen_terminal_padding - terminal_button_margin <= _y &&
            _y <= this.y + this.height - 1.5 * screen_terminal_padding + default_text_size + terminal_button_margin
        ) {
            if (this.active != 2) {
                this.active += 1
            }
        }
    }

    render(_context) {
        if (this.layered) {
            this.screens[this.active].render(_context)
        } else {
            for (var screen_name in this.screens) {
                this.screens[screen_name].render(_context)
            }
        }
    }
}