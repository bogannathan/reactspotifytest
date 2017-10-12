import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {Jumbotron, Button} from 'react-bootstrap';




export default class Splash extends Component {
		render() {
				return (
			  			<Jumbotron>
			    			<h1>Welcome to "The Spotify Project!"</h1>
			    			<p>Please search a song!</p>
			  			</Jumbotron>
				);
			}
		}



