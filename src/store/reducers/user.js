import { GET_USER, SAVE_USER, REMOVE_USER } from "../actions/actionTypes";

const initState = {
    user: {
   
    },
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                user: action.user
            };
        case SAVE_USER:
            return {
                ...state,
                user: action.user
            };
        case REMOVE_USER:
            return {
                ...state,
                user:{
                    id: "",
                    email: "",
                    tj:"",
                    father_name:"",
                    phone: "",
                    role: "",
                    status:"",
                    token: ""
                }
            }
        default:
            return state;
    }
};

export default reducer;