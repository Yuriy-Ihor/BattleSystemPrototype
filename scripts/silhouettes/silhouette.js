
const silhouetteImagePath = 'silhouette-parts';

const bodyPartUIPaddingY = 5;
const bodyPartUIHealthBarWidth = 26;
const bodyPartUIHealthBarHeight = 15;

class Bar {
    constructor(x, y, baseValue, width, height) {
        this.view = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        
        this.view.setAttribute('x', x);
        this.view.setAttribute('y', y);
        this.view.setAttribute('fill', 'green');
        this.view.setAttribute('height', height);
        this.setWidth(width);

        this.currentValue = baseValue;
        this.baseWidth = width;
        this.baseValue = baseValue;
    }

    updateFillAmount(value) {
        this.currentValue = value;

        let fillAmount = value / this.baseValue;
        this.setWidth(this.baseWidth * fillAmount);     
    }

    setWidth(width) {
        this.view.setAttribute('width', width);
    }
}

class BodyPartUI {
    constructor(targetBodyPart, bodyPartInfo) {
        this.bodyPartInfo = bodyPartInfo;
        this.bodyPartImage = targetBodyPart;
        this.uiGroup = document.createElementNS("http://www.w3.org/2000/svg", 'g');
    }

    init() {
        this.uiGroup.setAttribute('class', 'body-part-ui-group');

        this.shootChanceText = this.drawShootChance(this.bodyPartInfo.shootChance);
        this.uiGroup.appendChild(this.shootChanceText);
        this.healthBar = this.createHealthBar(this.bodyPartInfo.baseLife);
        this.uiGroup.appendChild(this.healthBar.view);
    }

    createHealthBar(baseValue) { 
        let x = parseFloat(this.bodyPartImage.getAttribute('width')) * 0.5 + parseFloat(this.bodyPartImage.getAttribute('x')) - bodyPartUIHealthBarWidth * 0.5;
        let y = parseFloat(this.bodyPartImage.getAttribute('height')) * 0.5 + parseFloat(this.bodyPartImage.getAttribute('y'));

        let newBar = new Bar(x, y + bodyPartUIPaddingY, baseValue, bodyPartUIHealthBarWidth, bodyPartUIHealthBarHeight);

        return newBar;
    }

    updateHealthBarLife(value) {
        this.healthBar.updateFillAmount(value);
    }
    
    drawShootChance(chance) {
        let shootChanceText = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        shootChanceText.innerText = chance;
        let fontSize = 15;
        let textNode = document.createTextNode(chance * 100 + "%");
        shootChanceText.setAttribute('font-size', fontSize + 'px');
        shootChanceText.appendChild(textNode);
        
        let x = parseFloat(this.bodyPartImage.getAttribute('width')) * 0.5 + parseFloat(this.bodyPartImage.getAttribute('x'));
        let y = parseFloat(this.bodyPartImage.getAttribute('height')) * 0.5 + parseFloat(this.bodyPartImage.getAttribute('y'));
        
        shootChanceText.setAttribute('x', x - fontSize * 0.5);
        shootChanceText.setAttribute('y', y);
        shootChanceText.setAttribute('fill', 'green');     

        return shootChanceText;
    }

    getImage() {
        return this.bodyPartImage;
    }
}

class Silhouette{
    constructor(_coordinate_map, display, targetPlayer) {
        this.relevance = _coordinate_map["relevance"];
        this.size = _coordinate_map['unscaled-size'];
        this.coordinate_map = {};
        this.bodyPartsUI = {};

        for (var body_part_name in _coordinate_map) {
            if (body_part_name != "unscaled-size" && body_part_name != "relevance") {
                this.coordinate_map[body_part_name] = _coordinate_map[body_part_name];
            }
        }

        let silhouetteGroup = document.createElementNS("http://www.w3.org/2000/svg", 'g');
        silhouetteGroup.setAttribute('class', 'svg-silhouette');

        for (var body_part_name in this.coordinate_map) {
            let imagePath = this.getImagesPath('hollow', body_part_name);

            let width = this.coordinate_map[body_part_name]["width"];
            let height = this.coordinate_map[body_part_name]["height"];

            let positionX = this.coordinate_map[body_part_name]["left"];
            let positionY = this.coordinate_map[body_part_name]["top"];

            let bodyPartImage = createImage(imagePath, body_part_name, width, height, positionX, positionY, 'silhouette-part');

            let bodyPartInfo = targetPlayer.bodyParts[body_part_name];
            let bodyPartUI = new BodyPartUI(bodyPartImage, bodyPartInfo);
            
            silhouetteGroup.appendChild(bodyPartImage);
            this.bodyPartsUI[body_part_name] = bodyPartUI;
        }

        display.appendChild(silhouetteGroup);
        
        for(let bodyPartId in this.bodyPartsUI) {
            this.bodyPartsUI[bodyPartId].init();
            display.appendChild(this.bodyPartsUI[bodyPartId].uiGroup);
        }
        
        display.style.width = this.size;
        display.style.height = this.size;

        this.display = display;
        this.targetPlayer = targetPlayer;
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

    updateBodyPartsLife(player) {
         
    }

    render() {
        // todo : update position on resize
    }
}

class SelectableSilhouette extends Silhouette {
    constructor(_coordinate_map, display, targetPlayer) {
        super(_coordinate_map, display, targetPlayer);

        for(let bodyPartId in this.bodyPartsUI){
            let bodyPartUI = this.bodyPartsUI[bodyPartId];
            let targetBodyPart = bodyPartUI.uiGroup;
            let image = bodyPartUI.getImage();
            
            const elements = [targetBodyPart, image];

            elements.forEach(element => element.addEventListener('mouseover', () => {
                this.fillImage(image);
            }));

            elements.forEach(element => element.addEventListener('mouseout', () => {
                if(this.selected != image) {
                    this.hollowImage(image);
                }
            }));

            elements.forEach(element => element.addEventListener('mousedown', () => {
                if(this.selected != null) {
                    this.hollowImage(this.selected);
                }
                this.selected = image;
                this.fillImage(this.selected);
            }));
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
        
        this.attackedIcon = createImage('images/sight.png', 'attacked-icon', 50, 50, 0, 0, 'silhouette-icon');
        this.defendedIcon = createImage('images/shield.png', 'defended-icon', 50, 50, 0, 0, 'silhouette-icon');

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
        console.log(bodyPart);
        let x = parseFloat(bodyPart.getAttribute('x')) + parseFloat(bodyPart.getAttribute('width')) * 0.5 - parseFloat(icon.getAttribute('width')) * 0.5;
        let y = parseFloat(bodyPart.getAttribute('y')) + parseFloat(bodyPart.getAttribute('height')) * 0.5 - parseFloat(icon.getAttribute('height')) * 0.5;

        icon.setAttribute('x', x);
        icon.setAttribute('y', y);
    }
}

function createImage(path, id, width, height, x = 0, y = 0, className = '') {
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