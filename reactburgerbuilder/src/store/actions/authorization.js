import axios from 'axios';

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
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAejy37NPoM-mlG4JYV63SG38KC_FQT5ZM', authData)
            .then(response => {
                console.log(response);
                dispatch(authorizationSuccess(response.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(authorizationFail(err));
            })
    }
}