let flowers = [];
let t = 0; 

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(220);

 
  for (let i = 0; i < flowers.length; i++) {
    
    flowers[i].sway();
    flowers[i].grow();
    flowers[i].drawFlower();
  }

  t += 0.01; 
}

function mousePressed() {
  let tempFlower = new Flower(mouseX, mouseY, random(10, 20));
  flowers.push(tempFlower);
}
