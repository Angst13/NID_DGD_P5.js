
let overlays = [];

let pic1, pic2, pic3, pic4, pic5, pic6;
let pic7, pic8, pic9, pic10, pic11, pic12, pic13, pic14, pic15, pic16, pic17, pic18, pic19, pic20, pic21, pic22,pic23,pic24,pic25,pic26;
//
let showPanelOverlay = []; // global panel visibility array
let posX1 = 0
let posY1 = 0
let posX2 = 0
let posY2 = 0
let posX3 = 0
let posY3 = 0
let posX4 = 0
let posY4 = 0
let posX5 = 0
let posY5 = 0
let posX6 = 0
let posY6 = 0
let posX7 = 0
let posY7 = 0
let posY8 = 0
let posX8 = 0
let posY9 = 0
let posX9 = 0
let posY10 = 0
let posX10 = 0
let posY11 = 0
let posX11 = 0
let posY12 = 0
let posX12 = 0
let posY13 = 0
let posX13 = 0
let posY14 = 0
let posX14 = 0
let posY15 = 200
let posX15 = 200
let posY16 = 0
let posX16 = 0
let posY17 = 0
let posX17 = 0
let posY18 = 0
let posX18 = 0
let posY19 = 0
let posX19 = 0
let posY20 = 0
let posX20 = 0
let posY21 = 0    
let posX21 = 0  
let posY22 = 0    
let posX22 = 0    
let posY23 = 0    
let posX23 = 0
let posX24 = 0    
let posY24 = 0
let posX25 = 0    
let posY25 = 0
//scale 
let scale2 = 1;
let scale3 = 1;
let scale4 = 1;
let scale5 = 1;
let scale6 = 1;
let scale7 = 1;
let scale8 = 1;
let scale9 = 1;
let scale10 = 1;
let scale11 = 1;
let scale12 = 1;
let scale13 = 1;
let scale14 = 1;
let scale15 = 1;
let scale16 = 1;
let scale17 = 1;
let scale18 = 1;
let scale19 = 1;
let scale20 = 1;
let scale21 = 1;
let scale22 = 1;
let scale23 = 1;
let scale24 = 1;
let scale25 = 1;

//pic9

//t rotation9 = 0; // rotation angle for pic9
// let rPosX9=-689; // rotation position x
// let rPosY9=-553; // rotation position y
// let pivotX = 100; // pixels from left of image
// let pivotY = 50;
let isSwR = false; // to switch the image of pic9
let isswrcut = false; // to switch the image of pic11
function preload() {
  pic1 = loadImage("images/vaga1full.png");
  pic7 = loadImage("images/v6.png");
  pic8 = loadImage("images/v7.png");
  pic9 = loadImage("images/v8.png");
  pic10 = loadImage("images/v9.png");
  //pic11 = loadImage("images/v10.png");
  pic12 = loadImage("images/v11.png");
  pic13 = loadImage("images/v12.png");
  pic14 = loadImage("images/v13.png");
  pic15 = loadImage("images/v14.png");
  pic16 = loadImage("images/v15.png");
  pic17 = loadImage("images/v16.png");
  pic18 = loadImage("images/v17.png");
  pic19 = loadImage("images/v18.png");
  pic20 = loadImage("images/v19.png");
  pic2 = loadImage("images/v1.png");
  pic3 = loadImage("images/v2.png");
  pic4 = loadImage("images/v3.png");
  pic5 = loadImage("images/v4.png");
  pic6 = loadImage("images/v5.png");
  pic21 = loadImage("images/vaga2.png");
  pic22 = loadImage("images/v22.png");
  pic23 = loadImage("images/vagapanel.png");
  pic24 = loadImage("images/v23.png");
  pic25 = loadImage("images/v24.png");
  pic26 = loadImage("images/v25.png");
//panel
// ---------- PANEL VISIBILITY ----------
showPanelOverlay = [];
for (let i = 2; i <= 20; i++) {
  showPanelOverlay[i] = true; // overlay visible initially
}
}


function setup() {
  createCanvas(2000, 1414);
  frameRate(60);
  setupOverlays(); // initialize overlay positions

  //angleMode(DEGREES); 

}


function draw() {
  background(220);

  drawOverlays();
  image(pic1, 0, 0, 2000, 1414);

  image(pic2, 0, posY2, 2000+scale2, 1414+scale2);
  image(pic3, 0, posY3, 2000+scale3, 1414+scale3);
  //image(pic4, posX4, posY4, 2000, 1414);
  image(pic21, 0, 0, 2000, 1414);

  image(pic5, posX5, posY5, 2000, 1414);
  image(pic6, posX6, posY6, 2000+scale6, 1414+scale6);
  image(pic7, posX7, posY7, 2000+scale7, 1414+scale7);
  image(pic8, posX8, posY8, 2000+scale8, 1414+scale8);
  // image(pic9, posX9, posY9, 2000, 1414);
  image(pic10, posX10, posY10, 2000+scale10, 1414+scale10);
  //image(pic11, posX11, posY11, 2000+scale11, 1414+scale11);
  image(pic12, posX12, posY12, 2000+scale12, 1414+scale12);
  image(pic13, posX13, posY13, 2000+scale13, 1414+scale13);
  image(pic14, posX14, posY14, 2000+scale14, 1414+scale14);
  image(pic15, posX15, posY15, 2000+scale15, 1414+scale15);
  image(pic16, posX16, posY16, 2000+scale16, 1414+scale16);
  image(pic17, posX17, posY17, 2000+scale17, 1414+scale17);
  image(pic18, posX18, posY18, 2000+scale18, 1414+scale18);
  image(pic19, posX19, posY19, 2000+scale19, 1414+scale19);
  
  //image(pic24, posX24, posY24, 2000+scale24, 1414+scale24);
  //image(pic25, posX25, posY25, 2000+scale25, 1414+scale25);
  //image(pic21, 0, 0, 2000, 1414);
  image(pic4, posX4, posY4, 2000, 1414);
  image(pic26, 0, 0, 2000, 1414);
  
  //image(pic7, posX7, posY7, 2000, 1414);
 image(pic23, 0, 0, 2000, 1414);
 
  //rotated image
  // push();
  // translate( posX9+pivotX, posY9+pivotY);// position where image should appear
  // rotate(rotation9); 
  // image(pic9,-pivotX, -pivotY, 2000, 1414); 
  // pop(); // reset transformations

  /* edits by mathura

  if(isSwR == false) {
  image(pic9.....)
  } else {
    imaage(pic9Alt,....)}
  */
if(isSwR == false) {
  image(pic9, 0, 0, 2000, 1414);
  } else {
    image(pic22,-29,80, 2000, 1414);
  }

if(isswrcut == false) {
  image(pic25, 70, 50, 2000+scale25, 1414+scale25);
  } else {
    image(pic24, 0, 0, 2000+scale24, 1414+scale24);
  }
  fill(0);
  noStroke();
  textSize(20);
  text("mouseX: " + mouseX + "  mouseY: " + mouseY, 20, 20);
image(pic20, posX20, posY20, 2000+scale20, 1414+scale20);
// 
drawOverlays();
}
function mouseClicked() {
  // panels
  
  //pic2
  if (mouseX > 60 && mouseX < 215 && mouseY > 10 && mouseY < 300) {
    if (posX2 == 0 && posY2 == 0) {
      posX2 += 1;
      posY2 += 10;
    } else {
      posX2 = 0;
      posY2 = 0;
    }
  }

  // pic3
  if (mouseX > 250 && mouseX < 400 && mouseY > 10 && mouseY < 297) {
    if (posX3 == 0 && posY3 == 0) {
      posX3 += 1;
      posY3 += 10;
    } else {
      posX3 = 0;
      posY3 = 0;
    }
  }

  // pic4
  if (mouseX > 400 && mouseX < 499 && mouseY > 10 && mouseY < 500) {
    if (posX4 == 0 && posY4 == 0) {
      posX4 += 0;
      posY4 += 10;
    } else {
      posX4 = 0;
      posY4 = 0;
    }
  }
  // pic5
  if (mouseX > 65 && mouseX < 512 && mouseY > 325 && mouseY < 454) {
    if (posX5 == 0 && posY5 == 0 &&  scale5==1) {
      posX5 += -2;
      posY5 += 2;
    } else {
      posX5 = 0;
      posY5 = 0;
    }
  }
  //pic6
  if (mouseX > 59 && mouseX < 502 && mouseY > 490 && mouseY < 716) {
    if (posX6 == 0 && posY6 == 0 && scale6==1) {
      posX6 -= 30;
      posY6 -= 70;
      scale6 += 200;
    } else {
      posX6 = 0;
      posY6 = 0;
      scale6 = 1;
    }
  }
  //pic7
  if (mouseX > 549 && mouseX < 992 && mouseY > 21 && mouseY < 373) {
    if (posX7 == 0 && posY7 == 0) {
      posX7 -= 100;
      posY7 += 80;
    } else {
      posX7 = 0;
      posY7 = 0;
    }
  }
  //pic8 (arm)
  if (mouseX > 789 && mouseX < 991 && mouseY > 394 && mouseY < 707) {
    if (posX8 == 0 && posY8 == 0 && scale8==1) {
      posX8 -= 40;
      posY8 += 0;
      scale8 += 100;
    } else {
      posX8 = 0;
      posY8 = 0;
      scale8 = 1;
    }
  }
  //pic9 (sword)
  if (mouseX > 547 && mouseX < 782 && mouseY > 392 && mouseY < 707) {
    isSwR = !isSwR; // toggle true/false each time you click the sword
  }
  // pic10
  if (mouseX > 1521 && mouseX < 1678 && mouseY > 28 && mouseY < 684) {
    if (posX10 == 0 && posY10 == 0 && scale10==1) {
      posX10 -= 150;
      posY10 -= 30;
      scale10 += 200;
    } else {
      posX10 = 0;
      posY10 = 0;
      scale10 = 1;
    }
  }
  //pic11 (sword cut)
  if (mouseX > 1687 && mouseX < 1942 && mouseY > 24 && mouseY < 684) {
    isswrcut = !isswrcut; // toggle true/false each time you click the sword
  }
  //pic12 
  if (mouseX > 58 && mouseX < 341 && mouseY > 736 && mouseY < 929) {
    if (posX12 == 0 && posY12 == 0 && scale12 == 1) {
      posX12 -= 150;
      posY12 -= 30;
      scale12 += 200;
    } else {
      posX12 = 0;
      posY12 = 0;
      scale12 = 1;
    }
  }
  // pic13
  if (mouseX > 60 && mouseX < 363 && mouseY > 947 && mouseY < 1234) {
    if (posX13 == 0 && posY13 == 0 && scale13 == 1) {
      posX13 -= 10;
      posY13 -= 130;
      scale13 += 200;
    } else {
      posX13 = 0;
      posY13 = 0;
      scale13 = 1;
    }
  }
  //14
  if(mouseX>59 && mouseX<389 && mouseY>1251 && mouseY<1382){
    if (posX14 == 0 && posY14 == 0 && scale14==1){
      posX14 += 20;
      posY14 += 185;
      scale14 -= 200;
    } else {
      posX14 = 0;
      posY14 = 0;
      scale14 = 1;
    }
  }
  //15
  if(mouseX>351 && mouseX<495 && mouseY>738 && mouseY<1381){
    if (posX15 == 0 && posY15 == 0 && scale15==1){
      posX15 += 200;
      posY15 += 200;
      scale15 -= 0;
    } else {
      posX15 = 0;
      posY15 = 0;
      scale15 = 1;
    }
  }
  //16
  if(mouseX>526 && mouseX<968 && mouseY>743 && mouseY<1381){
    if (posX16 == 0 && posY16 == 0 && scale16==1 && posX17 == 0 && posY17 == 0 && scale17==1){
      posX16 += 80;
      posY16 -= 20;
      scale16 -= 100;
      posX17 = 30;
      posY17 += 0;
      scale17 += 100;
    } else {
      posX16 = 0;
      posY16 = 0;
      scale16 = 1;
      posX17 = 0;
      posY17 = 0;
      scale17 = 1;
    }
  }
  //18
  if (mouseX > 1014 && mouseX < 1116 && mouseY > 718 && mouseY < 949) {
    if (posX18 == 0 && posY18 == 0 && scale18 == 1) {
      posX18 -= 10;
      posY18 += 0;
      scale18 += 0;
    } else {
      posX18 = 0;
      posY18 = 0;
      scale18 = 1;
    }
  }
  //19
  if (mouseX > 1012 && mouseX < 1450 && mouseY > 966 && mouseY < 1405) { 
    if (posX19 == 0 && posY19 == 0 && scale19 == 1) {
      posX19 -= 50;
      posY19 += 70;
      scale19 += 0;
    } else {
      posX19 = 0;
      posY19 = 0;
      scale19 = 1;
    }
  }
  //20
  if (mouseX > 1493 && mouseX < 1944 && mouseY > 734 && mouseY < 1396) {
    if (posX20 == 0 && posY20 == 0 && scale20 == 1) {
      posX20 -= 8900;
      posY20 -= 10000;
      scale20 += 10000;
    } else {
      posX20 = 0;
      posY20 = 0;
      scale20 = 1;
    }
  }

  
}

/* mathura

 if (mouseX > 547 && mouseX < 782 && mouseY > 394 && mouseY < 707) {
    if (posX9 == 0 && posY9 == 0) {
      isSwR = true;


    } else {
      isSwR = false;
    }
  }
*/
