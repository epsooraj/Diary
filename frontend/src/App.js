import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./views/home";
import Login from "./components/login";
import Signup from "./components/signup";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login/" component={Login} />
        <Route path="/signup/" component={Signup} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
