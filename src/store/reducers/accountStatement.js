import { SET_ACCOUNT_STATEMENT, ADD_ACCOUNT_STATEMENT } from "../actions/actionTypes";

const initialState = {
  user_name: "",
  card_code: "",
  total_from: "",
  total_to: "",
  card_balance: "",
  transaction: {
    data: [],
    is_last_page: false
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCOUNT_STATEMENT:
      return {
        ...state,
        user_name: action.data.user_name,
        card_code: action.data.card_code,
        total_from: action.data.total_from,
        total_to: action.data.total_to,
        card_balance: action.data.card_balance,
        transaction: {
          data: action.data.transaction.data,
          is_last_page: action.data.transaction.is_last_page
        }
      };
    case ADD_ACCOUNT_STATEMENT:
      return {
        ...state,
        transaction: {
          data: state.transaction.data.concat(action.data.transaction.data),
          is_last_page: action.data.transaction.is_last_page
        }
      };
    default:
      return state;
  }
};

export default reducer;
