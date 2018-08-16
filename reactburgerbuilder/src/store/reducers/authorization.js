import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const authorizationStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
};

const authorizationSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null, 
        loading: false
    });
};

const authorizationFail = (state,action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const authorizationLogout = (state, action) => {
    return updateObject(state, {token: null, userId: null});
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {authRedirectPath: action.path})
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHORIZATION_START: return authorizationStart(state, action);
        case actionTypes.AUTHORIZATION_SUCCESS: return authorizationSuccess(state, action);
        case actionTypes.AUTHORIZATION_FAIL: return authorizationFail(state, action);
        case actionTypes.AUTHORIZATION_LOGOUT: return authorizationLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default: return state;
    };
};

export default reducer;