var io = require('socket.io-client'),
  _ = require('lodash'),
  twitter = require('twitter'),

  twitterKeys, twit, lightBulbSocket;

// load environment variables into Twitter keys
twitterKeys = {
  consumer_key: process.env.TWITTER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
};

// connect Twitter to configured API
twit = new twitter(twitterKeys);


exports.connectInputSocket = function(){

  lightBulbSocket = io('http://localhost:'+process.env.PORT+'/light-bulb');

  twit.stream('statuses/filter', {track: ['HoustonJS']}, function(stream) {
      stream.on('data', function(tweetData) {

        // get the text of hashtags in this Tweet
        var hashtags = _.pluck(tweetData.entities.hashtags, 'text');

        // emit a switch message with an array of lights to switch on
        lightBulbSocket.emit('switch', whichLight(hashtags));
      });
  });

};

function whichLight(hashtags){

  var lightOutputs = ['christmastree', 'lightbulb'],
    lights = _(hashtags).map(function(tag){
      return tag.toLowerCase();
    }).intersection(lightOutputs).value();

  return lights;
}