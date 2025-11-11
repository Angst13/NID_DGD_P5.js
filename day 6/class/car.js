class Car{
    constructor(x,y,size,speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = 5;
    }
    show() {
        rect(this.x, this.y, this.size,20);
        ellipse(this.x+10,this.y+20,10,)
        ellipse(this.x+this.size-10,this.y+20,10)
          
    }
    move(){
        this.x = this.x+this.speed;
    }
}