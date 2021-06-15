let dots = [];
let id = 0;
let distance = 200;
let angle = 0.5;
let lineToClosest = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(234, 234, 234, 10);
  for (dot of dots) {
    dot.update();
    followClosest(dot);
    dot.draw();
    dot.checkEdges();
  }

  if (mouseIsPressed) {
    mouseClicked();
  }
}

function mouseClicked() {
  append(dots, new Dot(id, mouseX, mouseY, 10, color(random(50, 200), random(50, 200), random(50, 200)), createVector(0, -5)));
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
            closest = other.pos.copy();
            closestDist = dist;
            closestAngle = otherAngle;
          }
        }
      }
    }
  }
  if (typeof closest != "undefined") {
    if (lineToClosest) {
      stroke(50);
      line(dot.pos.x, dot.pos.y, closest.x, closest.y);
    }
    dot.vel.rotate(closestAngle/2);
  }
}