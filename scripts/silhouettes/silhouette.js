
const bodyPart = {
    id: '',
    baseLife: 100,
    currentLife: 100,
    baseShotChance: 50,
    shotChance: 50
}

const silhouetteImagePath = 'silhouette-parts';

class Silhouette{
    constructor(_coordinate_map, display) {
        this.relevance = _coordinate_map["relevance"];
        this.size = _coordinate_map['unscaled-size'];
        this.coordinate_map = {};
        this.images = [];

        for (var body_part_name in _coordinate_map) {
            if (body_part_name != "unscaled-size" && body_part_name != "relevance") {
                this.coordinate_map[body_part_name] = _coordinate_map[body_part_name];
            }
        }

        let group = document.createElementNS("http://www.w3.org/2000/svg", 'g');
        group.setAttribute('class', 'svg-silhouette');

        for (var body_part_name in this.coordinate_map) {
            let positionX = this.coordinate_map[body_part_name]["left"];
            let positionY = this.coordinate_map[body_part_name]["top"];

            let newImage = document.createElementNS("http://www.w3.org/2000/svg", 'image');

            newImage.setAttribute('href', this.getImagesPath('hollow', body_part_name));
            newImage.setAttribute('class', 'silhouette-part');
            newImage.setAttribute('id', body_part_name);
            newImage.setAttribute('x', positionX);
            newImage.setAttribute('y', positionY);
            newImage.setAttribute('width', this.coordinate_map[body_part_name]["width"]);
            newImage.setAttribute('height', this.coordinate_map[body_part_name]["height"]);
            
            group.appendChild(newImage);
            this.images.push(newImage);
        }

        display.appendChild(group);
        
        display.style.width = this.size;
        display.style.height = this.size;

        this.display = display;
    }

    getImagesPath(type, id) {
        return `${silhouetteImagePath}/${this.relevance}/${type}/${id}-${type}.png`;
    }

    hollowImage(image) { 
        image.setAttribute('href', this.getImagesPath('hollow', image.id));
    }

    fillImage(image) {
        image.setAttribute('href', this.getImagesPath('filled', image.id));
    }

    render() {
        // todo : update position on resize
    }
}

class SelectableSilhouette extends Silhouette {
    constructor(_coordinate_map, display) {
        super(_coordinate_map, display);

        for(let i = 0; i < this.images.length; i++){
            let image = this.images[i];
            image.addEventListener('mouseover', () => {
                this.fillImage(image);
            });

            image.addEventListener('mouseout', () => {
                if(this.selected != image) {
                    this.hollowImage(image);
                }
            });

            image.addEventListener('mousedown', () => {
                if(this.selected != null) {
                    this.hollowImage(this.selected);
                }
                this.selected = image;
                this.fillImage(this.selected);
            });
        }

        this.selected = null;
    }

    isBodyPartSelected() {
        return this.selected != null;
    }

    disselectBodyPart() {
        this.hollowImage(this.selected);
        this.selected = null;
    }
}
