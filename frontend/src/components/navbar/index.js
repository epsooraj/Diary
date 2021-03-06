import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import Logo from "../../assets/images/logo/diary.png";
import GithubLogo from "../../assets/images/icons/github/GitHub-Mark-32px.png";

import { getCookie } from "../../utils/cookie";

export default class HeaderNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
    };
  }

  componentDidMount() {
    // Fetch user
    fetch("/accounts/user/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ user: data.user });
      });
  }

  logOut = () => {
    fetch("/auth/logout/", {
      method: "POST",
      headers: { "X-CSRFToken": getCookie("csrftoken") },
    }).then(() => {
      window.location = "/accounts/login/?next=/";
    });
  };

  render() {
    return (
      <Navbar collapseOnSelect expand="lg">
        <Navbar.Brand href="#">
          <img
            className="d-inline-block align-center"
            src={Logo}
            alt="logo"
            width="60"
            height="60"
            loading="lazy"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link target="_blank" href="https://github.com/epsooraj/Diary">
              <img width="25" src={GithubLogo} />
            </Nav.Link>

            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown
              className="text-capitalize text-dark"
              title={`Welcome ${this.state.user}`}
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="#" onClick={this.logOut}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
