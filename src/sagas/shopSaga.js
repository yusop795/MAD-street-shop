import { takeLatest, put, call } from "redux-saga/effects";
import { shopTypes } from "../reducers/shopReducer";
import { fetchShopList } from './api/shopApi';

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

export default function* shopSaga() {
  yield takeLatest(shopTypes.FETCH_SHOP_LIST, fetchShopListSaga);
}