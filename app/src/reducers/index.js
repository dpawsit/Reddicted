import { combineReducers } from 'redux';
import AppReducers from './app_reducers'

const rootReducer = combineReducers({
	appState : AppReducers,
});

export default rootReducer;
