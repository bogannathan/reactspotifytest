//SET UP
let express = require('express');
let request = require('request');
let querystring  = require('querystring'); //Allows server to parse & stringify url query strings
let cookieParser = require('cookie-parser'); //Parses cookie headers
let router = require('express').Router(); //express router recieves requests

router.get('/', function(req, res) {
  const config = require("./config.js");
  const spotifyUrl = "https://api.spotify.com/v1/search?query=album:";
  const spotifyAuth = "https://accounts.spotify.com/api/token";
  const ROOT_URL = "http://localhost:8080";

  let redirect_uri = 'http://localhost:8080/callback';
  let authOptions = {      //authOptions contains Spotify's required body params for authorization requests
    url: 'https://accounts.spotify.com/api/token',    
    form: {                                       
      code: config,
      redirect_uri: redirect_uri,
      grant_type: 'client_credentials'
    },
    headers: {  //Spotify's required header param for authorization requests
      'Authorization': 'Basic ' + (new Buffer(config.client_id + ':' + config.client_secret).toString('base64'))
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
  	if (!error && response.statusCode === 200) {
  		let access_token = body.access_token;
  		res.json({access_token: access_token});
  	}
  });
});

module.exports = router;