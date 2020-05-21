import axios from 'axios';
import qs from 'qs'
import AuthUtill from '../../util/AuthUtill'
import { localStorageGet } from '../../util/LocalStorage';

const API_INSTANCE = axios.create({
  baseURL: 'https://mad-street-shop.herokuapp.com/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
});

const KAKAO_API_INSTANCE = axios.create({
  baseURL: 'https://kapi.kakao.com',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
});

/**
 * 앱 로그인
 * @param
 */
export const login = () => {
  return API_INSTANCE.post('/users/login',
    null,
    { headers: { 'Authorization': `Bearer ${AuthUtill.accessToken}` } }
  )
    .then(response => {
      return response
    })
    .catch(error => {
      console.log('login', error);
      return error;
    });
};

/**
 * 앱 로그아웃
 * @param
 */
export const logout = () => {
  return API_INSTANCE.post('/users/logout',
    null,
    { headers: { 'Authorization': `Bearer ${AuthUtill.accessToken}` } }
  )
    .then(response => {
      return response
    })
    .catch(error => {
      console.log('logout', error);
      return error;
    });
};

/**
 * 카카오 회원정보 조회
 * @param
 */
export const fetchKaKaoInfo = () => {
  console.log('fetchKaKaoInfo', AuthUtill.accessToken)
  return KAKAO_API_INSTANCE.get('/v2/user/me',
    {
      headers: {
        'Authorization': `Bearer ${AuthUtill.accessToken}`
      }
    }
  )
    .then(response => {
      console.log('fetchKaKaoInfo')
      return response
    })
    .catch(error => {
      console.log('fetchKaKaoInfo', error);
      return error;
    });
};

/**
 * 카카오 사용자 회원가입
 * @param
 */
export const postSignUpUser = ({ userId, userTags }) => {
  return API_INSTANCE.post('/users/join/user',
    qs.stringify({ userId: `${userId}`, category: JSON.stringify(userTags) }),
    {
      headers: {
        'Authorization': `Bearer ${AuthUtill.accessToken}`
      }
    }
  )
    .then(response => {
      console.log('postSignUpUser')
      return response
    })
    .catch(error => {
      console.log('postSignUpUser', error);
      return error;
    });
};

/**
 * 카카오 사용자 회원수정
 * @param
 */
export const putUser = ({ userId, userTags }) => {
  return API_INSTANCE.put(`/users/${userId}`,
    qs.stringify({ userTags: JSON.stringify(userTags) }),
    {
      headers: {
        'Authorization': `Bearer ${AuthUtill.accessToken}`
      }
    }
  )
    .then(response => {
      console.log('putUser')
      return response
    })
    .catch(error => {
      console.log('putUser', error);
      return error;
    });
};

/**
 * 카카오 사장님 회원가입
 * @param
 */
export const postSignUpOwner = (data) => {
  data.category = JSON.stringify(data.category)
  console.log('postSignUpOwner', data)
  return API_INSTANCE.post('/users/join/owner',
    qs.stringify(data),
    {
      headers: {
        'Authorization': `Bearer ${AuthUtill.accessToken}`,
      }
    })
    .then(response => {
      console.log('postSignUpUser')
      return response
    })
    .catch(error => {
      console.log('postSignUpUser', error);
      return error;
    });
};

/**
 * 카카오 사장님 회원가입 이미지 업로드
 * @param
 */
export const putImgUpload = ({ files, userId, shopId }) => {
  console.log('putImgUpload', files, userId, shopId)
  const data = { files }
  return API_INSTANCE.put(`/upload-img/${userId}/${shopId}`,
    qs.stringify(data),
    {
      headers: {
        'Content-type': ' multipart/form-data'
      }
    }
  )
    .then(response => {
      console.log('putImgUpload')
      return response
    })
    .catch(error => {
      console.log('putImgUpload', error);
      return error;
    });
};

/**
 * 사용자 탈퇴
 * @param
 */
export const deleteUser = ({ userId }) => {
  console.log(AuthUtill.accessToken)
  return API_INSTANCE.delete(`users/${userId}/leave`,
    { headers: { 'Authorization': `Bearer ${AuthUtill.accessToken}` } }
  )
    .then(response => {
      console.log('putImgUpload')
      return response
    })
    .catch(error => {
      console.log('putImgUpload', error);
      return error;
    });
};



export const fetchWhoami = ({ token, userId }) => {
  return API_INSTANCE.get(`/users/${userId}/whoami`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    },
  )
    .then(response => {
      console.log('whoami')
      return response
    })
    .catch(error => {
      console.log('whoami', error);
      return error;
    });
};
