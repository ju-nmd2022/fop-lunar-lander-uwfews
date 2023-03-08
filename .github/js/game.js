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

//Write Gravity logic//

let gravity = 0.05;
let rocket = {
  latitude: 155,
  altitude: 55,
  acceleration: 0,
  Speed: 0,
};

function applyGravity() {
  rocket.acceleration = gravity;
}

function acceleraterocket() {
  rocket.Speed += rocket.acceleration;
  rocket.altitude += rocket.Speed;
}

//Write Crash/Land Logic//

let gameIsRunning = true;
let crashSpeedLimit = 1.7;

function checkCollision() {
  if (rocket.altitude > 405) {
    if (rocket.Speed > crashSpeedThreshold) {
      // Speed would be too high at contact [CRASH]
      displayPrompt("You CRASHED. Press SPACE", 80, 220);
    } else {
      // Speed would be safe for contact [LAND]
      displayPrompt("You LANDED. Press SPACE", 80, 220);
    }
    rocket.altitude = 373;
    rocket.Speed = 0;
    rocket.acceleration = 0;
    gameIsRunning = false;
    gameState = "end";
  }
}

//Engine Logic//

let engineAcceleration = 0.12;

function activateengine() {
  rocket.acceleration -= engineAcceleration;
}

function checkInput() {
  if (keyIsPressed) {
    if (key === " ") {
      switch (gameState) {
        case "start":
          gameState = "game";
          gameIsRunning = true;
          break;
        case "game":
          activateengine();
          break;
        case "end":
          rocket.latitude = 150;
          rocket.altitude = 125;
          gameState = "game";
          gameIsRunning = true;
          break;
        default:
          break;
      }
    }
  }
}

function draw() {
  if (gameIsRunning) {
    drawEnvironment();
    applyGravity();
    checkInput();
    acceleraterocket();
    checkCollision();
    drawrocket(rocket.latitude, rocket.altitude);
  }
}

////
