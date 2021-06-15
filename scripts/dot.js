let bounce = false;

class Dot {
  constructor(id, x, y, size, color = color(0, 0, 0), acc = createVector(0, 0)) {
    this.id = id;
    this.pos = createVector(x, y);
    this.size = size;
    this.color = color;
    this.vel = createVector(0, 0);
    this.acc = acc;
  }

  draw() {
    noStroke();
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);

    let dirPoint = this.vel.copy();
    dirPoint.normalize().mult(this.size/2);
    stroke(50);
    line(this.pos.x, this.pos.y, this.pos.x+dirPoint.x, this.pos.y+dirPoint.y);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // random steering
    this.steer();
  }

  checkEdges() {
    if (bounce) {
      if (this.pos.x > windowWidth-this.size) {
        this.pos.x = windowWidth-this.size;
        this.vel.x *= -1;
      }
      if (this.pos.x < 0+this.size) {
        this.pos.x = 0+this.size;
        this.vel.x *= -1;
      }
      if (this.pos.y > windowHeight-this.size) {
        this.pos.y = windowHeight-this.size;
        this.vel.y *= -1;
      }
      if (this.pos.y < 0+this.size) {
        this.pos.y = 0+this.size
        this.vel.y *= -1;
      }
    } else {
      if (this.pos.x > windowWidth) {
        this.pos.x = 0;
      }
      if (this.pos.x < 0) {
        this.pos.x = windowWidth;
      }
      if (this.pos.y > windowHeight) {
        this.pos.y = 0;
      }
      if (this.pos.y < 0) {
        this.pos.y = windowHeight;
      }
    }
  }

  steer() {
    if (random(0, 10) < 8) {
      this.vel.rotate(random(-0.1, 0.1));
    }
  }
}