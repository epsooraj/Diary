import React, { Component } from "react";
import Container from "react-bootstrap/esm/Container";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HeaderNavbar from "./components/navbar";

import Home from "./views/home";
import PostPage from "./views/post/PostPage";

class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <HeaderNavbar />
        </Container>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:postid" component={PostPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
