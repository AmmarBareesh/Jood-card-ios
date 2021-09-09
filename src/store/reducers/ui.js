import { UI_START_LOADING, UI_STOP_LOADING, RETURN_LOADING_STUTUS } from "../actions/actionTypes";

const initialState = {
  isLoading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UI_START_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case UI_STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };
    case RETURN_LOADING_STUTUS:
      return {
        ...state,
        isLoading:action.isLoading
      };
    default:
      return state;
  }
};

export default reducer;