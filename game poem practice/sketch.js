// ---------- Smooth fade & sprite version ----------
let gameLevel = [0, 1, 2, 3, 4];
let currentgamelevel = gameLevel[0];
let glNo = 0;

// player vars
let playerX = 0;
let playerY = 0;
let playerSpeed = 6; // smoother
let playerSize = 50;
let showPlayer = true;

// sprite vars
let playerSpriteImg;
let frameWidth = 1, frameHeight = 1;
let currentFrame = 0;
let totalFrames = 9;
let animRow = 2;
let frameTimer = 0;
let frameDelay = 10;
let facingRight = true;
let moving = false;
let displayX = 0;

// images
let level1Img, level1img2, level4img1;
let house1, fam1, fam2, level2bus;

// fam transitions
let fam1Alpha = 255;
let fam1Fading = false;
let fam1Particles = [];

let fam2Alpha = 0;
let fam2FadingIn = false;
let showFam2 = false;

// sliding vars
let sliding = false;
let slideX;
let slideSpeed = 8;
let slideDirection = 1;

// bus jerk vars
let jerkOffsetY = 0;
let jerkOffsetX = 0;
let jerkTimer = 0;
let jerkInterval = 5;
let jerkStrength = 4;
let horizontalJerk = 1.5;

let cnv;

function preload() {
  level1Img = loadImage('images/b1.png');
  level1img2 = loadImage('images/b2.png');
  level4img1 = loadImage('images/b3.png');
  level2bus = loadImage('images/b1.png');
  house1 = loadImage('images/b4.png');
  fam1 = loadImage('images/f1.png');
  fam2 = loadImage('images/f2.png');
  playerSpriteImg = loadImage('images/spritere1.png');
}

function setup() {
  cnv = createCanvas(2133, 1167);
  centerCanvas(cnv);
  noStroke();
  noSmooth();

  if (playerSpriteImg && playerSpriteImg.width > 0) {
    frameWidth = playerSpriteImg.width / 9;
    frameHeight = playerSpriteImg.height / 4;
  }

  displayX = playerX;
}

function centerCanvas(c) {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  c.position(x, y);
}

function windowResized() {
  centerCanvas(cnv);
}

function draw() {
  if (currentgamelevel == 0) introScreen();
  else if (currentgamelevel == 1) levelOne();
  else if (currentgamelevel == 2) levelTwo();
  else if (currentgamelevel == 3) levelThree();
  else if (currentgamelevel == 4) levelFour();
}

// ===== LEVELS =====
function introScreen() {
  background(0);
  fill('white');
  textAlign(CENTER, CENTER);
  textSize(40);
  text("Click to Start", width / 2, height / 2);
}

// ===== LEVEL 1 — fam2 fades in when returning =====
function levelOne() {
  background(238, 175, 97);
  groundPlane();

  image(level1Img, 1700, -10, 1300, 1300);
  image(level1img2, -600, -60, 1000, 900);

  // fam2 fade in when coming back
  if (showFam2 && fam2FadingIn) {
    if (fam2Alpha < 255) {
      fam2Alpha += 3;
      if (fam2Alpha > 255) fam2Alpha = 255;
    }
    push();
    tint(255, fam2Alpha);
    image(fam2, 0, 0, width, height);
    pop();
  }

  if (showPlayer) playerSprite();
  playerMovement();
}

// ===== LEVEL 2 =====
function levelTwo() {
  background(251, 144, 98);
  groundPlane();

  if (sliding) showPlayer = false;

  if (sliding) {
    jerkTimer++;
    if (jerkTimer % jerkInterval === 0) {
      jerkOffsetY = random(-jerkStrength, jerkStrength);
      jerkOffsetX = random(-horizontalJerk, horizontalJerk);
    }

    push();
    translate(slideX + jerkOffsetX, 245 + jerkOffsetY);
    if (slideDirection == -1) {
      scale(-1, 1);
      image(level2bus, -900, 0, 900, 900);
    } else {
      image(level2bus, 0, 0, 900, 900);
    }
    pop();

    slideX += slideSpeed * slideDirection;

    if (slideDirection == 1 && slideX > width) {
      sliding = false;
      showPlayer = true;
      glNo = 3;
      currentgamelevel = 3;
      playerX = 0;
      displayX = playerX;
    } else if (slideDirection == -1 && slideX + 900 < 0) {
      sliding = false;
      showPlayer = true;
      glNo = 1;
      currentgamelevel = 1;
      playerX = width - playerSize - 5;
      displayX = playerX;
      startFam2FadeIn(); // fade in when back to level 1
    }
  }
}

// ===== LEVEL 3 =====
function levelThree() {
  background(238, 93, 108);
  groundPlane();
  if (showPlayer) playerSprite();
  playerMovement();
}

// ===== LEVEL 4 — fam1 fades away =====
function levelFour() {
  background(206, 73, 147);
  groundPlane();
  image(house1, 0, 0, width, height);

  if (!fam1Fading && fam1Alpha > 0 && playerX > width / 3) {
    startFam1FadeOut();
  }

  if (fam1Alpha > 0) {
    push();
    tint(255, fam1Alpha);
    image(fam1, 0, 0, width, height);
    pop();
  }

  drawFam1Particles();

  if (showPlayer) playerSprite();
  playerMovement();
}

// ===== Player sprite =====
function playerSprite() {
  animRow = moving ? (facingRight ? 1 : 0) : (facingRight ? 2 : 3);

  // Smooth horizontal movement
  displayX = lerp(displayX, playerX, 0.25);

  // Animation speed control
  if (moving) {
    frameTimer++;
    if (frameTimer >= frameDelay) {
      currentFrame = (currentFrame + 1) % totalFrames;
      frameTimer = 0;
    }
  } else currentFrame = 0;

  let sx = currentFrame * frameWidth;
  let sy = animRow * frameHeight;
  let groundY = height / 1.5;

  // lower the sprite to align feet with ground
  let dy = groundY - frameHeight * 0.71;

  push();
  imageMode(CORNER);
  image(playerSpriteImg, displayX, dy, frameWidth, frameHeight, sx, sy, frameWidth, frameHeight);
  pop();
}


// ===== Player movement =====
function playerMovement() {
  if (sliding) return;
  moving = false;

  let moveStep = playerSpeed * 0.6;

  if (keyIsDown(RIGHT_ARROW)) {
    playerX += moveStep;
    facingRight = true;
    moving = true;
  } else if (keyIsDown(LEFT_ARROW)) {
    playerX -= moveStep;
    facingRight = false;
    moving = true;
  }

  if (playerX > width && glNo < gameLevel.length - 1) {
    glNo++;
    currentgamelevel = glNo;
    playerX = 0;
    displayX = playerX;
    if (currentgamelevel == 2) startSlide(1);
  }

  if (playerX + playerSize < 0 && glNo > 0) {
    glNo--;
    currentgamelevel = glNo;
    playerX = width - playerSize - 5;
    displayX = playerX;
    if (currentgamelevel == 2) startSlide(-1);
  }
}

// ===== Fam1 fade out with pieces =====
function startFam1FadeOut() {
  fam1Fading = true;
  fam1Particles = [];
}

function drawFam1Particles() {
  if (fam1Fading && fam1Alpha > 0) {
    fam1Alpha -= 5;

    // create small particles
    for (let i = 0; i < 3; i++) {
      fam1Particles.push({
        x: random(width),
        y: random(height / 2, height - 100),
        vx: random(-1, 1),
        vy: random(-3, -1),
        size: random(3, 8),
        alpha: 255
      });
    }

    if (fam1Alpha <= 0) {
      fam1Alpha = 0;
      fam1Fading = false;
      showFam2 = true; // enables fam2 in level 1
    }
  }

  for (let i = fam1Particles.length - 1; i >= 0; i--) {
    let p = fam1Particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 5;
    fill(255, p.alpha);
    noStroke();
    ellipse(p.x, p.y, p.size);
    if (p.alpha <= 0) fam1Particles.splice(i, 1);
  }
}

// ===== Fam2 fade in =====
function startFam2FadeIn() {
  fam2FadingIn = true;
  fam2Alpha = 0;
  showFam2 = true;
}

// ===== Ground =====
function groundPlane() {
  fill('black');
  rect(0, height / 1.5 + playerSize, width, height);
}

// ===== Controls =====
function mouseClicked() {
  if (currentgamelevel == 0) {
    glNo = 1;
    currentgamelevel = 1;
    playerX = 0;
    displayX = playerX;
  }
}

// ===== Slide transition =====
function startSlide(direction) {
  slideDirection = direction;
  slideSpeed = 8;
  sliding = true;
  showPlayer = false;
  jerkTimer = 0;
  jerkOffsetY = jerkOffsetX = 0;
  slideX = direction == 1 ? -900 : width;
}
