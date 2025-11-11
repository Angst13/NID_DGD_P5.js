let x,y,size
function setup() {
  createCanvas(400, 400);
  background(220);
  x=0
  y=0
  size=20
}

function draw() {

  //pick a random number between 0 an 1 
  choice = random(0,1);
  // if less than 0.5 ,draw draw "/, elsa dra \
  if(choice<0.5){ 
    line(x+size,y,x,y+size);
  
  } else {
    line(x,y,x+size,y+size)
  }
  //move the point to the right
  x = x + size;
  //if it reaches the edge, move it down and back to the start
  if(x>width){
    x=0;
    y=y+size;
  }
  //if it reaches the bottom, start over
  if(y>height){
    background(220);
    x=0;
    y=0;
  }
}
