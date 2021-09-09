import { SET_COMMENTS, ADD_COMMENTS, ADD_COMMENT } from './actionTypes'
import axios from '../axios';
import { uiStartLoading, uiStopLoading } from "./ui"

export const getComments = (token, id, page) => {
    return dispatch => {
        dispatch(uiStartLoading());
        return axios.get(`order_business_comments?id=${id}&page=${page}`, { headers: { Authorization: token } })
            .then(response => {
                console.log(response);
                if (response.data.message == "fail") {
                    alert("Error Try Again!")
                    dispatch(uiStopLoading());
                    return false;
                } else {
                    if (page = 1)
                        dispatch(setComments(response.data.data));
                    else
                        dispatch(addComments(response.data.data));
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
export const addComment = (text, token, id) => {
    return dispatch => {
        return axios.post('add_comment', {
            order_id: id,
            comment: text},{
            headers: { Authorization: token }}
        ).then(response => {
            console.log(response);
            if (response.data.message == "fail") {
                alert("Error Try Again!")
                dispatch(uiStopLoading());
                return false;
            } else {
                dispatch(addOneComment({ id: response.data.data.user_id,
                order_id: response.data.data.order_id,
                comment: text,
                is_admin: "no",
                date: "منذ ثانية"}))
                dispatch(uiStopLoading());
                return true;
            }
        }).catch(error => {
            console.log(error);
            dispatch(uiStopLoading());
            alert("Error Try Again!")
            return undefined;
        })
    };
};

export const setComments = (data) => {
    return {
        type: SET_COMMENTS,
        data: data
    };
};
export const addComments = (data) => {
    return {
        type: ADD_COMMENTS,
        data: data
    }
}
export const addOneComment = (data) => {
    return {
        type: ADD_COMMENT,
        data: data
    }
}