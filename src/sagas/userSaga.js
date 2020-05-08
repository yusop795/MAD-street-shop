import { takeEvery, put, call } from "redux-saga/effects";
import { userTypes, userApiTypes } from "../reducers/userReducer";
import { login, fetchWhoami, fetchKaKaoInfo, postSignUpUser, postSignUpOwner } from './api/userApi';


/**
 * 앱 로그인
 */
export function* loginSaga({ payload }) {
  const response = yield call(login, payload);
  if (response.data) {
    yield put({
      type: userTypes.SET_LOGIN,
      payload: {
        isLogin: true,
        isUser: response.data.isUser,
        userId: response.data.userInfo.userId,
        userType: (response.data.userInfo.owner) ? 'owner' : 'user',
        userInfo: response.data.userInfo.kakao
      },
    });
  } else {
    yield put({
      type: userTypes.SET_LOGIN,
      payload: {
        isLogin: false,
        isUser: '',
        userId: ''
      },
    });
  }
}
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

  if (response.data) {
    console.log(response)
  } else {
    console.log(response);
  }
}

/**
 * 카카오 사장닙 회원가입
 */
export function* postSignUpOwnerSaga({ payload }) {
  const response = yield call(postSignUpOwner, payload);

  if (response.data) {
    console.log(response)
  } else {
    console.log(response);
  }
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
  yield takeEvery(userApiTypes.LOGIN, loginSaga);
  yield takeEvery(userApiTypes.POST_SIGNUP_USER, postSignUpUserSaga);
  yield takeEvery(userApiTypes.POST_SIGNUP_OWNER, postSignUpOwnerSaga);
}