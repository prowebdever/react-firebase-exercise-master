import { all, fork } from 'redux-saga/effects';

import signInSaga from './pages/signin/redux/saga';

export default function* rootSaga() {
    yield all([
        fork(signInSaga),
    ])
}