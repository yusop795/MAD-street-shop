// import { takeEvery, takeLatest, put, call } from "redux-saga/effects";
// import { userTypes, userAction } from "../reducers/userReducer";
// import { fetchCategory } from './api/userApi';

// export function* fetchCategorySaga({ payload }) {
//   const response = yield call(fetchCategory, payload);
//   if (response.data) {
//     yield put({
//       type: userTypes.SET_SHOP_CATEGORY,
//       payload: response.data,
//     });
//   } else {
//     console.log(response);
//   }
// }

export default function* userSaga() {
  // yield takeEvery(userTypes.FETCH_SHOP_CATEGORY, fetchCategorySaga);
}