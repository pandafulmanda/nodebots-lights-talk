'use strict';

var five = require('johnny-five'),
  bot;

exports.connectBoard = function(board){

  board.on('ready', function(){
    var botBoard = this;
    console.info('particle board connected!')

    bot = new BotBot(botBoard);
  });

};

exports.connectSocket = function(namespaceSocket){
  namespaceSocket.on('connection', function(socket){
    socket.on('drive', function(direction){

      bot.drive(direction);

    });

    socket.on('stop', function(data){

      bot.stop();

    });
  });
};


function BotBot(botBoard){

  // Default the pins for the wheels to ones that can output "PWM" on the Arduino
  var leftWheelPin = 9,
    rightWheelPin = 10;

  // If the robot is on the particle board, we need to change the pins
  if(botBoard.port === 'particle-io'){
    leftWheelPin = 'A0';
    rightWheelPin = 'A1';
  }

  this.leftWheel  = new five.Servo({ pin:  leftWheelPin, type: 'continuous', board: botBoard }).stop();
  this.rightWheel = new five.Servo({ pin: rightWheelPin, type: 'continuous', board: botBoard }).stop();

  console.info('new bot made');

  return this;

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