'use strict';

var five = require('johnny-five'),
  io = require('socket.io-client'),
  _ = require('lodash'),
  lightTilt = {
    'right': 'lightbulb',
    'left': 'christmastree',
    'forward': 'lightbulb',
    'backward': 'christmastree'
  },
  turnOnLightByName = _.debounce(_turnOnLightByName, 100, {leading: true, trailing: false}),
  lights = {}, socketBotSocket, accelerometer;

exports.connectBoard = function(board){
  board.on('ready', function(){
    // Create a johnny-five Relay object that talks to pin 13 and pin 12
    lights['lightbulb'] = new five.Relay({ pin: 5, type: 'NC'});
    lights['christmastree'] = new five.Relay({ pin: 4, type: 'NC'});

    accelerometer = new five.Accelerometer({ controller: 'ADXL345', pins: ['A5', 'A4', 'A3']});

    connectAccelerometerToBot();
  });
};

exports.connectSocket = function(namespaceSocket){
  namespaceSocket.on('connection', function(socket){
    socket.on('switch', function(data){
      data.forEach(turnOnLightByName);
    });
  });
};

function _turnOnLightByName(lightName){
  if(lights[lightName]){
    lights[lightName].toggle();
  }
}

function connectAccelerometerToBot(){

  socketBotSocket = io('http://localhost:'+process.env.PORT+'/sock-bot');

  accelerometer.on("change", function() {
    var direction = turnFromTilt(this.x, this.y);
    var lightToSwitch;

    if(direction && direction.length > 1){
      lightToSwitch = lightTilt[direction[1]];

      if(lightToSwitch){
        turnOnLightByName(lightToSwitch);
      }
    }

    // if(direction) {
    //   socketBotSocket.emit.apply(socketBotSocket, direction);
    // }
  });
};

function turnFromTilt(x, y, tolerance) {
  tolerance = tolerance || 0.35;

  if (Math.abs(y) > Math.abs(x)){
    if(Math.abs(y) < tolerance) {
      return null;
    } else if(y >= 0) {
      return ['drive', 'forward'];
    } else if (y < 0) {
      return ['drive', 'backward'];
    }
  } else if(Math.abs(x) < tolerance) {
    return null;
  } else if (x >= 0) {
    return ['drive', 'right'];
  } else if (x < 0) {
    return ['drive', 'left'];
  }
}
