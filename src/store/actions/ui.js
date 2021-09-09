import { UI_START_LOADING, UI_STOP_LOADING,RETURN_LOADING_STUTUS } from './actionTypes';

export const uiStartLoading = () => {
    return {
        type: UI_START_LOADING
    };
};

export const uiStopLoading = () => {
    return {
        type: UI_STOP_LOADING
    };
};

export const returnLoadingSatus = () =>{
    return{
        type: RETURN_LOADING_STUTUS
    }
}