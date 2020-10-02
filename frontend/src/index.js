import React, { Component } from "react";
import { render } from "react-dom";

import "regenerator-runtime/runtime.js";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";

const container = document.getElementById("app");
render(<App />, container);
