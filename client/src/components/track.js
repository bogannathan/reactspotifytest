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
        const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
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
            <Jumbotron>
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
            <div>
              <div> {artist.name}   </div>
              <div> {artist.followers.total} </div>
            </div>
    
        
        </div>
        </Jumbotron>
        )
        
      }
    
    }