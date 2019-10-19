const Gpio = require('pigpio').Gpio;
const wheelLeftFront = new Gpio(7, {mode: Gpio.OUTPUT});
const wheelRightFront = new Gpio(10, {mode: Gpio.OUTPUT});
const wheelLeftBack = new Gpio(8, {mode: Gpio.OUTPUT});
const wheelRightBack = new Gpio(9, {mode: Gpio.OUTPUT});
var gamepad = require("gamepad");

// Initialize the library
gamepad.init()


function forward() {
  wheelLeftFront.pwmWrite(255);
  wheelRightFront.pwmWrite(255);
}

function stop() {
  wheelLeftFront.pwmWrite(0);
  wheelRightFront.pwmWrite(0);
  wheelLeftBack.pwmWrite(0);
  wheelRightBack.pwmWrite(0);
}

function curveRight() {
  wheelLeftFront.pwmWrite(255);
  wheelRightFront.pwmWrite(100);
}
function curveLeft() {
  wheelLeftFront.pwmWrite(100);
  wheelRightFront.pwmWrite(255);
}

function right() {
  wheelLeftFront.pwmWrite(255);
  wheelRightBack.pwmWrite(255);
}
function left() {
  wheelRightFront.pwmWrite(255);
  wheelLeftBack.pwmWrite(255);
}

let buttonD = false;

// List the state of all currently attached devices
for (var i = 0, l = gamepad.numDevices(); i < l; i++) {
  console.log(i, gamepad.deviceAtIndex());
}
 
// Create a game loop and poll for events
setInterval(gamepad.processEvents, 16);
// Scan for new gamepads as a slower rate
setInterval(gamepad.detectDevices, 500);

// Listen for move events on all gamepads
gamepad.on("move", function (id, axis, value) {
  console.log("move", {
    id: id,
    axis: axis,
    value: value,
  });
  if (axis == 6) {
  if (value < -0.031) {
    if (buttonD) {
      curveLeft();
    } else {
      left();
    }
  }
   else if (value > 0.031) {
    if (buttonD) {
      curveRight();
    } else {
      right();
    }
  }
  else {
    if (buttonD) {
      forward()
    } else {
      stop();
      buttonD = false;
    }
  }
}
});

// Listen for button up events on all gamepads
gamepad.on("up", function (id, num) {
  console.log("up", {
    id: id,
    num: num,
  });
  stop();
  buttonD = false;
});

// Listen for button down events on all gamepads
gamepad.on("down", function (id, num) {
  console.log("down", {
    id: id,
    num: num,
  });
  if (num == 0) {
    forward();
    buttonD = true;
  }
});

process.on('SIGINT', _ => {
  wheel1.unexport
  wheel2.unexport
})