import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import startSaga from './startSaga';

export default function* () {
  yield all([
    userSaga(),
    startSaga(),
  ]);
}