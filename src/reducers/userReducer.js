// Ducks 패턴

/**
 * 액션 타입 정의
 * 타입 = '리듀서명/타입'
 */
export const userTypes = {
  SET_STORE_CATEGORY: 'user/SET_STORE_CATEGORY',
  SET_LOADING: 'user/LOADING',
  FETCH_SHOP_LIST: 'user/FETCH_SHOP_LIST'
};

/**
 * 액션 생섬함수 정의
 * @param 변경할 텍스트 값
 * { type: 액션타입, 데이터}
 */
export const userAction = {
  setStoreCategory: category => ({
    type: userTypes.SET_STORE_CATEGORY,
    category,
  }),
  updateLoading: loading => ({ type: userTypes.SET_LOADING, loading }),
  fetchShopCategory: () => ({ type: userTypes.FETCH_SHOP_LIST }),
};

/**
 * 리듀서의 초기 값 설정
 */
const initialState = {
  userType: '',
  userId: '',
  userName: '',
  userPhone: '',
  storeName: '',
  storeCategory: '',
  storeLocation: '',
  storeOpenTime: '',
  storeCloseTime: '',
  storeIntroduce: '',
  userPhoneOn: false,
  shopCategory: [],
};

/**
 * 리듀서
 */
export default function userReducer(state = initialState, action) {
  // const { type, payload } = action;
  console.log(action)
  switch (action.type) {
    case userTypes.FETCH_SHOP_CATEGORY:
      return {
        ...state,
        shopCategory: action.payload.shopCategory,
      };
    case userTypes.SET_STORE_CATEGORY:
      return {
        ...state,
        storeCategory: action.payload.category,
      };
    case userTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };
    default:
      return state;
  }
}
