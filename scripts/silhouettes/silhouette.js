
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
    constructor(_x, _y, _coordinate_map, path) {
        this.relevance = _coordinate_map["relevance"];
        this.size = _coordinate_map['unscaled-size'];
        this.coordinate_map = {};

        for (var body_part_name in _coordinate_map) {
            if (body_part_name != "unscaled-size" && body_part_name != "relevance") {
                this.coordinate_map[body_part_name] = _coordinate_map[body_part_name];
            }
        }

        this.images = {};

        for (var body_part_name in this.coordinate_map) {
            let body_part_image_type = 'hollow';

            let width = this.coordinate_map[body_part_name]["width"];
            let height = this.coordinate_map[body_part_name]["height"];

            let positionX = this.coordinate_map[body_part_name]["left"] + (screenWidth - this.size) / 2;
            let positionY = this.coordinate_map[body_part_name]["top"] + (svgScreenHeight - this.size) / 2;

            let newImage = document.createElementNS("http://www.w3.org/2000/svg", 'image');

            newImage.setAttribute('href', this.getImagesPath(body_part_image_type, body_part_name));
            newImage.setAttribute('class', 'silhouette-part');
            newImage.setAttribute('id', body_part_name);
            newImage.setAttribute('x', positionX);
            newImage.setAttribute('y', positionY);
            newImage.setAttribute('width', width);
            newImage.setAttribute('height', height);

            newImage.addEventListener('mouseover', () => {
                this.hovering = newImage;
                newImage.setAttribute('href', this.getImagesPath('filled', newImage.id));
            });

            newImage.addEventListener('mouseout', () => {
                this.hovering = null;
                newImage.setAttribute('href', this.getImagesPath('hollow', newImage.id));
            });
            
            path.appendChild(newImage);

            this.images[body_part_name] = newImage;
        }

        this.hovering = null;
    }

    getImagesPath(type, id) {
        return `${silhouetteImagePath}/${this.relevance}/${type}/${id}-${type}.png`;
    }

    render(path) {
        // todo : update position on resize
    }
}
