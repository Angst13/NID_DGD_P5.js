// ---------- Smooth fade, sprite & gradual speed version (with fade-in/out black screen) ----------
let gameLevel = [0, 1, 2, 3, 4];
let currentgamelevel = gameLevel[0];
let glNo = 0;

// player vars
let playerX = 0;
let playerY = 0;
let basePlayerSpeed = 6;
let targetSpeed = basePlayerSpeed;
let playerSpeed = basePlayerSpeed;
let playerSize = 50;
let showPlayer = true;

// sprite vars
let playerSpriteImg;
let spritesed;
let frameWidth = 1, frameHeight = 1;
let currentFrame = 0;
let totalFrames = 9;
let animRow = 2;
let frameTimer = 0;
let frameDelay = 10;
let facingRight = true;
let moving = false;
let displayX = 0;

// sad sprite switch
let useSadSprite = false;

// images
let level1Img, level1img2;
let house1, fam1, fam2, level2bus;
let back3, back1, back2, back2r, back3f;
let mem1, mem2, mem3, mem4, mem5;

// state flags
let visitedLevel4 = false;
let visitedLevel3 = false;

// LEVEL 3 memory fade
let memIndex = 0;
let memAlpha = 0;
let memPhase = "fadeIn";
let memHoldTimer = 0;

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

// black screen vars
let blackScreen = false;
let blackAlpha = 0;
let blackPhase = "none";

// TEXT SEQUENCE (Level 4 emotional moment)
let showSadTextStage = 0; // 1 → sigh, 2 → should I go inside, 3 → it doesn't feel the same
let sadTextAlpha = 0;
let sadTextPhase = "fadeIn";
let sadTextHold = 120;
let sadTextDelay = 0;
let sadTextDone = false;

let cnv;

function preload() {
  level1Img = loadImage('images/b1.png');
  level1img2 = loadImage('images/b2.png');
  level2bus = loadImage('images/b1.png');
  house1 = loadImage('images/b4.png');
  fam1 = loadImage('images/f3.png');
  fam2 = loadImage('images/f6.png');
  playerSpriteImg = loadImage('images/spritere1.png');
  spritesed = loadImage('images/spritesed.png');

  back1 = loadImage('images/back1.png');
  back2 = loadImage('images/back2.png');
  back2r = loadImage('images/back2r.png');
  back3 = loadImage('images/back3.png');
  back3f = loadImage('images/back3f.png');

  mem1 = loadImage('images/mem1.png');
  mem2 = loadImage('images/mem2.png');
  mem3 = loadImage('images/mem3.png');
  mem4 = loadImage('images/mem4.png');
  mem5 = loadImage('images/mem5.png');
}

function setup() {
  cnv = createCanvas(2133, 1167);
  centerCanvas(cnv);
  noStroke();
  noSmooth();

  frameWidth = playerSpriteImg.width / 9;
  frameHeight = playerSpriteImg.height / 4;
  displayX = playerX;
}

function centerCanvas(c) {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  c.position(x, y);
}

function windowResized() { centerCanvas(cnv); }

function draw() {
  if (blackScreen) { drawBlackScreen(); return; }

  updatePlayerSpeedGradual();

  if (currentgamelevel == 0) introScreen();
  else if (currentgamelevel == 1) levelOne();
  else if (currentgamelevel == 2) levelTwo();
  else if (currentgamelevel == 3) levelThree();
  else if (currentgamelevel == 4) levelFour();
}

// ===== Level 1 =====
function introScreen() {
  background(0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(40);
  text("Click to Start", width / 2, height / 2);
}

function levelOne() {
  image(back1, 0, 0, width, height);
  groundPlane();
  image(level1Img, 1700, -10, 1300, 1300);
  image(level1img2, -600, -60, 1000, 900);

  if (showFam2 && fam2FadingIn) {
    fam2Alpha = min(fam2Alpha + 3, 255);
    push(); tint(255, fam2Alpha); image(fam2, 0, 0, width, height); pop();
  }

  if (showPlayer) playerSprite();
  playerMovement();
}

// ===== Level 2 =====
function levelTwo() {
  let bgImg = visitedLevel4 ? back2r : back2;
  image(bgImg, 0, 0, width, height);
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
    if (slideDirection == -1) { scale(-1, 1); image(level2bus, -900, -190, 1200, 1200); }
    else { image(level2bus, 0, -190, 1200, 1200); }
    pop();

    slideX += slideSpeed * slideDirection;

    if (slideDirection == 1 && slideX > width) {
      sliding = false; showPlayer = true; glNo = 3; currentgamelevel = 3; playerX = 0; displayX = playerX; return;
    }

    if (slideDirection == -1 && slideX + 900 < 0) {
      sliding = false; showPlayer = true; glNo = 1; currentgamelevel = 1; playerX = width - playerSize - 5; displayX = playerX; startFam2FadeIn(); return;
    }
    return;
  }

  if (showPlayer) playerSprite();
  playerMovement();
}

// ===== Level 3 =====
function levelThree() {
  let bgImg = visitedLevel4 ? back3 : back3f;
  image(bgImg, 0, 0, width, height);
  groundPlane();

  if (!visitedLevel3 && !visitedLevel4) visitedLevel3 = true;

  let memList = [mem1, mem2, mem3, mem4, mem5];

  if (visitedLevel3 && memIndex < memList.length && !visitedLevel4) {
    let currentMem = memList[memIndex];

    if (memPhase === "fadeIn") { memAlpha += 4; if (memAlpha >= 255) { memAlpha = 255; memHoldTimer = 45; memPhase = "hold"; } }
    else if (memPhase === "hold") { memHoldTimer--; if (memHoldTimer <= 0) memPhase = "fadeOut"; }
    else if (memPhase === "fadeOut") { memAlpha -= 4; if (memAlpha <= 0) { memAlpha = 0; memIndex++; memPhase = "fadeIn"; } }

    push(); tint(255, memAlpha); image(currentMem, 0, 0, width, height); pop();
  }

  if (showPlayer) playerSprite();
  playerMovement();
}

// ===== Level 4 =====
function levelFour() {
  visitedLevel4 = true;

  image(back3, 0, 0, width, height);
  groundPlane();
  image(house1, 0, 0, width, height);

  // Invisible door zone
  let groundY = height / 1.5 + playerSize;
  let squareX = width / 2 - 97;
  let squareY = groundY - 310;
  let squareW = 150;
  let squareH = 250;

  if (mouseIsPressed &&
      mouseX > squareX && mouseX < squareX + squareW &&
      mouseY > squareY && mouseY < squareY + squareH &&
      !blackScreen) {
    blackScreen = true; blackAlpha = 0; blackPhase = "fadeIn";
  }

  if (!fam1Fading && fam1Alpha > 0 && playerX > width / 3) startFam1FadeOut();
  if (fam1Alpha > 0) { push(); tint(255, fam1Alpha); image(fam1, 0, 0, width, height); pop(); }
  drawFam1Particles();

  // Delay before text
  if (sadTextDelay > 0) {
    sadTextDelay--;
    if (showPlayer) playerSprite();
    playerMovement();
    return;
  }

  // Start text sequence only once
  if (!sadTextDone && showSadTextStage === 0 && useSadSprite) {
    showSadTextStage = 1;
    sadTextAlpha = 0;
    sadTextPhase = "fadeIn";
  }

  // Text sequence logic
  if (showSadTextStage > 0 && !sadTextDone) {

    let msg = "";
    if (showSadTextStage === 1) msg = "Sigh...";
    else if (showSadTextStage === 2) msg = "Should I go inside?";
    else if (showSadTextStage === 3) msg = "It doesn't feel the same.";

    if (sadTextPhase === "fadeIn") { sadTextAlpha += 4; if (sadTextAlpha >= 255) { sadTextAlpha = 255; sadTextHold = 120; sadTextPhase = "hold"; } }
    else if (sadTextPhase === "hold") { sadTextHold--; if (sadTextHold <= 0) sadTextPhase = "fadeOut"; }
    else if (sadTextPhase === "fadeOut") {
      sadTextAlpha -= 4;
      if (sadTextAlpha <= 0) {
        sadTextAlpha = 0;
        if (showSadTextStage === 1) { showSadTextStage = 2; sadTextPhase = "fadeIn"; }
        else if (showSadTextStage === 2) { showSadTextStage = 3; sadTextPhase = "fadeIn"; }
        else { showSadTextStage = 0; sadTextDone = true; }
      }
    }

    push();
    textAlign(CENTER, CENTER);
    textSize(48);
    fill(255, sadTextAlpha);
    text(msg, width / 2, height / 1.25);
    pop();
  }

  if (showPlayer) playerSprite();
  playerMovement();
}

// ===== Black Screen =====
function drawBlackScreen() {
  background(0);

  if (blackPhase === "fadeIn") { blackAlpha += 5; if (blackAlpha >= 255) { blackAlpha = 255; blackPhase = "showText"; } }
  else if (blackPhase === "fadeOut") { blackAlpha -= 5; if (blackAlpha <= 0) { blackAlpha = 0; blackScreen = false; blackPhase = "none"; currentgamelevel = 4; glNo = 4; playerX = width / 2 - 50; displayX = playerX; playerSpeed = basePlayerSpeed; return; } }

  fill(0, blackAlpha);
  rect(0, 0, width, height);

  if (blackPhase === "showText" || blackPhase === "fadeOut") {
    fill(255, blackAlpha);
    textAlign(CENTER, CENTER);
    textSize(48);
    text("No one lives here except me now.", width / 2, height / 2);
  }
}

// ===== Game Start =====
function startGame() { 
  if (currentgamelevel == 0) { glNo = 1; currentgamelevel = 1; playerX = 0; displayX = playerX; playerSpeed = basePlayerSpeed; } 
  if (blackScreen && blackPhase === "showText") blackPhase = "fadeOut"; 
}
function mousePressed() { startGame(); }
function touchStarted() { startGame(); return false; }

// ===== Rendering =====
function playerSprite() {
  animRow = moving ? (facingRight ? 1 : 0) : (facingRight ? 2 : 3);
  displayX = lerp(displayX, playerX, 0.6);

  if (moving) { frameTimer++; if (frameTimer >= frameDelay) { currentFrame = (currentFrame + 1) % totalFrames; frameTimer = 0; } }
  else currentFrame = 0;

  let sx = currentFrame * frameWidth;
  let sy = animRow * frameHeight;
  let groundY = height / 1.5;
  let dy = groundY - frameHeight * 0.71;

  let spriteToUse = useSadSprite ? spritesed : playerSpriteImg;
  image(spriteToUse, displayX, dy, frameWidth, frameHeight, sx, sy, frameWidth, frameHeight);
}

// ===== Movement =====
function playerMovement() {
  if (sliding) return;
  moving = false;

  let moveStep = playerSpeed * 0.6;

  // Slower movement in Level 3 memory walk
  if (currentgamelevel == 3 && !visitedLevel4) moveStep = playerSpeed * 0.3;

  if (keyIsDown(RIGHT_ARROW)) { playerX += moveStep; facingRight = true; moving = true; }
  else if (keyIsDown(LEFT_ARROW)) { playerX -= moveStep; facingRight = false; moving = true; }

  if (currentgamelevel == 4 && playerX > width - playerSize - 10)
    playerX = width - playerSize - 10;

  if (playerX > width && glNo < gameLevel.length - 1 && currentgamelevel < 4) {
    glNo++; currentgamelevel = glNo; playerX = 0; displayX = playerX;
    if (currentgamelevel == 2) startSlide(1);
  }

  if (playerX + playerSize < 0 && glNo > 0) {
    glNo--; currentgamelevel = glNo; playerX = width - playerSize - 5; displayX = playerX;
    if (currentgamelevel == 2) startSlide(-1);
  }
}

// ===== Fade Effects =====
function updatePlayerSpeedGradual() {
  targetSpeed = (currentgamelevel >= 1 && currentgamelevel <= 3) ? 12 : basePlayerSpeed;
  playerSpeed = lerp(playerSpeed, targetSpeed, 0.08);
}

function startFam1FadeOut() { fam1Fading = true; fam1Particles = []; }

function drawFam1Particles() {
  if (fam1Fading && fam1Alpha > 0) {
    fam1Alpha -= 5;

    for (let i = 0; i < 3; i++)
      fam1Particles.push({ x: random(width), y: random(height / 2, height - 100), vx: random(-1, 1), vy: random(-3, -1), size: random(3, 8), alpha: 255 });

    if (fam1Alpha <= 0) {
      fam1Alpha = 0; 
      fam1Fading = false; 
      showFam2 = true;
      useSadSprite = true;

      if (!sadTextDone) sadTextDelay = 90;
    }
  }

  for (let i = fam1Particles.length - 1; i >= 0; i--) {
    let p = fam1Particles[i];
    p.x += p.vx; p.y += p.vy; p.alpha -= 5;
    fill(255, p.alpha); ellipse(p.x, p.y, p.size);
    if (p.alpha <= 0) fam1Particles.splice(i, 1);
  }
}

function startFam2FadeIn() { fam2FadingIn = true; fam2Alpha = 0; showFam2 = true; }
function groundPlane() { fill('black'); rect(0, height / 1.5 + playerSize, width, height); }
function startSlide(direction) { slideDirection = direction; slideSpeed = 8; sliding = true; showPlayer = false; jerkTimer = 0; jerkOffsetY = jerkOffsetX = 0; slideX = direction == 1 ? -900 : width; }
adsasdad