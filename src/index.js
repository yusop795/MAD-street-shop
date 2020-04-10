import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { initializeState, startReducer, userReducer } from './reducers';
import rootSaga from './sagas';
import Router from './router';
import * as serviceWorker from './serviceWorker';
import './assets/styles/common/reset.scss';

import AuthUtill from './util/AuthUtill'


/* KAKAO 생성 */
const KAKAO = window.Kakao;
KAKAO.init(process.env.REACT_APP_KAKAO_AUTH_KEY);
KAKAO.isInitialized();
/* KAKAO accessToken 저장 */
AuthUtill.setUserStore(KAKAO.Auth.getAccessToken())

/* Reducer 생성 */
const rootReducer = combineReducers({
  startReducer,
  userReducer,
});

/* SagaMiddleware 생성 */
const sagaMiddleware = createSagaMiddleware();

/* store 생성 */
const store = createStore(
  rootReducer,
  initializeState,
  composeWithDevTools(applyMiddleware(sagaMiddleware)), // composeWithDevTools : DevTools 미들웨어
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root'),
);

// PWA 서비스워커가 등록
serviceWorker.register();
