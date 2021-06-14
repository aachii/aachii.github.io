let dots = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(234, 234, 234, 30);
  for (dot of dots) {
    dot.update();
    dot.draw();
    dot.checkEdges();
  }

  if (mouseIsPressed) {
    mouseClicked();
  }
}

function mouseClicked() {
  append(dots, new Dot(mouseX, mouseY, 20, color(55, random(70, 170), random(40, 240)), createVector(0, -2)));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}