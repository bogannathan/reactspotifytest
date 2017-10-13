import React, { Component } from 'react';
import NavBarHeader from './nav';
import Artist from './artists';
import Albums from './albumid';

{/* This file allows for the viewing of diffrent components and when they will be shown on the page.
In this case <NabBarHeader> will always been seen on the page, <Albums> will be seen when the page
is orginally loaded, and then this.props.children will enable <Albums> to be switched out with <Artists> */}


  export default class App extends Component {
      render() {
          return (
            <div> 
              <NavBarHeader />
            }
            }
             
            {this.props.children || <Albums />} 

            </div>
            
          );
      }
  }
