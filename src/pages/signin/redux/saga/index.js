import { all, takeEvery } from 'redux-saga/effects';
import { ACTION_SIGN_IN } from '../actions'

export function* signInRequest(action) {
    
}

export function* signIn() {
    yield takeEvery(ACTION_SIGN_IN, signInRequest)
}

export default function* signInSaga() {
    yield all([signIn()]);
}