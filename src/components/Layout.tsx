import React, { ReactChildren } from "react";
import "./Layout.css";
import NavBar from "./NavBar";

const Layout = ({
  children,
  actions
}: {
  actions: ReactChildren;
  children: ReactChildren;
}) => {
  return (
    <div className="layout">
      <NavBar actions={actions} />
      <main className="content">
        {React.Children.map(children, child => child)}
      </main>
    </div>
  );
};

export default Layout;
