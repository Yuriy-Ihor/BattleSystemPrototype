
const bodyPart = {
    id: '',
    baseLife: 100,
    currentLife: 100,
    baseShotChance: 50,
    shotChance: 50
}

const silhouetteImagePath = 'silhouette-parts';

class Silhouette {
    constructor(_x, _y, _coordinate_map, display) {
        this.relevance = _coordinate_map["relevance"];
        this.size = _coordinate_map['unscaled-size'];
        this.coordinate_map = {};

        for (var body_part_name in _coordinate_map) {
            if (body_part_name != "unscaled-size" && body_part_name != "relevance") {
                this.coordinate_map[body_part_name] = _coordinate_map[body_part_name];
            }
        }

        for (var body_part_name in this.coordinate_map) {
            let positionX = this.coordinate_map[body_part_name]["left"] + (screenWidth - this.size) / 2;
            let positionY = this.coordinate_map[body_part_name]["top"] + (svgScreenHeight - this.size) / 2;

            let newImage = document.createElementNS("http://www.w3.org/2000/svg", 'image');

            newImage.setAttribute('href', this.getImagesPath('hollow', body_part_name));
            newImage.setAttribute('class', 'silhouette-part');
            newImage.setAttribute('id', body_part_name);
            newImage.setAttribute('x', positionX);
            newImage.setAttribute('y', positionY);
            newImage.setAttribute('width', this.coordinate_map[body_part_name]["width"]);
            newImage.setAttribute('height', this.coordinate_map[body_part_name]["height"]);

            newImage.addEventListener('mouseover', () => {
                this.changeImageType(newImage, 'filled');
            });

            newImage.addEventListener('mouseout', () => {
                if(this.selected != newImage) {
                    this.changeImageType(newImage, 'hollow');
                }
            });

            newImage.addEventListener('mousedown', () => {
                if(this.selected != null) {
                    this.changeImageType(this.selected, 'hollow')
                }
                this.selected = newImage;
                this.changeImageType(newImage, 'filled');
            });
            
            display.appendChild(newImage);
        }

        this.selected = null;
        this.display = display;
    }

    getImagesPath(type, id) {
        return `${silhouetteImagePath}/${this.relevance}/${type}/${id}-${type}.png`;
    }

    changeImageType(image, newType) {
        image.setAttribute('href', this.getImagesPath(newType, image.id));
    }

    render() {
        // todo : update position on resize
    }
}
