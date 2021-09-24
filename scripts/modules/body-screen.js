
class BodyScreen {
    constructor(_x, _y, _width, _height, _border_width, canvas) {
        this.x = _x
        this.y = _y
        this.width = _width
        this.height = _height
        this.border_width = _border_width
        this._canvas = canvas;
    }

    isBodyPartSelected() {
        return this.silhouette.selected_body_part != null;
    }

    getSelectedBodyPart() {
        return this.silhouette.selected_body_part;
    }

    disselectBodyPart() {
        this.silhouette.selected_body_part = null;
    }

    render(_context) {
        _context.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        )
        _context.lineWidth = this.border_width
        _context.strokeRect(
            this.x, this.y, this.width, this.height 
        )
        
        this.silhouette.render(_context);
    }
}


class AttackBodyScreen extends BodyScreen {
    init() {
        let silhouette_coordinate_map;

        silhouette_coordinate_map = silhouette_coordinate_map_side
        this.silhouette = new AttackSilhouette(
            this.x + silhouette_padding,
            this.y,
            Math.min(
                this.width - 2 * silhouette_padding,
                this.height - 2 * silhouette_padding
                ),
            silhouette_coordinate_map,
            this._canvas
        )
    }
}

class DefenseBodyScreen extends BodyScreen {
    init() {
        let silhouette_coordinate_map;

        silhouette_coordinate_map = silhouette_coordinate_map_main
        this.silhouette = new DefenseSilhouette(
            this.x + silhouette_padding,
            this.y,
            Math.min(
                this.width - 2 * silhouette_padding,
                this.height - 2 * silhouette_padding
            ),
            silhouette_coordinate_map,
            this._canvas
        )
    }
}

class SummaryScreen {
    constructor(_x, _y, _width, _height, _border_width, canvas) {
        this.x = _x
        this.y = _y
        this.width = _width
        this.height = _height
        this.border_width = _border_width
        this._canvas = canvas;

        let silhouetteWidth = Math.min(
            this.width - 2 * silhouette_padding,
            this.height - 2 * silhouette_padding
        );

        this.playerSilhouette = new SummarySilhouette(
            this.x + silhouetteWidth / 2,
            this.y,
            silhouetteWidth,
            silhouette_coordinate_map_side,
            this._canvas
        )

        this.enemySilhouette = new SummarySilhouette(
            this.x - silhouetteWidth / 2,
            this.y,
            silhouetteWidth,
            silhouette_coordinate_map_main,
            this._canvas
        )
    }

    render(_context) {
        _context.clearRect(0, 0, _context.canvas.width, _context.canvas.height);

        _context.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        )
        _context.lineWidth = this.border_width
        _context.strokeRect(
            this.x, this.y, this.width, this.height 
        )
        
        this.playerSilhouette.render(_context);
        this.enemySilhouette.render(_context);
    }
}
