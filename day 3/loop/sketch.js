
let size=20
function setup() {
  createCanvas(400, 400);
  background(220);
  frameRate(10);
}

function draw() { background(220);

//create multiple rows
  for( let j=10; j<height; j=j+size){
// create row of circles
    for(let i=10; i<width; i=i+size){
    let choice = random(0,1);
    if(choice<0.5){
      line(i+size,j,i,j+size);
    } else{
      line(i,j,i+size,j+size)
    }
    }
}
}
