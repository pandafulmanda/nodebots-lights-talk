(function(){

  var lightsSocket = io('/lights');

  // whenever something is clicked or touched
  document.addEventListener('mousedown', handleButtonStart);
  // handleButtonStart is the same as the function on mousedown above.
  document.addEventListener('touchstart', handleButtonStart);


  function handleButtonStart(event){
    if(event.target === event.currentTarget){
      event.stopPropagation();
      return;
    }

    // If there is a light button being pressed...
    if(event.target.dataset.light){
      toggleLight([event.target.dataset.light]);
    }
  }


  // send a message with what light to turn on
  function toggleLight(light){
    lightsSocket.emit('switch', light);
  }


}());
