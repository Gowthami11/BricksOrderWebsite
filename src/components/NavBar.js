import React from "react";
import { NavLink, withRouter } from "react-router-dom";

function Navbar(props) {
  console.log("props.userId", props.userid == null);
  const style = {
    borderRadius: "6px",
    color: "black",
    margin: "0%",
    paddingLeft: "8px",
    paddingRight: "8px",
    backgroundColor: "white"
  };

  return (
    <div>
      <nav className="navbar  navbar-dark bg-dark">
        {/* <nav className="navbar navbar-dark bg-dark"></nav> */}
        {props.history.location.pathname === "/AdminLogin" ||
        props.userid === null ? null : (
          <span
            onClick={e => {
              e.preventDefault();
              return props.setShow();
            }}
          >
            {" "}
            <i className="fa fa-bars fa-1x" style={{ color: "white" }} />
          </span>
        )}{" "}
        <NavLink to="/">
          <i
            style={{ textAlign: "center", color: "white" }}
            className="navbar-brand"
          >
            {" "}
            {props.children}{" "}
          </i>
        </NavLink>
        {/* {props.userid === "wJ5h33jSxNQkix9vuH0ainr4Kxt2" ? (
          <NavLink to="/Orders">
            <span style={style}>Orders</span>
          </NavLink>
        ) : null}*/}
        <NavLink to="/AdminLogin">
          {props.userid ? (
            <span style={style} onClick={props.logout}>
              LOGOUT
            </span>
          ) : props.history.location.pathname === "/" && !props.userid ? (
            <div style={style}>Admin Login</div>
          ) : null}
        </NavLink>
      </nav>
    </div>
  );
}
export default withRouter(Navbar);
