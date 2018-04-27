import timers from './timers';
import loadingMessage from './loadingMessage';
import { combineReducers } from 'redux'; 

export default combineReducers({
    timers,
    loadingMessage
})
