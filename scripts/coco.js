class Coco {
    constructor(x, y, r, g, b) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.g = g;
      this.b = b;
    }

    getPosVec() {
      return createVector(this.x, this.y);
    }

    getColor() {
      return color(this.r, this.g, this.b);
    }
  }
  