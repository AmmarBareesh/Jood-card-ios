
// "link": "https://www.n11.com/",
// "price": "5",
// "note": "ملاحظة هامة ها",
// "id": ""

import { ADD_PRODUCT, DELETE_PRODUCT,DELETE_ALL } from "../actions/actionTypes";

const initialState = {
    value: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                value: state.value.concat(action.data)
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                value: state.value.filter(x => {
                    return x.link != action.data
                })
            }
        case DELETE_ALL:
            return {
                ...state,
                value: []
            }
        default:
            return state;
    }
};

export default reducer;
