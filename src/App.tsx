import React from "react";
import "./App.css";
import { Router, Redirect } from "@reach/router";
import IssuePage from "./Issue";

const Home = ({ path }: { path: string }) => {
  return <Redirect noThrow from="/" to="issues" />;
};

const App = () => {
  return (
    <Router style={{ height: "100%" }}>
      <Home path="/" />
      <IssuePage path="issues/*" />
    </Router>
  );
};

export default App;
