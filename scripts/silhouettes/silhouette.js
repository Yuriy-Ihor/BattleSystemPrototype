
const bodyPart = {
    id: '',
    baseLife: 100,
    currentLife: 100,
    baseShotChance: 50,
    shotChance: 50
}

const silhouetteImagePath = 'silhouette-parts';

class Silhouette {
    imagesPath;
    constructor(_x, _y, _coordinate_map) {
        this.relevance = _coordinate_map["relevance"];
        this.size = _coordinate_map['unscaled-size'];
        this.coordinate_map = {};
        
        for (var body_part_name in _coordinate_map) {
            if (body_part_name != "unscaled-size" && body_part_name != "relevance") {
                this.coordinate_map[body_part_name] = _coordinate_map[body_part_name];
            }
        }

        this.body_parts_sprites = {}
        this.body_parts = [];
        
        for (var body_part_name in this.coordinate_map) {
            this.body_parts_sprites[`${body_part_name}-hollow`] = document.getElementById(`${body_part_name}-hollow-${this.relevance}`);
            this.body_parts_sprites[`${body_part_name}-filled`] = document.getElementById(`${body_part_name}-filled-${this.relevance}`);
            
            let newBodyPart = Object.create(bodyPart);
            newBodyPart.id = body_part_name;
            
            this.body_parts[body_part_name] = newBodyPart;
        }

        this.hovering = null;
    }

    getImagesPath(type, id) {
        return `${silhouetteImagePath}/${this.relevance}/${type}/${id}-${type}.png`;
    }

    render(path) {
        for (var body_part_name in this.coordinate_map) {
            let body_part_image_type;
            
            if(body_part_name == this.hovering || body_part_name == this.selected_body_part) {
                body_part_image_type = 'filled';
            }
            else {
                body_part_image_type = 'hollow';
            }

            let width = this.coordinate_map[body_part_name]["width"];
            let height = this.coordinate_map[body_part_name]["height"];

            let positionX = this.coordinate_map[body_part_name]["left"] - 128 + 500;
            let positionY = this.coordinate_map[body_part_name]["top"] - 128 + 200;

            let newImage = document.createElementNS("http://www.w3.org/2000/svg", 'image');
            console.log(this.getImagesPath(body_part_image_type, body_part_name));
            newImage.setAttribute('href', this.getImagesPath(body_part_image_type, body_part_name));
            newImage.setAttribute('x', positionX);
            newImage.setAttribute('y', positionY);
            newImage.setAttribute('width', width);
            newImage.setAttribute('height', height);

            //newImage.addEventListener('mouseover', );
            
            path.appendChild(newImage);
        }
    }
}
