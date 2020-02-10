import React, { ReactChildren } from "react";
import NavLink from "./NavLink";
import { Location } from "@reach/router";
import "./NavBar.css";

const NavBar = ({ actions }: { actions: ReactChildren }) => {
  return (
    <Location>
      {({ location, navigate }) => (
        <nav className="navbar">
          <NavLink active={location.pathname === "/"} to="/">
            Home
          </NavLink>
          <NavLink
            active={location.pathname.startsWith("/issues")}
            to="/issues"
          >
            Issues
          </NavLink>
          {actions}
        </nav>
      )}
    </Location>
  );
};

export default NavBar;
