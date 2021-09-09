import { SET_ORDER_DETAILS } from './actionTypes'
import axios from '../axios';
import { uiStartLoading, uiStopLoading } from "./ui"

export const getOrderDetails = (token, id) => {
    return dispatch => {
        dispatch(uiStartLoading());
        return axios.get(`order_business_details?id=${id}`, { headers: { Authorization: token } })
            .then(response => {
                console.log(response);
                if (response.data.message == "fail") {
                    alert("Error Try Again!")
                    dispatch(uiStopLoading());
                    return false;
                } else {
                    dispatch(setOrderDetails(response.data.data));
                    dispatch(uiStopLoading());
                    return true;
                }
            })
            .catch(error => {
                console.log(error);
                dispatch(uiStopLoading());
                alert("Error Try Again!")
                return undefined;
            })
    };
};

export const setOrderDetails = (data) => {
    return {
        type: SET_ORDER_DETAILS,
        data: data
    };
};