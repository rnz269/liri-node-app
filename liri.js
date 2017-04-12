// NPM packages stored in variables below
var fs = require('fs');
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

// Store keys.js in this variable below as an object
var bagOfValues = require('./keys.js');

// Store twitterKeys from keys.js in variable for easy access
var twitterKeys = bagOfValues.twitterKeys;

function displayTweets() {
	var client = new twitter(twitterKeys);
	var params = {screen_name: 'rahul_nallappa'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (error) {
  	console.log('An error has occurred: ' + error);
  	return;
  }	else {
    console.log('Here are the most recent tweets from ' + tweets[0].user.name + ":");
    	for (var i = 0; i < 20; i++) {
    		console.log('----------------------');
    		console.log("#" + (i+1));
    		console.log('At ' + tweets[i].created_at);
    		console.log(tweets[i].text);
    	};

  };
});
}

function spotifyThisSong (song) {
	spotify.search({ type: 'track', query: song}, function(err, data) {
    if (err) {
        console.log('An error has occurred: ' + err);
        return;
     } else {
     	var songInfo = data.tracks.items[0];
     	var songResult = ["Artist: " + songInfo.artists[0].name, "Song: " + songInfo.name, "URL: " + songInfo.preview_url, "Album Name: " + songInfo.album.name];
     	for(var i = 0; i < 4; i++) {
     		console.log('----------------------');
     		console.log(songResult[i]);
     	}
     }
  });
}


function movieThis (movie) {

	
}

function doWhatItSays ()

if (process.argv[2] === "my-tweets") {
	displayTweets();
	};

if (process.argv[2] === "spotify-this-song") {
	if (process.argv[3] == null) {
		var songResult = ["Artist: " + "Ace of Base", "URL: " + "https://play.spotify.com/artist/5ksRONqssB7BR161NTtJAm?play=true&utm_source=open.spotify.com&utm_medium=open", "Album Name: " + "The Sign"];
		for(var i = 0; i < 3; i++) {
     		console.log('----------------------');
     		console.log(songResult[i]);
     	}
	} else {
	spotifyThisSong(process.argv[3]);
	}
};

if(process.argv[2] === "movie-this") {



}


