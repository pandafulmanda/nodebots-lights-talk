(function(){

  var lightBulbSocket = io('/light-bulb');

  // whenever something is clicked or touched
  document.addEventListener('mousedown', handleButtonStart);
  // handleButtonStart is the same as the function on mousedown above.
  document.addEventListener('touchstart', handleButtonStart);


  function handleButtonStart(event){
    if(event.target === event.currentTarget){
      event.stopPropagation();
      return;
    }

    if(event.target.dataset.light){
      toggleLight([event.target.dataset.light]);
    }
  }


  function toggleLight(light){

    var light = light || ['lightbulb'];

    lightBulbSocket.emit('switch', light);
  }


}());
