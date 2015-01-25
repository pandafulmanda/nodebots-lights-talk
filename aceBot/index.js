'use strict';

var Worker = require('workerjs'),
  path = require('path'),
  robotWorker, bot;

exports.connectBoard = function(){

  robotWorker = new Worker(path.join(__dirname, 'worker.js'), true);

  robotWorker.addEventListener('message', function (msg) {
    console.log(msg.data + ' was run');
    // expect(msg.data).to.equal(87178291200.00021);
    // done();
  });

  robotWorker.onerror(function(){
    console.log('OH NORS');
    console.log(arguments);
    robotWorker.terminate();
  });

};

exports.connectSocket = function(namespaceSocket){
  namespaceSocket.on('connection', function(socket){
    socket.on('codeTheBot', function(code){
      robotWorker.postMessage(code);
    });

  });
};
