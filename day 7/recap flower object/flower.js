class Flower {
    constructor(x,y,xSpeed,ySpeed){
        this.x =x;
        this.y=y;
        this.xSpeed=xSpeed;
        this.ySpeed=ySpeed;
        this.size= size;
        this.selected= false;
    }
drawFlower() {
    // ellipse(this.x,this.y,20,50);
    // ellipse(this.x,this.y,size)
    ellipse(this.x,this.y,size)
    if(this.selected==true){
        fill("red")
    }
        else{
            fill("white")

        }
    }

    moveFlower() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (this.y + 25 > height || this.y - 25 < 0) {
            this.ySpeed = -this.ySpeed;
        }
        if (this.x + 25 > width || this.x - 25 < 0) {
            this.xSpeed = -this.xSpeed;
        }
    }

    checkposition(mX, mY) {
        // if mx and my are close to this.x and this.y make flower red, else make it white
        let distance = dist(mX, mY, this.x, this.y);
        if (distance < this.size / 2) {
            this.selected = true;
        } else {
            this.selected = false;
        }
    }
}

