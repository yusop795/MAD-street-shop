
// Ducks 패턴

/**
 * 액션 타입 정의
 * 타입 = '리듀서명/타입'
 */
export const shopTypes = {
  FETCH_SHOP_LIST: 'shop/FETCH_SHOP_LIST',
  SET_SHOP_LIST: 'shop/SET_SHOP_LIST',
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
};

/**
 * 리듀서
 */
export default function shopReducer(state = initialState, action) {
  const { type, payload } = action;
  console.log('shop', payload)
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
    default:
      return state;
  }
}
