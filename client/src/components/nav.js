import React, {Component} from 'react';
import {Navbar, Nav, FormGroup, FormControl, NavItem, NavDropdown, DropdownButton, MenuItem, CollapsibleNav, collapseOnSelect, Header, Toggle, Collapse, Button, ButtonToolbar} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';


class NavBarHeader extends Component {


	render() {
		return (
			<div>
			  <Navbar inverse collapseOnSelect>
			    <Navbar.Header>
			      <Navbar.Brand>
			        <a href="/home">Music Choice</a>
			      </Navbar.Brand>
			      <Navbar.Toggle />
			    </Navbar.Header>
			      <Nav pullRight >
				    <Navbar.Collapse>
				      <Navbar.Form pullLeft>
				        <FormGroup>
				          <FormControl type="text" placeholder="Search" />
				        </FormGroup>
				        {' '}
				        <Button type="submit">Submit</Button>
				      </Navbar.Form>
				    </Navbar.Collapse>
					</Nav>			 
				</Navbar>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated
	};
}

export default connect(mapStateToProps)(NavBarHeader);