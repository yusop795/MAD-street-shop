
// Ducks 패턴

/**
 * 액션 타입 정의
 * 타입 = '리듀서명/타입'
 */
export const shopTypes = {
  FETCH_SHOP_LIST: 'shop/FETCH_SHOP_LIST',
  SET_SHOP_LIST: 'shop/SET_SHOP_LIST',
  SET_SHOP_LIST_HOME: 'shop/SET_SHOP_LIST_HOME',
  FROM_SELECT_SHOP_ID: 'shop/FROM_SELECT_SHOP_ID',
  FETCH_SHOP_DETAIL: 'shop/FETCH_SHOP_DETAIL',
  SET_SHOP_DETAIL: 'shop/SET_SHOP_DETAILL',

  POST_SHOP_OPEN: 'shop/POST_SHOP_OPEN',
  DELETE_SHOP_CLOSE: 'shop/DELETE_SHOP_CLOSE',
  PUT_SHOP_OPEN: 'shop/PUT_SHOP_OPEN',

  SET_SELECT_SHOP_ID: 'shop/SET_SELECT_SHOP_ID',

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
  selectShopId: '',
  selectedFrom: '',
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
      console.log('shopTypes.SET_SHOP_LIST', payload.name);
      return {
        ...state,
        [payload.name]: payload.shopList,
      };
    case shopTypes.SET_SHOP_LIST_HOME:
      /* 메인페이지에서 처음 렌더할 때 첫번째 가게 아이디 넣어주는 것 */
      return {
        ...state,
        [payload.name]: payload.shopList,
        selectShopId: payload.shopList[0]._id,
      };
    case shopTypes.SET_SHOP_DETAIL:
      return {
        ...state,
        shopDetail: payload.shopDetail,
      };
    case shopTypes.SET_SELECT_SHOP_ID:
      return {
        ...state,
        selectShopId: payload.selectShopId,
      };
    /* 선택된 가게의 아이디가 어디서 넘어온 것인가? => 랭킹, 관심*/
    case shopTypes.FROM_SELECT_SHOP_ID:
      return {
        ...state,
        selectedFrom: payload,
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
