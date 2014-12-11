(function(){

  var lightBulbSocket = io('/light-bulb'),
    sockBot = io('/sock-bot'),

    botDirectionKeys = {
      '37' : 'left',
      '38' : 'forward',
      '39' : 'right',
      '40' : 'backward'
    },
    driveBotEmit = _.debounce(startDriving, 100, {leading: true, trailing: false}),
    stopBotEmit = _.debounce(stopDriving, 100, {leading: false});


  document.addEventListener('mousedown', function(event){
    if(event.target === event.currentTarget){
      event.stopPropagation();
      return;
    }

    if(event.target.dataset.light){
      toggleLight();
    }

    if(event.target.dataset.bot){
      driveBotEmit(event.target.dataset.bot);
    }
  });


  document.addEventListener('touchstart', function(event){
    if(event.target === event.currentTarget){
      event.stopPropagation();
      return;
    }

    if(event.target.dataset.bot){
      driveBotEmit(event.target.dataset.bot);
    }
  });


  document.addEventListener('mouseup', endPressHandler);
  document.addEventListener('touchend', endPressHandler);
  document.addEventListener('touchcancel', endPressHandler);
  document.addEventListener('touchleave', endPressHandler);

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


  function endPressHandler(pressEvent){
    if(pressEvent.target === pressEvent.currentTarget){
      pressEvent.stopPropagation();
      return;
    }

    if(pressEvent.target.dataset.bot){
      stopBotEmit(pressEvent, true);
    }
  }


  function toggleLight(){
    lightBulbSocket.emit('switch');
  }

  function startDriving(direction){
    sockBot.emit('drive', direction);
  }

  function stopDriving(keyEvent, force){
    if(force || keyEvent.repeat){
      sockBot.emit('stop');
    }
  }

  function getDirection(keyEvent){
    return botDirectionKeys[keyEvent.which];
  }

}());
