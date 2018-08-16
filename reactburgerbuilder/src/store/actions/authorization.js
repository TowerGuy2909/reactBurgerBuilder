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
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
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
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.userId);
                dispatch(authorizationSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthorizationTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authorizationFail(err.response.data.error));
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = localStorage.getItem('expirationDate')
            if (expirationDate > new Date()) {
                dispatch(logout());
            }else {
                const userId = localStorage.getItem('userId');
                dispatch(authorizationSuccess(token, userId));
                dispatch(checkAuthorizationTimeout(expirationDate.getSeconds() - new Date().getSeconds()))
            }
        }
    }
}