var five = require('johnny-five'),
  board = new five.Board();

board.on('ready', function(){

  // Create a johnny-five Led object that talks to pin 13
  var firstLedEvar = new five.Led(13);

  // Strobe the Led
  // Default speed is 100ms
  firstLedEvar.strobe();

});