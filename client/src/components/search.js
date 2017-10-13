import React, { Component } from 'react'
import express from 'express'
import request from 'request'
import querystring from 'querystring'
import cookieParser from 'cookie-parser'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: "", // my query
      artist: null  // my response.
    }
    let redirect_uri = 'http://localhost:8080/callback'
    var client_id = '4625fd59d3634a27ab6c9adedf1d163f'; // Your client id
    var client_secret = '2cae91b399664026975659e192dd0e51'; // Your secret

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
        localStorage.setItem('accessToken', access_token)
        // res.redirect('/#' + 
        //   querystring.stringify({
        //         access_token: access_token,
        //   }))
      }
    })

    // var client_id = '4625fd59d3634a27ab6c9adedf1d163f'; // Your client id
    // var client_secret = '2cae91b399664026975659e192dd0e51'; // Your secret
    // // var redirect_uri = 'REDIRECT_URI';
    // let app = express()
    // app.get('/', function(req, res) {

    // res.redirect('https://accounts.spotify.com/authorize?' + 
    //   querystring.stringify({
    //     response_type: 'code',
    //     client_id: client_id,

    //   }))  
    // })

    // request.post(authOptions, function(error, response, body) {
    //   if (!error && response.statusCode === 200) {

    //     let access_token = body.access_token;
    //     //log body to console
    //         // request.get(options, function(error, response, body) {
    //         //   console.log(body);
    //         // });

    //     let options = {
    //       url: 'https://api.spotify.com/v1/me',
    //             headers: { 'Authorization': 'Bearer ' + access_token },
    //             json: true
    //     }

    //     res.redirect('/#' + 
    //       querystring.stringify({
    //         error: 'invalid_token'
    //       }))
    //   }
    // })
  }

  search() {
    console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
    // var accessToken = 'BQANAwb7uAoT6X32opc4GMeyKpuKoDRPbJL1Ba1X_smNbaAD4cwzMH5XyeckBy-1wlDa3yRxZETFzyVO2imL5A'
    var accessToken = localStorage.getItem('accessToken')
    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        const artist = json.artists.items[0];        
        this.setState({ artist });
      })

  }

  render() {

    let artist = {
      name: '',
      followers: {
        total: ''
      }
    };
    if (this.state.artist !== null) {
      artist = this.state.artist;
    }

    return (
      // return JSX 
      <div className="container">
        <hr />
        <div className="col-lg-6">
          <div className="input-group">
            <input type="text" 
              onChange={event => { this.setState({ query: event.target.value }) }}
            className="form-control" placeholder="Search for..." />
            <span className="input-group-btn">
              <button 
              onClick={()=> this.search()}
               className="btn btn-primary" type="button">Go!</button>
            </span>
          </div>
        </div>
        <hr />
        <div>
          <div> {artist.name}   </div>
          <div> {artist.followers.total} </div>
        </div>


        </div>
    )
  }
}
export default App;