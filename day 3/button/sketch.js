let redColour = 0;
function setup() {
  createCanvas(400, 400);
}

function draw() {
  fill(redColour, 0, 200);
  background(220);

  rect(200, 200, 50, 50);
}
function mouseClicked() {
  if(mouseX>200 && mouseX < 250 && mouseY>200 && mouseY<250) {
redColour = redColour + 10;
    console.log("button clicked");
    
  }

}
