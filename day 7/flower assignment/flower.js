class Flower {
  constructor(x, y, baseSize) {
    this.x = x;
    this.y = y;
    this.baseX = x; 
    this.baseSize = random(40,80);
    this.centerColor = color(255, 204, 0);
    this.petals = floor(random(5, 12));
    this.size = baseSize * 0.5;
    this.growthRate = 0.2;
    this.noiseOffset = random(1000); 
    this.color = color(random(180,255), random(100,200), random(100,255));
  }

  sway() {
    let swayAmount = noise(t + this.noiseOffset) * 2 - 1; 
    this.x = this.baseX + swayAmount * 15;
  }

  grow() {
    if (this.size < this.baseSize) {
      this.size += this.growthRate;
    }
  }
  

  

  drawFlower() {
       push();
    translate(this.x, this.y);
    rotate(frameCount * 0.5); 
    noStroke();
    fill(this.color);

    for (let i = 0; i < this.petals; i++) {
      ellipse(this.size * 0.8, 0, this.size, this.size * 0.5);
      rotate(360 / this.petals);
    }

   
    fill(this.centerColor);
    ellipse(0, 0, this.size * 0.5);
    pop();
  }
  }
