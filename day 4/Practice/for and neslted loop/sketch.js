let size = 30
function setup() {
  createCanvas(innerWidth,innerHeight);
  background(220);
}

function draw() {
  
  for(let i=0; i<width; i=i+size){
    for(let j=0; j<height; j=j+size){
      ellipse(i,j,size,size)
    }
  }
}
