'use strict';

var BotBot = require('../BotBot'),
  bot;

exports.connectBoard = function(board){

  board.on('ready', function(){
    var botBoard = this;

    bot = new BotBot(botBoard);
  });

};

exports.connectSocket = function(namespaceSocket){
  namespaceSocket.on('connection', function(socket){
    socket.on('drive', function(direction){

      bot.drive(direction);

    });

    socket.on('stop', function(data){

      bot.stop();

    });
  });
};
