const initstate = {
  error: false,
  idToken: null,
  userId: null
};
const reducer = (state = initstate, action) => {
  switch (action.type) {
    case "PLACE_ORDER": {
      console.log(
        "action.name,action.bricksNo,action.date",
        action.name,
        action.bricksNo,
        action.date
      );
      return {
        ...state
      };
    }
    case "AUTH_FAIL": {
      return {
        ...state,
        loading: false,
        error: true
      };
    }

    case "AUTH_SUCCESS": {
      return {
        ...state,
        userId: action.userId,
        idToken: action.idToken
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        userId: null,
        idToken: null
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};
export default reducer;
