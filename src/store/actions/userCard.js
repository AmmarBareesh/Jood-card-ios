import { SET_USER_CARD } from './actionTypes'
import axios from '../axios';
import { uiStartLoading, uiStopLoading } from "./ui"

export const getCard = (token) => {
    return dispatch => {
        dispatch(uiStartLoading());
            return axios.get(`all_user_cards`, {headers: { Authorization: token }})
                .then(response => {
                    console.log(response);
                    if (response.data.message == "fail") {
                        alert("Error Try Again!")
                        dispatch(uiStopLoading());
                        return false;
                    } else {
                        dispatch(setUserCard(response.data.data.business.card));
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

export const setUserCard = (data) => {
    return {
        type: SET_USER_CARD,
        data: data,
    };
};