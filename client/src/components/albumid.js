import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {Jumbotron, Button} from 'react-bootstrap';
import axios from 'axios';

class Albums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "", // my query
      albums: null  // my response.
    }
  }
  auth() {
      const ROOT_URL = 'http://localhost:3000';
     console.log('!?!?!?!?')
     axios.get(`${ROOT_URL}`)
        .then((response) => {
          console.log("Response", response)
          this.search(response.data.access_token)
      })
        console.log('more !?!?!?!?');
    }
  search(accessToken) {
    console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/search?'; 
    const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=album&limit=20';
    var myOptions1 = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };
    fetch(FETCH_URL, myOptions1)
      .then(response => response.json())
      .then(json => {
        const albums = json.albums;        
        this.setState({ albums });
      })
  }
  albumDetails(){
    if (this.state.albums){
      console.log(this.state.albums);
      var rows = []
      console.log(rows)
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
            <div>No picture available :(</div>
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

  render() {
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
              onClick={()=> this.auth()}
               className="btn btn-primary" type="button">Go!</button>
            </span>
          </div>
        </div>
        <hr />
        <div>{this.albumDetails()}</div>  
      </div>
    )
  }
}
export default Albums;