// Ducks 패턴

/**
 * 액션 타입 정의
 * 타입 = '리듀서명/타입'
 */
export const userTypes = {
  SET_STORE_CATEGORY: 'user/SET_STORE_CATEGORY',
  SET_STORE_LOCATION: 'user/SET_STORE_LOCATION',
  SET_STORE_TIME: 'user/SET_STORE_TIME',

  SET_LOADING: 'user/LOADING',
  SET_TOKEN: 'user/SET_TOKEN',
  SET_LOGIN: 'user/SET_LOGIN',

  SET_USER_INFO: 'user/SET_USER_INFO',
  SET_OWNER_INFO: 'user/SET_USER_INFO',
};

/**
 * API CALL 액션 타입 정의
 * 타입 = '리듀서명/타입'
 */
export const userApiTypes = {
  LOGIN: 'user/LOGIN',
  POST_SIGNUP_USER: 'user/POST_SIGNUP_USER',
  POST_SIGNUP_OWNER: 'user/POST_SIGNUP_OWNER',
  PUT_USER: 'user/PUT_USER',
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
  setStoreLocation: storeLocation => ({
    type: userTypes.SET_STORE_LOCATION,
    storeLocation,
  }),
  setStoreTime: time => ({
    type: userTypes.SET_STORE_TIME,
    time,
  }),

  updateLoading: loading => ({ type: userTypes.SET_LOADING, loading }),
  setToken: token => ({
    type: userTypes.SET_TOKEN,
    token,
  }),
  setLogin: isLogin => ({
    type: userTypes.SET_TOKEN,
    isLogin,
  }),
  setUserInfo: userinfo => ({
    type: userTypes.SET_USER_INFO,
    userinfo,
  }),
};

/**
 * 리듀서의 초기 값 설정
 */
const initialState = {
  userId: '',
  isUser: false,
  userType: '',
  userInfo: {},
  storeCategory: '',
  storeLocation: '',
  storeOpenDays: '',
  storeOpenTime: '',
  storeCloseTime: '',
  userPhoneOn: false,
  storeCategory: [],
  token: {},
  isLogin: false,
};

/**
 * 리듀서
 */
export default function userReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case userTypes.SET_USER_INFO:
      return {
        ...state,
        userId: payload.userInfo.userId,
      };
    case userTypes.SET_TOKEN:
      return {
        ...state,
        token: payload.token,
      };
    case userTypes.SET_STORE_CATEGORY:
      return {
        ...state,
        storeCategory: payload.category,
      };
    case userTypes.SET_STORE_LOCATION:
      return {
        ...state,
        storeLocation: payload.storeLocation,
      };
    case userTypes.SET_STORE_TIME:
      return {
        ...state,
        storeOpenDays: payload.storeOpenDays,
        storeOpenTime: payload.storeOpenTime,
        storeCloseTime: payload.storeCloseTime
      };

    case userTypes.SET_LOGIN:
      return {
        ...state,
        isLogin: payload.isLogin,
        isUser: payload.isUser,
        userId: payload.userId,
        userType: payload.userType,
        userInfo: payload.userInfo,
      };
    case userTypes.SET_LOADING:
      return {
        ...state,
        loading: payload.loading,
      };
    default:
      return state;
  }
}
