import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { colors } from "./theme";
import { Router, Link } from "@reach/router";
import IssuePage from "./Issue";

const App = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="issues">Issues</Link>
      </nav>
      <Router>
        <IssuePage path="issues/*" />
      </Router>
    </div>
  );
};

export default App;
