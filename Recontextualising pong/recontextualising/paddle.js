class Paddle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.jammed = false; // new property
  }
  show() {
    if (this.jammed) {
      fill(255, 100, 100); // red tint when jammed
    } else {
      fill(100, 200, 255);
    }
    rect(this.x, this.y, this.w, this.h, 4);
  }
  move(amt) {
    this.y += amt;
  }
  keepInBounds() {
    if (this.y < 0) this.y = 0;
    if (this.y + this.h > height) this.y = height - this.h;
  }
}