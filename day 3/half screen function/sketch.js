function setup() {
  createCanvas(windowWidth, windowHeight);
    background(220);
}

function draw() {

}
function mouseClicked() {
  if(mouseY < height/2) {
    fill("blue");
    rect(mouseX, mouseY, 20, 20);
  } else {
    fill("red");
    rect(mouseX, mouseY, 50, 20);
}
}