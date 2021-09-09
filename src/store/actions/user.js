import { AsyncStorage } from 'react-native';
import axios from '../axios';
import {  GET_USER ,SAVE_USER,REMOVE_USER} from "./actionTypes";
import {uiStopLoading} from "./ui"

export const getUser = (data) => ({
    type: GET_USER,
    user:data
});

export const saveUser = (data) => ({
    type: SAVE_USER,
    user:data
});

export const removeUser = () => ({
    type: REMOVE_USER,
});




export const getUserData = () => dispatch => 
 AsyncStorage.getItem('userData')
        .then((data) => {
            dispatch(uiStopLoading());
            dispatch(getUser(JSON.parse(data)));
        })
        .catch((err) => {
            dispatch(loading(false));
            // dispatch(error(err.message || 'ERROR'));
        })



export const saveUserData = (data2) => dispatch =>
    AsyncStorage.setItem('userData', JSON.stringify(data2))
        .then((data) => {
            dispatch(uiStopLoading());
            dispatch(saveUser(data2));
        })
        .catch((err) => {
            dispatch(uiStopLoading());
            // dispatch(error(err.message || 'ERROR'));
        })

export const removeUserData = () => dispatch =>
    AsyncStorage.removeItem('userData')
        .then((data) => {
            dispatch(uiStopLoading());
            dispatch(removeUser(data));
        })
        .catch((err) => {
            dispatch(uiStopLoading());
            // dispatch(error(err.message || 'ERROR'));
        })