import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import Navbar from "./Navbar";
import SideDrawer from "./sideDrawer/sidedrawer";
import Backdrop from "./Backdrop/Backdrop";
class AddBrick extends Component {
  state = {
    show: false
  };
  setShow = () => {
    console.log("this.state.show", this.state.show);
    this.setState({ show: !this.state.show });
  };
  render() {
    const style = {
      textAlign: "center",
      padding: "4px",
      margin: "3px",
      borderRadius: "10px"
    };
    return (
      <div>
        {" "}
        <Navbar
          style={{
            position: "fixed" /* Set the navbar to fixed position */,
            top: "0" /* Position the navbar at the top of the page */,
            width: "100%"
          }}
          userid={this.props.userId}
          logout={this.props.logout}
          show={this.state.show}
          setShow={this.setShow}
        >
          BRICKS WEBSITE
        </Navbar>
        {this.state.show ? (
          <div>
            <SideDrawer
              style={{
                height: "700px",
                width: "20%",
                color: "black",
                backgroundColor: "white",
                border: "1px solid black",
                zIndex: "100%",
                position: "fixed"
              }}
            />
            <Backdrop show={this.state.show} setShow={this.setShow} />
          </div>
        ) : null}
        <div
          style={{
            textAlign: "center",
            padding: "30px",
            margin: "15%",
            zIndex: "500%",
            backgroundColor: "grey",
            borderRadius: "20px"
          }}
        >
          <input
            type="text"
            ref={name => (this.name = name)}
            style={style}
            placeholder="enter your Name"
          />
          <br />

          <input
            type="text"
            ref={nob => (this.nob = nob)}
            style={style}
            placeholder="enter No of bricks"
          />
          <br />

          <input
            type="date"
            ref={date => (this.date = date)}
            style={style}
            placeholder="enter order date"
          />
          <br />
          <textarea
            type="text"
            placeholder="any special instructions"
            defaultValue="nothing"
            ref={inst => (this.inst = inst)}
          />
          <br />
          <button
            style={{ borderRadius: "20px" }}
            className="btn btn-primary"
            onClick={e => {
              e.preventDefault();
              this.props.placeOrder(
                this.name.value,
                this.nob.value,
                this.date.value,
                this.inst.value,
                this.props.token,
                this.props.userId
              );
            }}
          >
            Place Order
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToprops = state => {
  return {
    userId: state.userId,
    token: state.idToken
  };
};

const mapDispatchToprops = dispatch => {
  return {
    placeOrder: (name, bricksNo, date, inst, token, userId) =>
      dispatch(
        actions.placeOrderAxios(name, bricksNo, date, inst, token, userId)
      ),
    logout: () => dispatch({ type: "LOGOUT" })
  };
};

export default connect(mapStateToprops, mapDispatchToprops)(AddBrick);
