// Ducks 패턴

/**
 * 액션 타입 정의
 * 타입 = '리듀서명/타입'
 */
export const userTypes = {
  SET_USER_RESET: 'user/SET_USER_RESET',
  SET_STORE_CATEGORY: 'user/SET_STORE_CATEGORY',
  SET_STORE_LOCATION: 'user/SET_STORE_LOCATION',
  SET_STORE_TIME: 'user/SET_STORE_TIME',

  SET_LOADING: 'user/LOADING',
  SET_TOKEN: 'user/SET_TOKEN',
  SET_LOGIN: 'user/SET_LOGIN',
  SET_SIGNUP: 'user/SET_SIGNUP',
  SET_LEAVE: 'user/SET_LEAVE',

  SET_USER_INFO: 'user/SET_USER_INFO',
  SET_OWNER_INFO: 'user/SET_OWNER_INFO',
  SET_SHOP_INFO: 'user/SET_SHOP_INFO',
};

/**
 * API CALL 액션 타입 정의
 * 타입 = '리듀서명/타입'
 */
export const userApiTypes = {
  LOGIN: 'user/LOGIN',
  LOGOUT: 'user/LOGOUT',
  LEAVE: 'user/LEAVE',
  POST_SIGNUP_USER: 'user/POST_SIGNUP_USER',
  POST_SIGNUP_OWNER: 'user/POST_SIGNUP_OWNER',
  POST_SIGNUP_OWNER_IMG: 'user/POST_SIGNUP_OWNER_IMG',
  PUT_USER: 'user/PUT_USER',
  PUT_OWNER: 'user/PUT_OWNER',
  WHO_AM_I: 'user/WHO_AM_I',
};

/**
 * 액션 생섬함수 정의
 * @param 변경할 텍스트 값
 * { type: 액션타입, 데이터}
 */
export const userAction = {};

/**
 * 리듀서의 초기 값 설정
 */
const initialState = {
  userId: '',
  isUser: false,
  userType: '',
  userInfo: {},
  shopInfo: {},
  shopId: '',
  storeLocation: '',
  storeOpenDays: '',
  storeOpenTime: '',
  storeCloseTime: '',
  firstFile: [],
  files: [],
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
    case userTypes.SET_USER_RESET:
      return {
        ...initialState,
      };
    case userTypes.SET_USER_INFO:
      return {
        ...state,
        userInfo: payload.userInfo,
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
        userInfo: payload.userInfo
      };
    case userTypes.SET_SIGNUP:
      return {
        ...state,
        isLogin: payload.isLogin,
        isUser: payload.isUser,
      };
    case userTypes.SET_LEAVE:
      return {
        ...initialState
      };
    case userTypes.SET_LOADING:
      return {
        ...state,
        loading: payload.loading,
      };
    case userTypes.SET_SHOP_INFO:
      return {
        ...state,
        shopId: payload.shopId,
        storeLocation: payload.storeLocation,
        storeCategory: payload.storeCategory,
        storeOpenDays: payload.storeOpenDays,
        storeOpenTime: payload.storeOpenTime,
        storeCloseTime: payload.storeCloseTime,
        firstFile: [payload.firstFile],
        files: payload.files,
        shopInfo: payload.shopInfo,
      };

    default:
      return state;
  }
}
