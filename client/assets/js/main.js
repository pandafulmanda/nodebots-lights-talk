(function(){
  var lightBulbSocket = io('/light-bulb'),
    sockBot = io('/sock-bot'),
    lightBulbToggle = document.querySelector('[data-light-toggle]'),
    botDirectionKeys = {
      '37' : 'left',
      '38' : 'forward',
      '39' : 'right',
      '40' : 'backward'
    },
    driveBotEmit = _.debounce(startDriving, 100, {leading: true, trailing: false}),
    stopBotEmit = _.debounce(stopDriving, 100, {leading: false});



  lightBulbToggle.addEventListener('click', function(event){
    toggleLight();
  });


  window.onkeydown = function(keyEvent){

    var direction = getDirection(keyEvent);

    if(!direction){
      return;
    }

    stopBotEmit(keyEvent);

    if(keyEvent.repeat){      
      driveBotEmit(direction);
    }
  };


  function toggleLight(){
    lightBulbSocket.emit('switch');
  }

  function startDriving(direction){
    sockBot.emit('drive', direction);
  }

  function stopDriving(keyEvent){
    if(keyEvent.repeat){
      sockBot.emit('stop');
    }
  }

  function getDirection(keyEvent){
    return botDirectionKeys[keyEvent.which];
  }

}());
