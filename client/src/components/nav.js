//SET UP
import React, {Component} from 'react'; //{Component} ---this file is a component!
import {Navbar, Nav, FormGroup, FormControl, NavItem, NavDropdown, DropdownButton, MenuItem, CollapsibleNav, collapseOnSelect, Header, Toggle, Collapse, Button, ButtonToolbar} from 'react-bootstrap';
import { connect } from 'react-redux'; //connect allows components to be connected to the redux store
import { Link } from 'react-router'; //Link allows for declarative nagivation of an app
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

//EXPORT COMPONENT
export default NavBarHeader;