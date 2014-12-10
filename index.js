'use strict';
var express = require('express'),
  app = express(),
  server = require('http').createServer(app);

// app.get('/', function (request, response){

//   require('./light');
//   response.send('Blink the led');

// });

app.use(express.static(__dirname + '/client'));

server = server.listen(3000, function(){

  console.log('Yo dawg, yo server is running');

});