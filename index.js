'use strict';
var express = require('express'),
  app = express(),
  server;

app.get('/', function (request, response){

  require('./light');
  response.send('Blink the led');

});

server = app.listen(3000, function(){

  console.log('Yo dawg, yo server is running');
  
});