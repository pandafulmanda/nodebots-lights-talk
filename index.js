'use strict';

// require packages
var five = require('johnny-five'),
  express = require('express'),
  socket = require('socket.io'),
  dotenv = require('dotenv'),

  // load output and input modules
  lights = require('./light'),
  twitterInput = require('./twitter'),

  // set the server and socket
  app = express(),
  server = require('http').createServer(app),
  io = socket(server),

  // set up sockets
  lightsSocket = io.of('/lights'),

  // make a new johnny five instance to interface with the Arduino
  arduino = new five.Board();

// load environment variables
dotenv.load();

// Set up the arduino board to have light objects when it's ready
lights.connectBoard(arduino);
// Set up the lights with the lights socket
// so that the lights API will be ready for messages sent through the lights socket
lights.connectSocket(lightsSocket);

// Connect the Twitter so that it's an input that will send messages to the lights socket as well.
twitterInput.connectInputSocket();

// serve up files from the client folder
app.use(express.static(__dirname + '/client'));

// set up server on port defined in .env (3000)
server = server.listen(process.env.PORT, function(){
  console.log('Yo dawg, yo server is running');
});
