import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const authorizationStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
}

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
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHORIZATION_START: return authorizationStart(state, action);
        case actionTypes.AUTHORIZATION_SUCCESS: return authorizationSuccess(state, action);
        case actionTypes.AUTHORIZATION_FAIL: return authorizationFail(state, action);   
        default: return state;
    }
}

export default reducer;