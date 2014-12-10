(function(){
  var lightBulbSocket = io('/light-bulb'),
    lightBulbToggle = document.querySelector('[data-light-toggle]'),
    botDirectionKeys = {
      '37' : 'left',
      '38' : 'up',
      '39' : 'right',
      '40' : 'down'
    },
    stopBot = new Event('stopBot'),
    stopBotEmit = _.debounce(stopDriving, 100, {leading: false});

  lightBulbToggle.addEventListener('click', function(event){
    toggleLight();
  });


  window.onkeydown = function(event){

    var direction = getDirection(event);

    if(!direction){
      return;
    }

    stopBotEmit(event);      
  };

  window.addEventListener('stopBot', function(event){
    // console.log(event);
    console.log('stopBot');
  });

  function toggleLight(){
    lightBulbSocket.emit('switch');
  }

  function stopDriving(keyEvent){
    if(keyEvent.repeat){
      window.dispatchEvent(stopBot);
    }
  }

  function getDirection(keyEvent){
    return botDirectionKeys[keyEvent.which];
  }

}());
