
// Ducks 패턴

/**
 * 액션 타입 정의
 * 타입 = '리듀서명/타입'
 */
export const startTypes = {
  FETCH_SHOP_CATEGORY: 'start/FETCH_SHOP_CATEGORY',
  SET_SHOP_CATEGORY: 'start/SET_SHOP_CATEGORY',
  FETCH_SHOP_LIST: 'start/FETCH_SHOP_LIST',
  SET_SHOP_LIST: 'start/SET_SHOP_LIST',
  FETCH_ETC_LIST: 'start/FETCH_ETC_LIST',
  SET_ETC_LIST: 'start/SET_ETC_LIST',
}
/**
 * 액션 생섬함수 정의
 * @param 변경할 텍스트 값
 * { type: 액션타입, 데이터}
 */
export const startAction = {};

/**
 * 리듀서의 초기 값 설정
 */
const initialState = {
  accessToken: '',
  shopCategory: [],
  rank: [],
  main: [],
  ntc: [],
  faq: [],
  searchResult: [],
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
    case startTypes.SET_SHOP_LIST:
      console.log('startTypes.SET_SHOP_LIST', action.name, payload);
      return {
        ...state,
        [action.name]: payload,
      };
    case startTypes.SET_ETC_LIST:
      return {
        ...state,
        [action.name]: payload,
      };
    default:
      return state;
  }
}
