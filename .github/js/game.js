function setup() {
  createCanvas(300, 450);
}

//Draw Rocket//

function drawRocket(positionX, positionY) {
  push();
  translate(positionX, positionY);
  noFill();
  stroke(420);
  strokeWeight(4);
  rect(-15, 25, 22, -45, 3, 3, 45, 45);
  pop();
}

function draw() {
  background(20);
  drawRocket(150, 125);
}

//Draw Environment//

function drawEnvironment() {
  background(20);
  push();
  noFill();
  stroke(220);
  ellipse(width / 2 - 40, height - 20, width / 8);
  ellipse(width / 2 + 30, height - 10, width / 8);
  ellipse(width / 2 + 20, height - 60, width / 8);
  ellipse(width / 2 - 30, height - 55, width / 28);
  ellipse(width / 2 + 70, height - 15, width / 28);
  strokeWeight(2.5);
  ellipse(width / 2, height - 20, width / 2);
  pop();
}

function draw() {
  drawEnvironment();
  drawrocket(155, 125);
}

//Write Gravity logic//
