//SET UP
import React, {Component} from 'react'; //we are creating a component
import { connect } from 'react-redux'; //connects components to redux store
import { Link } from 'react-router'; //Fully accessible anchor tag...allows for easy routing 
import {Jumbotron, Button} from 'react-bootstrap'; //Allows bootstrap Jumbotron component & button classes 
import axios from 'axios'; //sends our Spotify API requests 

export default class Albums extends Component {
 constructor(props) {     //Initializes props within Albums class
   super(props);
   this.state = {  //sets initial state
     query: "", // my query
     albums: null  // my response.
   }
 }
  _handleKeyPress(e) { //Allows "Go!" button to be clicked with the enter key
    if (e.key === 'Enter') {
      this.auth()
    }
  }  
  auth() { //sets up and sends get request for access token
      const ROOT_URL = 'http://localhost:3000';
     console.log('!?!?!?!?')
     axios.get(`${ROOT_URL}`)
        .then((response) => {
          console.log("Response", response)
          this.search(response.data.access_token)
      })
        console.log('more !?!?!?!?');
    }
  search(accessToken) { //search for albums
    console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=album&limit=20';
    var myOptions1 = {
      method: 'GET',  
      headers: {    //Authorization headers required for search
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };
    fetch(FETCH_URL, myOptions1) //fetches data with concatenated url and required headers to return albums
      .then(response => response.json())  
      .then(json => {
        const albums = json.albums;
        this.setState({ albums });
      })
  }
  resetState() {  //resets to initial state
      this.setState({
      query: "", // my query
      artists: null  // my response.
    })
  }
  albumDetails(){ //contains the data of search results
    if (this.state.albums){
      console.log(this.state.albums);
      var rows = []  // must be a var instead of let to allow rows to be emptied for a new search later
      let albumImage = null
      let totalAlbums = this.state.albums.items.length
      for (let i=0; i<totalAlbums; i++){
        {rows.push(<div key={i} className='col-md-3 col-sm-6 col-xs-12'>
          {this.state.albums.items[i].name &&
            <div>
            <h6><strong>Album Name: </strong>{this.state.albums.items[i].name}</h6>
            </div>
          }
          {this.state.albums.items[i].artists[0] &&
            <div>
            <h6><strong>Artist(s): </strong>{this.state.albums.items[i].artists[0].name}</h6>
            </div>
          }
          {this.state.albums.items[i].images[0] &&
            <img src={this.state.albums.items[i].images[0].url} style={{maxWidth: '140px'}} />
          }
          {!this.state.albums.items[i].images[0] &&
            <img src='../img/noimage.png' />
          }
          <br/>
          <br/>
          </div>
          )}
      }
      return rows
    } else {
      console.log("Nothing here")
    }
  }

  render() {  //renders our JSX
    return (
      <div className="container">
       <div className="row">
        <div className="col-md-2"></div>
        <div className="col-xs-12 col-md-8">
         <h3 className="pageName">Search Albums</h3>
         <div className="input-group">
          <input type="text"
           onChange={event => { this.setState({ query: event.target.value }) }}
           className="form-control" placeholder="Search for albums"
            onKeyPress={this._handleKeyPress.bind(this)} />
          <span className="input-group-btn">
            <button
             onClick={()=> this.auth()}
             className="btn btn-primary fun" type="button">Go!</button>
            <Button className="btn btn-default" href="/artists">Switch to Artists</Button>
          </span>
         </div>
        </div>
        <div className="col-xs-3"></div>
       </div><hr/>

       <div  className='row back'>
         {this.albumDetails()}
       </div>
      </div>
    )
  }
}
