import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import startSaga from './startSaga';
import shopSaga from './shopSaga';

export default function* () {
  yield all([
    userSaga(),
    startSaga(),
    shopSaga(),
  ]);
}