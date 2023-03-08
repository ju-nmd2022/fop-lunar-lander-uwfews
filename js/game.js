function setup() {
  createCanvas(300, 450);
}

//Draw Rocket//

function drawRocket(positionX, positionY) {
  push();
  translate(positionX, positionY);
  fill(20, 20, 240);
  stroke(420);
  strokeWeight(4);
  rect(-15, 25, 22, -45, 3, 3, 45, 45);
  pop();
}

function draw() {
  background(10, 10, 50);
  drawRocket(155, 125);
}

//Draw Environment//

function drawEnvironment() {
  background(10, 10, 50);
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
  ellipse(width / 2, 420, width / 16 + 10, height / 110);
  stroke(160);
  strokeWeight(2);
  ellipse(width / 2, height - 20, width / 2 + 3);
  pop();
}

function draw() {
  drawEnvironment();
  drawRocket(155, 125);
}

//Write Gravity logic//

let Gravity = 0.05;
let Rocket = {
  Latitude: 155,
  Altitude: 55,
  Acceleration: 0,
  Speed: 0,
};

function ApplyGravity() {
  Rocket.Acceleration = Gravity;
}

function AccelerateRocket() {
  Rocket.Speed += Rocket.Acceleration;
  Rocket.Altitude += Rocket.Speed;
}

function draw() {
  drawEnvironment();
  ApplyGravity();
  AccelerateRocket();
  drawRocket(Rocket.Latitude, Rocket.Altitude);
}

//Write Crash/Land Logic//

let gameIsRunning = true;
let crashSpeedLimit = 1.7;

function checkCollision() {
  if (Rocket.Altitude > 390) {
    if (Rocket.Speed > crashSpeedLimit) {
      displayPrompt("ROCKET EXPLODED. Press SPACE", 50, 220);
    } else {
      displayPrompt("LANDED SUCCESSFULLY. Press SPACE", 35, 220);
    }
    Rocket.Altitude = 390;
    Rocket.Speed = 0;
    Rocket.Acceleration = 0;
    gameIsRunning = false;
    gameState = "end";
  }
}

function draw() {
  if (gameIsRunning) {
    drawEnvironment();
    applyGravity();
    AccelerateRocket();
    checkCollision();
    drawRocket(Rocket.latitude, Rocket.Altitude);
  }
}

//Engine Logic//

let EngineAcceleration = 0.12;

function activateEngine() {
  Rocket.Acceleration -= EngineAcceleration;
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
          activateEngine();
          break;
        case "end":
          Rocket.Latitude = 150;
          Rocket.Altitude = 125;
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
    AccelerateRocket();
    checkCollision();
    drawRocket(Rocket.Latitude, Rocket.Altitude);
  }
}

//start/end page//

let gameState = "start";

function displayPrompt(message, positionX, positionY) {
  push();
  stroke(200);
  fill(200);
  text(message, positionX, positionY);
  pop();
}

function draw() {
  switch (gameState) {
    case "start":
      drawEnvironment();
      drawRocket(Rocket.Latitude, Rocket.Altitude);
      displayPrompt("Press Space to start", 105, 120);
      checkInput();
      break;
    case "game":
      if (gameIsRunning) {
        drawEnvironment();
        ApplyGravity();
        checkInput();
        AccelerateRocket();
        checkCollision();
        drawRocket(Rocket.Latitude, Rocket.Altitude);
      }
      break;
    case "end":
      checkInput();
      break;
    default:
      break;
  }
}
