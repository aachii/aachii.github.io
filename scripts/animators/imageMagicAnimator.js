class ImageMagicAnimator {
    doco;
    image;
    percentualDpp;
    imageCocos = [];
    startPoint;
    spawnSizePerDraw = 500;
    finished = false;
    dotToCuco = {};
    origin;
    layoutOptions;

    constructor(image, percentualDpp, doco, layoutOptions) {
        this.image = image;
        this.percentualDpp = percentualDpp;
        this.doco = doco;
        this.layoutOptions = layoutOptions;
    }

    setup() {
        const img = this.image;
        img.crossOrigin = "Anonymous";
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        this.startPoint = this.layoutOptions.origin;

        if (this.layoutOptions.centerX) {
            this.startPoint.x = (windowWidth - img.width) / 2;
        }

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        const rgba = ctx.getImageData(
            0, 0, img.width, img.height
        ).data;

        let pixelCount = 0
        for (let i = 0; i < rgba.length; i += 4) {
            const reali = Math.floor(i / 4);
            const x = reali % img.width;
            const y = Math.floor(reali / img.width);
            const red = rgba[i];
            const grn = rgba[i + 1];
            const blu = rgba[i + 2];
            if (red + grn + blu > 50) {
                //console.log(`x:${x} y:${y} r:${red}`);
                if (floor(random(0, 100)) < this.percentualDpp) {
                    pixelCount += 1;
                    this.imageCocos.push(new Coco(this.startPoint.x + x, this.startPoint.y + y, red, grn, blu));
                }
            }
        }
        console.log(`pixelCount=${pixelCount}`);

        // assign every dot a pixel as target
        let leftoverDots = [];
        let leftoverIndex = 0;
        for (let dot of this.doco.dots) {
            if (this.imageCocos.length > 0) {
                let cucoco = this.imageCocos.pop();
                //dot.outsideControl = true;
                leftoverIndex++;
                this.dotToCuco[dot.id] = cucoco;
            } else {
                leftoverDots.push(dot);
            }
        }
        //console.log(`leftoverIndex=${leftoverIndex}`);
        this.doco.dots.splice(leftoverIndex, this.doco.dots.length);
        for (let cucoco of this.imageCocos) {
            let newDot = random(this.doco.dots).copyDot();
            //newDot.outsideControl = true;
            this.doco.addDot(newDot);
            this.dotToCuco[newDot.id] = cucoco;
        }
        // set the pixel target for all dots
        for (let dot of this.doco.dots) {
            dot.setTarget(this.dotToCuco[dot.id]);
            dot.doLeadSwitch = false;
        }
    }

    draw() {
        // TODO: wait until all are in position
        let allFinished = true;
        for (let dot of this.doco.dots) {
            let cucoco = this.dotToCuco[dot.id];
            //let dist = dot.pos.dist(dot.target.getPosVec());
            let dist = distSquared(dot.pos, dot.target.getPosVec());
            if (!dot.outsideControl && dist < 100*100) {
                dot.outsideControl = true;
            }
            if (dot.outsideControl) {
                dot.color = lerpColor(dot.color, cucoco.getColor(), 0.1);
                dot.pos.x = lerp(dot.pos.x, cucoco.x, 0.1);
                dot.pos.y = lerp(dot.pos.y, cucoco.y, 0.1);
                
            }
            if (dist > 2) {
                allFinished = false;
            }
        }

        if (allFinished) {
            this.finished = true;
        }

    }

}