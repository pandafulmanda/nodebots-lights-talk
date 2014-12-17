(function(){

  var lightBulbSocket = io('/light-bulb'),
    sockBot = io('/sock-bot'),

    botDirectionKeys = {
      '37' : 'left',
      '38' : 'forward',
      '39' : 'right',
      '40' : 'backward'
    },
    driveBotEmit = _.debounce( _startDriving, 100, {leading: true, trailing: false}),
    stopBotEmit = _.debounce( _stopDriving, 100, {leading: false});


  // whenever something is clicked or touched
  document.addEventListener('mousedown', function(event){
    if(event.target === event.currentTarget){
      event.stopPropagation();
      return;
    }

    if(event.target.dataset.light){
      toggleLight([event.target.dataset.light]);
    }

    if(event.target.dataset.bot){
      driveBotEmit(event.target.dataset.bot);
    }
  });
  // handleButtonStart is the same as the function on mousedown above.
  document.addEventListener('touchstart', handleButtonStart);

  // On button press end, the robot 
  document.addEventListener('mouseup', endRobotPressHandler);
  document.addEventListener('touchend', endRobotPressHandler);
  document.addEventListener('touchcancel', endRobotPressHandler);
  document.addEventListener('touchleave', endRobotPressHandler);

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




  function handleButtonStart(event){
    if(event.target === event.currentTarget){
      event.stopPropagation();
      return;
    }

    if(event.target.dataset.light){
      toggleLight([event.target.dataset.light]);
    }

    if(event.target.dataset.bot){
      driveBotEmit(event.target.dataset.bot);
    }
  }



  function toggleLight(light){

    var light = light || ['lightbulb'];

    lightBulbSocket.emit('switch', light);
  }



  // Robot things
  function getDirection(keyEvent){
    return botDirectionKeys[keyEvent.which];
  }

  function endRobotPressHandler(pressEvent){
    if(pressEvent.target === pressEvent.currentTarget){
      pressEvent.stopPropagation();
      return;
    }

    if(pressEvent.target.dataset.bot){
      stopBotEmit(pressEvent, true);
    }
  }

  // Both of the following are "debounced",
  // meaning they can only happen once within the defined time.
  function _startDriving(direction){
    sockBot.emit('drive', direction);
  }

  function _stopDriving(keyEvent, force){
    if(force || keyEvent.repeat){
      sockBot.emit('stop');
    }
  }

}());
