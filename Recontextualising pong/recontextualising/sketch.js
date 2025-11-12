let leftPaddle, rightPaddle;
let balls = [];
let player1 = 0, player2 = 0;
let worldEnded = false;
let gameStarted = false;

// entropy & chaos
let entropyStarted = false;
let entropyDelay = 600;
let chaosText = "";
let chaosAlpha = 0;
let decayTimer = 0;
let decayInterval = 300;
let shakeX = 0, shakeY = 0;
let jamDuration = 0;

// visuals
let particles = [];
let vignetteImg;
let flashAlpha = 0;

function setup() {
  createCanvas(900, 600);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  noCursor();

  leftPaddle = new Paddle(20, height / 2 - 60, 10, 120);
  rightPaddle = new Paddle(width - 30, height / 2 - 60, 10, 120);
  balls.push(new Ball(width / 2, height / 2));

  // pre-render vignette for edge darkness
  vignetteImg = createGraphics(width, height);
  vignetteImg.noFill();
  for (let i = 0; i < 300; i++) {
    vignetteImg.stroke(0, i / 2);
    vignetteImg.strokeWeight(3);
    vignetteImg.rect(width / 2, height / 2, width - i, height - i, 100);
  }

  textFont('monospace');
}

function draw() {
  background(15);

  // screen shake
  translate(shakeX, shakeY);
  shakeX *= 0.9;
  shakeY *= 0.9;

  // CRT scanlines
  stroke(255, 15);
  for (let i = 0; i < height; i += 3) line(0, i, width, i);
  noStroke();

  // red flash overlay
  if (flashAlpha > 0) {
    fill(255, 0, 0, flashAlpha);
    rect(width / 2, height / 2, width * 2, height * 2);
    flashAlpha -= 8;
  }

  // === START SCREEN ===
  if (!gameStarted) {
    fill(255);
    textSize(48);
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = color(255, 100, 100);
    text("MURPHY'S PONG", width / 2, height / 2 - 80);
    drawingContext.shadowBlur = 0;
    textSize(18);
    fill(200);
    text("Press ENTER to play", width / 2, height / 2 + 30);
    fill(120);
    text("W/S and ↑/↓ to move paddles", width / 2, height / 2 + 60);
    image(vignetteImg, 0, 0);
    return;
  }

  // === GAME OVER SCREEN ===
  if (worldEnded) {
    fill(255);
    textSize(28);
    text("The world has decayed.", width / 2, height / 2);
    image(vignetteImg, 0, 0);
    return;
  }

  // HUD
  fill(255);
  textSize(16);
  text(`Player 1: ${player1} | Player 2: ${player2}`, width / 2, 25);

  // chaos text
  if (chaosAlpha > 0) {
    fill(255, 180, 180, chaosAlpha);
    textSize(22);
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = color(255, 120, 120);
    text(chaosText, width / 2, height / 2);
    drawingContext.shadowBlur = 0;
    chaosAlpha -= 3;
  }

  // paddles
  if (!leftPaddle.jammed) {
    if (keyIsDown(87)) leftPaddle.move(-6); // W
    if (keyIsDown(83)) leftPaddle.move(6);  // S
  }
  if (!rightPaddle.jammed) {
    if (keyIsDown(UP_ARROW)) rightPaddle.move(-6);
    if (keyIsDown(DOWN_ARROW)) rightPaddle.move(6);
  }
  leftPaddle.keepInBounds();
  rightPaddle.keepInBounds();
  leftPaddle.show();
  rightPaddle.show();

  // balls
  for (let b of balls) {
    b.move();
    b.checkWalls();
    b.checkGoal();
    b.checkPaddle(leftPaddle);
    b.checkPaddle(rightPaddle);
    b.show();
  }

  // dust particles
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 4;
    fill(255, 180, 100, p.alpha);
    noStroke();
    ellipse(p.x, p.y, p.size);
    if (p.alpha <= 0) particles.splice(i, 1);
  }

  // entropy start
  if (!entropyStarted && frameCount > entropyDelay) {
    entropyStarted = true;
    chaos("Entropy begins...");
  }

  // decay progression
  if (entropyStarted) {
    decayTimer++;
    if (decayTimer >= decayInterval) {
      applyEntropy();
      decayTimer = 0;
    }

    if (jamDuration > 0) {
      jamDuration--;
      if (jamDuration <= 0) {
        leftPaddle.jammed = false;
        rightPaddle.jammed = false;
        chaos("...stability returns briefly.");
      }
    }
  }

  // end
  if (leftPaddle.h <= 10 && rightPaddle.h <= 10) {
    chaos("The paddles fade...");
    worldEnded = true;
  }

  image(vignetteImg, 0, 0);
}

// === ENTROPY ===
function applyEntropy() {
  chaos("Reality decays...");
  flashAlpha = 120;
  strongShake();

  leftPaddle.h *= 0.9;
  rightPaddle.h *= 0.9;

  if (random(1) < 0.3 && jamDuration <= 0) {
    chaos("Movement seized...");
    leftPaddle.jammed = true;
    rightPaddle.jammed = true;
    jamDuration = 120;
  }

  if (random(1) < 0.3) {
    chaos("Time accelerates...");
    for (let b of balls) {
      b.xSpeed *= 1.3;
      b.ySpeed *= 1.3;
    }
  }

  if (random(1) < 0.25 && balls.length === 1) {
    chaos("Ball splits...");
    balls.push(new Ball(width / 2, height / 2));
  }

  for (let i = 0; i < 25; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      vx: random(-1, 1),
      vy: random(-1.5, -0.5),
      size: random(2, 6),
      alpha: 255
    });
  }

  decayInterval = max(100, decayInterval - 15);
}

function chaos(msg) {
  chaosText = msg;
  chaosAlpha = 255;
}

function strongShake() {
  shakeX = random(-10, 10);
  shakeY = random(-10, 10);
}

// === Paddle ===
class Paddle {
  constructor(x, y, w, h) {
    this.x = x; this.y = y;
    this.w = w; this.h = h;
    this.jammed = false;
  }
  move(dir) { this.y += dir; }
  keepInBounds() { this.y = constrain(this.y, 0, height - this.h); }
  show() {
    fill(this.jammed ? color(255, 60, 60) : 255);
    rect(this.x + this.w / 2, this.y + this.h / 2, this.w, this.h, 5);
  }
}

// === Ball ===
class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 10;
    this.xSpeed = random([-5, 5]);
    this.ySpeed = random(-3, 3);
  }

  move() { this.x += this.xSpeed; this.y += this.ySpeed; }

  checkWalls() {
    if (this.y < this.r || this.y > height - this.r) this.ySpeed *= -1;
  }

  checkGoal() {
    if (this.x < 0) { player2++; this.reset(); }
    else if (this.x > width) { player1++; this.reset(); }
  }

  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xSpeed = random([-5, 5]);
    this.ySpeed = random(-3, 3);
  }

  checkPaddle(p) {
    if (this.x - this.r < p.x + p.w && this.x + this.r > p.x &&
        this.y + this.r > p.y && this.y - this.r < p.y + p.h) {
      this.xSpeed *= -1.05;
      this.ySpeed += random(-1, 1);
      strongShake();
      flashAlpha = 80;
      chaos("impact...");
    }
  }

  show() {
    fill(255);
    ellipse(this.x, this.y, this.r * 2);
  }
}

// === Controls ===
function keyPressed() {
  if (keyCode === ENTER && !gameStarted) {
    gameStarted = true;
    chaos("The calm before chaos...");
  }
}
