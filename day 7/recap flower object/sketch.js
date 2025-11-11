
let flower
let flowers = []
function setup() {
  createCanvas(400, 400);

}

function draw() {
  background(220);
  for (let i = 0; i < flowers.length; i++) {
    flowers[i].checkPosition(mouseX,mouseY);
    flowers[i].drawFlower();
    flowers[i].moveFlower();
  }
}

function mousePressed() {
  let tempFlower = new Flower(mouseX, mouseY,random(-5,5),random(-5,5));
  flowers.push(tempFlower);
}