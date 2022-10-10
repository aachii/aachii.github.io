class LayoutOptions {
    centerX = false;
    origin = createVector();

    constructor(origin, centerX = false) {
        if (origin) {
            this.origin = origin;
        }
        this.centerX = centerX;
    }
}

class Spawner {
    doco;
    image;
    percentualDpp;
    imageCocos = [];
    startPoint;
    spawnSizePerDraw = 500;
    finished = false;

    constructor(image, percentualDpp, doco) {
        this.image = image;
        this.percentualDpp = percentualDpp;
        this.doco = doco;
    }

    setup() {
        const img = this.image;
        img.crossOrigin = "Anonymous";
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        this.startPoint = createVector((windowWidth - img.width) / 2, (windowHeight - img.height) / 2);

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
                if (floor(random(0, 100)) <= this.percentualDpp) {
                    pixelCount += 1;
                    this.imageCocos.push(new Coco(this.startPoint.x + x, this.startPoint.y + y, red, grn, blu));
                }
            }
        }
        this.imageCocos.sort((c1, c2) => c1.x - c2.x);
        console.log(`pixelCount=${pixelCount}`);
    }

    draw() {
        if (this.imageCocos.length != 0) {
            const subsetCocos = this.imageCocos.splice(0, this.spawnSizePerDraw);
            for (const coco of subsetCocos) {
                //console.log(coco);
                this.spawnAtCoords(coco);
            }
        } else {
            this.finished = true;
        }
    }

    spawnAtCoords(coco) {
        let spawn = createVector(coco.x, coco.y);
        let initialSpeed = p5.Vector.random2D();
        initialSpeed.setMag(dotSpeed);
        //spawn.add(randomOffset);
        this.doco.addDot(new Dot(spawn.x, spawn.y, dotSize, color(coco.r, coco.g, coco.b), initialSpeed));
    }

}