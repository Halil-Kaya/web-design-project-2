import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Navbar,Container,Nav } from 'react-bootstrap';

export default class NavbarComponent extends Component {

    render() {
        return (
            <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Companies</Nav.Link>
                            <Nav.Link href="/createCompany">Create Company</Nav.Link>
                            <Nav.Link href="/adresses">Adresses</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
            </Navbar>
        )
    }
}