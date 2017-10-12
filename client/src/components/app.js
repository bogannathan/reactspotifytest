import React, { Component } from 'react';
import NavBarHeader from './nav';
import Splash from './splash';



  export default class App extends Component {
      render() {
          return (
            <div>
              <NavBarHeader />
              
            {this.props.children || <Splash />}
            
            </div>
          );
      }
  }