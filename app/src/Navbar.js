import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux'
import { userLogout } from './actions/app_actions'


class Bar extends Component {
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render(){
    return (
      <Navbar className="nav" collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#"><span className="navItems">Welcome back {this.props.username}</span></a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
          <Nav>
            <NavItem className="navHeaders" eventKey={1} onClick={this.props.renderMessageList}><span className="navItems">My Profile</span></NavItem>
            <NavItem className="navHeaders" eventKey={2} onClick={this.props.renderGroupList}><span className="navItems">My Saved Messages</span></NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={6} onClick={this.props.userLogout} href="#"><span className="navItems">Log out</span></NavItem>
          </Nav>
      </Navbar>
    )
  }
}

function mapStateToProps({ appState }) {
	return { username: appState.username };
}

export default connect(mapStateToProps, {userLogout})(Bar);
