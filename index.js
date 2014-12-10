'use strict';

var five = require('johnny-five'),
  express = require('express'),
  socket = require('socket.io'),

  lightBulb = require('./light'),
  socketBot = require('./socketBot'),

  app = express(),
  server = require('http').createServer(app),
  io = socket(server),

  lightBulbSocket = io.of('/light-bulb'),
  socketBotSocket = io.of('/sock-bot'),
  board = new five.Board();


lightBulb.connectBoard(board);
lightBulb.connectSocket(lightBulbSocket);


socketBot.connectBoard(board);
socketBot.connectSocket(socketBotSocket);


app.use(express.static(__dirname + '/client'));

server = server.listen(3000, function(){

  console.log('Yo dawg, yo server is running');

});
