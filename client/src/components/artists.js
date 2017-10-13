//SET UP
import React, {Component} from 'react'; //create component
import { connect } from 'react-redux'; //connects components to redux store
import { Link } from 'react-router'; //allows for easy routing
import {Jumbotron, Button} from 'react-bootstrap'; //Bootstrap Jumbotron component & button classes 
import axios from 'axios'; //sends our Spotify API requests 

export default class Artists extends Component {
	constructor(props) { //Initializes props within Artists class
		super(props);
		this.state = { //sets initial state
		  query: "", // my query
		  artist: null  // my response.
		}
		this.auth = this.auth.bind(this)
	}
	_handleKeyPress(e) { //Allows "Go!" button to be clicked with the enter key
		if (e.key === 'Enter') {
			this.auth()
		}
	}
	  auth() { //sets up and sends get request for access token
	  	const ROOT_URL = 'http://localhost:3000';
		 console.log('????')
		 axios.get(`${ROOT_URL}`)
	      .then((response) => {
	        console.log("Response", response)
	        this.search(response.data.access_token)
			})
	      console.log('more ????')
	  }
	  search(accessToken) { //searches for artists
		console.log('this.state', this.state);
		console.log(accessToken)
		const BASE_URL = 'https://api.spotify.com/v1/search?';
		const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=20';
		var myOptions = {
		  method: 'GET',
		  headers: { //Authorization headers required for search
			'Authorization': 'Bearer ' + accessToken
		  },
		  mode: 'cors',
		  cache: 'default'
		};

		fetch(FETCH_URL, myOptions) //fetches data with concatenated url and required headers to return artists
		  .then((response) => response.json())
		  .then(json => {
		  	console.log('test ')
		  	console.log(json)
			const artists = json.artists;
			this.setState({ artists });
		  })

	  }
	  resetState() { //resets to initial state
	  	this.setState({
		  query: "", // my query
		  artists: null  // my response.
		})
	  }
	  artistsDetails(){ //contains the data of search results
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
	render() {	//renders search results
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
