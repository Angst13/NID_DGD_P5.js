// Part 1 of 3
// ---------- Smooth fade, sprite & gradual speed version (with fade-in/out black screen) ----------
let gameLevel = [0, 1, 2, 3, 4];
let currentgamelevel = gameLevel[0];
let glNo = 0;
let warmParticles = [];

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
let back3, back1, back2, back2r, back3f, back4;
let mem1, mem2, mem3, mem4, mem5;
let back3fore;

// state flags
let visitedLevel4 = false;
let visitedLevel3 = false;

// LEVEL 3 SMOOTH MEMORY FADE (UPDATED)
let memAlpha = [0, 0, 0, 0, 0];
let currentMem = -1;
let fadeSmooth = 0.02;  // LOWER = MORE GRADUAL

// fam transitions
let fam1Alpha = 255;
let fam1Fading = false;
let fam1Particles = [];
let fam2Alpha = 0;
let fam2FadingIn = false;
let showFam2 = false;

// sliding vars
let sliding = false;
let slideX = 0;
let slideSpeed = 8;
let slideDirection = 1;

// bus jerk vars
let jerkOffsetY = 0;
let jerkOffsetX = 0;
let jerkTimer = 0;
let jerkInterval = 5;
let jerkStrength = 4;
let horizontalJerk = 1.5;

// black screen vars (house)
let blackScreen = false;
let blackAlpha = 0;
let blackPhase = "none";

// RIGHT EXIT BLACK SCREEN
let rightExitBlack = false;
let rightExitAlpha = 0;
let rightExitPhase = "none";

// TEXT SEQUENCE (Level 4 emotional moment)
let showSadTextStage = 0;
let sadTextAlpha = 0;
let sadTextPhase = "fadeIn";
let sadTextHold = 120;
let sadTextDelay = 0;
let sadTextDone = false;

// REUNION DIALOGUE
let reunionActive = false;
let reunionDone = false;
let reunionStage = 0;
let reunionTimer = 0;
let dialogueFrozen = false;

// control footsteps availability
let allowFootsteps = true;

// POST-LEVEL4 TITLE FADE
let memoryTextAlpha = 0;

let cnv;

// sounds
let footstepSound;
let bgm1, bgm2, bgm3;
let bus;
let busarrive;

// -------- GLOBAL GROUND Y (single source of truth) --------
let groundY = 0;   // will be set in setup() to height * 0.82

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
  back4 = loadImage('images/back4.png');
  back3fore = loadImage('images/back3fore.png');

  mem1 = loadImage('images/mem1.png');
  mem2 = loadImage('images/mem2.png');
  mem3 = loadImage('images/mem3.png');
  mem4 = loadImage('images/mem4.png');
  mem5 = loadImage('images/mem5.png');

  footstepSound = loadSound('images/walk1.mp3');
  footstepSound.setVolume(0.4);

  bgm1 = loadSound('images/music1.mp3');
  bgm2 = loadSound('images/music2.mp3');
  bgm3 = loadSound('images/music3.mp3');

  bus = loadSound('images/bus.mp3');
  busarrive = loadSound('images/busarrive.mp3');
}

function setup() {
  cnv = createCanvas(2133, 1167);
  centerCanvas(cnv);
  noStroke();
  noSmooth();

  // set frame sizes for sprite sheet after image loaded
  frameWidth = playerSpriteImg.width / 9;
  frameHeight = playerSpriteImg.height / 4;
  displayX = playerX;

  // set global ground height to 82% (Option B)
  groundY = height * 0.82;

  userStartAudio();
}

function centerCanvas(c) {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  c.position(x, y);
}

function windowResized() {
  centerCanvas(cnv);
}

// ---------- Sound helpers ----------
function stopAllBgm() {
  [bgm1, bgm2, bgm3].forEach(s => {
    if (s && s.isPlaying()) s.stop();
  });
}

function playBgm(track, vol = 0.4) {
  if (!track) return;
  stopAllBgm();
  track.setVolume(vol);
  track.loop();
}

// Part 2 of 3
// ---------- Draw loop ----------
function draw() {
  // House black screen has precedence
  if (blackScreen) {
    drawBlackScreen();
    return;
  }

  // Right-exit black screen (Level 4 right-side)
  if (rightExitBlack) {
    drawRightExitBlack();
    return;
  }

  updatePlayerSpeedGradual();

  if (currentgamelevel == 0) introScreen();
  else if (currentgamelevel == 1) levelOne();
  else if (currentgamelevel == 2) levelTwo();
  else if (currentgamelevel == 3) levelThree();
  else if (currentgamelevel == 4) levelFour();
}

// helper: middle Y of the ground plane (used for placing all dialogue lower)
function groundDialogueY() {
  return groundY + (height - groundY) / 2;
}

// ===== Title Screen =====
function introScreen() {
  background(0);
  textAlign(CENTER, CENTER);
  if (!visitedLevel4) {
    textSize(62);
    fill(255);
    text("When I Came Back Where We Used to Be", width / 2, height / 2 - 120);
    textSize(40);
    text("Click to Start", width / 2, height / 2 + 30);
  } else {
    memoryTextAlpha = min(memoryTextAlpha + 2, 255);
    fill(255, memoryTextAlpha);
    textSize(48);
    text("Carry the memory, not the weight.", width / 2, height / 2);
    textSize(32);
    text("Thank you.", width / 2, height / 2 + 70);
  }
}

// ===== Level 1 =====
function levelOne() {
  image(back1, 0, 0, width, height);
  groundPlane();
  image(level1Img, 1600, 120, 1300, 1300);
  image(level1img2, -600, -60, 1000, 900);

  if (visitedLevel4 && fam1Alpha === 0 && !fam2FadingIn && fam2Alpha === 0) {
    startFam2FadeIn();
  }

  if (!visitedLevel4) {
    if (!bgm1.isPlaying()) playBgm(bgm1, 0.4);
  } else {
    if (!bgm3.isPlaying()) playBgm(bgm3, 0.38);
  }

  if (showFam2 && fam2FadingIn) {
    fam2Alpha = min(fam2Alpha + 3, 255);
    push();
    tint(255, fam2Alpha);
    image(fam2, 0, 0, width, height);
    pop();
  }

  if (visitedLevel4 && showFam2 && !reunionActive && !reunionDone && playerX < width / 2 - 300) {
    reunionActive = true;
    reunionDone = true;
    dialogueFrozen = true;
    reunionStage = 0;
    reunionTimer = 0;

    allowFootsteps = false;
    if (footstepSound.isPlaying()) footstepSound.stop();
  }

  if (showPlayer) playerSprite();
  playerMovement();

  if (reunionActive) drawReunionDialogue();
}

// ===== Level 2 =====
function levelTwo() {
  let bgImg = visitedLevel4 ? back2r : back2;
  image(bgImg, 0, 0, width, height);
  groundPlane();

  if (sliding) showPlayer = false;

  if (sliding) {
    if (!bus.isPlaying()) {
      bus.setVolume(0.6);
      bus.loop();
    }

    jerkTimer++;
    if (jerkTimer % jerkInterval === 0) {
      jerkOffsetY = random(-jerkStrength, jerkStrength);
      jerkOffsetX = random(-horizontalJerk, horizontalJerk);
    }

    push();
    translate(slideX + jerkOffsetX, 367 + jerkOffsetY);

    if (slideDirection == -1) {
      scale(-1, 1);
      image(level2bus, -900, -190, 1200, 1200);
    } else {
      image(level2bus, 0, -190, 1200, 1200);
    }
    pop();

    slideX += slideSpeed * slideDirection;

    if (slideDirection == 1 && slideX > width) {
      sliding = false;
      showPlayer = true;
      if (bus.isPlaying()) bus.stop();
      if (busarrive) {
        busarrive.setVolume(0.6);
        busarrive.play();
      }

      glNo = 3;
      currentgamelevel = 3;
      playerX = 0;
      displayX = playerX;

      if (visitedLevel4 && !bgm3.isPlaying()) playBgm(bgm3, 0.38);
      return;
    }

    if (slideDirection == -1 && slideX + 900 < 0) {
      sliding = false;
      showPlayer = true;
      if (bus.isPlaying()) bus.stop();
      if (busarrive) {
        busarrive.setVolume(0.6);
        busarrive.play();
      }

      glNo = 1;
      currentgamelevel = 1;
      playerX = width - playerSize - 5;
      displayX = playerX;

      if (visitedLevel4 && !bgm3.isPlaying()) playBgm(bgm3, 0.38);
      return;
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

  if (visitedLevel4) {
    if (!bgm3.isPlaying()) playBgm(bgm3, 0.38);
  } else {
    if (!bgm1.isPlaying()) playBgm(bgm1, 0.4);
  }

  // --- MEMORY FADE SYSTEM ---
  if (!visitedLevel4) {
    let sectionWidth = width / 5;
    let memIndex = floor(playerX / sectionWidth);
    memIndex = constrain(memIndex, 0, 4);

    currentMem = memIndex;

    let memList = [mem1, mem2, mem3, mem4, mem5];

    for (let i = 0; i < 5; i++) {
      let target = (i === currentMem ? 255 : 0);
      memAlpha[i] += (target - memAlpha[i]) * fadeSmooth;
    }

    // draw memories behind player
    for (let i = 0; i < 5; i++) {
      if (memAlpha[i] > 1) {
        push();
        tint(255, memAlpha[i]);
        image(memList[i], 0, 0, width, height);
        pop();
      }
    }
  }

  // --- DRAW PLAYER ---
  if (showPlayer) playerSprite();

  // --- FOREGROUND ALWAYS ON TOP ---
  image(back3fore, 0, 0, width, height);

  playerMovement();
}

// ===== Level 4 =====
function levelFour() {
  visitedLevel4 = true;

  image(back4, 0, 0, width, height);
  groundPlane();
  image(house1, 0, 0, width, height);

  if (!bgm2.isPlaying()) playBgm(bgm2, 0.45);

  let squareX = width / 2 - 97;
  let squareY = groundY - 310;
  let squareW = 150;
  let squareH = 250;

  // Enter house trigger
  let insideSquare =
    playerX + playerSize > squareX &&
    playerX < squareX + squareW &&
    groundY - frameHeight * 0.90 > squareY &&
    groundY - frameHeight * 0.90 < squareY + squareH;

  if (insideSquare && keyIsDown(UP_ARROW) && !blackScreen) {
    blackScreen = true;
    blackAlpha = 0;
    blackPhase = "fadeIn";

    if (footstepSound.isPlaying()) footstepSound.stop();
    allowFootsteps = false;
  }

  if (!fam1Fading && fam1Alpha > 0 && playerX > width / 3) startFam1FadeOut();
  if (fam1Alpha > 0) {
    push();
    tint(255, fam1Alpha);
    image(fam1, 0, 0, width, height);
    pop();
  }
  drawFam1Particles();

  if (sadTextDelay > 0) {
    sadTextDelay--;
    if (showPlayer) playerSprite();
    playerMovement();
    return;
  }

  if (!sadTextDone && showSadTextStage === 0 && useSadSprite) {
    showSadTextStage = 1;
    sadTextAlpha = 0;
    sadTextPhase = "fadeIn";
  }

  if (showSadTextStage > 0 && !sadTextDone) {
    let msg = "";
    if (showSadTextStage === 1) msg = "Sigh...";
    else if (showSadTextStage === 2) msg = "Should I go inside?";
    else if (showSadTextStage === 3) msg = "It doesn't feel the same.";

    if (sadTextPhase === "fadeIn") {
      sadTextAlpha += 4;
      if (sadTextAlpha >= 255) {
        sadTextAlpha = 255;
        sadTextHold = 120;
        sadTextPhase = "hold";
      }
    } else if (sadTextPhase === "hold") {
      sadTextHold--;
      if (sadTextHold <= 0) sadTextPhase = "fadeOut";
    } else if (sadTextPhase === "fadeOut") {
      sadTextAlpha -= 4;
      if (sadTextAlpha <= 0) {
        sadTextAlpha = 0;
        if (showSadTextStage === 1) {
          showSadTextStage = 2;
          sadTextPhase = "fadeIn";
        } else if (showSadTextStage === 2) {
          showSadTextStage = 3;
          sadTextPhase = "fadeIn";
        } else {
          showSadTextStage = 0;
          sadTextDone = true;
        }
      }
    }

    push();
    textAlign(CENTER, CENTER);
    textSize(48);
    fill(255, sadTextAlpha);
    text(msg, width / 2, groundDialogueY());
    pop();
  }

  if (showPlayer) playerSprite();
  playerMovement();
}

// Part 3 of 3
// ===== Black Screen (house) =====
function drawBlackScreen() {
  background(0);

  // Fade in
  if (blackPhase === "fadeIn") {
    blackAlpha += 5;
    if (blackAlpha >= 255) {
      blackAlpha = 255;
      blackPhase = "showText";
    }
  }

  // Fade out
  else if (blackPhase === "fadeOut") {
    blackAlpha -= 5;
    if (blackAlpha <= 0) {
      blackAlpha = 0;
      blackScreen = false;
      blackPhase = "none";

      // return player to level 4
      currentgamelevel = 4;
      glNo = 4;
      playerX = width / 2 - 50;
      displayX = playerX;
      playerSpeed = basePlayerSpeed;

      // re-enable footsteps
      allowFootsteps = true;
      return;
    }
  }

  // Draw black overlay
  fill(0, blackAlpha);
  rect(0, 0, width, height);

  // ===== UPDATED — CENTERED DIALOGUE =====
  if (blackPhase === "showText" || blackPhase === "fadeOut") {
    fill(255, blackAlpha);
    textAlign(CENTER, CENTER);
    textSize(48);

    // 🔥 Moved from groundDialogueY() → center of screen
    text("No one lives here except me now.", width / 2, height / 2);
  }

  // Leave black screen by pressing DOWN arrow
  if (blackPhase === "showText" && keyIsDown(DOWN_ARROW)) {
    blackPhase = "fadeOut";
  }
}

// ===== Right-exit black screen (Level 4 right side) =====
function drawRightExitBlack() {
  background(0);

  if (rightExitPhase === "fadeIn") {
    rightExitAlpha += 5;
    if (rightExitAlpha >= 255) {
      rightExitAlpha = 255;
      rightExitPhase = "showText";
    }
  }

  else if (rightExitPhase === "fadeOut") {
    rightExitAlpha -= 5;
    if (rightExitAlpha <= 0) {
      rightExitAlpha = 0;
      rightExitBlack = false;
      rightExitPhase = "none";

      currentgamelevel = 4;
      glNo = 4;

      playerX = width - 350;
      displayX = playerX;

      allowFootsteps = true;
      return;
    }
  }

  fill(0, rightExitAlpha);
  rect(0, 0, width, height);

  if (rightExitPhase === "showText" || rightExitPhase === "fadeOut") {
    fill(255, rightExitAlpha);
    textAlign(CENTER, CENTER);

    let centerY = height / 2;
    textSize(52);
    text("Only emptiness remains", width / 2, centerY - 40);

    textSize(34);
    text("Maybe I should head back", width / 2, centerY + 40);
  }

  if (rightExitPhase === "showText" && keyIsDown(LEFT_ARROW)) {
    rightExitPhase = "fadeOut";
  }
}

// ===== Game Start =====
function startGame() {
  if (currentgamelevel == 0) {
    glNo = 1;
    currentgamelevel = 1;
    playerX = 0;
    displayX = playerX;
    playerSpeed = basePlayerSpeed;
    memoryTextAlpha = 0;

    if (!visitedLevel4 && !bgm1.isPlaying()) playBgm(bgm1, 0.4);
    if (visitedLevel4 && !bgm3.isPlaying()) playBgm(bgm3, 0.38);
  }
}

function mousePressed() { startGame(); }
function touchStarted() { startGame(); return false; }

// ===== Rendering =====
function playerSprite() {
  if (reunionActive) moving = false;

  animRow = moving
    ? (facingRight ? 1 : 0)
    : (facingRight ? 2 : 3);

  displayX = lerp(displayX, playerX, 0.6);

  if (moving) {
    frameTimer++;
    if (frameTimer >= frameDelay) {
      currentFrame = (currentFrame + 1) % totalFrames;
      frameTimer = 0;
    }
  } else {
    currentFrame = 0;
  }

  let sx = currentFrame * frameWidth;
  let sy = animRow * frameHeight;

  let spriteToUse = useSadSprite ? spritesed : playerSpriteImg;
  let dyOffset = useSadSprite ? 0 : -6;

  let dy = groundY - frameHeight * 0.90 + dyOffset;

  image(spriteToUse, displayX, dy, frameWidth, frameHeight, sx, sy, frameWidth, frameHeight);
}

// ===== Movement =====
function playerMovement() {
  if (sliding || dialogueFrozen) return;

  moving = false;

  let moveStep = playerSpeed * 0.6;
  if (currentgamelevel == 3 && !visitedLevel4) moveStep = playerSpeed * 0.3;

  if (keyIsDown(RIGHT_ARROW)) {
    playerX += moveStep;
    facingRight = true;
    moving = true;
  }
  else if (keyIsDown(LEFT_ARROW)) {
    playerX -= moveStep;
    facingRight = false;
    moving = true;
  }

  if (moving && allowFootsteps && !footstepSound.isPlaying()) {
    footstepSound.loop();
  } else if ((!moving || !allowFootsteps) && footstepSound.isPlaying()) {
    footstepSound.stop();
  }

  // ===== Level 4 right-edge fade trigger =====
  if (currentgamelevel == 4) {
    if (playerX > width - playerSize - 10 && !rightExitBlack) {
      rightExitBlack = true;
      rightExitAlpha = 0;
      rightExitPhase = "fadeIn";
      if (footstepSound.isPlaying()) footstepSound.stop();
      allowFootsteps = false;
      moving = false;
      playerX = width - playerSize - 12;
    }
    else if (playerX > width - playerSize - 10) {
      playerX = width - playerSize - 10;
    }
  }

  // ===== Level switching (left/right boundaries) =====
  if (playerX > width && glNo < gameLevel.length - 1 && currentgamelevel < 4) {
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

// ===== Reunion Dialogue =====
function drawReunionDialogue() {
  textAlign(CENTER, CENTER);
  textSize(48);
  fill(255);

  let dialogY = groundDialogueY();

  if (reunionStage === 0) {
    text("Devu! How was your vacation, we missed you, man!", width / 2, dialogY);
  }
  else if (reunionStage === 1) {
    text("And you won't believe what happened next—", width / 2, dialogY);
  }
  else if (reunionStage === 2) {
    text("(their voices overlap — warm, quick, familiar)", width / 2, dialogY);
  }
  else if (reunionStage === 3) {
    text("hahahaha ...hahahah   yeah.. hah..", width / 2, dialogY);
  }
  else if (reunionStage === 4) {
    text("...", width / 2, dialogY);

    for (let i = 0; i < 6; i++) {
      warmParticles.push({
        x: random(width),
        y: random(groundY / 2, groundY),
        vx: random(-1, 1),
        vy: random(-3, -1),
        size: random(4, 12),
        alpha: 255
      });
    }
    drawWarmParticles();
  }
  else if (reunionStage === 5) {
    text("(I think it's time I moved on)", width / 2, dialogY);
  }

  reunionTimer++;
  if (reunionTimer > 260) {
    reunionTimer = 0;
    reunionStage++;
  }

  if (reunionStage > 5) {
    reunionActive = false;
    dialogueFrozen = false;
    moving = false;
    allowFootsteps = true;
    if (footstepSound.isPlaying()) footstepSound.stop();
  }
}

// ===== Fade Effects =====
function updatePlayerSpeedGradual() {
  if (currentgamelevel === 4) {
    targetSpeed = basePlayerSpeed;
  }
  else if (visitedLevel4) {
    if (currentgamelevel === 3) {
      targetSpeed = basePlayerSpeed;
    } else {
      targetSpeed = 12;
    }
  }
  else {
    if (currentgamelevel >= 1 && currentgamelevel <= 3) {
      targetSpeed = 12;
    } else {
      targetSpeed = basePlayerSpeed;
    }
  }

  playerSpeed = lerp(playerSpeed, targetSpeed, 0.08);
}

function startFam1FadeOut() {
  fam1Fading = true;
  fam1Particles = [];
}

function drawFam1Particles() {
  if (fam1Fading && fam1Alpha > 0) {
    fam1Alpha -= 5;

    for (let i = 0; i < 3; i++) {
      fam1Particles.push({
        x: random(width),
        y: random(groundY / 2, groundY - 100),
        vx: random(-1, 1),
        vy: random(-3, -1),
        size: random(3, 8),
        alpha: 255
      });
    }

    if (fam1Alpha <= 0) {
      fam1Alpha = 0;
      fam1Fading = false;
      useSadSprite = true;
      if (!sadTextDone) sadTextDelay = 90;
    }
  }

  for (let i = fam1Particles.length - 1; i >= 0; i--) {
    let p = fam1Particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 5;
    fill(255, p.alpha);
    ellipse(p.x, p.y, p.size);
    if (p.alpha <= 0) fam1Particles.splice(i, 1);
  }
}

function drawWarmParticles() {
  for (let i = warmParticles.length - 1; i >= 0; i--) {
    let p = warmParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 4;
    fill(255, 180, 120, p.alpha);
    noStroke();
    ellipse(p.x, p.y, p.size);

    if (p.alpha <= 0) warmParticles.splice(i, 1);
  }
}

function startFam2FadeIn() {
  fam2FadingIn = true;
  fam2Alpha = 0;
  showFam2 = true;
}

// ===== Ground Plane =====
function groundPlane() {
  fill("black");
  rect(0, groundY, width, height);
}

// ===== Slide / Bus Animation =====
function startSlide(direction) {
  slideDirection = direction;
  slideSpeed = 8;
  sliding = true;
  showPlayer = false;
  jerkTimer = 0;
  jerkOffsetY = jerkOffsetX = 0;
  slideX = (direction == 1) ? -900 : width;
}
