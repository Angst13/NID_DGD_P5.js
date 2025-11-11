let spriteSheets = {};  // store separate images for each direction
let sprites = {};        // store frames for each direction

let directions = ["down", "left", "right", "up"];
let frameCounts = 8; // number of frames per row
let count = 0;
let x = 200, y = 200;
let xdir = 0, ydir = 0;
let currentDir = "down";

function preload() {
  // Load each sprite sheet
  spriteSheets["down"] = loadImage("images/r1.png");
  spriteSheets["left"] = loadImage("images/r3.png");
  spriteSheets["right"] = loadImage("images/r2.png");
  spriteSheets["up"] = loadImage("images/r0.png");
}


function setup() {
  createCanvas(innerWidth, innerHeight);

  // Slice each sprite sheet into frames
  for (let dir of directions) {
    let sheet = spriteSheets[dir];
    let w = sheet.width / frameCounts;
    let h = sheet.height; // only 1 row per direction sheet
    sprites[dir] = [];

    for (let i = 0; i < frameCounts; i++) {
      sprites[dir].push(sheet.get(i * w, 0, w, h));
    }
  }
}

function draw() {
  background(220);

  // Draw current frame of current direction
  image(sprites[currentDir][count], x, y);

  if (frameCount % 5 == 0 && (xdir != 0 || ydir != 0)) {
    count = (count + 1) % frameCounts;
    x += xdir;
    y += ydir;
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    currentDir = "up";
    xdir = 0;
    ydir = -5;
  } else if (keyCode === DOWN_ARROW) {
    currentDir = "down";
    xdir = 0;
    ydir = 5;
  } else if (keyCode === LEFT_ARROW) {
    currentDir = "left";
    xdir = -5;
    ydir = 0;
  } else if (keyCode === RIGHT_ARROW) {
    currentDir = "right";
    xdir = 5;
    ydir = 0;
  }
}

function keyReleased() {
  xdir = 0;
  ydir = 0;
  count = 0; // reset to idle pose when key released
}

