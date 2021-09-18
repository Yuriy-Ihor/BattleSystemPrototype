const BodyScreenType = {
    AttackTargetSelection: 0,
    DefenseTargetSelection: 1
}

class BodyScreen {
    constructor(_x, _y, _width, _height, _type, _border_width, _border_color) {
        this.x = _x
        this.y = _y
        this.width = _width
        this.height = _height
        this.type = _type
        this.border_width = _border_width
        this.border_color = _border_color

        let silhouette_coordinate_map;

        switch (_type) {
            case BodyScreenType.AttackTargetSelection:
                silhouette_coordinate_map = silhouette_coordinate_map_main
                break
            case BodyScreenType.DefenseTargetSelection:
                silhouette_coordinate_map = silhouette_coordinate_map_side
                break
        }

        this.silhouette = new Silhouette(
            _x + silhouette_padding,
            _y + silhouette_padding,
            Math.min(
                _width - 2 * silhouette_padding,
                _height - 2 * silhouette_padding
            ),
            silhouette_coordinate_map
        )

        console.log(this.silhouette);
    }

    getSelectedBodyPart() {
        console.log(this.silhouette);

        return this.silhouette.selected_body_part;
    }

    render(_context) {
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
        
        this.silhouette.render(_context);
    }
}
