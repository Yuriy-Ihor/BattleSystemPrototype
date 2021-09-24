class AttackedSilhouette extends Silhouette {
    constructor(_x, _y, _size, _coordinate_map, _canvas) {
        super(_x, _y, _size, _coordinate_map, _canvas)
        this.x = _x;
        this.y = _y;
        this.scale = _size / _coordinate_map["unscaled-size"];
        this.relevance = _coordinate_map["relevance"];
        this.coordinate_map = {};
        for (var body_part_name in _coordinate_map) {
            if (body_part_name != "unscaled-size" && body_part_name != "relevance") {
                this.coordinate_map[body_part_name] = _coordinate_map[body_part_name];
            }
        }

        this.body_parts_sprites = {}
        
        for (var body_part_name in this.coordinate_map) {
            this.body_parts_sprites[`${body_part_name}-hollow`] = document.getElementById(`${body_part_name}-hollow-${this.relevance}`);
            this.body_parts_sprites[`${body_part_name}-filled`] = document.getElementById(`${body_part_name}-filled-${this.relevance}`);
        }

        this.shotParts = [];
        this.defendedPart = '';
    }

    render(_context) {
        this._context = _context;
        
        for (var body_part_name in this.coordinate_map) {
            let body_part_image_type;
            
            if(this.shotParts.includes(body_part_name)) {
                body_part_image_type = 'filled';
            }
            else {
                body_part_image_type = 'hollow';
            }

            _context.drawImage(
                this.body_parts_sprites[`${body_part_name}-${body_part_image_type}`],
                this.x + this.coordinate_map[body_part_name]["left"] * this.scale,
                this.y + this.coordinate_map[body_part_name]["top"] * this.scale,
                this.coordinate_map[body_part_name]["width"] * this.scale,
                this.coordinate_map[body_part_name]["height"] * this.scale
            );
        }
    }
}