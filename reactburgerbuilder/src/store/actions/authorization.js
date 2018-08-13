import * as actionTypes from './actionTypes';

export const authorizationStart = () => {
    return {
        type: actionTypes.AUTHORIZATION_START
    };
};

export const authorizationSuccess = (authData) => {
    return {
        type: actionTypes.AUTHORIZATION_SUCCESS,
        authData: authData
    };
};

export const authorizationFail = (error) => {
    return {
        type: actionTypes.AUTHORIZATION_FAIL,
        error: error
    }
}

export const authorization = (email, password) => {
    return dispatch => {
        dispatch(authorizationStart());
    }
}