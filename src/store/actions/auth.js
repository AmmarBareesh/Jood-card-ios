
import { AsyncStorage } from 'react-native';
import axios from '../axios';
import { GET_TOKEN, SAVE_TOKEN, REMOVE_TOKEN } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./ui"
import { saveUserData } from "./user"
import { navigationToHome } from "../../screens/LoginScreen"

export const tryAuth = (authData, authMode) => {
    return dispatch => {
        dispatch(uiStartLoading());
        if (authMode == "login") {
            return axios.post('login', {
                password: authData.password,
                email_or_tj: authData.email
            })
                .then(response => {
                    console.log(response);
                    if (response.data.message == "fail") {
                        if (response.data.data.global.user != null)
                            alert(response.data.data.global.user)
                        else alert("Error Try Again!")
                        dispatch(uiStopLoading());
                        return false;
                    } else {
                        dispatch(saveUserToken(response.data.data.token));
                        dispatch(saveUserData(response.data.data));
                        dispatch(uiStopLoading());
                        return true
                    }
                })
                .catch(error => {
                    console.log(error);
                    dispatch(uiStopLoading());
                    return undefined;
                })
        } 
        else {
            if(authData.tj == null){
                return axios.post('register', {
                    name : authData.name,
                    email: authData.email,
                    password_confirmation: authData.password_confirmation,
                    password : authData.password,
                })
                    .then(response => {
                        console.log(response);
                        if (response.data.message == "fail") {
                            if (response.data.data.global.user != null)
                                alert(response.data.data.global.user)
                                else  if (response.data.data.global.tj != null)
                                alert(response.data.data.global.tj)
                                else  if (response.data.data.global.email != null)
                                alert(response.data.data.global.email)
                            else alert("Error Try Again!")
                            dispatch(uiStopLoading());
                            return false;
                        } else {
                            dispatch(saveUserToken(response.data.data.token));
                            dispatch(saveUserData(response.data.data));
                            dispatch(uiStopLoading());
                            return true;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        dispatch(uiStopLoading());
                        return undefined;
                    })
            }else if(authData.email == null){
                return axios.post('register', {
                    name : authData.name,
                    password_confirmation: authData.password_confirmation,
                    password : authData.password,
                    tj: authData.tj
                })
                    .then(response => {
                        console.log(response);
                        if (response.data.message == "fail") {
                            if (response.data.data.global.user != null)
                                alert(response.data.data.global.user)
                                else  if (response.data.data.global.tj != null)
                                alert(response.data.data.global.tj)
                                else  if (response.data.data.global.email != null)
                                alert(response.data.data.global.email)
                            else alert("Error Try Again!")
                            dispatch(uiStopLoading());
                            return false;
                        } else {
                            dispatch(saveUserToken(response.data.data.token));
                            dispatch(saveUserData(response.data.data));
                            dispatch(uiStopLoading());
                            return true;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        dispatch(uiStopLoading());
                        return undefined;
                    })
            }else{
                return axios.post('register', {
                    name : authData.name,
                    email: authData.email,
                    password_confirmation: authData.password_confirmation,
                    password : authData.password,
                    tj: authData.tj
                })
                    .then(response => {
                        console.log(response);
                        if (response.data.message == "fail") {
                            if (response.data.data.global.user != null)
                                alert(response.data.data.global.user)
                                else  if (response.data.data.global.tj != null)
                                alert(response.data.data.global.tj)
                                else  if (response.data.data.global.email != null)
                                alert(response.data.data.global.email)
                            else alert("Error Try Again!")
                            dispatch(uiStopLoading());
                            return false;
                        } else {
                            dispatch(saveUserToken(response.data.data.token));
                            dispatch(saveUserData(response.data.data));
                            dispatch(uiStopLoading());
                            return true;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        dispatch(uiStopLoading());
                        return undefined;
                    })
            }
         
        }
    };
};

export const getToken = (data) => ({
    type: GET_TOKEN,
    token: data
});

export const saveToken = (data) => ({
    type: SAVE_TOKEN,
    token: data
});

export const removeToken = () => ({
    type: REMOVE_TOKEN,
});




export const getUserToken = () => dispatch =>
    AsyncStorage.getItem('userToken')
        .then((data) => {
            dispatch(uiStopLoading());
            dispatch(getToken(data));
        })
        .catch((err) => {
            dispatch(uiStopLoading());
            dispatch(error(err.message || 'ERROR'));
        })



export const saveUserToken = (data) => dispatch =>
    AsyncStorage.setItem('userToken', data)
        .then(() => {
            dispatch(uiStopLoading());
            dispatch(saveToken(data));
        })
        .catch((err) => {
            dispatch(uiStopLoading());
            dispatch(error(err.message || 'ERROR'));
        })

export const removeUserToken = () => dispatch =>
    AsyncStorage.removeItem('userToken')
        .then((data) => {
            dispatch(uiStopLoading());
            dispatch(removeToken(data));
        })
        .catch((err) => {
            dispatch(uiStopLoading());
            dispatch(error(err.message || 'ERROR'));
        })