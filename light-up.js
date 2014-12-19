var five = require('johnny-five');

var board = new five.Board();

board.on('ready', function(){
  var led = new five.Led({pin: 10});

  led.strobe();
});
