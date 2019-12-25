import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import Navbar from "./Navbar";
import { NavLink, Redirect } from "react-router-dom";
import Grassfield from "../Images/grassfield.jpg";
class Auth extends Component {
  state = {
    controls: {
      Email: {
        elementtype: "input",
        elementConfig: {
          type: "text",
          placeholder: "Enter your mail"
        },
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        value: "",
        touched: false
      },
      password: {
        elementtype: "input",
        elementConfig: {
          type: "password",
          placeholder: "Enter your Password"
        },
        validation: {
          required: true,
          minlen: 6
        },
        valid: false,
        value: "",
        touched: false
      }
    },
    isSignup: true
  };
  checkValidity = (rules, value) => {
    console.log(rules, value);
    let isValid = true;
    if (rules.minlen) {
      isValid = isValid && value.length >= rules.minlen;
    }
    if (rules.maxlen) {
      isValid = isValid && value.length <= rules.maxlen;
    }

    if (rules.isEmail) {
      const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      isValid = isValid && pattern.test(value);
    }
    console.log(isValid);
    return isValid;
  };
  switchHandler = e => {
    e.preventDefault();
    this.setState({
      isSignup: !this.state.isSignup
    });
  };
  inputChangeHandler = (event, controlName) => {
    const controls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          this.state.controls[controlName].validation,
          event.target.value
        ),
        touched: true
      }
    };

    this.setState({
      controls
    });
  };
  render() {
    console.log("this.props.userid", this.props.userId);
    let redirect;
    if (this.props.userId) redirect = <Redirect to="/" />;
    let formElerr = [];
    for (let i in this.state.controls) {
      formElerr.push({ id: i, config: this.state.controls[i] });
    }
    const form = formElerr.map(fr => (
      <div style={{ textAlign: "center" }}>
        {" "}
        <label htmlFor="email">
          <b>{fr.id}</b>
        </label>
        <br />
        <input
          style={{ borderRadius: "10px", margin: "10px" }}
          type={fr.config.elementConfig.type}
          placeholder={fr.config.elementConfig.placeholder}
          value={fr.config.value}
          onChange={e => this.inputChangeHandler(e, fr.id)}
        />
        <br />
      </div>
    ));
    console.log("this.props.userId", this.props.userId);
    return (
      <div>
        <Navbar userid={this.props.userId} logout={this.props.logout}>
          BRICKS WEBSITE
        </Navbar>
        {redirect}
        <form
          onSubmit={e => {
            e.preventDefault();
            return this.props.onAuth(
              this.state.controls.Email.value,
              this.state.controls.password.value,
              this.state.isSignup
            );
          }}
          style={{
            left: "15%",
            top: "20%",
            position: "fixed",
            textAlign: "center",
            padding: "5%",
            width: "70%",
            borderRadius: "40px",
            backgroundImage: `url(${Grassfield})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}
        >
          <br />
          <br />
          <div> {form}</div>
          <div style={{ textAlign: "center" }}>
            {" "}
            <button
              className="btn btn-primary"
              style={{
                borderRadius: "30px",
                margin: "10px",
                textAlign: "center"
              }}
            >
              SUBMIT
            </button>
            <br />
          </div>
          <div style={{ textAlign: "center" }}>
            <button className="btn btn-primary" onClick={this.switchHandler}>
              switch to {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
            </button>{" "}
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    userId: state.userId
  };
};

const mapDispatchToprops = dispatch => {
  return {
    onAuth: (email, pwd, isSignup) =>
      dispatch(actions.auth(email, pwd, isSignup)),
    logout: () => dispatch({ type: "LOGOUT" })
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(Auth);
