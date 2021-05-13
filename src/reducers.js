import { combineReducers } from 'redux';

import signInReducer from './pages/signin/redux/reducers'

const rootReducer = combineReducers({ sign: signInReducer });

export default rootReducer;