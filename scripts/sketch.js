let dots = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255, 255, 255, 3);
  for (dot of dots) {
    if (dot.counter != 0) {
      dot.update();
      dot.draw();
      dot.checkEdges();
    }
  }

  if (mouseIsPressed) {
    mouseClicked();
  }
}

function mouseClicked() {
  append(dots, new Dot(mouseX, mouseY, 20, color(55, random(40, 220), random(0, 40)), createVector(0, -2)));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}