var Myo = require('myo');

Myo.on('fist', function(){  
   console.log('Fist!');
   this.vibrate();
});


module.exports = Myo;