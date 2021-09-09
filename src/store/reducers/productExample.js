
import { SET_PRODUCT_EXAMPLE } from "../actions/actionTypes";

const initState = {
    cards:[],
    is_last_page:true
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case SET_PRODUCT_EXAMPLE:
            return {
                ...state,
                cards: action.data.cards,
                is_last_page:action.data.is_last_page
            };
        default:
            return state;
    }
};

export default reducer;