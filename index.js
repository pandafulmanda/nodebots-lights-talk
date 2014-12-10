'use strict';
var express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io')(server),
  lightBulbSocket = io.of('/light-bulb'),
  lightBulb = require('./light');


lightBulb.connectSocket(lightBulbSocket);
// app.get('/', function (request, response){

//   require('./light');
//   response.send('Blink the led');

// });

app.use(express.static(__dirname + '/client'));

server = server.listen(3000, function(){

  console.log('Yo dawg, yo server is running');

});
