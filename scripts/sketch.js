let dots = [];
let id = 0;
let distance = 700;
let angle = 0.5;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(234, 234, 234, 20);
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
  append(dots, new Dot(id, mouseX, mouseY, 10, color(55, random(70, 170), random(40, 240)), createVector(0, -5)));
  id += 1;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function followClosest(dot) {
  let closest;
  let closestDist;
  let closestAngle;
  for (other of dots) {
    if (dot.id != other.id) {
      let dist = dot.pos.dist(other.pos);
      if (dist < distance && dist > dot.size) {
        closestAngle = dot.vel.angleBetween(other.pos.copy().sub(dot.pos));
        if (closestAngle < angle && closestAngle > -angle) {
          if (typeof closest != "undefined") {
            if (dist < closestDist) {
              closest = other.pos.copy();
              closestDist = dist;
            }
          } else {
            closest = other.pos.copy();
            closestDist = dist;
          }
        }
      }
    }
  }
  if (typeof closest != "undefined") {
    stroke(50);
    line(dot.pos.x, dot.pos.y, closest.x, closest.y);
    if (random(0, 4) < 2.5) {
      dot.vel.rotate(closestAngle/10);
    }
  }
}