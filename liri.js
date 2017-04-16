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
    	}

  }
})
}

function spotifyThisSong(song) {
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
  })
}


function movieThis(movie) {
	var searchQuery = "http://www.omdbapi.com/?" + "t=" + movie;
	request(searchQuery, function (error, response, body) {
		// console.log('error:', error);
		// console.log('statusCode:', response && response.statusCode);
		if (!error && response.statusCode === 200) {
			console.log("Title: " + JSON.parse(body).Title);
			console.log('----------------------');
			console.log("Year Produced: " + JSON.parse(body).Year)
			console.log('----------------------');
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log('----------------------');
			console.log("Country of Production: " + JSON.parse(body).Country);
			console.log('----------------------');
			console.log("Language: " + JSON.parse(body).Language);
			console.log('----------------------');
			console.log("Plot: " + "\n" + JSON.parse(body).Plot);
			console.log('----------------------');
			console.log("Actors: " + JSON.parse(body).Actors);
			console.log('----------------------');
			console.log("Title: " + JSON.parse(body).Title);
			console.log('----------------------');
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Source);
			console.log('----------------------');
			console.log("Rotten Tomatoes URL: " + JSON.parse(body).Website);
			console.log('----------------------');
			} else {
			console.log("No movie returned.");
		}
	});	
}

function doWhatItSays() {
	fs.readFile('random.txt', function (err, data) {
		if (err) {
			return console.error(err);
		} else {
			var textString = data.toString();
			var dataArray = textString.split(",");
			if (dataArray[0] === "spotify-this-song") {
				spotifyThisSong(dataArray[1]);
			}
		}
	})
}

var desiredProgram = process.argv[2];
var input = process.argv[3];

if (desiredProgram === "my-tweets") {
	displayTweets();
	}

if (desiredProgram === "spotify-this-song") {
	if (input == null) {
		spotify.lookup({ type: 'track', id: "0hrBpAOgrt8RXigk83LLNE"}, function(err, data){
			// console.log(data.artists[0].name + "\n" + data.name + "\n" + data.preview_url + "\n" + data.album.name);
     	var songResult = ["Artist: " + data.artists[0].name, "Song: " + data.name, "URL: " + data.preview_url, "Album Name: " + data.album.name];
	     	for(var i = 0; i < 4; i++) {
	     		console.log('----------------------');
	     		console.log(songResult[i]);
			}
	})
	} else {
	spotifyThisSong(input);
	}
}

if(desiredProgram === "movie-this") {
	if (input == null) {
		movieThis("Mr. Nobody");
	} else {
		movieThis(input);
	}
}

if(desiredProgram === "do-what-it-says") {
	doWhatItSays();
}
