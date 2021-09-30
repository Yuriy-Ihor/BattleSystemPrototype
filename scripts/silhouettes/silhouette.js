
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
    constructor(x, y, baseValue, width, height, mainColor, sideColor) {
        this.group = document.createElementNS("http://www.w3.org/2000/svg", 'g');
        this.fillView = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        this.barBackground = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        this.wrapperRect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');

        this.mainColor = mainColor;
        this.currentColor = this.mainColor;
        this.sideColor = sideColor;

        this.wrapperRect.setAttribute('x', x - barStrokePadding);
        this.wrapperRect.setAttribute('y', y - height - (fontSize + 2 * barStrokePadding) / 2);
        this.wrapperRect.setAttribute('fill', 'none');
        this.wrapperRect.setAttribute('stroke', mainColor);
        this.wrapperRect.setAttribute('stroke-width', 2);
        this.wrapperRect.setAttribute('height', height + fontSize + 3 * barStrokePadding);
        this.wrapperRect.setAttribute('width', width + 2 * barStrokePadding);

        let barElements = [this.fillView, this.barBackground];
        barElements.forEach(element => {
            element.setAttribute('x', x);
            element.setAttribute('y', y);
            element.setAttribute('fill', mainColor);
            element.setAttribute('height', height);
            element.setAttribute('width', width)
        });

        this.barBackground.setAttribute('fill', 'none');
        this.barBackground.setAttribute('stroke', mainColor);
        this.barBackground.setAttribute('stroke-width', 1);

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
        this.fillView.setAttribute('width', this.baseWidth * fillAmount);

        this.currentColor = lerpColor(
            this.sideColor,
            this.mainColor,
            this.currentValue / this.baseValue
        );

        this.fillView.setAttribute('fill', this.currentColor);
        this.wrapperRect.setAttribute('stroke', this.currentColor);
        this.barBackground.setAttribute('stroke', this.currentColor)
        
        if(value <= 0) {
            hideElement(this.barBackground);
            this.barBackground.classList.add('no-opacity');
        }

        return this.currentColor;
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
        this.mainColor = "#00ff00";
        this.sideColor = "#ff0000";
        this.currentColor = this.mainColor;
        this.bodyPartInfo = bodyPartInfo;
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

        let newBar = new Bar(
            this.scale * (x - bodyPartUIHealthBarWidth * 0.5),
            this.scale * (parseFloat(y) + healthBarPaddingY),
            baseValue,
            this.scale * (bodyPartUIHealthBarWidth),
            this.scale * (bodyPartUIHealthBarHeight),
            this.mainColor,
            this.sideColor
        );

        return newBar;
    }

    updateUI(currentHealth) {
        if(currentHealth <= 0) {
            var that = this;
            setTimeout(function () {
                // console.log(that);
                that.bodyPartImage.classList.add('killed');
                if(hasClass(that.bodyPartImage, 'damaged')) {
                    that.bodyPartImage.classList.remove('damaged');
                }
                that.currentColor = that.healthBar.updateFillAmount(currentHealth);
                that.shootChanceText.setAttribute('fill', that.currentColor);
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
                that.currentColor = that.healthBar.updateFillAmount(currentHealth);
                that.shootChanceText.setAttribute('fill', that.currentColor);
            }, 300);
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
        
        shootChanceText.setAttribute('x', this.scale * x - (chance * 100 + "%").length * fontSize * fontRatio / 2);
        shootChanceText.setAttribute('y', this.scale * y);
        shootChanceText.setAttribute('fill', this.currentColor);    

        return shootChanceText;
    }

    // drawBodyPartName() {
    //     let bodyPartText = document.createElementNS("http://www.w3.org/2000/svg", 'text');
    //     let info = this.bodyPartBaseInfo
    //     bodyPartText.innerText = `${this.bodyPartName}: ${Math.round(info.currentLife * 100/ info.baseLife)}%`;
    //     let textNode = document.createTextNode(`${this.bodyPartName}: ${Math.round(info.currentLife * 100/ info.baseLife)}%`);
    //     bodyPartText.setAttribute('font-size', fontSize + 'px');
    //     bodyPartText.appendChild(textNode);

    //     let x = this.uiGroup.getAttribute('x');
    //     let y = this.uiGroup.getAttribute('y');
        
    //     bodyPartText.setAttribute('x', x - bodyPartUIHealthBarWidth / 2);
    //     bodyPartText.setAttribute('y', y);
    //     bodyPartText.setAttribute('fill', 'green');    

    //     return bodyPartText;
    // }

    getImage() {
        return this.bodyPartImage;
    }
}

class Silhouette{
    constructor(silhouetteSvg, targetPlayer, scale, relevance, silhouetteSize) {
        
        this.bodyPartsUI = {};
        this.scale = scale;
        this.relevance = relevance;

        this.silhouetteSvg = silhouetteSvg;

        this.bodyParts = this.silhouetteSvg.getElementsByClassName('silhouette-part');

        for(let i = 0; i < this.bodyParts.length; i++) {
            let bodyPartImage = this.bodyParts[i];
            let bodyPartInfo = targetPlayer.bodyParts[bodyPartImage.id];
            let bodyPartUI = new BodyPartUI(bodyPartImage.id, bodyPartImage, bodyPartInfo, this.scale, this.relevance);
            
            this.bodyPartsUI[bodyPartImage.id] = bodyPartUI;
        }
        
        for(let bodyPartId in this.bodyPartsUI) {
            this.bodyPartsUI[bodyPartId].init();
            silhouetteSvg.appendChild(this.bodyPartsUI[bodyPartId].uiGroup);
        }

        this.silhouetteSvg.setAttribute('width', silhouetteSize);
        this.silhouetteSvg.setAttribute('height', silhouetteSize);
        
        this.targetPlayer = targetPlayer;
        
    }


    updateBodyPartUI(targetBodyPart, bodyPartInfo) {
        this.bodyPartsUI[targetBodyPart].bodyPartInfo = bodyPartInfo;
        this.bodyPartsUI[targetBodyPart].updateUI(bodyPartInfo.currentLife);
    }

    updateHealthColors() {
        for (var bodyPartName in this.bodyPartsUI) {
            var color = lerpColor(
                this.bodyPartsUI[bodyPartName].sideColor,
                this.bodyPartsUI[bodyPartName].mainColor,
                this.bodyPartsUI[bodyPartName].bodyPartInfo.currentLife / this.bodyPartsUI[bodyPartName].bodyPartInfo.baseLife
            );

            var bodyPart = this.silhouetteSvg.getElementById(`${bodyPartName}-stroke`);
            bodyPart.setAttribute("stroke", "ffffff");

            var gradient = document.getElementById(`${this.relevance}-${bodyPartName}-gradient`);
            gradient.children[1].setAttribute("stop-color", color);
        }
    }

    updateHealthHeight() {
        for (var bodyPartName in this.bodyPartsUI) {
            var color = this.bodyParts[bodyPartName].setAttribute("fill", color);
            this.bodyParts[bodyPartName].setAttribute("fill", `url(#${this.relevance}-${bodyPartName}-gradient)`);
            var gradient = document.getElementById(`${this.relevance}-${bodyPartName}-gradient`);
            var part = Math.round(100 - 100 * this.bodyPartsUI[bodyPartName].bodyPartInfo.currentLife / this.bodyPartsUI[bodyPartName].bodyPartInfo.baseLife);
            gradient.children[0].setAttribute("offset", `${part}%`);
            gradient.children[1].setAttribute("offset", `${part}%`);
        }
    }

    getImagesPath(type, id) {
        return `${silhouetteImagePath}/${this.relevance}/${type}/${id}-${type}.png`;
    }

    hollowImage(image) { 
        image.setAttribute('fill', 'none');
        image.classList.remove("filled-body-part")
        image.removeAttribute('fill');
    }

    fillImage(image) {
        image.setAttribute('fill', 'white');
        image.classList.add("filled-body-part")
    }

    render() {
        // todo : update position on resize
    }
}

class SelectableSilhouette extends Silhouette {
    constructor(silhouetteSvg, targetPlayer, scale, relevance, silhouetteSize) {
        super(silhouetteSvg, targetPlayer, scale, relevance, silhouetteSize);

        for(let bodyPartId in this.bodyPartsUI){
            let bodyPartUI = this.bodyPartsUI[bodyPartId];
            let targetBodyPart = bodyPartUI.uiGroup;
            let image = bodyPartUI.getImage();
            
            const elements = [targetBodyPart, image];

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
    constructor(silhouetteSvg, targetPlayer, scale, relevance, silhouetteSize) {
        super(silhouetteSvg, targetPlayer, scale, relevance, silhouetteSize);
        
        //this.attackedIcon = createImage('images/sight.png', 'attacked-icon', 50, 50, 0, 0, 'silhouette-icon');
        //this.defendedIcon = createImage('images/shield.png', 'defended-icon', 50, 50, 0, 0, 'silhouette-icon');

        //display.appendChild(this.attackedIcon);
        //display.appendChild(this.defendedIcon);

        for(let bodyPart in this.bodyPartsUI) {
            hideElement(this.bodyPartsUI[bodyPart].shootChanceText);
            hideElement(this.bodyPartsUI[bodyPart].healthBar.wrapperRect);

            hideElement(this.bodyPartsUI[bodyPart].healthBar.fillView);
            hideElement(this.bodyPartsUI[bodyPart].healthBar.barBackground);
        }

        this.activeHealthBar = null;
    }

    updateBodyPartUI(targetBodyPart, bodyPartInfo) {
        //if(this.activeHealthBar != null) {
           // hideElement(this.activeHealthBar.group);
        //    this.activeHealthBar = null;
        //}

        this.bodyPartsUI[targetBodyPart].updateUI(bodyPartInfo.currentLife);

        //this.activeHealthBar = this.bodyPartsUI[targetBodyPart].healthBar;
        // console.log(this.activeHealthBar);
        //showElement(this.activeHealthBar.group);
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
