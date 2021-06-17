let dots = [];
let dotSpeed = 4;
let id = 0;
let distance = 300;
let angle = 1.5;
let spawnMultiple = true;
let lineToClosest = false;
let steeringLines = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(5, 5, 5, 10);
  for (dot of dots) {
    dot.update();
    followClosest(dot);
    dot.draw();
    dot.checkEdges();
  }

  if (spawnMultiple && mouseIsPressed) {
    mouseClicked();
  }
}

function mouseClicked() {
  let spawn = createVector(mouseX, mouseY);
  let randomOffset = p5.Vector.random2D().mult(dotSpeed*dotSpeed);
  spawn.add(randomOffset);
  append(dots, new Dot(id, spawn.x, spawn.y, 10, color(random(50, 200), random(50, 200), random(50, 200)), randomOffset));
  id += 1;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function followClosest(dot) {
  let closest;
  let closestDist = distance;
  let closestAngle;
  for (other of dots) {

    // not for itself
    if (dot.id != other.id) {
      let dist = dot.pos.dist(other.pos);
      if (dist < distance && dist > dot.size) {
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
  if (typeof closest != "undefined") {
        
    // steer towards closest
    let dotToOther = closest.pos.copy().sub(dot.pos);
    let newDir = p5.Vector.lerp(dotToOther, closest.vel, 0.95);
    let newAngle = dot.vel.angleBetween(newDir);
    let originToNew = dot.pos.copy().add(newDir);

    if (steeringLines) {
      stroke(50);
      line(dot.pos.x, dot.pos.y, originToNew.x, originToNew.y);
    }
    if (lineToClosest) {
      stroke(50);
      line(dot.pos.x, dot.pos.y, closest.pos.x, closest.pos.y);
    }

    // steer towards same velocity as closest other dot
    dot.vel.rotate(newAngle/6);

    // set speed based on distance to closest
    if (closestDist > dot.size * 2) {
      dot.vel.setMag(dotSpeed+1);
    }
  } else {
    dot.vel.setMag(dotSpeed);
  }
}