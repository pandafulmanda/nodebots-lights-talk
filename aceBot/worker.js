var five = require('johnny-five'),
  raspi = require("raspi-io"),
  BotBot = require('../BotBot'),
  bot;

// make a new johnny five instance to interface with the raspi
sparky = new five.Board({
  io: new raspi()
});

sparky.on('ready', function(){
  var botBoard = this;

  bot = new BotBot(botBoard);
});

self.onmessage = function (msg) {
  self.postMessage(runCode(msg.data));
};

self.onerror = function(){

};

function runCode (code) {
  eval(code);
  return code;
}