'use strict';

// require packages
var five = require('johnny-five'),
  express = require('express'),
  socket = require('socket.io'),

  // load output and input modules
  lightBulb = require('./light'),
  socketBot = require('./socketBot'),
  twitterInput = require('./twitter'),

  // set the server and socket
  app = express(),
  server = require('http').createServer(app),
  io = socket(server),

  // set up sockets
  lightBulbSocket = io.of('/light-bulb'),
  socketBotSocket = io.of('/sock-bot'),

  // make a new board to interface with the Arduino
  board = new five.Board();


lightBulb.connectBoard(board);
lightBulb.connectSocket(lightBulbSocket);

socketBot.connectBoard(board);
socketBot.connectSocket(socketBotSocket);

twitterInput.connectInputSocket();

// serve up files from the client folder
app.use(express.static(__dirname + '/client'));

// set up server on port 3000
server = server.listen(3000, function(){
  console.log('Yo dawg, yo server is running');
});
