class DotContainer {
    dotId = 0;
    dots = [];

    constructor() {
        // TODO: nothing
    }

    addDot(dot) {
        dot.id = this.dotId;
        this.dots.push(dot);
        this.dotId++;
    }

    selectLeader(dot) {
        if (!dot.doLeadSwitch) {
            return;
        }
        let closest;
        let closestDist = distance;
        let closestAngle;
    
        if (floor(random(0, 100)) < percentualLeadChange) {
    
            for (let other of doco.dots) {
    
                // not for itself
                if (dot.id != other.id) {
                    //let dist = dot.pos.dist(other.pos);
                    let dist = distSquared(dot.pos, other.pos);
                    if (dist < distance * distance && dist > dot.size * dot.size) {
                        let otherAngle = dot.vel.angleBetween(other.pos.copy().sub(dot.pos));
                        if (otherAngle < angle && otherAngle > -angle) {
    
                            // other dot is in given distance and angle
                            if (dist < closestDist) {
                                closest = other;
                                closestDist = dist;
                                closestAngle = otherAngle;
                            }
                        }
                    }
                }
            }
            if (closest) {
                dot.setLeader(closest);
            }
        }
    }

    checkEdges(dot) {
        if (bounce) {
            if (dot.pos.x > windowWidth - dot.size) {
                dot.pos.x = windowWidth - dot.size;
                dot.vel.x *= -1;
            }
            if (dot.pos.x < 0 + dot.size) {
                dot.pos.x = 0 + dot.size;
                dot.vel.x *= -1;
            }
            if (dot.pos.y > windowHeight - dot.size) {
                dot.pos.y = windowHeight - dot.size;
                dot.vel.y *= -1;
            }
            if (dot.pos.y < 0 + dot.size) {
                dot.pos.y = 0 + dot.size
                dot.vel.y *= -1;
            }
        } else {
            if (dot.pos.x > windowWidth) {
                dot.pos.x = 0;
            }
            if (dot.pos.x < 0) {
                dot.pos.x = windowWidth;
            }
            if (dot.pos.y > windowHeight) {
                dot.pos.y = 0;
            }
            if (dot.pos.y < 0) {
                dot.pos.y = windowHeight;
            }
        }
    }
}

function distSquared(v1, v2) {
    let dx = v2.x - v1.x;
    let dy = v2.y - v1.y;
    return dx * dx + dy * dy;
}
