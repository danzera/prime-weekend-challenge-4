// general modules
var express = require('express'); // import express
var app = express(); // create an instance of express
var bodyParser = require('body-parser'); // import body-parser

// custom modules
var index = require('./routes/index.js'); // import index.js module

// database variables
var mongoose = require('mongoose'); // import mongoose
// connection string
// 'localhost:27017/company' used for testing locally
// replace this with the connection string provided by mLab when hosting online
var mongoURI = 'mongodb://localhost:27017/company';
var database = mongoose.connect(mongoURI).connection; // establish database connection

// handle any database connection errors
database.on('error', function(err) {
  console.log('MongoDB connection error:', err);
});

// provide positive reinforcement upon successful connection to the database
database.once('open', function() {
  console.log('successfully connected to our Mongo database');
});

// establish our server's port
app.set('port', (process.env.PORT || 5000));

// middle-ware hookups
app.use(bodyParser.urlencoded({extended: true})); // use body-parser
app.use(express.static('server/public')); // establish default file path

// route usages
app.use('/', index); // base URL request

// listen on our port
app.listen(app.get('port'), function() {
  console.log('listening on port ', app.get('port')); // more positive reinforcement
});
