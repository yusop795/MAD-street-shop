import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { initializeState, authReducer } from './reducers';
import Router from './router';
import * as serviceWorker from './serviceWorker';

/* Reducer 생성 */
const rootReducer = combineReducers({
  authReducer
});

/* SagaMiddleware 생성 */
const sagaMiddleware = createSagaMiddleware();

/* store 생성 */
const store = createStore(
  rootReducer,
  initializeState,
  composeWithDevTools(applyMiddleware(sagaMiddleware)), // composeWithDevTools : DevTools 미들웨어
);

ReactDOM.render( 
	<Provider store={store}>
		<Router />
	</Provider>,
	document.getElementById('root')
 );

// PWA 서비스워커가 등록
serviceWorker.register();
