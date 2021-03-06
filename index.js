'use strict';

// require packages
var five = require('johnny-five'),
  Particle = require("particle-io"),
  express = require('express'),
  socket = require('socket.io'),
  dotenv = require('dotenv'),

  // load output and input modules
  lightBulb = require('./light'),
  socketBot = require('./socketBot'),
  // twitterInput = require('./twitter'),

  // set the server and socket
  app = express(),
  server = require('http').createServer(app),
  io = socket(server),

  // set up sockets
  lightBulbSocket = io.of('/light-bulb'),
  socketBotSocket = io.of('/sock-bot'),

  // make a new johnny five instance to interface with the Arduino
  arduino = new five.Board(),

  // myoyo = require('./myo'),

  sparky;

// load environment variables
dotenv.load();

// make a new johnny five instance to interface with the spark core
// sparky = new five.Board({
//   io: new Particle({
//     token: process.env.SPARK_TOKEN,
//     deviceId: process.env.SPARK_DEVICE_ID
//   })
// });

// socketBot.connectBoard(sparky);
// socketBot.connectSocket(socketBotSocket);

lightBulb.connectBoard(arduino);
lightBulb.connectSocket(lightBulbSocket);

// myoyo.connect();

// twitterInput.connectInputSocket();

// serve up files from the client folder
app.use(express.static(__dirname + '/client'));

// set up server on port defined in .env (3000)
server = server.listen(process.env.PORT, function(){
  console.log('Yo dawg, yo server is running');
});
