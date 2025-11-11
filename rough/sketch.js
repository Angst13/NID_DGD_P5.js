let quad1x1= 30
let quad1y1=30
let quad1x2= 50
let quad1y2=550
let quad1x3= 420
let quad1y3=500
let quad1x4= 400
let quad1y4=50
let quad2x1= 60
let quad2y1=360
let quad2x2= -15
let quad2y2=500
let quad2x3= 380
let quad2y3=300
let quad2x4= 260
let quad2y4=260
let quad3x1= 80
let quad3y1=380
let quad3x2= 5
let quad3y2=520
let quad3x3= 400
let quad3y3=320
let quad3x4= 280
let quad3y4=280
let quad4x1= 100
let quad4y1=400
let quad4x2= 25
let quad4y2=550
let quad4x3= 420
let quad4y3=350
let quad4x4= 300
let quad4y4=300
let quad5x1= 120
let quad5y1=420
let quad5x2= 35
let quad5y2=575
let quad5x3= 440
let quad5y3=380
let quad5x4= 320
let quad5y4=320
let quad6x1= 140
let quad6y1=440
let quad6x2= 55
let quad6y2=600
let quad6x3= 460
let quad6y3=400
let quad6x4= 340
let quad6y4=340
let quad7x1= 160
let quad7y1=460
let quad7x2= 85
let quad7y2=620
let quad7x3= 480
let quad7y3=420
let quad7x4= 360
let quad7y4=360
//TRIANGLE
let triangle1x1= 25
let triangle1y1=100
let triangle1x2= 75
let triangle1y2=320
let triangle1x3= 120
let triangle1y3=100
//
let triangle2x1= 25
let triangle2y1=120
let triangle2x2= 75
let triangle2y2=340
let triangle2x3= 140
let triangle2y3=120
//
let triangle3x1= 25
let triangle3y1=140
let triangle3x2= 75
let triangle3y2=360
let triangle3x3= 160
let triangle3y3=140
//
let triangle4x1= 154
let triangle4y1=180
let triangle4x2= 400
let triangle4y2=25
let triangle4x3= 405
let triangle4y3=230
// 
let triangle5x1= 174
let triangle5y1=200
let triangle5x2= 420
let triangle5y2=25
let triangle5x3= 425
let triangle5y3=250
//
let triangle6x1= 194
let triangle6y1=220
let triangle6x2= 440
let triangle6y2=25
let triangle6x3= 445
let triangle6y3=280 
//
let triangle7x1=194
let triangle7y1=220
let triangle7x2=440
let trianlge7y2=25
let triangle7x3=445
let triangle7y3=288
//quad last1
let quad8x1= 70
let quad8y1=150
let quad8x2= 50
let quad8y2=250
let quad8x3= 120
let quad8y3=250
let quad8x4= 120
let quad8y4=170
//quad last2
let quad9x1= 280
let quad9y1=154
let quad9x2= 300
let quad9y2=250
let quad9x3= 400
let quad9y3=200
let quad9x4= 380
let quad9y4=130
//transition progress
let t = 0; 
//
let midQuadAlpha = 0;
function setup() {
  createCanvas(450, 600);
  
}

function draw() {
  background(220);
  stroke('#000000')
  strokeWeight(1.7);
  //
  
  //quad1
  let c1 = lerpColor(color('#2b133e'), color('#ff4d6d'), t);
  fill(c1);
  quad(quad1x1,quad1y1,quad1x2,quad1y2,quad1x3,quad1y3,quad1x4,quad1y4);
//quad2
let c2 = lerpColor(color('#0c0b00'), color('#ff7f7f'), t);
  fill(c2);
  quad(quad2x1,quad2y1,quad2x2,quad2y2,quad2x3,quad2y3,quad2x4,quad2y4)
  //quad3
  let c3 = lerpColor(color('#191701'), color('#ff7f7f'), t);
  fill(c3);
  quad(quad3x1,quad3y1,quad3x2,quad3y2,quad3x3,quad3y3,quad3x4,quad3y4)
  //quad4
  let c4 = lerpColor(color('#262201'), color('#ff7f7f'), t);
  fill(c4);
  quad(quad4x1,quad4y1,quad4x2,quad4y2,quad4x3,quad4y3,quad4x4,quad4y4);
  //quad5
  let c5 = lerpColor(color('#63571c'), color('#ff7f7f'), t);
  fill(c5);
  quad(quad5x1,quad5y1,quad5x2,quad5y2,quad5x3,quad5y3,quad5x4,quad5y4);
  //quad6
  let c6 = lerpColor(color('#7f6d4c'), color('#ff7f7f'), t);
  fill(c6);
  quad(quad6x1,quad6y1,quad6x2,quad6y2,quad6x3,quad6y3,quad6x4,quad6y4);
  //quad7
  let c7 = lerpColor(color('#5c7353'), color('#ff7f7f'), t);
  fill(c7);
  quad(quad7x1,quad7y1,quad7x2,quad7y2,quad7x3,quad7y3,quad7x4,quad7y4);

  //
  fill('#262201')
  triangle(triangle1x1,triangle1y1,triangle1x2,triangle1y2,triangle1x3,triangle1y3);
  fill('#63571c')
  triangle(triangle2x1,triangle2y1,triangle2x2,triangle2y2,triangle2x3,triangle2y3);
  fill('#2e3f26')
  triangle(triangle3x1,triangle3y1,triangle3x2,triangle3y2,triangle3x3,triangle3y3);
  //
  triangle(triangle4x1,triangle4y1,triangle4x2,triangle4y2,triangle4x3,triangle4y3);
  fill('#2e3f26')
  triangle(triangle5x1,triangle5y1,triangle5x2,triangle5y2,triangle5x3,triangle5y3);
  fill('#63571c')
  triangle(triangle6x1,triangle6y1,triangle6x2,triangle6y2,triangle6x3,triangle6y3);
  
  fill('#490c0c')
  quad(quad8x1, quad8y1, quad8x2, quad8y2, quad8x3, quad8y3, quad8x4, quad8y4);
  quad(quad9x1, quad9y1, quad9x2, quad9y2, quad9x3, quad9y3, quad9x4, quad9y4);
  fill('#6d0f2aff')
  circle(100,200,50)
  circle(320,200,50)
  fill('#fffbf0ff')
  circle(320,200,frameCount%30)
  circle(100,200,frameCount%34)
  //
  if (midQuadAlpha < 255) {
  midQuadAlpha += 1; // increase speed if you want faster fade (try 4 for quicker)
}

fill(112, 15, 49, midQuadAlpha); // '#700f31ff' but with transparency
quad(100, 370, 170, 500, 280, 500, 350, 370);
  //
  
  //
  //coordinate frame count 
 quad1x1= quad1x1+0.8
 quad1y1= quad1y1+0.8
 quad1x2= quad1x2+0.8
 quad1y2= quad1y2-0.8
 quad1x3= quad1x3-0.8
 quad1y3= quad1y3-0.8
 quad1x4= quad1x4-0.8
 quad1y4= quad1y4+0.8
 //
 quad2x1= quad2x1+0.2
 quad2y1= quad2y1-0.15
 quad2x2= quad2x2+0.15
 quad2y2= quad2y2-0.15
 quad2x3= quad2x3-0.15
 quad2y3= quad2y3-0.15
 quad2x4= quad2x4-0.15
 quad2y4= quad2y4+0.15
 //
 quad3x1= quad3x1+0.2
 quad3y1= quad3y1-0.1
 quad3x2= quad3x2+0.1
 quad3y2= quad3y2-0.1
 quad3x3= quad3x3-0.1
 quad3y3= quad3y3-0.1
 quad3x4= quad3x4-0.1
 quad3y4= quad3y4+0.1
  //
  quad4x1= quad4x1+0.5
  quad4y1= quad4y1-0.5
  quad4x2= quad4x2+0.5
  quad4y2= quad4y2-0.5
  quad4x3= quad4x3-0.5
  quad4y3= quad4y3-0.5
  quad4x4= quad4x4-0.5
  quad4y4= quad4y4+0.5
  //
  quad5x1= quad5x1+0.3
  quad5y1= quad5y1-0.3
  quad5x2= quad5x2+0.3
  quad5y2= quad5y2-0.3
  quad5x3= quad5x3-0.3
  quad5y3= quad5y3-0.3
  quad5x4= quad5x4-0.3
  quad5y4= quad5y4+0.3
  //
  quad6x1= quad6x1+0.6
  quad6y1= quad6y1-0.6
  quad6x2= quad6x2+0.6
  quad6y2= quad6y2-0.6
  quad6x3= quad6x3-0.6   
  quad6y3= quad6y3-0.6
  quad6x4= quad6x4-0.6
  quad6y4= quad6y4+0.6
  //
  quad7x1= quad7x1+0.4
  quad7y1= quad7y1-0.4
  quad7x2= quad7x2+0.4
  quad7y2= quad7y2-0.4
  quad7x3= quad7x3-0.4   
  quad7y3= quad7y3-0.4
  quad7x4= quad7x4-0.4
  quad7y4= quad7y4+0.4
  //
  triangle1x1= triangle1x1+0.4
  triangle1y1= triangle1y1+0.4
  triangle1x2= triangle1x2+0.4
  triangle1y2= triangle1y2-0.4
  triangle1x3= triangle1x3+0.4
  triangle1y3= triangle1y3+0.4
  //
  triangle2x1= triangle2x1+0.4
  triangle2y1= triangle2y1+0.4
  triangle2x2= triangle2x2+0.4
  triangle2y2= triangle2y2-0.4
  triangle2x3= triangle2x3+0.4
  triangle2y3= triangle2y3+0.4
  //
  triangle3x1= triangle3x1+0.4
  triangle3y1= triangle3y1+0.4
  triangle3x2= triangle3x2+0.4
  triangle3y2= triangle3y2-0.4
  triangle3x3= triangle3x3+0.4
  triangle3y3= triangle3y3+0.4
  //
  triangle4x1= triangle4x1+0.4
  triangle4y1= triangle4y1+0.4
  triangle4x2= triangle4x2+0.4
  triangle4y2= triangle4y2-0.4
  triangle4x3= triangle4x3+0.4
  triangle4y3= triangle4y3+0.4
  //
  triangle5x1= triangle5x1+0.4
  triangle5y1= triangle5y1+0.4
  triangle5x2= triangle5x2+0.4
  triangle5y2= triangle5y2-0.4
  triangle5x3= triangle5x3+0.4
  triangle5y3= triangle5y3+0.4
  //
  triangle6x1= triangle6x1+0.4
  triangle6y1= triangle6y1+0.4
  triangle6x2= triangle6x2+0.4
  triangle6y2= triangle6y2-0.4
  triangle6x3= triangle6x3+0.4
  triangle6y3= triangle6y3+0.4
  //
   quad8x1= quad8x1+0.2
   quad8y1= quad8y1+0.2
   quad8x2= quad8x2+0.2
   quad8y2= quad8y2+0.2
   quad8x3= quad8x3+0.2
   quad8y3= quad8y3+0.2
   quad8x4= quad8x4+0.2
   quad8y4= quad8y4+0.2
   //
   quad9x1= quad9x1+0.2
   quad9y1= quad9y1+0.2
   quad9x2= quad9x2+0.2
   quad9y2= quad9y2+0.2
   quad9x3= quad9x3+0.2
   quad9y3= quad9y3+0.2
   quad9x4= quad9x4+0.2
   quad9y4= quad9y4+0.2   
  
  //
  t += 0.01; 
  t = constrain(t, 0, 1); // Ensure t stays within [0, 1]
  
}
