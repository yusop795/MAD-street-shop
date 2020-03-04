// Ducks 패턴

/**
 * 액션 타입 정의
 * 타입 = '리듀서명/타입'
 */
export const authTypes = {
  UPDATE_TEXT: 'auth/UPDATE_TEXT',
  SET_LOADING: 'auth/LOADING',
};

/**
 * 액션 생섬함수 정의
 * @param 변경할 텍스트 값
 * { type: 액션타입, 데이터}
 */
export const authAction = {
  updateText: text => ({ type: authTypes.UPDATE_TEXT, text }),
  updateLoading: loading => ({ type: authTypes.SET_LOADING, loading }),
};

/**
 * 리듀서의 초기 값 설정
 */
const initialState = {
  text: '초기 텍스트',
  loading: true,
};

/**
 * 리듀서
 */
export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case authTypes.UPDATE_TEXT:
      return {
        ...state,
        text: payload.text,
      };
    case authTypes.SET_LOADING:
      return {
        ...state,
        loading: payload.loading,
      };
    default:
      return state;
  }
}
