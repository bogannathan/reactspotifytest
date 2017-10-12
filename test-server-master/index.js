var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var app = express();

app.use(require('./middleware/headers'))
app.use(bodyParser.json());
app.use('/', require('./auth'))

app.listen(3000, function(){
	console.log("app is listening on port 3000");
});