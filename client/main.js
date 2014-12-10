(function(){
  var lightBulbSocket = io('/light-bulb'),
    lightBulbToggle = document.querySelector('[data-light-toggle]');

  lightBulbToggle.addEventListener('click', function(event){
    toggleLight();
  });


  function toggleLight(){
    lightBulbSocket.emit('switch');
  }

}());
