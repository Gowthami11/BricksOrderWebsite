import axios from "axios";
export const placeOrderAxios = (name, bricksNo, date, inst, token, userId) => {
  console.log("this.props.token in place order", token);

  return dispatch => {
    if (token === null) return alert("please login to order");
    if (name && bricksNo && date && token) {
      var order = {
        edit: false,
        name: name,
        bricksNo: bricksNo,
        date: date,
        dipatched: false,
        instructions: inst,
        userId: userId
      };

      axios
        .post(
          "https://brickorder-4ca5f.firebaseio.com/orders.json?auth=" + token,
          order
        )
        .then(res => {
          console.log(res.data);
          alert("Order has been placed successfully");
          dispatch(placeorder());
        })
        .catch(err => console.log(err));
    } else {
      dispatch(OrderFail());
    }
  };
};
export const OrderFail = () => {
  return {
    type: "ORDER_FAIL"
  };
};
export const placeorder = () => {
  return {
    type: "PLACE_ORDER"
  };
};

export const authStart = () => {
  return {
    type: "AUTH_START"
  };
};

export const authFail = () => {
  return {
    type: "AUTH_FAIL"
  };
};

export const auth = (email, pwd, isSignup) => {
  console.log("email, pwd", email, pwd, isSignup);
  return dispatch => {
    const authdata = {
      email: email,
      password: pwd,
      returnSecureToken: true
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAzZW3ZWW5wpF_t7p_1BVPuelFCYP9k-zw";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAzZW3ZWW5wpF_t7p_1BVPuelFCYP9k-zw";
    }
    axios
      .post(url, authdata)
      .then(res => {
        console.log(res.data);
        dispatch(authSuccess(res.data.localId, res.data.idToken));
        dispatch(checkAuthTimeOut(res.data.expiresIn));
      })
      .catch(err => alert("invalid details"));
  };
};
export const checkAuthTimeOut = expiresIn => {
  console.log(expiresIn);

  return dispatch => {
    setTimeout(() => {
      return dispatch(Logout());
    }, expiresIn * 1000);
  };
};

export const Logout = () => {
  return {
    type: "LOGOUT"
  };
};

export const authSuccess = (userId, idToken) => {
  return {
    type: "AUTH_SUCCESS",
    userId: userId,
    idToken: idToken
  };
};
