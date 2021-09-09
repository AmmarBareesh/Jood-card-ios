import { SET_ORDERS, ADD_ORDERS,DELETE_ORDER } from "../actions/actionTypes";

const initialState = {
    orders:[],
    is_last_page:false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orders:action.data.orders,
        is_last_page:action.data.is_last_page
      };
    case ADD_ORDERS:
      return {
        ...state,
        orders:state.orders.concat(action.data.orders),
        is_last_page:action.data.is_last_page
      };
      case DELETE_ORDER:
      return{
        ...state,
        orders:state.orders.filter(x=>{
          return x.id != action.data
        })
      }
    default:
      return state;
  }
};

export default reducer;
