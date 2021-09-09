import { SET_NOTIFICATION_LIST} from "../actions/actionTypes";

const initialState = {
  notifications: [],
  is_last_page: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION_LIST:
      return {
        ...state,
        notifications: action.notifications,
        is_last_page: action.is_last_page
      };
    default:
      return state;
  }
};

export default reducer;
