
let nopetals = 12;
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(220);
drawFlower(12,100,200);

}
function drawFlower(petals,x,y){
   push();
  //move the origin
 
  translate(x,y);
   rotate(frameCount);
  
  for(let i=0; i<petals; i=i+1)
    {
    ellipse(80,0,100,50);
    rotate(360/petals);
  }
  //center of circle
  ellipse(0,0,50,50);
  pop();

}
