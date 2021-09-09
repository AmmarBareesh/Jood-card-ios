import { AsyncStorage } from 'react-native';
import {  GET_NOTIFICATION ,SAVE_NOTIFICATION} from "./actionTypes";
import {uiStopLoading} from "./ui"

export const getNotification = (data) => ({
    type: GET_NOTIFICATION,
    notificationStatus:data
});

export const saveNotification = (data) => ({
    type: SAVE_NOTIFICATION,
    notificationStatus:data
});





export const getNotificationStatus = () => dispatch => 
 AsyncStorage.getItem('notification')
        .then((data) => {
            dispatch(uiStopLoading());
            dispatch(getNotification(data));
        })
        .catch((err) => {
            dispatch(loading(false));
            // dispatch(error(err.message || 'ERROR'));
        })



export const saveNotificationStatus = (data2) => dispatch =>
    AsyncStorage.setItem('notification', JSON.stringify(data2))
        .then((data) => {
            dispatch(uiStopLoading());
            dispatch(saveNotification(data2));
        })
        .catch((err) => {
            dispatch(uiStopLoading());
            // dispatch(error(err.message || 'ERROR'));
        })
