import { GET_NOTIFICATION, SAVE_NOTIFICATION } from "../actions/actionTypes";

const initState = {
    notificationStatus:true
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case GET_NOTIFICATION:
            return {
                ...state,
                notificationStatus: action.notificationStatus
            };
        case SAVE_NOTIFICATION:
            return {
                ...state,
                notificationStatus: action.notificationStatus
            };
        default:
            return state;
    }
};

export default reducer;