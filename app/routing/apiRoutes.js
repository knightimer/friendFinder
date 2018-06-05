var express = require("express")
var friends = require('../data/friends.js');
var path = require('path');

  module.exports = function(app){
    app.get('/api/friends', function(req, res){
      res.json(friends);

  // API GET Requests
  app.get('/api/friends', function(req, res){
    res.json(friends);
  });


  // API POST REQUEST -- user submits a form and it submits data to the server.
  app.post('/api/friends', function(req, res){

  // Survey Matching data from User
    
  var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 1000
    };

    // Here we take the result of the user"s survey POST and parse it.
    var userData = req.body;
    var userScores = userData.scores;
  

    // This variable will calculate the difference between the user"s scores and the scores of
    // each user in the database
    var totalDifference = 0;

    // Here we loop through all the friend possibilities in the database.
    for (var i = 0; i < friends.length; i++) {

      console.log(friends[i].name);
      totalDifference = 0;

      // We then loop through all the scores of each friend
      for (var j = 0; j < friends[i].scores[j]; j++) {

        // We calculate the difference between the scores and sum them into the totalDifference
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

        // If the sum of differences is less then the differences of the current "best match"
        if (totalDifference <= bestMatch.friendDifference) {

          // Reset the bestMatch to be the new friend.
          bestMatch.name = friends[i].name;
          bestMatch.photo = friends[i].photo;
          bestMatch.friendDifference = totalDifference;
        }
      }
    }

    // Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
    // the database will always return that the user is the user's best friend).
    friends.push(userData);

    // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page
    res.json(bestMatch);

  });

};

var Friends = require('../data/friends.js');

module.exports = function(app){

	// API GET Requests
	app.get('/api/friends', function(req, res){
		res.json(Friends);
	});


	// user submits a form and it submits data to the server.
	app.post('/api/friends', function(req, res){

	// setting a variable for the user's response
    var userData = req.body;
    	// the total difference starts off at 0 
		var totalDifference = 0;
		// all differences is an empty array into which the scores of each potential friend the user is being compared to will go
		var allDifferences = []; 

	//loop through all of the stored friends 
	for (var i=0; i<(Friends.length-1); i++){

		//loop through all of question values and sum total their subtracted absolute values
		for (var j=0; j<10; j++){
			// this adds the numerical answers of each friend to the total difference; then uses the absolute value to determine the difference between the two (absolute value is used so that 5-3 and 3-5 both equal 2)
			totalDifference += Math.abs(Friends[i].scores[j] - newFriend.scores[j]);
		}

		// each total difference, for each potential friend, is pushed into the allDifferences array 
		allDifferences.push(totalDifference);
		// total difference is reset back to zero
		totalDifference = 0;
	}

	//best match will give the smallest values 
	var bestMatch = Friends[allDifferences.indexOf(Math.min.apply(null, allDifferences))];

	res.send(bestMatch);
	console.log(bestMatch);

	});
}
