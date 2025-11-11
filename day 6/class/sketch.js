
let myCar
let yourCar
let Cars = [];
let noCars = 20;

function setup() {
  //creating an object from "car" blueprint
  createCanvas(400, 400);
  myCar = new Car(20,300,50,5);
  yourCar = new Car (40,200,100,5);

  for( let i=0; i<noCars; i+=1){
    let tempCar = new Car(random(0,width),random(0,height,),50,30);
    Cars.push(tempCar);
    
  }

}

function draw() {
  background(220);
  myCar.show();
  myCar.move();
  yourCar.show();
  yourCar.move();
}
