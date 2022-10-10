class CleanupAnimator {
    finished = false;
    doco;
    limit;

    constructor(doco, limit = 1000) {
        this.doco = doco;
        this.limit = limit;
    }

    setup() {
        if (this.limit < this.doco.dots.length) {
            //this.doco.dots.splice(this.limit, this.doco.dots.length);
            while (this.doco.dots.length > this.limit) {
                this.doco.dots.splice(floor(random(0, this.doco.dots.length-1)), 1);
            }
            console.log("reduced to: " + this.doco.dots.length);
        }
    }

    draw() {
        this.finished = true;
    }
}