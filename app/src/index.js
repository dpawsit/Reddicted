import App from './App'
import React from 'react'
import {render} from 'react-dom';
// import injectTapEventPlugin from 'react-tap-event-plugin'
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { persistStore, autoRehydrate, storages } from 'redux-persist'
import reducers from './reducers';

// injectTapEventPlugin();

function configureStore() {
	return new Promise((resolve, reject) => {
		try {
			const store = createStore(reducers, undefined, compose(
					autoRehydrate(),applyMiddleware(ReduxPromise)))

			persistStore(store, storages.asyncSessionStorage, ()=> resolve(store));
		}
		catch (error) {
			reject(error);
		}
	})
}

configureStore().then(store => {
	render(
		<Provider store={store}>
			{/*<Router history={browserHistory} routes={routes}/>*/}
			<App />
		</Provider>, document.getElementById('app'))
	})
	.catch(error=>{console.log('this is the error', error)})
