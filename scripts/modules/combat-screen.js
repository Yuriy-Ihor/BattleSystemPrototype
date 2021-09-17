const BodyScreenType = {
    ActionSelection: 0,
    AttackTargetSelection: 1,
    DefenseTargetSelection: 2,
}

class BodyScreen {
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
            case BodyScreenType.ActionSelection:
                this.content["cascading-text"] = []
                break
            case BodyScreenType.AttackTargetSelection:
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
            case BodyScreenType.DefenseTargetSelection:
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
                    break
                case "defence-silhouette":
                    this.content[element_name].render(_context)
                    break
            }
        }
    }
}

class BodyScreenController {
    constructor(_x, _y, _width, _height, _layered) {
        this.x = _x
        this.y = _y
        this.width = _width
        this.height = _height
        this.layered = _layered

        this.screens = [
            new BodyScreen(
                _x, _y, _width, _height,
                BodyScreenType.AttackTargetSelection,
                screen_border_width, screen_border_color,
                true
            ),
            new BodyScreen(
                _x, _y, _width, _height,
                BodyScreenType.DefenseTargetSelection,
                screen_border_width, screen_border_color,
                true
            )
        ]
        this.active = BodyScreenType.AttackTargetSelection
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