import { takeLatest, put, call } from "redux-saga/effects";
import { startTypes } from "../reducers/startReducer";
import { fetchCategory } from './api/startApi';

export function* fetchCategorySaga({ payload }) {
  console.log('fetchCategorySaga')
  const response = yield call(fetchCategory, payload);
  if (response.data) {
    yield put({
      type: startTypes.SET_SHOP_CATEGORY,
      payload: response.data,
    });
  } else {
    console.log(response);
  }
}

export default function* startSaga() {
  yield takeLatest(startTypes.FETCH_SHOP_CATEGORY, fetchCategorySaga);
}