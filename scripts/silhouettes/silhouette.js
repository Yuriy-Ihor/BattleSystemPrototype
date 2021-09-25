
const silhouetteImagePath = 'silhouette-parts';

class BodyPartUI {
    constructor(targetBodyPart) {
        this.targetBodyPart = targetBodyPart;
    }

    getImage() {
        return this.targetBodyPart.getElementsByClassName('silhouette-part')[0];
    }
}

class Silhouette{
    constructor(_coordinate_map, display, targetPlayer) {
        this.relevance = _coordinate_map["relevance"];
        this.size = _coordinate_map['unscaled-size'];
        this.coordinate_map = {};
        this.bodyParts = [];

        for (var body_part_name in _coordinate_map) {
            if (body_part_name != "unscaled-size" && body_part_name != "relevance") {
                this.coordinate_map[body_part_name] = _coordinate_map[body_part_name];
            }
        }

        let group = document.createElementNS("http://www.w3.org/2000/svg", 'g');
        group.setAttribute('class', 'svg-silhouette');

        for (var body_part_name in this.coordinate_map) {
            let bodyPartGroup = document.createElementNS("http://www.w3.org/2000/svg", 'g');

            let path = this.getImagesPath('hollow', body_part_name);

            let width = this.coordinate_map[body_part_name]["width"];
            let height = this.coordinate_map[body_part_name]["height"];

            let positionX = this.coordinate_map[body_part_name]["left"];
            let positionY = this.coordinate_map[body_part_name]["top"];

            let newImage = this.createImage(path, body_part_name, width, height, positionX, positionY, 'silhouette-part');
            bodyPartGroup.appendChild(newImage);

            let bodyPart = new BodyPartUI(bodyPartGroup);
            
            group.appendChild(bodyPartGroup);
            this.bodyParts.push(bodyPart);
        }

        display.appendChild(group);
        
        display.style.width = this.size;
        display.style.height = this.size;

        this.display = display;
        this.targetPlayer = targetPlayer;
    }

    createImage(path, id, width, height, x = 0, y = 0, className = '') {
        let newImage = document.createElementNS("http://www.w3.org/2000/svg", 'image');

        newImage.setAttribute('href', path);
        newImage.setAttribute('class', className);
        newImage.setAttribute('id', id);
        newImage.setAttribute('x', x);
        newImage.setAttribute('y', y);
        newImage.setAttribute('width', width);
        newImage.setAttribute('height', height);

        return newImage;
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
    constructor(_coordinate_map, display, targetPlayer) {
        super(_coordinate_map, display, targetPlayer);

        for(let i = 0; i < this.bodyParts.length; i++){
            let image = this.bodyParts[i].getImage();
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

class SummarySilhouette extends Silhouette {
    constructor(_coordinate_map, display, targetPlayer) {
        super(_coordinate_map, display, targetPlayer);
        
        this.attackedIcon = this.createImage('images/sight.png', 'attacked-icon', 50, 50, 0, 0, 'silhouette-icon');
        this.defendedIcon = this.createImage('images/shield.png', 'defended-icon', 50, 50, 0, 0, 'silhouette-icon');

        display.appendChild(this.attackedIcon);
        display.appendChild(this.defendedIcon);
    }

    playDamageAnimation(bodyPart) {
        bodyPart.classList.add('damaged');

        this.display.getElementById(bodyPart.id).classList.add('damaged');
    }

    showAttackedIcon(bodyPart) {
        this.alignIconOnBodyPart(bodyPart, this.attackedIcon);
    }

    showDefendedIcon(bodyPart) {
        this.alignIconOnBodyPart(bodyPart, this.defendedIcon);
    }

    alignIconOnBodyPart(bodyPart, icon) {
        let x = parseFloat(bodyPart.getAttribute('x')) + parseFloat(bodyPart.getAttribute('width')) * 0.5 - parseFloat(icon.getAttribute('width')) * 0.5;
        let y = parseFloat(bodyPart.getAttribute('y')) + parseFloat(bodyPart.getAttribute('height')) * 0.5 - parseFloat(icon.getAttribute('height')) * 0.5;

        icon.setAttribute('x', x);
        icon.setAttribute('y', y);
    }
}