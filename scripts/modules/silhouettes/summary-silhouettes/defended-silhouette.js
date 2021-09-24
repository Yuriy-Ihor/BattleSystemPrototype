class DefendedSilhouette extends Silhouette {
    defendedPart;

    render(_context) {
        this._context = _context;
        
        for (var body_part_name in this.coordinate_map) {
            let body_part_image_type = 'hollow';

            if(body_part_name == this.defendedPart) {
                body_part_image_type = 'filled';
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