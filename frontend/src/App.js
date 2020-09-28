import React, { Component } from "react";
import Container from "react-bootstrap/esm/Container";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HeaderNavbar from "./components/navbar";

import Home from "./views/home";

class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <HeaderNavbar />
        </Container>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
