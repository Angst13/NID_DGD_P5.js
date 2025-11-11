let size = 100;
let hexnumber =["#3acee1ff","#164e55ff","#004f5aff","#132b2eff","#043823ff","#0e383dff","#126e3eff","#32825dff","#17703fff","#3c912dff","#4c862bff"]
function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
  background(220);
  for(let i=0; i<width; i=i+size){
    for(let j=0; j<height; j=j+size){
      
      let choice = floor(random(0,hexnumber.length));
      fill(hexnumber[choice])
      rect(i,j,size,size);

    }
  }
}
