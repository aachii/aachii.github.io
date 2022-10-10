class Idle {
    finished = false;
    startTime;
    doco;
    moving;
    constructor(doco, time, moving = true) {
        this.time = time;
        this.doco = doco;
        this.moving = moving;
    }

    setup() {
        //console.log("idle setup");
        this.startTime = millis();
        for(let dot of this.doco.dots) {
            dot.outsideControl = !this.moving;
            dot.doLeadSwitch = true;
            dot.gotoTarget = false;
            dot.lead = undefined;
            dot.target = undefined;
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