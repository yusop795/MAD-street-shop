import { takeEvery, takeLatest, put, call } from "redux-saga/effects";
import { userTypes, userAction } from "../reducers/userReducer";
import { fetchLogin } from './api/userApi';

export function* fetchLoginSaga({ payload }) {
  const response = yield call(fetchLogin, payload);

  if (response.data) {
    console.log(response)
    // yield put({
    //   type: userTypes.SET_SHOP_CATEGORY,
    //   payload: response.data,
    // });
  } else {
    console.log(response);
  }
}

export default function* userSaga() {
  // yield takeEvery(userTypes.FETCH_LOGIN, fetchLoginSaga);
}