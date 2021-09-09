import { SET_COMMENTS,ADD_COMMENTS,ADD_COMMENT} from "../actions/actionTypes";

const initialState = {
  user: {
    id:0 ,
    name: "",
    image: ""
  },
  comments:[],
  is_last_page: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return {
        ...state,
        user: action.data.user,
        comments: action.data.comments,
        is_last_page: action.data.is_last_page
      };
      case ADD_COMMENTS:
      return {
        ...state,
        comments: state.comments.concat(action.data.comments),
        is_last_page: action.data.is_last_page
      };
      case ADD_COMMENT:
      return{
          ...state,
          comments:state.comments.concat(action.data)
      }
    default:
      return state;
  }
};

export default reducer;
