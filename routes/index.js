var express = require('express');
var https = require('https');

var app = express();

var router = express.Router();


var mongoose = require('mongoose');
// require('../models/test.coffee');

// development only
// if ('development' == app.get('env')) {
// 	// app.set('db uri', 'mongodb://localhost:27017');
	
// }

// // production only
// if ('production' == app.get('env')) {
// 	// app.set('db uri', 'mongodb://' + process.env.MONGOLAB_URI);
// 	mongoose.connect( 'mongodb://' + process.env.MONGOLAB_URI );
// }

var Student = mongoose.model('Student',{

    id:Number,
    name: String

});

console.log(Student);



// GET home page. 
// app.get('/index', function(req, res){
// 	res.render('index', {
// 		title: 'index' 
// 	});
// });
// app.get('/login', function(req, res){
// 	res.render('login', {
// 		title: 'login' 
// 	});
// });
// app.get('/users', function(req, res){
// 	res.render('users', {
// 		title: 'users' 
// 	});
// });

// var map = require('../views/path.json');

// for(path in map){
// 	console.log(path, map[path]);
// }


module.exports = function(req, res){

    mongoose.connect('mongodb://localhost:27017');

    var student = new Student({id:234,name:'disanxian'});

    student.save(function(e, product, numberAffected){
        if (e){
            console.log(e)
        }
        res.send('<p>数据：' + JSON.stringify(product) + '</p><p>名字：'+numberAffected+'</p>')
    })

};