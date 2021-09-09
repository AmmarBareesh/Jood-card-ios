import {SET_BOTTOM_SHEET_STATUS} from './actionTypes'


export const updatestatus = (data) => {
    return {
        type: SET_BOTTOM_SHEET_STATUS,
        bottomStatus:data
    };
};

