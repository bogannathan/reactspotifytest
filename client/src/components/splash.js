import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {Jumbotron, Button} from 'react-bootstrap';
import axios from 'axios';
// import express from 'express'
// import request from 'request'
// import querystring from 'querystring'
// import cookieParser from 'cookie-parser'

export default class Splash extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  query: "", // my query
		  artist: null  // my response.
		}
		// const ROOT_URL = 'http://localhost:3000';
			// let redirect_uri = 'http://localhost:8080/callback'
		 //    var client_id = '4625fd59d3634a27ab6c9adedf1d163f'; // Your client id
		 //    var client_secret = '2cae91b399664026975659e192dd0e51'; // Your secret

		 // axios.get(`${ROOT_URL}/`)
	  //     .then((response) => {
	      	// const posts = response.data;
	        // console.log("Response", response)
	        // localStorage.setItem('albums', response)
	        // this.setState({
	        // 	albums: [ ...albums ]
	        // })
	        // dispatch({
	        //   type: FETCH_POSTS,
	        //   payload: response
	        // });
		// })
		 //    let authOptions = {
		 //      url: 'https://accounts.spotify.com/api/token',
		 //      form: {
		 //        // code: code,
		 //        redirect_uri: redirect_uri,
		 //        grant_type: 'authorization_code'
		 //      },
		 //      headers: {
		 //        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
		 //      },
		 //      json: true
		 //    };

		 //    request.post(authOptions, function(error, response, body) {
		 //      if (!error && response.statusCode === 200) {

		 //        let access_token = body.access_token;
		 //        //log body to console
		 //            // request.get(options, function(error, response, body) {
		 //            //   console.log(body);
		 //            // });
		 //        localStorage.setItem('accessToken', access_token)
		 //        // res.redirect('/#' + 
		 //        //   querystring.stringify({
		 //        //         access_token: access_token,
		 //        //   }))
		 //      }
		 //    })
	  }
	  auth() {
	  	const ROOT_URL = 'http://localhost:3000';
			// let redirect_uri = 'http://localhost:8080/callback'
		 //    var client_id = '4625fd59d3634a27ab6c9adedf1d163f'; // Your client id
		 //    var client_secret = '2cae91b399664026975659e192dd0e51'; // Your secret
		 console.log('????')
		 axios.get(`${ROOT_URL}/`)
	      .then((response) => {
	      	// const posts = response.data;
	        console.log("Response", response)
	        localStorage.setItem('albums', response)
	        this.setState({
	        	albums: [ ...albums ]
	        })
	        this.search(response)
	        // dispatch({
	        //   type: FETCH_POSTS,
	        //   payload: response
	        // });
			})
	      console.log('more ????')
	  }
	  search(accessToken) {
		console.log('this.state', this.state);
		const BASE_URL = 'https://api.spotify.com/v1/search?';
		const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
		// var accessToken = 'BQDcdU24o1VHq6bPe94FqYoGNapAFOb5IlaIPkkrPDP3CGc9H5eHX_SMYUSRtwNg-BIgJ0AzCYWozxHL3BEbcQ'
		// let accessToken = localStorage.getItem('accessToken')
		let accessToken2 = 'AQBnDeIzQJSlzFpOgKjfFToKY7khWWbG45Hddm1GVPZpRTJ3rANtePI0z8hDbZ2LtIqI9qxYb9Yy6YUl'
		var myOptions = {
		  method: 'GET',
		  headers: {
			'Authorization': 'Bearer ' + accessToken2
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
			<Jumbotron>
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
		</Jumbotron>
		)
		
	  }
	
	}



