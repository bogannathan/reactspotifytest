// let express = require('express')
let request = require('request')
let querystring  = require('querystring')
let cookieParser = require('cookie-parser')
let router = require('express').Router()

router.get('/', function(req, res) {
  const config = require("./config.js")
  const spotifyUrl = "https://api.spotify.com/v1/search?query=album:"
  const spotifyAuth = "https://accounts.spotify.com/api/token"
  const ROOT_URL = "http://localhost:8080"

  let redirect_uri = 'http://localhost:8080/callback'
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      // code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(config.client_id + ':' + config.client_secret).toString('base64'))
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
  	if (!error && response.statusCode === 200) {

  		let access_token = body.access_token;
  		//log body to console
          // request.get(options, function(error, response, body) {
          //   console.log(body);
          // });

  		res.redirect('/logged' + 
  			querystring.stringify({
              access_token: access_token,
  			}))
  	}
  })
})

module.exports = router;