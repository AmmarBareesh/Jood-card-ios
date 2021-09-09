import { SET_ORDER_DETAILS } from "../actions/actionTypes";

const initialState = {
    id: 0,
    user_id: 0,
    user_name: "",
    user_iamge: "",
    price: "",
    shipping_price: "",
    wages_buy_price: null,
    total: "",
    last_status: "",
    type: "",
    business_type: "",
    date: "",
    status: [],
    products: [],
    comments: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDER_DETAILS:
            return {
                ...state,
                id: action.data.id,
                user_id: action.data.user_id,
                user_name: action.data.user_name,
                user_iamge: action.data.user_iamge,
                price: action.data.price,
                shipping_price: action.data.shipping_price,
                wages_buy_price: action.data.wages_buy_price,
                total: action.data.total,
                last_status: action.data.last_status,
                type: action.data.type,
                business_type: action.data.business_type,
                date: action.data.date,
                status: action.data.status,
                products: action.data.products,
                comments: action.data.comments,
            };
        default:
            return state;
    }
};

export default reducer;
