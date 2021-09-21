
class Silhouette {
    constructor(_x, _y, _size, _coordinate_map, canvas) {
        this.x = _x
        this.y = _y
        this.scale = _size / _coordinate_map["unscaled-size"]
        this.relevance = _coordinate_map["relevance"]
        this.coordinate_map = {}
        for (var body_part_name in _coordinate_map) {
            if (body_part_name != "unscaled-size" && body_part_name != "relevance") {
                this.coordinate_map[body_part_name] = _coordinate_map[body_part_name]
            }
        }

        this.body_parts_sprites = {}
        for (var body_part_name in this.coordinate_map) {
            this.body_parts_sprites[`${body_part_name}-hollow`] = document.getElementById(`${body_part_name}-hollow-${this.relevance}`)
            this.body_parts_sprites[`${body_part_name}-filled`] = document.getElementById(`${body_part_name}-filled-${this.relevance}`)        
        }
        this.hovering = null

        canvas.addEventListener(
            "mousemove",
            (event) => {
                if(this._context != null) {
                    if(isElementParentVisible(this._context.canvas)) {
                        this.check_mouseover(event.offsetX, event.offsetY)
                    }
                }
            }
        )
        canvas.addEventListener(
            "mousedown",
            (event) => {
                if(this.hovering != null) {
                    this.selected_body_part = this.hovering;
                }
            }
        )
    }

    check_mouseover(_x, _y) {
        for (var body_part_name in this.coordinate_map) {
            
            if(body_part_name == this.selected_body_part) {
                continue;
            }

            let body_part_X = this.get_silhouette_coordinate(body_part_name, this.x, 'left');
            let body_part_Y = this.get_silhouette_coordinate(body_part_name, this.y, 'top');

            if (
                body_part_X < _x &&
                _x < body_part_X + this.get_silhouette_coordinate(body_part_name, 0, 'width') &&

                body_part_Y < _y &&
                _y < body_part_Y + this.get_silhouette_coordinate(body_part_name, 0, 'height')
            ) {
                this.hovering = body_part_name
                break
            } else {
                this.hovering = null
            }
        }
    }

    get_silhouette_coordinate(body_part_name, coordinate = 0, id) {
        return coordinate + this.coordinate_map[body_part_name][id] * this.scale;
    }

    render(_context) {
        this._context = _context;
        for (var body_part_name in this.coordinate_map) {
            let body_part_image_type;
            
            if(body_part_name == this.hovering || body_part_name == this.selected_body_part) {
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
            )
        }
    }
}
