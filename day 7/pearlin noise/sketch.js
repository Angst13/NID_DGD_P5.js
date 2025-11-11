function setup() {
  createCanvas(innerWidth, innerHeight);
}

function draw() {
// backgroun(0,0,0,255)
//   let noiseValue = noise(0.01*frameCount );
//   let noiseMapped = map(noiseValue,0,1,10,200);
//   ellipse(width/2,height/2,noiseMapped);
//
for (let i = 0; i < width; i += 5) {
  for (let j = 0; j < height; j += 5) {
    let outputNoise = noise((i + frameCount) * 0.05, j * 0.05);
    fill(outputNoise * 255);
    rect(i, j, 5, 5);
  }
}
}
