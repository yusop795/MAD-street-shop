import { takeEvery, takeLatest, put, call } from "redux-saga/effects";
import { shopTypes } from "../reducers/shopReducer";
import { userTypes } from "../reducers/userReducer";
import { fetchShopList, fetchShopDetail, postShopOpen, deleteShopOpen, putShopOpen } from './api/shopApi';

export function* fetchShopListSaga({ name, payload }) {
  const response = yield call(fetchShopList, payload);
  if (response.data) {
    if (name === "shopList") {
      /* 메인페이지에서 설정되었을 때만 */
      yield put({
        type: shopTypes.SET_SHOP_LIST_HOME,
        payload: {
          name: name,
          shopList: response.data
        },
      });
    } else {
      yield put({
        type: shopTypes.SET_SHOP_LIST,
        payload: {
          name: name,
          shopList: response.data
        },
      });
    }
  } else {
    console.log('fetchShopList >>', response);
  }
}

export function* fetchShopDetailSaga({ payload }) {
  const response = yield call(fetchShopDetail, payload);
  if (response.data) {
    yield put({
      type: shopTypes.SET_SELECT_SHOP_ID,
      payload: {
        selectShopId: response.data[0]._id
      },
    });
    yield put({
      type: shopTypes.SET_SHOP_DETAIL,
      payload: {
        shopDetail: response.data[0]
      },
    });
  } else {
    console.log('fetchShopDetailSaga >>', response);
  }
}

export function* postShopOpenSaga({ payload }) {
  const response = yield call(postShopOpen, payload);
  if (response.data) {
    yield put({
      type: userTypes.SET_SHOP_ACTIVE,
      payload: {
        shopActive: true,
      },
    });
    yield put({
      type: shopTypes.SET_SHOP_LOADING,
      payload: {
        shopLoding: false,
        shopError: ''
      },
    });
  } else {
    yield put({
      type: shopTypes.SET_SHOP_ERROR,
      payload: {
        shopLoding: false,
      },
    });
  }
}

export function* deleteShopOpenSaga({ payload }) {
  const response = yield call(deleteShopOpen, payload);
  if (response.data) {
    yield put({
      type: userTypes.SET_SHOP_ACTIVE,
      payload: {
        shopActive: false,
      },
    });
    yield put({
      type: shopTypes.SET_SHOP_LOADING,
      payload: {
        shopLoding: false,
        shopError: ''
      },
    });
  } else {
    yield put({
      type: shopTypes.SET_SHOP_ERROR,
      payload: {
        shopLoding: false,
      },
    });
  }
}

export function* putShopOpenSaga({ payload }) {
  const response = yield call(putShopOpen, payload);
  if (response.data) {
    yield put({
      type: shopTypes.SET_SHOP_LOADING,
      payload: {
        shopLoding: false,
        shopError: ''
      },
    });
  } else {
    yield put({
      type: shopTypes.SET_SHOP_ERROR,
      payload: {
        shopLoding: false,
      },
    });
  }
}

export default function* shopSaga() {
  yield takeLatest(shopTypes.FETCH_SHOP_LIST, fetchShopListSaga);
  yield takeLatest(shopTypes.FETCH_SHOP_DETAIL, fetchShopDetailSaga);
  yield takeLatest(shopTypes.POST_SHOP_OPEN, postShopOpenSaga);
  yield takeLatest(shopTypes.DELETE_SHOP_CLOSE, deleteShopOpenSaga);
  yield takeLatest(shopTypes.PUT_SHOP_OPEN, putShopOpenSaga);

}