var sockBot;

(function(){
  importScripts('../../../socket.io/socket.io.js');
  sockBot = io('/sock-bot');
  delete io;
}());

self.addEventListener('message', function(e) {
  var result = eval(e.data);
  self.postMessage({
    code: e.data,
    result: 'yay!'
  });
});
