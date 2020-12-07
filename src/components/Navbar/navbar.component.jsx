import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import './navbar.css'

class Navigation extends Component {
    state = {  }
    render() { 
        return (  
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand className="navLink" style={{cursor:'pointer'}} to="/">Brawl Buddy</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
       <Nav.Link className="navLink" href="/">Home</Nav.Link>
       <Nav.Link className="navLink" href="/ranked">Ranked</Nav.Link>
       <Nav.Link className="navLink" href="/stats">User Stats</Nav.Link>
       {/* <Nav.Link className="navLink" href="/track">Track</Nav.Link> */}

    </Nav>

  </Navbar.Collapse>
</Navbar>
        );
    }
}
 
export default Navigation;