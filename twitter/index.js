var io = require('socket.io-client'),
  dotenv = require('dotenv'),
  twitter = require('twitter'),

  twitterKeys, twit, lightBulbSocket;

// load environment variables into Twitter keys
dotenv.load();
twitterKeys = {
  consumer_key: process.env.TWITTER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
};

// connect Twitter to configured API
twit = new twitter(twitterKeys);


exports.connectInputSocket = function(){

  lightBulbSocket = io('http://localhost:3000/light-bulb');

  twit.stream('statuses/filter', {track: ['EricGarner', 'HoustonJS']}, function(stream) {
      stream.on('data', function(data) {
        if(!data.retweeted_status){
          lightBulbSocket.emit('switch');
        }
      });
  });

};
