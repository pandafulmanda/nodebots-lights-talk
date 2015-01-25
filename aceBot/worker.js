var five = require('johnny-five'),
  Spark = require("spark-io"),
  BotBot = require('../BotBot'),
  bot;

// make a new johnny five instance to interface with the spark core
sparky = new five.Board({
  io: new Spark({
    token: process.env.SPARK_TOKEN,
    deviceId: process.env.SPARK_DEVICE_ID
  })
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