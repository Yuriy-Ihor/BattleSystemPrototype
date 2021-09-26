
const silhouetteImagePath = 'silhouette-parts';

const bodyPartUIPaddingY = 5;
const bodyPartUIHealthBarWidth = 35;
const bodyPartUIHealthBarHeight = 20;

class Bar {
    constructor(x, y, baseValue, width, height) {
        this.group = document.createElementNS("http://www.w3.org/2000/svg", 'g');

        this.fillView = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        this.barBackground = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        
        let barElements = [this.fillView, this.barBackground];
        barElements.forEach(element => {
            element.setAttribute('x', x);
            element.setAttribute('y', y);
            element.setAttribute('fill', 'green');
            element.setAttribute('height', height);
            this.setWidth(width, element);
        });

        this.barBackground.setAttribute('fill', 'gray');

        this.currentValue = baseValue;
        this.baseWidth = width;
        this.baseValue = baseValue;

        this.group.appendChild(this.barBackground);
        this.group.appendChild(this.fillView);
    }

    updateFillAmount(value) {
        this.currentValue = value;

        let fillAmount = value / this.baseValue;
        this.setWidth(this.baseWidth * fillAmount, this.fillView);     
    }

    setWidth(width, element) {
        element.setAttribute('width', width);
    }
}

class BodyPartUI {
    constructor(targetBodyPart, bodyPartInfo, scale) {
        this.bodyPartBaseInfo = bodyPartInfo;
        this.bodyPartImage = targetBodyPart;
        this.uiGroup = document.createElementNS("http://www.w3.org/2000/svg", 'g');
        this.scale = scale;
    }

    init() {
        this.uiGroup.setAttribute('class', 'body-part-ui-group');
        this.uiGroup.setAttribute('width', 30);

        let x = parseFloat(this.bodyPartImage.getAttribute('width')) * 0.5 + parseFloat(this.bodyPartImage.getAttribute('x'));
        let y = parseFloat(this.bodyPartImage.getAttribute('height')) * 0.5 + parseFloat(this.bodyPartImage.getAttribute('y'));

        this.uiGroup.setAttribute('x', x);
        this.uiGroup.setAttribute('y', y);

        this.shootChanceText = this.drawShootChance(this.bodyPartBaseInfo.shootChance);
        this.uiGroup.appendChild(this.shootChanceText);
        this.healthBar = this.createHealthBar(this.bodyPartBaseInfo.baseLife);
        this.uiGroup.appendChild(this.healthBar.group);
    }

    createHealthBar(baseValue) { 
        let x = this.uiGroup.getAttribute('x');
        let y = this.uiGroup.getAttribute('y');

        let newBar = new Bar(x - bodyPartUIHealthBarWidth * 0.5, y, baseValue, bodyPartUIHealthBarWidth, bodyPartUIHealthBarHeight);

        return newBar;
    }

    updateUI(currentHealth) {
        if(currentHealth < this.bodyPartBaseInfo.baseLife) {
            var that = this;
            setTimeout(function () {
                that.bodyPartImage.setAttribute('class', 'damaged');
                that.healthBar.updateFillAmount(currentHealth);
            }, 100);
        }
    }
    
    drawShootChance(chance) {
        let shootChanceText = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        shootChanceText.innerText = chance;
        let fontSize = 20;
        let textNode = document.createTextNode(chance * 100 + "%");
        shootChanceText.setAttribute('font-size', fontSize + 'px');
        shootChanceText.appendChild(textNode);

        let x = this.uiGroup.getAttribute('x');
        let y = this.uiGroup.getAttribute('y');
        
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
    constructor(_coordinate_map, display, targetPlayer, scale) {
        this.relevance = _coordinate_map["relevance"];
        this.size = _coordinate_map['unscaled-size'] * scale;
        this.coordinate_map = {};
        this.bodyPartsUI = {};
        this.scale = scale;

        for (var body_part_name in _coordinate_map) {
            if (body_part_name != "unscaled-size" && body_part_name != "relevance") {
                this.coordinate_map[body_part_name] = _coordinate_map[body_part_name];
            }
        }

        let silhouetteGroup = document.createElementNS("http://www.w3.org/2000/svg", 'g');
        silhouetteGroup.setAttribute('class', 'svg-silhouette');

        for (var body_part_name in this.coordinate_map) {
            let imagePath = this.getImagesPath('hollow', body_part_name);

            let width = this.coordinate_map[body_part_name]["width"] * this.scale;
            let height = this.coordinate_map[body_part_name]["height"] * this.scale;

            let positionX = this.coordinate_map[body_part_name]["left"] * this.scale;
            let positionY = this.coordinate_map[body_part_name]["top"] * this.scale;

            let bodyPartImage = createImage(imagePath, body_part_name, width, height, positionX, positionY, 'silhouette-part');

            let bodyPartInfo = targetPlayer.bodyParts[body_part_name];
            let bodyPartUI = new BodyPartUI(bodyPartImage, bodyPartInfo, this.scale);
            
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

    updateUI(bodyParts) {
        for(let bodyPartName in bodyParts) {
            this.bodyPartsUI[bodyPartName].updateUI(bodyParts[bodyPartName].currentLife);
        }
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
    constructor(_coordinate_map, display, targetPlayer, scale) {
        super(_coordinate_map, display, targetPlayer, scale);

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
    constructor(_coordinate_map, display, targetPlayer, scale) {
        super(_coordinate_map, display, targetPlayer, scale);
        
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