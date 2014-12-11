'use strict';

var five = require('johnny-five'),
  lightBulb;

exports.connectBoard = function(board){
  board.on('ready', function(){

    // Create a johnny-five Led object that talks to pin 13
    lightBulb = new five.Relay({ pin: 13, type: 'NC'});
    // lightBulb = new five.Led(13);

  });
};

exports.connectSocket = function(namespaceSocket){
  namespaceSocket.on('connection', function(socket){
    socket.on('switch', function(data){
      lightBulb.toggle();
      // lightBulb.on();
      // lightBulb.off();
    });
  });
};