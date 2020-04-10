import { takeEvery, takeLatest, put, call } from "redux-saga/effects";
import { userTypes, userApiTypes, userAction } from "../reducers/userReducer";
import { fetchWhoami, fetchKaKaoInfo, postSignUpUser, postSignUpOwner } from './api/userApi';

/**
 * 카카오 회원정보 조회
 */
export function* fetchKaKaoInfoSaga({ payload }) {
  const response = yield call(fetchKaKaoInfo, payload);

  // if (response.data) {
  //   console.log(response)
  // yield put({
  //   type: userTypes.SET_SHOP_CATEGORY,
  //   payload: response.data,
  // });
  // } else {
  //   console.log(response);
  // }
}

/**
 * 카카오 사용자 회원가입
 */
export function* postSignUpUserSaga({ payload }) {
  const response = yield call(postSignUpUser, payload);

  // if (response.data) {
  //   console.log(response)
  // } else {
  //   console.log(response);
  // }
}

/**
 * 카카오 사장닙 회원가입
 */
export function* postSignUpOwnerSaga({ payload }) {
  const response = yield call(postSignUpOwner, payload);

  // if (response.data) {
  //   console.log(response)
  // } else {
  //   console.log(response);
  // }
}

export function* fetchWhoamiSaga({ payload }) {
  const response = yield call(fetchWhoami, payload);

  if (response.data) {
    console.log(response)
  } else {
    console.log(response);
  }
}

export default function* userSaga() {
  // yield takeEvery(userTypes.FETCH_KAKAO_INFO, fetchKaKaoInfoSaga);
  yield takeEvery(userApiTypes.POST_SIGNUP_USER, postSignUpUserSaga);
  yield takeEvery(userApiTypes.POST_SIGNUP_OWNER, postSignUpOwnerSaga);
}