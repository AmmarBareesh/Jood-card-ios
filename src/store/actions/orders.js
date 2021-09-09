import { SET_ORDERS, ADD_ORDERS, DELETE_ORDER } from './actionTypes'
import axios from '../axios';
import { uiStartLoading, uiStopLoading } from "./ui"

export const getOrders = (token, page) => {
    return dispatch => {
        dispatch(uiStartLoading());
        return axios.get(`orders_business_list?page=${page}`, { headers: { Authorization: token } })
            .then(response => {
                console.log(response);
                if (response.data.message == "fail") {
                    alert("حدث خطا حاول ثانية")
                    dispatch(uiStopLoading());
                    return false;
                } else {
                    if (page == 1)
                        dispatch(setOrders(response.data.data));
                    else
                        dispatch(addOrders(response.data.data));
                    dispatch(uiStopLoading());
                    return true;
                }
            })
            .catch(error => {
                console.log(error);
                dispatch(uiStopLoading());
                alert("حدث خطا حاول ثانية")
                return undefined;
            })
    };
};
export const deleteOrder = (token, id) => {
    return dispatch => {
        dispatch(uiStartLoading());
        return axios.post(`refused_business_order`, {
            order_id: id,
            comment: ""
        }, { headers: { Authorization: token } })
            .then(response => {
                console.log(response);
                if (response.data.message == "fail") {
                    alert("حدث خطا حاول ثانية")
                    dispatch(uiStopLoading());
                    return false;
                } else {
                    dispatch(deleteOrderOne(id));
                    dispatch(uiStopLoading());
                    return true;
                }
            })
            .catch(error => {
                console.log(error);
                dispatch(uiStopLoading());
                alert("حدث خطا حاول ثانية")
                return undefined;
            })
    };
}

export const deleteOrderOne = (id) => {
    return {
        type: DELETE_ORDER,
        data: id,
    }
}

export const setOrders = (orders) => {
    return {
        type: SET_ORDERS,
        data: orders,
    };
};
export const addOrders = (orders) => {
    return {
        type: ADD_ORDERS,
        data: orders,
    };
};