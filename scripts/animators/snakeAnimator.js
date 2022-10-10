class SnakeAnimator {
    finished = false;
    startTime;
    doco;
    snakeCount;

    constructor(doco, time, snakeCount = 1) {
        this.time = time;
        this.doco = doco;
        this.snakeCount = snakeCount;
    }

    setup() {
        this.startTime = millis();
        let nextBody = [];
        for (let i = 0; i < this.snakeCount; i++) {
            nextBody[i] = undefined;
        }
        let i = 0;
        for(let dot of this.doco.dots) {
            dot.target = undefined;
            dot.doLeadSwitch = false;
            dot.gotoTarget = false;
            // setting the heads
            if (!nextBody[i]) {
                nextBody[i] = dot;
                continue;
            }
            // chaining the body parts
            dot.lead = nextBody[i];
            nextBody[i] = dot;
            i++;
            if (i == this.snakeCount) {
                i = 0;
            }
        }
    }

    draw() {
        //console.log("idle draw");
        if (!this.time) {
            return;
        }

        if (millis() - this.startTime >= this.time) {
            this.finished = true;
        }
    }
}