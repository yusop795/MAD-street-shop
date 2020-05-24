import { takeLatest, put, call } from "redux-saga/effects";
import { userTypes, userApiTypes } from "../reducers/userReducer";
import { login, logout, fetchWhoami, postSignUpUser, postSignUpOwner, putImgUpload, putUser, deleteUser, putOwner } from './api/userApi';
import { localStorageRemove } from '../util/LocalStorage';

/**
 * 앱 로그인
 */
export function* loginSaga({ payload }) {
  const response = yield call(login, payload);
  if (response.data) {
    if (response.data.isUser) {
      let tag = {}
      response.data.userInfo.userTags.forEach(element => {
        element.item.forEach((v) => {
          tag[v] = element.title
        })
      });
      response.data.userInfo.userTags = tag
    }

    yield put({
      type: userTypes.SET_LOGIN,
      payload: {
        isLogin: true,
        isUser: response.data.isUser,
        userId: response.data.userId,
        userInfo: (response.data.isUser) ? response.data.userInfo : {}
      },
    });
    yield put({
      type: userTypes.USER_LODING,
      payload: {
        userLoading: false
      }
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
 * 앱 로그인
 */
export function* logoutSaga({ payload }) {
  const response = yield call(logout, payload);
  if (response.data) {
    yield put({ type: userTypes.SET_USER_RESET });
  } else {
    console.log(response);
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
        // isUser: response.data.isUser,
        isUser: true,
        userInfo: (response.data.isUser) ? response.data.userInfo : {}
      },
    });
    yield put({
      type: userTypes.USER_LODING,
      payload: {
        userLoading: false
      }
    })
  } else {
    yield put({
      type: userTypes.SET_SIGNUP,
      payload: {
        isLogin: false,
      },
    });
    yield put({
      type: userTypes.USER_LODING,
      payload: {
        userLoading: false
      }
    })
  }

}

/**
 * 카카오 사용자 회원수정
 */
export function* putUserSaga({ payload }) {
  const response = yield call(putUser, payload);
  if (response.data) {
    let tag = {}
    response.data.userTags.forEach(element => {
      element.item.forEach((v) => {
        tag[v] = element.title
      })
    });
    response.data.userTags = tag
    yield put({
      type: userTypes.SET_USER_INFO,
      payload: {
        userInfo: response.data,
      },
    });
  } else {
  }
}

/**
 * 카카오 사장닙 회원가입 이미지 업로드
 */
export function* postSignUpImgOwnerSaga(data) {
  const response = yield call(putImgUpload, data);
  if (response.data) {
    yield put({
      type: userTypes.SET_SIGNUP,
      payload: {
        isLogin: true,
        isUser: true,
        // isUser: response.data.user.isUser,
        userInfo: response.data.user,
      },
    });
    yield put({
      type: userTypes.USER_LODING,
      payload: {
        userLoading: false
      }
    });
  } else {
    yield put({
      type: userTypes.SET_SIGNUP,
      payload: {
        isLogin: false,
        userId: ''
      },
    });
    yield put({
      type: userTypes.USER_LODING,
      payload: {
        userLoading: false
      }
    });
  }
}

/**
 * 카카오 사장님 회원가입
 */
export function* postSignUpOwnerSaga({ payload }) {
  const response = yield call(postSignUpOwner, payload);
  if (response.data) {
    const data = { files: payload.files, userId: payload.userId, shopId: response.data._id }
    yield postSignUpImgOwnerSaga(data)
  } else {
    console.log(response);
  }
}
/**
 * 카카오 사장님 회원수정
 */
export function* putOwnerSaga({ payload }) {
  const response = yield call(putOwner, payload);
  if (response.data) {
    const data = { files: payload.files, userId: payload.userId, shopId: response.data.shopId }
    yield postSignUpImgOwnerSaga(data)
  } else {
    console.log(response)
  }
}


/**
 * 사용자 탈퇴
 */
export function* deleteUserSaga({ payload }) {
  const response = yield call(deleteUser, payload);
  if (response.data) {
    yield put({ type: userTypes.SET_LEAVE });
    localStorageRemove('MAD_KAKAO_ACCESS_TOKEN');
    localStorageRemove('MAD_USER_ID')
  } else {
    console.log(response);
  }
}

export function* fetchWhoamiSaga({ payload }) {
  const response = yield call(fetchWhoami, payload);
  if (response.data) {
    if (response.data.shop) {
      const data = response.data.shop[0]
      const tagList = ['월', '화', '수', '목', '금', '토', '일']
      let days = {}
      data.openDays[0].split(',').forEach((v, i) => {
        days[v] = tagList.indexOf(v)
      })
      data.openDays = days
      yield put({
        type: userTypes.SET_SHOP_INFO,
        payload: {
          shopId: data._id,
          storeLocation: {
            address: data.location.subLocation,
            locationComment: data.now.locationComment,
            location: {
              lat: data.location.latitude.$numberDecimal,
              long: data.location.longitude.$numberDecimal,
            }
          },
          storeCategory: data.shopTags,
          storeOpenDays: data.openDays,
          storeOpenTime: data.openTime.split(':'),
          storeCloseTime: data.closeTime.split(':'),
          firstFile: data.imageUrl.pop(),
          files: data.imageUrl,
          shopInfo: data,
        },
      });
    }
    yield loginSaga(payload)
  } else {
    yield put({
      type: userTypes.USER_LODING,
      payload: {
        userLoading: false
      }
    });
  }
}

export default function* userSaga() {
  yield takeLatest(userApiTypes.LOGIN, loginSaga);
  yield takeLatest(userApiTypes.LOGOUT, logoutSaga);
  yield takeLatest(userApiTypes.LEAVE, deleteUserSaga);
  yield takeLatest(userApiTypes.POST_SIGNUP_USER, postSignUpUserSaga);
  yield takeLatest(userApiTypes.POST_SIGNUP_OWNER, postSignUpOwnerSaga);
  yield takeLatest(userApiTypes.POST_SIGNUP_OWNER_IMG, postSignUpImgOwnerSaga);
  yield takeLatest(userApiTypes.PUT_USER, putUserSaga);
  yield takeLatest(userApiTypes.PUT_OWNER, putOwnerSaga);
  yield takeLatest(userApiTypes.WHO_AM_I, fetchWhoamiSaga);

}