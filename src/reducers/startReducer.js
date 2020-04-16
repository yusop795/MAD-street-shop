// Ducks 패턴

/**
 * 액션 타입 정의
 * 타입 = '리듀서명/타입'
 */
export const startTypes = {
  FETCH_SHOP_CATEGORY: 'start/FETCH_SHOP_CATEGORY',
  SET_SHOP_CATEGORY: 'start/SET_SHOP_CATEGORY',
};

/**
 * 액션 생섬함수 정의
 * @param 변경할 텍스트 값
 * { type: 액션타입, 데이터}
 */
export const startAction = {
  setShopCategory: category => ({
    type: startTypes.SET_SHOP_CATEGORY,
    category,
  }),
};

/**
 * 리듀서의 초기 값 설정
 */
const initialState = {
  accessToken: '',
  shopCategory: [],
  shopInfo: [],
};

/**
 * 리듀서
 */
export default function startReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case startTypes.SET_SHOP_CATEGORY:
      return {
        ...state,
        shopCategory: payload,
      };
    default:
      return state;
  }
}
