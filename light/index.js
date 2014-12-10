var five = require('johnny-five'),
  board = new five.Board(),
  lightBulb;

board.on('ready', function(){

  // Create a johnny-five Led object that talks to pin 13
  lightBulb = new five.Relay({ pin: 13, type: 'NC'});

});


exports.connectSocket = function(namespaceSocket){
  namespaceSocket.on('connection', function(socket){
    socket.on('switch', function(data){
      lightBulb.toggle();
    });
  });
}