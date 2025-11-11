class Car{
    constructor(){
        this.x = x;
        this.y = y;
        this.speed = 5
        this.size = size
    }
    show(){
        rect(this.x,this.x,this.size,10)
        ellipse(this.x+10,this.y+20,20)
        ellipse(this.x+this.size+10,this.y+0,20)
    }
}