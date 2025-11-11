
let c
function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
 c= map(mouseX,0,innerWidth,0,255);
 background(c)
}
