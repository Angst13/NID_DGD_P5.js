class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.xSpeed = random([-3, 3]);
    this.ySpeed = random([-3, 3]);
  }
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
  show() {
    fill(255, 80, 80);
    ellipse(this.x, this.y, this.size);
  }
  checkWalls() {
    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1;
      strongShake(); // more chaos when hitting wall
    }
  }
  checkGoal() {
    if (this.x < 0) {
      player2++;
      this.reset();
    } else if (this.x > width) {
      player1++;
      this.reset();
    }
  }
  checkPaddle(p) {
    if (this.x > p.x && this.x < p.x + p.w &&
        this.y > p.y && this.y < p.y + p.h) {
      this.xSpeed *= -1.1; // reflect & slightly speed up
      strongShake();
    }
  }
  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = random([-3, 3]);
    this.ySpeed = random([-3, 3]);
  }
}