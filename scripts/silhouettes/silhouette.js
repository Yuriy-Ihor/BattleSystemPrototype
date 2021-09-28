
const silhouetteImagePath = 'silhouette-parts';

const healthBarPaddingY = 8;
const bodyPartUIPaddingY = 15;
const iconsPaddingY = 10;
const bodyPartUIHealthBarWidth = 40;
const bodyPartUIHealthBarHeight = 10;
const barStrokePadding = 5;
const fontRatio = 0.6;
const fontSize = 20;

class Bar {
    constructor(x, y, baseValue, width, height) {
        this.group = document.createElementNS("http://www.w3.org/2000/svg", 'g');
        this.fillView = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        this.barBackground = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        this.wrapperRect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');

        this.wrapperRect.setAttribute('x', x - barStrokePadding);
        this.wrapperRect.setAttribute('y', y - height - (fontSize + 3 * barStrokePadding) / 2);
        this.wrapperRect.setAttribute('fill', 'none');
        this.wrapperRect.setAttribute('stroke', 'green');
        this.wrapperRect.setAttribute('stroke-width', 2);
        this.wrapperRect.setAttribute('height', height + fontSize + 3 * barStrokePadding);
        this.wrapperRect.setAttribute('width', width + 2 * barStrokePadding);

        let barElements = [this.fillView, this.barBackground];
        barElements.forEach(element => {
            element.setAttribute('x', x);
            element.setAttribute('y', y);
            element.setAttribute('fill', 'green');
            element.setAttribute('height', height);
            element.setAttribute('width', width)
        });

        this.barBackground.setAttribute('fill', 'gray');
        this.barBackground.setAttribute('class', 'bar-background-view');
        this.fillView.setAttribute('class', 'bar-fill-view');

        this.currentValue = baseValue;
        this.baseWidth = width;
        this.baseValue = baseValue;

        this.group.appendChild(this.wrapperRect)
        this.group.appendChild(this.barBackground);
        this.group.appendChild(this.fillView);
    }

    updateFillAmount(value) {

        this.currentValue = value;

        let fillAmount = value / this.baseValue;
        this.setWidth(this.baseWidth * fillAmount, this.fillView);     

        if(value <= 0) {
            hideElement(this.barBackground);
            this.barBackground.classList.add('no-opacity');
        }
    }

    setWidth(width, element) {
        element.setAttribute('width', width);
    }
}

class BodyPartUI {
    constructor(bodyPartName, targetBodyPart, bodyPartInfo, scale, relevance) {
        this.bodyPartName = bodyPartName;
        this.bodyPartBaseInfo = bodyPartInfo;
        this.bodyPartImage = targetBodyPart;
        this.uiGroup = document.createElementNS("http://www.w3.org/2000/svg", 'g');
        this.scale = scale;
        this.relevance = relevance;
    }

    init() {
        this.uiGroup.setAttribute('class', 'body-part-ui-group');
        this.uiGroup.setAttribute('width', 30);

        // let x = parseFloat(this.bodyPartImage.getAttribute('x')) + parseFloat(this.bodyPartImage.getAttribute('width')) * 0.1;
        // let y = parseFloat(this.bodyPartImage.getAttribute('y')) + parseFloat(this.bodyPartImage.getAttribute('height')) * 0.1;
        let x = this.relevance === "main" ? silhouette_bar_coordinate_map_main[this.bodyPartName]["left"] * this.scale : silhouette_bar_coordinate_map_side[this.bodyPartName]["left"] * this.scale;
        let y = this.relevance === "main" ? silhouette_bar_coordinate_map_main[this.bodyPartName]["top"] * this.scale : silhouette_bar_coordinate_map_side[this.bodyPartName]["top"] * this.scale;

        this.uiGroup.setAttribute('x', x);
        this.uiGroup.setAttribute('y', y);

        this.shootChanceText = this.drawShootChance(this.bodyPartBaseInfo.shootChance);
        this.uiGroup.appendChild(this.shootChanceText);

        // this.bodyPartNameText = this.drawBodyPartName();
        // this.uiGroup.appendChild(this.bodyPartNameText);

        this.healthBar = this.createHealthBar(this.bodyPartBaseInfo.baseLife);
        this.uiGroup.appendChild(this.healthBar.group);
    }

    createHealthBar(baseValue) { 
        let x = this.uiGroup.getAttribute('x');
        let y = this.uiGroup.getAttribute('y');

        let newBar = new Bar(x - bodyPartUIHealthBarWidth * 0.5, parseFloat(y) + healthBarPaddingY, baseValue, bodyPartUIHealthBarWidth, bodyPartUIHealthBarHeight);

        return newBar;
    }

    updateUI(currentHealth) {
        if(currentHealth <= 0) {
            var that = this;
            setTimeout(function () {
                console.log(that);
                that.bodyPartImage.classList.add('killed');
                if(hasClass(that.bodyPartImage, 'damaged')) {
                    that.bodyPartImage.classList.remove('damaged');
                }
                that.healthBar.updateFillAmount(currentHealth);
                that.shootChanceText.classList.add('no-opacity');
            }, 100);
            return;
        }
        if(currentHealth < this.bodyPartBaseInfo.baseLife) {
            var that = this;
            setTimeout(function () {
                if(!hasClass(that.bodyPartImage, 'damaged')) {
                    that.bodyPartImage.classList.add('damaged');
                }
                that.healthBar.updateFillAmount(currentHealth);
            }, 100);
        }
    }
    
    drawShootChance(chance) {
        let shootChanceText = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        shootChanceText.innerText = chance;
        let textNode = document.createTextNode(chance * 100 + "%");
        shootChanceText.setAttribute('font-size', fontSize + 'px');
        shootChanceText.appendChild(textNode);

        let x = this.uiGroup.getAttribute('x');
        let y = this.uiGroup.getAttribute('y');
        
        shootChanceText.setAttribute('x', x - (chance * 100 + "%").length * fontSize * fontRatio / 2);
        shootChanceText.setAttribute('y', y);
        shootChanceText.setAttribute('fill', 'green');    

        return shootChanceText;
    }

    drawBodyPartName() {
        let bodyPartText = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        let info = this.bodyPartBaseInfo
        bodyPartText.innerText = `${this.bodyPartName}: ${Math.round(info.currentLife * 100/ info.baseLife)}%`;
        let textNode = document.createTextNode(`${this.bodyPartName}: ${Math.round(info.currentLife * 100/ info.baseLife)}%`);
        bodyPartText.setAttribute('font-size', fontSize + 'px');
        bodyPartText.appendChild(textNode);

        let x = this.uiGroup.getAttribute('x');
        let y = this.uiGroup.getAttribute('y');
        
        bodyPartText.setAttribute('x', x - bodyPartUIHealthBarWidth / 2);
        bodyPartText.setAttribute('y', y);
        bodyPartText.setAttribute('fill', 'green');    

        return bodyPartText;
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
            let bodyPartUI = new BodyPartUI(body_part_name, bodyPartImage, bodyPartInfo, this.scale, this.relevance);
            
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

    updateBodyPartUI(targetBodyPart, bodyPartInfo) {
        this.bodyPartsUI[targetBodyPart].updateUI(bodyPartInfo.currentLife);
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

        for(let bodyPart in this.bodyPartsUI) {
            hideElement(this.bodyPartsUI[bodyPart].uiGroup);
        }

        this.activeHealthBar = null;
    }

    updateBodyPartUI(targetBodyPart, bodyPartInfo) {
        if(this.activeHealthBar != null) {
            hideElement(this.activeHealthBar.group);
            this.activeHealthBar = null;
        }

        this.bodyPartsUI[targetBodyPart].updateUI(bodyPartInfo.currentLife);

        this.activeHealthBar = this.bodyPartsUI[targetBodyPart].healthBar;
        console.log(this.activeHealthBar);
        showElement(this.activeHealthBar.group);
    }

    showAttackedIcon(bodyPart) {
        this.displayIconOnBodyPart(bodyPart, this.attackedIcon);
    }

    showDefendedIcon(bodyPart) {
        this.displayIconOnBodyPart(bodyPart, this.defendedIcon);
    }

    displayIconOnBodyPart(bodyPart, icon) {
        let x = parseFloat(bodyPart.getAttribute('x')) + parseFloat(bodyPart.getAttribute('width')) * 0.5 - parseFloat(icon.getAttribute('width')) * 0.5;
        let y = parseFloat(bodyPart.getAttribute('y')) + parseFloat(bodyPart.getAttribute('height')) * 0.5 - parseFloat(icon.getAttribute('height')) * 0.5;

        icon.setAttribute('x', x);
        icon.setAttribute('y', y + iconsPaddingY);
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

function changeBrightness(element) {
    let style = element.style;
    let filters = style.filter;
    console.log(filters);
}
