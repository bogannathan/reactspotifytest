import React, { Component } from 'react';
import NavBarHeader from './nav';
import Artist from './splash';
import Albums from './albumid';



  export default class App extends Component {
      render() {
          return (
            <div>
              <NavBarHeader />
              
            {this.props.children || <Albums />} 
            
            </div>
          );
      }
  }
