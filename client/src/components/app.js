import React, { Component } from 'react';
import NavBarHeader from './nav';
import Artist from './splash';



  export default class App extends Component {
      render() {
          return (
            <div>
              <NavBarHeader />
              
            {this.props.children || <Artist />}
            
            </div>
          );
      }
  }