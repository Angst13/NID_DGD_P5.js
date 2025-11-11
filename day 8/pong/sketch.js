let gBall;
let lpaddle,rpaddle;
let player1 = 0, player2 = 0;
function setup() {
  createCanvas(400, 400);
  gBall = new Ball(width/2,height/2,8,3);
  console.log(gBall);
  //create paddles
  let pWidth = 10, pHeight =40
  lpaddle = new Paddle(0,height/2 - pHeight/2,pWidth,pHeight,50);
  rpaddle = new Paddle(width - pWidth,height/2 - pHeight/2,pWidth,pHeight,30);
}

function draw() {
  background(220);
 
  lpaddle.show();
  rpaddle.show();
  //BALL BEHAVIOUR

  gBall.move();
  gBall.checkCollisionPaddle(lpaddle);
  gBall.checkCollisionPaddle(rpaddle);
  gBall.checkCollisionWall();
  gBall.show();

  let point = gBall.checkWinner();
  if(point == 1) {
    player1++;
    gBall.reset();
    console.log("p1 vs p2 :" + player1 + " " + player2)

  } else if(point ==2 ) {
    player2++;
    gBall.reset();
    console.log("p1 vs p2 :" + player1 + " " + player2)
  }
  // if key up and down are pressed move the paddles
  if(keyIsDown(UP_ARROW)){
    rpaddle.moveUp();

  }else if(keyIsDown(DOWN_ARROW)){
    rpaddle.moveDown()
  }

  if(keyIsDown(87)){
    lpaddle.moveUp();
  }else if(keyIsDown(83)){
    lpaddle.moveDown();
  }

  //if keys w and s are are pressed move the left paddle
  //if keys W and S are pressed, move the left paddle
  if(keyIsDown(87)) {
    lPaddle.moveUp();
  } else if(keyIsDown(83)){
    lPaddle.moveDown();
  } 

  lpaddle.show();
  rpaddle.show();
}