'use strict';

var five = require('johnny-five'),
  lights = {};

exports.connectBoard = function(board){
  board.on('ready', function(){
    // Create a johnny-five Relay object that talks to pin 13 and pin 12
    lights['lightbulb'] = new five.Relay({ pin: 5, type: 'NC'});
    lights['christmastree'] = new five.Relay({ pin: 4, type: 'NC'});

  });
};

exports.connectSocket = function(namespaceSocket){
  namespaceSocket.on('connection', function(socket){
    socket.on('switch', function(data){
      data.forEach(turnOnLightByName);
    });
  });
};

function turnOnLightByName(lightName){
  if(lights[lightName]){
    lights[lightName].toggle();
  }
}