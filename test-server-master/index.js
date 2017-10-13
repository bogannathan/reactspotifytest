//SET UP
var express = require("express"); //Create express application
var http = require("http"); //
var bodyParser = require("body-parser"); //Allows server to find data & bring back as json objects
var app = express(); //app object = express function

//MOUNT MIDDLEWARE
app.use(require('./middleware/headers'));
app.use(bodyParser.json());
app.use('/', require('./auth'));

//BIND PORT/LISTEN FOR CONNECTIONS
app.listen(3000, function(){
	console.log("app is listening on port 3000");
});