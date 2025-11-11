let gBall;
function setup() {
  createCanvas(400, 400);
  gBall = new Ball(width/2,height/2,5,3);
  console.log(gBall);
}

function draw() {
  background(220);
  gBall.show();
}
 