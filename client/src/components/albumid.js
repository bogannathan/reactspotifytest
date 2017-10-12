import React, { Component } from 'react';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "", // my query
      artist: null  // my response.
    }
  }
  search() {
    console.log('this.state', this.state);
    const BASE_URL = 'https://api.spotify.com/v1/albums/{id}';
    const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=album&limit=1';
    var accessToken = 'BQANAwb7uAoT6X32opc4GMeyKpuKoDRPbJL1Ba1X_smNbaAD4cwzMH5XyeckBy-1wlDa3yRxZETFzyVO2imL5A'
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
        const album = json.albums.items[0];        
        this.setState({ album });
      })
  }
  render() {
    let album = {
      name: '',
      followers: {
        total: ''
      }
    };
    if (this.state.artist !== null) {
      album = this.state.album;
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
          <div> {album.name}   </div>
        </div>
        </div>
    )
  }
}
export default App;