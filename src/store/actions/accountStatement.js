import { SET_ACCOUNT_STATEMENT, ADD_ACCOUNT_STATEMENT } from './actionTypes'
import axios from '../axios';
import { uiStartLoading, uiStopLoading } from "./ui"

export const getAccountStatements = (token, page, code) => {
    return dispatch => {
        dispatch(uiStartLoading());
        return axios.get(`account_statement?code=${code}&page=${page}`, { headers: { Authorization: token } })
            .then(response => {
                console.log(response);
                if (response.data.message == "fail") {
                    alert("Error Try Again!")
                    dispatch(uiStopLoading());
                    return false;
                } else {
                    if (page == 1)
                        dispatch(setAccountStatements(response.data.data));
                    else
                        dispatch(addAccountStatements(response.data.data));
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

export const setAccountStatements = (accountsStatements) => {
    return {
        type: SET_ACCOUNT_STATEMENT,
        data: accountsStatements,
    };
};
export const addAccountStatements = (accountsStatements) => {
    return {
        type: ADD_ACCOUNT_STATEMENT,
        data: accountsStatements,
    };
};