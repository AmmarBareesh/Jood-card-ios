import { SET_NOTIFICATION_LIST } from './actionTypes'
import axios from '../axios';
import { uiStartLoading, uiStopLoading } from "./ui"

export const getNotifications = (token,page) => {
    return dispatch => {
        dispatch(uiStartLoading());
            return axios.get(`notfication_list?page=${page}`, {headers: { Authorization: token }})
                .then(response => {
                    console.log(response);
                    if (response.data.message == "fail") {
                        alert("Error Try Again!")
                        dispatch(uiStopLoading());
                        return false;
                    } else {
                        dispatch(setNotifictions(response.data.data.notfications,response.data.data.is_last_page));
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

export const setNotifictions = (notifications,is_last_page) => {
    return {
        type: SET_NOTIFICATION_LIST,
        notifications: notifications,
        is_last_page:is_last_page
    };
};