
let height= 300
let size=20
function setup() {
  createCanvas(1000, 1000);
  background(220);
  frameRate(10);
  strokeWeight(7);
  noFill();
}

function draw() { 
  background(220);

//create multiple rows
  for( let j=10; j<height; j=j+size){
// create row of circles
    for(let i=10; i<width; i=i+size){

      // Map position for gradient
      let r=map(i,0,width,random(255),255);
      let g=map(j,0,height,random(255),255);
      let b=map(i+j,0,width+height,random(255),255);
    let choice = random(0,1);
    if(choice<0.5){
      
      line(i+size,j,i,j+size);
      ellipse(i,j,size/2,size/2)
    } else{
      line(i,j,i+size,j+size)
      ellipse(i,j,size/6,size/6)
      stroke(r,g,b);
    }
  }
}
}
