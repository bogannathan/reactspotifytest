import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {Jumbotron, Button} from 'react-bootstrap';
import axios from 'axios';

export default class Splash extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  query: "", // my query
		  artist: null  // my response.
		}
		this.auth = this.auth.bind(this)
		const baseState = {
		  query: "", // my query
		  artist: null  // my response.
		}
	}
	_handleKeyPress(e) {
		if (e.key === 'Enter') {
			this.auth()
		}
	}
	  auth() {
	  	const ROOT_URL = 'http://localhost:3000';
		 console.log('????')
		 axios.get(`${ROOT_URL}`)
	      .then((response) => {
	        console.log("Response", response)
	        this.search(response.data.access_token)
			})
	      console.log('more ????')
	  }
	  search(accessToken) {
		console.log('this.state', this.state);
		console.log(accessToken)
		const BASE_URL = 'https://api.spotify.com/v1/search?';
		const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=20';
		var myOptions = {
		  method: 'GET',
		  headers: {
			'Authorization': 'Bearer ' + accessToken
		  },
		  mode: 'cors',
		  cache: 'default'
		};

		fetch(FETCH_URL, myOptions)
		  .then((response) => response.json())
		  .then(json => {
		  	console.log('test ')
		  	console.log(json)
			const artists = json.artists;
			this.setState({ artists });
		  })

	  }
	  resetState() {
	  	this.setState({
		  query: "", // my query
		  artists: null  // my response.
		})
	  }
	  artistsDetails(){
				if (this.state.artists){

					var rows = [] // must be a var instead of let to allow rows to be emptied for a new search later
					let artistImage = null
					let totalArtists = this.state.artists.items.length
					for (let i=0; i<totalArtists; i++){
						{rows.push(<div key={i} className='col-md-3 col-sm-4 col-xs-6 fill'>
							{this.state.artists.items[i].name &&
								<div><h6><strong>Artist Name: </strong>{this.state.artists.items[i].name}  </h6>
								</div>
							}
							{this.state.artists.items[i].followers &&
								<div><h6><strong>Spotify Followers: </strong>{this.state.artists.items[i].followers.total}</h6>
								</div>
							}
							{this.state.artists.items[i].genres[0] &&
								<div> <h6><strong>Genre: </strong>{this.state.artists.items[i].genres[0]}</h6>
								</div>
							}
							{this.state.artists.items[i].images[0] &&
								<div><img src={this.state.artists.items[i].images[0].url}  /></div>
							}
							{!this.state.artists.items[i].images[0] &&
								<img src='../img/noimage.png' />
							}
							<br/>
							<br/>
						  </div>
						)}
					}
					return rows
				}else{
					return ""
				}
	}
	render() {
		return (
		<div className="container">
			<div className="row">
				<div className="col-md-2"></div>
				<div className="col-xs-12 col-md-8">
					<h3 className="pageName">Search Artist</h3>
					<div className="input-group">
						<input type="text"
						 onChange={event => { this.setState({ query: event.target.value }) }}
							className="form-control" placeholder="Search for artist"
							onKeyPress={this._handleKeyPress.bind(this)} />
						<span className="input-group-btn">
				  	<button
				  		onClick={()=> this.auth()}
				  		className="btn btn-primary fun" type="button">Go!</button>
							<Button className="btn btn-default" href="/albumid">Switch To Albums</Button>
						</span>
					</div>
				</div>
				<div className="col-md-2"></div>
			</div><hr />

			<div className='row back'>
				{this.artistsDetails()}
			</div>
		</div>
		)
	}
}
