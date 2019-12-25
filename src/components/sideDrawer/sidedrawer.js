import React, { Component } from "react";
import "./sideDrawer.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

class sidedrawer extends Component {
  render() {
    const style = {
      position: "fixed",
      width: "20%",
      height: "100%",
      zIndex: "1000",
      top: "40px",
      left: "0",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      padding: "50px 16px 16px 16px",
      boxSizing: "border-box",
      transition: "transform 0.3s ease-out"
    };
    return (
      <div style={style} className="card">
        {/* {this.props.userId === "wJ5h33jSxNQkix9vuH0ainr4Kxt2" ? ( */}
        {this.props.userId ? (
          <NavLink to="/Orders">
            {" "}
            <div className="card">Orders</div>
          </NavLink>
        ) : null}
        <NavLink to="/AdminLogin">
          <div className="card" onClick={this.props.logout}>
            Logout
          </div>
        </NavLink>
      </div>
    );
  }
}

const mapStateToprops = state => {
  return {
    userId: state.userId
  };
};

const mapDispatchToprops = dispatch => {
  return {
    logout: () => dispatch({ type: "LOGOUT" })
  };
};

export default connect(mapStateToprops, mapDispatchToprops)(sidedrawer);
