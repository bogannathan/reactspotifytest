import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {Button, div} from 'react-bootstrap';
import Signup from './auth/signup';
import Signin from './auth/signin';


class User extends Component {
		render() {
				return (
					<div>
						<div className= "row">
							<div className="col-md-6">
								<Signup />
							</div>
							<div className="col-md-6">
								<Signin />
							</div>
						</div>
					</div>
				);
			}
		}

export default User;