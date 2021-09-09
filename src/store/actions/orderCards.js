
import { ADD_CARD, DELETE_CARD, DELETE_ALL_CARD } from "../actions/actionTypes";
import { uiStartLoading, uiStopLoading } from "./ui"

export const sendOrderCards = (token, value, comment, type) => {
    return dispatch => {
        const axios = require('axios');
        return axios({
            method: 'post',
            url: "http://jodcard.com/api/add_business_order",
            headers: {
                "Authorization": token,
                "Content-Type": "application/json",
                "cache-control": "no-cache",
            },
            data: {
                "value": value,
                "type": type,
                "comment": comment
            }
        }).then(response => {
            console.log(response);
            if (response.data.message == "fail") {
                dispatch(uiStopLoading());
                return false;
            } else {
                dispatch(deleteAll());
                dispatch(uiStopLoading());
                return true;
            }
        }).catch(error => {
            console.log(error);
            dispatch(uiStopLoading());
            return undefined;
        })
    };
};


export const deleteOne = (text) => {
    return {
        type: DELETE_CARD,
        data: text,
    }
}

export const addOne = (orders) => {
    return {
        type: ADD_CARD,
        data: orders,
    };
};
export const deleteAll = () => {
    return {
        type: DELETE_ALL_CARD,
    };
};