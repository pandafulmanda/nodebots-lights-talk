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
  // If the robot is on the RaspberryPi, we need to change the pins
  if(botBoard.port === 'RaspberryPi-IO'){
    // there is only one GPIO on the pi =(
    leftWheelPin = '';
    rightWheelPin = 'GPIO18';
  }

  this.leftWheel  = (leftWheelPin)? new five.Servo({ pin:  leftWheelPin, type: 'continuous', board: botBoard }).stop() : null;
  this.rightWheel = new five.Servo({ pin: rightWheelPin, type: 'continuous', board: botBoard }).stop();

}

BotBot.prototype.stop = function(){

  if(this.leftWheel){
    this.leftWheel.stop();    
  }

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

  if(this.leftWheel){
    this.leftWheel.ccw();
  }
  this.rightWheel.ccw();

  return this;
}

function _driveRight(){

  if(this.leftWheel){
    this.leftWheel.cw();
  }
  this.rightWheel.cw();

  return this;
}

function _driveForward(){

  if(this.leftWheel){
    this.leftWheel.ccw();
  }
  this.rightWheel.cw();

  return this;
}

function _driveBackward(){

  if(this.leftWheel){
    this.leftWheel.cw();
  }
  this.rightWheel.ccw();

  return this;
}