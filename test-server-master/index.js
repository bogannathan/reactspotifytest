var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.listen(8080, function(){
	console.log("app is listening on port 8080");
});