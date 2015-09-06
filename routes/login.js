var express = require('express');
var https = require('https');

var app = express();

var router = express.Router();

// GET home page. 
app.get('/login', function(req, res){
	res.render('login', {
		title: 'login' 
	});
});

module.exports = app;