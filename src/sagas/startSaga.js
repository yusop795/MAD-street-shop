import { takeEvery, put, call } from "redux-saga/effects";
import { startTypes } from "../reducers/startReducer";
import { fetchCategory } from './api/startApi';

export function* fetchCategorySaga({ payload }) {
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
  yield takeEvery(startTypes.FETCH_SHOP_CATEGORY, fetchCategorySaga);
}