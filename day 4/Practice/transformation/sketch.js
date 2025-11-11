let size = 300
function setup() {
  createCanvas(innerWidth, innerHeight);
  angleMode(DEGREES)
  
}

function draw() { 
    background(220);
  
  for(i=0; i<width; i=i+size){
    for(j=0; j<height; j=j+size){
    
      push();
      translate(i,j);
      fill(i/5,j/5,100);
      rotate(mouseX);
      drawFlower(12,0,0)
      pop();
    }
  }

}


function drawFlower(petals,x,y){
push();
  translate(x,y)
  //petals
  for(let i=0;i<petals; i=i+1){

    fill(200,250,300,200);
    rotate(360/petals)
  ellipse(75,0,100,50)
  //center of petals
  fill("#e4ff60ff")
  ellipse(0,0,50,50);
  }
  pop();
  }
 
