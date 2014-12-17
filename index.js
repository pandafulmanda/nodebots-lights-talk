'use strict';

// require packages
var five = require('johnny-five'),
  express = require('express'),
  socket = require('socket.io'),
  dotenv = require('dotenv'),

  // load output and input modules
  lightBulb = require('./light'),
  twitterInput = require('./twitter'),

  // set the server and socket
  app = express(),
  server = require('http').createServer(app),
  io = socket(server),

  // set up sockets
  lightBulbSocket = io.of('/light-bulb'),

  // make a new johnny five instance to interface with the Arduino
  arduino = new five.Board();

// load environment variables
dotenv.load();


lightBulb.connectBoard(arduino);
lightBulb.connectSocket(lightBulbSocket);

twitterInput.connectInputSocket();

// serve up files from the client folder
app.use(express.static(__dirname + '/client'));

// set up server on port defined in .env (3000)
server = server.listen(process.env.PORT, function(){
  console.log('Yo dawg, yo server is running');
});
