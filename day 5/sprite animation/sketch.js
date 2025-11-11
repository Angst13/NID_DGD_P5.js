
let spriteImg;
let sRows = 4, sCols = 8;
let sprites = []
let count = 0

function preload() {
  spriteImg = loadImage("images/r0.png");
}


function setup() {
  
  createCanvas(innerWidth, innerHeight);
  let sWidth = spriteImg.width / sCols;
  let sHeight = spriteImg.height / sRows;
  //loop through the sprite image and store it in a 1d array sprites

  for (i = 0; i < sRows; i = i + 1) {
    for (j = 0; j < sCols; j = j + 1) {
      sprites[sprites.length] = spriteImg.get(j * sWidth, i * sHeight, sWidth, sHeight);
    }
  }
}

function draw() {
  background(220);
  //let imagePick = frameCount%sprites.length
  //image(sprites[imagePick], 0, 0);
//let totalframes = sRows*sCols;
// 
if(isKeyPressed){
  count++;

}
image(sprites[count%sprites.length], 0,0)
}
