let width;
let height;
let dots = [];

function setup() {
  width = windowWidth-20;
  height = windowHeight-20;;
  createCanvas(width, height);
}

function draw() {
  background(238, 238, 238, 30);
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
  append(dots, new Dot(mouseX, mouseY, 20, color(55, random(70, 170), random(40, 240)), createVector(random(-2, 2), random(-2, 2))));
}