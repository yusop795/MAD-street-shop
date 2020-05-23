import { takeEvery, takeLatest, put, call } from "redux-saga/effects";
import { shopTypes } from "../reducers/shopReducer";
import { fetchShopList, fetchShopDetail } from './api/shopApi';

export function* fetchShopListSaga({ payload }) {
  console.log('fetchShopListSaga');
  const response = yield call(fetchShopList, payload);
  if (response.data) {
    yield put({
      type: shopTypes.SET_SHOP_LIST,
      payload: {
        shopList: response.data
      },
    });
  } else {
    console.log('fetchShopList >>', response);
  }
}

export function* fetchShopDetailSaga({ payload }) {
  const response = yield call(fetchShopDetail, payload);
  if (response.data) {
    console.log('fetchShopDetailSaga', response.data);
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

export default function* shopSaga() {
  yield takeEvery(shopTypes.FETCH_SHOP_LIST, fetchShopListSaga);
  yield takeLatest(shopTypes.FETCH_SHOP_DETAIL, fetchShopDetailSaga);
}