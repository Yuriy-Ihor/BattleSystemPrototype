
class AttackSilhouette extends Silhouette {

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

            let width = this.coordinate_map[body_part_name]["width"] * this.scale;
            let height = this.coordinate_map[body_part_name]["height"] * this.scale;
            
            //_context.fillStyle = "#0000";
            _context.drawImage(
                this.body_parts_sprites[`${body_part_name}-${body_part_image_type}`],
                this.x + this.coordinate_map[body_part_name]["left"] * this.scale,
                this.y + this.coordinate_map[body_part_name]["top"] * this.scale,
                width, height
            )
        }

        // _context.fillStyle = "#555555";
        // _context.fillText("Text", 10, 10);
    }
}
