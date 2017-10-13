import React, {Component} from 'react';
import {Navbar, Nav, FormGroup, FormControl, NavItem, NavDropdown, DropdownButton, MenuItem, CollapsibleNav, collapseOnSelect, Header, Toggle, Collapse, Button, ButtonToolbar} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';


class NavBarHeader extends Component {


	render() {
		return (
	
			<Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
            <p>Search Spotify</p>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          </Navbar>
			
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated
	};
}

export default connect(mapStateToProps)(NavBarHeader);