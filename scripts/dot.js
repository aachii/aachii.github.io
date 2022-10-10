let bounce = true;
let velocityLine = false;
let randomSteerPercent = 70;
let randomSteerAmount = 0.2;

class Dot {
    outsideControl = false;
    doLeadSwitch = true;
    gotoTarget = false;
    id;

    constructor(x, y, size, color = color(0, 0, 0), acc = createVector(0, 0)) {
        this.pos = createVector(x, y);
        this.size = size;
        this.color = color;
        this.vel = createVector(0, 0);
        this.acc = acc;
        this.lead = undefined;
        this.target = undefined;
    }

    draw() {
        noStroke();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, this.size);

        if (velocityLine) {
            let dirPoint = this.vel.copy();
            dirPoint.normalize().mult(this.size / 2);
            stroke(50);
            line(this.pos.x, this.pos.y, this.pos.x + dirPoint.x, this.pos.y + dirPoint.y);
        }
    }

    update() {
        if (this.outsideControl) {
            return
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);

        // random steering
        this.steer();
        
        if (this.gotoTarget) {
            this.followCoords();
        } else {
            this.followLeader();
        }

    }

    copyDot() {
        let newDot = new Dot(this.pos.x, this.pos.y, this.size, color(0, 0, 0, 0));
        newDot.vel = this.vel.copy();
        return newDot;
    }

    steer() {
        if (random(0, 100) < randomSteerPercent) {
            this.vel.rotate(random(-randomSteerAmount, randomSteerAmount));
        }
    }

    setLeader(leader) {
        this.gotoTarget = false;
        this.lead = leader;
    }

    followLeader() {
        if (this.lead) {

            // steer towards closest
            let vecToLead = this.lead.pos.copy().sub(this.pos);
            let newDir = p5.Vector.lerp(vecToLead, this.lead.vel, 0.95);
            let newAngle = this.vel.angleBetween(newDir);

            // steer towards same velocity as leader
            this.vel.rotate(newAngle / 8);
        }
    }

    setTarget(target) {
        this.gotoTarget = true;
        this.target = target;
    }

    followCoords() {
        if (floor(random(0, 100)) < 30) {
            let vecToTarget = this.target.getPosVec().sub(this.pos);
            let newAngle = this.vel.angleBetween(vecToTarget);
            this.vel.rotate(newAngle / 4);
        }
    }
}