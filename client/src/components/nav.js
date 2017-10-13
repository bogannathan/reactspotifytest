import React, {Component} from 'react';
import {Navbar, Nav, FormGroup, FormControl, NavItem, NavDropdown, DropdownButton, MenuItem, CollapsibleNav, collapseOnSelect, Header, Toggle, Collapse, Button, ButtonToolbar} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Albums from "./albumid";


class NavBarHeader extends Component {


	render() {
		return (
			<Navbar inverse collapseOnSelect>
	          <Navbar.Header>
	            <Navbar.Brand>
	            <p><a id='searchHeader' href='/#' >Search Spotify</a></p>
	            </Navbar.Brand>
	            <Navbar.Toggle />
	          </Navbar.Header>
	         </Navbar>
		);
	}
}

export default NavBarHeader;