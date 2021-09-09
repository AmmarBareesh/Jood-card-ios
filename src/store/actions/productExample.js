import { SET_PRODUCT_EXAMPLE } from "../actions/actionTypes";
import axios from '../axios';
import { uiStartLoading, uiStopLoading } from "./ui"

export const getProducts = (token, type) => {
    return dispatch => {
        dispatch(uiStartLoading());
        return axios.get(`cards_list?type=${type}`, { headers: { Authorization: token } })
            .then(response => {
                console.log(response);
                if (response.data.message == "fail") {
                    alert("Error Try Again!")
                    dispatch(uiStopLoading());
                    return false;
                } else {
                    dispatch(setProduct(response.data.data));
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

export const setProduct = (data) => {
    return {
        type: SET_PRODUCT_EXAMPLE,
        data: data
    };
};
