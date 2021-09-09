
import { GET_TOKEN, SAVE_TOKEN, REMOVE_TOKEN} from "../actions/actionTypes";


const Reducer = (state = {
    token: {}
}, action) => {
    switch (action.type) {
        case GET_TOKEN:
            return { ...state, token: action.token};
        case SAVE_TOKEN:
            return { ...state, token: action.token};
        case REMOVE_TOKEN:
            return { ...state, token: action.token };
        default:
            return state;
    }
};
export default Reducer