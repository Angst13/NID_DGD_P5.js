
let size = 50,g0,g1,g2,g3,g4;

function preload() {
  g0 = loadImage('images/g0.jpeg');
  g1 = loadImage('images/g1.jpeg');
  g2 = loadImage('images/g2.jpeg');
  g3 = loadImage('images/g3.jpeg');
  g4 = loadImage('images/g4.jpeg');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(24);

}

function draw() {
  background(220);
  //
  for(let i= 0; i < width; i=i+size) {
    for(let j= 0; j < height; j=j+size) {
      let choice = floor(random(0, 5));
      if(choice==0) {
        image(g0,i,j,size,size);
      } else if(choice==1) {
        image(g1,i,j,size,size);
      } else if(choice==2) {
        image(g2,i, j,size,size);
      } else{
        image(g3,i,j,size,size);
      } 
      
    }
  }
}
``