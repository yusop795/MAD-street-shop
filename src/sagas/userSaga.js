import { takeEvery, put, call } from "redux-saga/effects";
import { userTypes, userApiTypes } from "../reducers/userReducer";
import { login, fetchWhoami, postSignUpUser, postSignUpOwner, putImgUpload, putUser, deleteUser } from './api/userApi';


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
        userId: response.data.userId,
      },
    });
  } else {
    yield put({
      type: userTypes.SET_LOGIN,
      payload: {
        isLogin: false,
        userId: ''
      },
    });
  }
}

/**
 * 카카오 사용자 회원가입
 */
export function* postSignUpUserSaga({ payload }) {
  const response = yield call(postSignUpUser, payload);
  if (response.data) {
    yield put({
      type: userTypes.SET_SIGNUP,
      payload: {
        isLogin: true,
        isUser: true,
      },
    });
  } else {
    yield put({
      type: userTypes.SET_SIGNUP,
      payload: {
        isLogin: false,
        isUser: false,
      },
    });
  }
}

/**
 * 카카오 사용자 회원수정
 */
export function* putUserSaga({ payload }) {
  const response = yield call(putUser, payload);
  if (response.data) {
    yield put({
      type: userTypes.SET_SIGNUP,
      payload: {
        isLogin: true,
        isUser: true,
      },
    });
  } else {
    yield put({
      type: userTypes.SET_SIGNUP,
      payload: {
        isLogin: false,
        isUser: false,
      },
    });
  }
}

/**
 * 카카오 사장닙 회원가입
 */
export function* postSignUpOwnerSaga({ payload }) {
  const response = yield call(postSignUpOwner, payload);
  if (response.data) {
    console.log(response.data)
    // yield postSignUpImgOwnerSaga({ files: payload.files })
  } else {
    console.log(response);
  }
}

/**
 * 카카오 사장닙 회원가입 이미지 없로드
 */
export function* postSignUpImgOwnerSaga({ payload }) {
  const response = yield call(putImgUpload, payload);
  if (response.data) {
    console.log(response.data)
  } else {
    console.log(response);
  }
}

/**
 * 사용자 탈퇴
 */
export function* deleteUserSaga({ payload }) {
  const response = yield call(deleteUser, payload);
  if (response.data) {
    yield put({ type: userTypes.SET_LEAVE });
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
  yield takeEvery(userApiTypes.LOGIN, loginSaga);
  yield takeEvery(userApiTypes.POST_SIGNUP_USER, postSignUpUserSaga);
  yield takeEvery(userApiTypes.POST_SIGNUP_OWNER, postSignUpOwnerSaga);
  yield takeEvery(userApiTypes.POST_SIGNUP_OWNER_IMG, postSignUpImgOwnerSaga);
  yield takeEvery(userApiTypes.PUT_USER, putUserSaga);
  yield takeEvery(userApiTypes.LEAVE, deleteUserSaga);
}