'use strict';

var five = require('johnny-five'),
  bot;

exports.connectBoard = function(board){

  board.on('ready', function(){
    bot = new BotBot();
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


function BotBot(){

  this.leftWheel  = new five.Servo({ pin:  9, type: 'continuous' }).stop();
  this.rightWheel = new five.Servo({ pin: 10, type: 'continuous'  }).stop();

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