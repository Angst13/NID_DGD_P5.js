let leftPaddle, rightPaddle;
let balls = [];
let player1 = 0, player2 = 0;
let worldEnded = false;
let gameStarted = false; // <-- new
let canvas;

// decay system ===
let entropyStarted = false;
let entropyDelay = 600;   // starts after ~10 seconds (60 fps * 10)
let chaosText = "";
let chaosAlpha = 0;

let decayTimer = 0;
let decayInterval = 300;  // every 300 frames (~5 seconds)

let shakeX = 0;
let shakeY = 0;

// For timed paddle jam
let jamTimer = 0;
let jamDuration = 0;

function setup() {
  canvas = createCanvas(900, 600);
  centerCanvas();  // <-- center on start
  textAlign(CENTER, CENTER);

  leftPaddle = new Paddle(20, height / 2 - 60, 10, 120);
  rightPaddle = new Paddle(width - 30, height / 2 - 60, 10, 120);

  balls.push(new Ball(width / 2, height / 2));
}

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function windowResized() {
  centerCanvas(); // <-- re-center when window size changes
}
function draw() {
  background(30);


   // === START SCREEN ===
  if (!gameStarted) {
    fill(255);
    textSize(32);
    text("MURPHY'S PONG", width / 2, height / 2 - 50);
    textSize(18);
    text("Press ENTER to Play", width / 2, height / 2 + 20);
    textSize(14);
    text("W/S and ↑/↓ to move paddles", width / 2, height / 2 + 60);
    return; // stop drawing game until start
  }

  // === Screen shake effect ===
  translate(shakeX, shakeY);
  shakeX *= 0.9;
  shakeY *= 0.9;

  if (worldEnded) {
    fill(255);
    textSize(24);
    text("The World Has Decayed.", width / 2, height / 2);
    return;
  }

  // === HUD / Info ===
  fill(255);
  textSize(16);
  text("Player 1: " + player1 + " | Player 2: " + player2, width / 2, 20);

  // Display chaos messages with fading alpha
  if (chaosAlpha > 0) {
    fill(255, chaosAlpha);
    text(chaosText, width / 2, height / 2);
    chaosAlpha -= 3;
  }

  // === Paddle Controls (only if not jammed) ===
  if (!leftPaddle.jammed) {
    if (keyIsDown(87)) leftPaddle.move(-5); // W
    if (keyIsDown(83)) leftPaddle.move(5);  // S
  }
  if (!rightPaddle.jammed) {
    if (keyIsDown(UP_ARROW)) rightPaddle.move(-5);
    if (keyIsDown(DOWN_ARROW)) rightPaddle.move(5);
  }

  leftPaddle.keepInBounds();
  rightPaddle.keepInBounds();

  // === Move and draw balls ===
  for (let b of balls) {
    b.move();
    b.checkWalls();
    b.checkGoal();
    b.checkPaddle(leftPaddle);
    b.checkPaddle(rightPaddle);
    b.show();
  }

  leftPaddle.show();
  rightPaddle.show();

  // === Start entropy after delay ===
  if (!entropyStarted && frameCount > entropyDelay) {
    entropyStarted = true;
    chaos("decaying starts...");
  }

  // === Timed decay system ===
  if (entropyStarted) {
    decayTimer++;

    if (decayTimer >= decayInterval) {
      applyEntropy();
      decayTimer = 0;
    }

    // Handle jam countdown
    if (jamDuration > 0) {
      jamDuration--;
      if (jamDuration <= 0) {
        leftPaddle.jammed = false;
        rightPaddle.jammed = false;
        chaos(".");
      }
    }
  }

  // === End condition ===
  if (leftPaddle.h <= 10 && rightPaddle.h <= 10) {
    chaos("The paddles fade...");
    worldEnded = true;
  }
}

// entropy
function applyEntropy() {
  chaos("things are getting worse...");
  strongShake();

  // Shrink paddles slightly
  leftPaddle.h *= 0.9;
  rightPaddle.h *= 0.9;

  // Random chance to jam paddles
  if (random(1) < 0.3 && jamDuration <= 0) {
    chaos("Paddles jammed...");
    leftPaddle.jammed = true;
    rightPaddle.jammed = true;
    jamDuration = 120; // about 1.5 seconds at 60 fps
  }

  // Random chance to speed up balls
  if (random(1) < 0.3) {
    chaos("Time accelerates...");
    for (let b of balls) {
      b.xSpeed *= 1.3;
      b.ySpeed *= 1.3;
    }
  }

  // Random chance to duplicate ball (if only one exists)
  if (random(1) < 0.25 && balls.length === 1) {
    chaos("Ball splits...");
    let newBall = new Ball(width / 2, height / 2);
    balls.push(newBall);
  }

  // Gradually increase speed of entropy (decay happens faster)
  decayInterval = max(100, decayInterval - 15);
}

// chaos function
function chaos(msg) {
  chaosText = msg;
  chaosAlpha = 255;
}

function strongShake() {
  shakeX = random(-12, 12);
  shakeY = random(-12, 12);
}





function keyPressed() {
  if (keyCode === ENTER && !gameStarted) {
    gameStarted = true;
    chaos("The calm before chaos...");
  }
}
