var five = require('johnny-five');

module.exports = BotBot;



function BotBot(botBoard){

  // Default the pins for the wheels to ones that can output "PWM" on the Arduino
  var leftWheelPin = 9,
    rightWheelPin = 10;

  // If the robot is on the spark board, we need to change the pins
  if(botBoard.port === 'spark-io'){
    leftWheelPin = 'A0';
    rightWheelPin = 'A1';
  }

  this.leftWheel  = new five.Servo({ pin:  leftWheelPin, type: 'continuous', board: botBoard }).stop();
  this.rightWheel = new five.Servo({ pin: rightWheelPin, type: 'continuous', board: botBoard }).stop();

}

BotBot.prototype.stop = function(){

  this.leftWheel.stop();
  this.rightWheel.stop();

  return this;
};

BotBot.prototype.drive = function(direction){

  var drive = {
    left : _driveLeft,
    right : _driveRight,
    forward : _driveForward,
    backward : _driveBackward
  };

  return drive[direction].call(this);
};

function _driveLeft(){

  this.leftWheel.ccw();
  this.rightWheel.ccw();

  return this;
}

function _driveRight(){

  this.leftWheel.cw();
  this.rightWheel.cw();

  return this;
}

function _driveForward(){

  this.leftWheel.ccw();
  this.rightWheel.cw();

  return this;
}

function _driveBackward(){

  this.leftWheel.cw();
  this.rightWheel.ccw();

  return this;
}