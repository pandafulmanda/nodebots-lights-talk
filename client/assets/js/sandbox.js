var sockBot;

(function(){
  importScripts('../../../socket.io/socket.io.js');
  sockBot = io('/ace-bot');
  delete io;
}());

self.addEventListener('message', function(e) {
  var result = sockBot.emit('codeTheBot', e.data);
  self.postMessage({
    code: e.data,
    result: 'yay!'
  });
});
