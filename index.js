const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var cors = require('cors')
var app = express()
//Mings example
var bodyParser = require('body-parser'); // Required if we need to use HTTP post parameters
var validator = require('validator'); // See documentation at https://github.com/chriso/validator.js


app.use(bodyParser.json());

// See https://stackoverflow.com/questions/25471856/express-throws-error-as-body-parser-deprecated-undefined-extended
app.use(bodyParser.urlencoded({ extended: true })); // Required if we need to use HTTP post parameters

// Mongo initialization and connect to database
// process.env.MONGODB_URI is the default environment variable on Heroku for the MongoLab add-on
// If environment variables not found, fall back to mongodb://localhost/nodemongoexample
// nodemongoexample is the name of the local database
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/localdatabase';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	db = databaseConnection;
});


// Serve static content in folder named "public"
app.use(express.static(path.join(__dirname, 'public')));


app.get('/',function(request,response){
	response.header("Access-Control-Allow-Origin","*");
	response.header("Access-Control-Allow-Headers","X-Requested-With");
	response.set('Content-Type', 'text/html');
	indexScores = "";


	var indexScores = '';
	db.collection('scores', function(error, result) {
		if (!error){
			result.find().sort({"score":-1}).toArray(function(error, result) {
				if (!error){
					indexScores += "<!DOCTYPE HTML><html><head><title>2048 Score List</title></head><body><h1>2048 Score List</h1><table>";
					indexScores += "<tr><b><th>Rank</th> <th>User</th> <th>Score</th> <th>Timestamp</th></b></tr>";

					for (i=0;i<result.length;i++)
					{
						j=i+1;
						indexScores += "<tr><th>" + j + "</th><th>" + result[i].username + "</th><th>" + result[i].score + "</th><th>" + result[i].created_at + "</th></tr>";
					}
					indexScores += "</table></body></html>"
					response.send(indexScores);
				} else {
					response.send('<!DOCTYPE HTML><html><head><title>Error</title></head><body><h1>Error</h1><p>Whoops, something went wrong!</p></body></html>');
				}
			});
		}
		else {
			response.send('<!DOCTYPE HTML><html><head><title>Error</title></head><body><h1>Error</h1><p>Whoops, something went wrong!</p></body></html>');
		}
	});
});




app.get('/scores.json', function(request, response) {
	response.header("Access-Control-Allow-Origin","*");
	response.header("Access-Control-Allow-Headers","X-Requested-With");
	var user = request.query.username;

	if (user==undefined || user==null){
		response.send("[]");
	}
	else{
		db.collection('scores', function(error, collection) {
			if (!error){
				collection.find({username:user}).sort({"score":-1}).toArray(function(error, sorted) {
					if (!error){
						if(!sorted){
							reponse.send("[]");
						}
						else{
							response.send(sorted);
						}
					}
					else {
						response.send('{"error":"Whoops, something went wrong 1"}');
					}
				});
			}		
		});
	}
});



app.post('/submit', function(request, response) {
	response.header("Access-Control-Allow-Origin","*");
	response.header("Access-Control-Allow-Headers","X-Requested-With");

	var score = request.body.score;
	var username = request.body.username;
	var grid = request.body.grid; 
	var currentTime= new Date();
	var results = {};
	score = parseInt(score);

	var toInsert = {
		"username":username,
		"score":score,
		"grid":grid,
		"created_at":currentTime
	};


	if (toInsert.score == null || toInsert.username == null || toInsert.grid ==null){
		db.collection('scores', function(error, collection) {
			if (!error){
				collection.find().sort({"score":-1}).limit(10).toArray(function(error, sorted) {
					if (!error){
						response.send(sorted);
					}
					else {
						response.send('{"error":"Whoops, something went wrong 1"}');
					}
				});
			}		
		});

	}
	else{
		db.collection('scores', function(error, collection) {
			if (!error){
				collection.insert(toInsert, function(error, result) {
					if (!error) {
						collection.find().sort({"score":-1}).limit(10).toArray(function(error, sorted) {
							if (!error){
								response.send(sorted);
							}
							else {
								response.send('{"error":"Whoops, something went wrong 1"}');
							}
						});
					}
					else {
						response.send('{"error":"Whoops, something went wrong 2"}');
					};
				});
			}
			else {
				response.send('{"error":"Whoops, something went wrong 3"}');
			};
		});
	}
});




app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.listen(PORT, () => console.log('Listening on ${ PORT }'))

