function setup() {
  createCanvas(300, 450);
}

//Draw Rocket//

function drawrocket(positionX, positionY) {
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
  drawrocket(150, 125);
}
