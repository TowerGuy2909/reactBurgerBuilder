import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authorizationStart = () => {
    return {
        type: actionTypes.AUTHORIZATION_START
    };
};

export const authorizationSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTHORIZATION_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authorizationFail = (error) => {
    return {
        type: actionTypes.AUTHORIZATION_FAIL,
        error: error
    }
}

export const checkAuthorizationTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTHORIZATION_LOGOUT
    }
}

export const authorization = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authorizationStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAejy37NPoM-mlG4JYV63SG38KC_FQT5ZM'
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAejy37NPoM-mlG4JYV63SG38KC_FQT5ZM'
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                dispatch(authorizationSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthorizationTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authorizationFail(err.response.data.error));
            })
    }
}