import React from "react";
import "./NavLink.css";
import { Link } from "@reach/router";

const NavLink = ({
  to,
  active,
  children
}: {
  to: string;
  active: boolean;
  children: string;
}) => {
  return (
    <Link to={to} className={`navlink ${active && "active"}`}>
      {children}
    </Link>
  );
};

export default NavLink;
