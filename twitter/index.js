var io = require('socket.io-client'),
  dotenv = require('dotenv'),
  twitter = require('twitter'),

  twitterKeys, twit, lightBulbSocket;

// load environment variables
dotenv.load();

twitterKeys = {
  consumer_key: process.env.TWITTER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
};

twit = new twitter(twitterKeys);

exports.connectSocket = function(){
  lightBulbSocket = io('/light-bulb');
  lightBulbSocket.emit('switch');
};
