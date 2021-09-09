
import { ADD_CARD, DELETE_CARD,DELETE_ALL_CARD } from "../actions/actionTypes";

const initialState = {
    value: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CARD:
            return {
                ...state,
                value: state.value.concat(action.data)
            }
        case DELETE_CARD:
            return {
                ...state,
                value: state.value.filter(x => {
                    return x.link != action.data
                })
            }
        case DELETE_ALL_CARD:
            return {
                ...state,
                value: []
            }
        default:
            return state;
    }
};

export default reducer;
