function setup() {
  createCanvas(1000, 1000);
  background(220);
}

function draw() {
  noStroke()
fill(mouseX/2, mouseY/2,mouseX/4+mouseY/4);

ellipse(mouseX, mouseY,50);
}
