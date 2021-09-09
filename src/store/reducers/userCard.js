import { SET_USER_CARD } from "../actions/actionTypes";

const initialState = {
  data: {
    qr_code: "",
    id: 0,
    end_date: "",
    balance: "",
    code: "",
    user_name: "",
    type: "",
    orders: []
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_CARD:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
};

export default reducer;
