import { SET_BOTTOM_SHEET_STATUS} from "../actions/actionTypes";

const initialState = {
  bottomStatus: false ,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOTTOM_SHEET_STATUS:
      return {
        ...state,
        bottomStatus: action.bottomStatus
      };
    default:
      return state;
  }
};

export default reducer;
