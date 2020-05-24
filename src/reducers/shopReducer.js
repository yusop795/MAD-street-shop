
// Ducks 패턴

/**
 * 액션 타입 정의
 * 타입 = '리듀서명/타입'
 */
export const shopTypes = {
  FETCH_SHOP_LIST: 'shop/FETCH_SHOP_LIST',
  SET_SHOP_LIST: 'shop/SET_SHOP_LIST',
  FETCH_SHOP_DETAIL: 'shop/FETCH_SHOP_DETAIL',
  SET_SHOP_DETAIL: 'shop/SET_SHOP_DETAILL',

  POST_SHOP_OPEN: 'shop/POST_SHOP_OPEN',
  DELETE_SHOP_CLOSE: 'shop/DELETE_SHOP_CLOSE',
  SET_SHOP_LOADING: 'shop/SET_SHOP_LOADING',
  SET_SHOP_ERROR: 'shop/SET_SHOP_ERROR',
}
/**
 * 액션 생섬함수 정의
 * @param 변경할 텍스트 값
 * { type: 액션타입, 데이터}
 */
export const shopAction = {};

/**
 * 리듀서의 초기 값 설정
 */
const initialState = {
  accessToken: '',
  shopCategory: [],
  shopList: [],
  rank: [],
  main: [],
  shopDetail: {},
  shopLoding: false,
  shopError: ''
};

/**
 * 리듀서
 */
export default function shopReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case shopTypes.SET_SHOP_CATEGORY:
      return {
        ...state,
        shopCategory: payload,
      };
    case shopTypes.SET_SHOP_LIST:
      return {
        ...state,
        shopList: payload.shopList,
      };
    case shopTypes.SET_SHOP_DETAIL:
      return {
        ...state,
        shopDetail: payload.shopDetail,
      };
    case shopTypes.SET_SHOP_LOADING:
      return {
        ...state,
        shopLoding: payload.shopLoding,
      };
    default:
      return state;
  }
}
