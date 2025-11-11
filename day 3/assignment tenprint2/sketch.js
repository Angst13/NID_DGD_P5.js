let size = 40;

function setup() {
  createCanvas(900, 900);
  rectMode(CENTER);
  noFill();
  frameRate(6);
  strokeWeight(2.5);
}

function draw() {
  background(15, 15, 25);

  for (let y = size / 2; y < height; y += size) {
    for (let x = size / 2; x < width; x += size) {

      // color based on position and frame count
      let r = lerp(80, 255, x / width);
      let g = lerp(100, 255, y / height);
      let b = lerp(150, 255, (x + y) / (width + height));
      stroke(r, g, b);
      // choose a complex pattern
      let choice = int(random(6));

      push();
      translate(x, y);
      rotate(radians(random([0, 45, 90, 135, 180])));

      if (choice === 0) {
        // double square frame
        rect(0, 0, size * 0.9, size * 0.9);
        rect(0, 0, size * 0.5, size * 0.5);
      } 
      else if (choice === 1) {
        // circle + cross
        ellipse(0, 0, size * 0.8);
        line(-size / 2, 0, size / 2, 0);
        line(0, -size / 2, 0, size / 2);
      } 
      else if (choice === 2) {
        // triangle inside box
        rect(0, 0, size, size);
        triangle(-size / 2, size / 2, 0, -size / 2, size / 2, size / 2);
      } 
      else if (choice === 3) {
        // overlapping diagonals
        line(-size / 2, -size / 2, size / 2, size / 2);
        line(-size / 2, size / 2, size / 2, -size / 2);
        rect(0, 0, size * 0.6, size * 0.6);
      } 
      else if (choice === 4) {
        // nested circles
        ellipse(0, 0, size);
        ellipse(0, 0, size / 2);
        ellipse(0, 0, size / 4);
      } 
      else {
        // multi-shape blend
        rect(0, 0, size, size);
        ellipse(0, 0, size * 0.7);
        line(-size / 2, 0, size / 2, 0);
        line(0, -size / 2, 0, size / 2);
      }

      pop();
    }
  }


}