import React, { Component } from "react";
import AddBrick from "./components/AddBrick.js";
import { Route } from "react-router-dom";
import Auth from "./components/Auth";
import Orders from "./components/Orders";
class App extends Component {
  render() {
    return (
      <div>
        <Route path="/AdminLogin" component={Auth} exact />
        <Route path="/" component={AddBrick} exact />
        <Route path="/Orders" component={Orders} exact />
        {/* //AIzaSyAzZW3ZWW5wpF_t7p_1BVPuelFCYP9k-zw */}
      </div>
    );
  }
}

export default App;
