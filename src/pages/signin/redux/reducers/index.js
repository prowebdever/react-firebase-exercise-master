import { fromJS } from 'immutable';
import { ACTION_SIGN_IN_SUCCESS, ACTION_SIGN_IN_FAILED } from '../actions'

const initialState = fromJS({
    auth : false,
    error : ''
});

const signInReducer = (state = initialState, action) => {
    switch(action.type) {
        case ACTION_SIGN_IN_SUCCESS:
            return state.setIn(['auth'], action.auth);
        case ACTION_SIGN_IN_FAILED:
            return state.setIn(['auth'], action.auth).setIn(['error'], action.error);
        default:
            return state;
    }
}

export default signInReducer;