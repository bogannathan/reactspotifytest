import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {Jumbotron, Button} from 'react-bootstrap';




export default class Track extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  query: "", // my query
		  track: null  // my response.
		}
	  }
	
	  search() {
		console.log('this.state', this.state);
		const BASE_URL = 'https://api.spotify.com/v1/search?';
		const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=track&limit=1';
		var accessToken = 'BQArIP_FyoDZ8Rp3QLZGYkp1ABD1nrEzXOkVVfIO7lGrNfvyc9uL3XLeubbeKemMjfNoEO9q7Lnm5G5IBu-4ig'
	
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
			const track = json.tracks.items[0];        
			this.setState({ track });
		  })
	
	  }
	
	  render() {

		let track = {
		  name: ''
		};
		if (this.state.track !== null) {
		  track = this.state.track;
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
			  <div> {track.name}   </div>
			</div>
	
		
		</div>
		</Jumbotron>
		)
		
	  }
	
	}