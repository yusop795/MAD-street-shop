import axios from 'axios';

// const API_INSTANCE = axios.create({
//   baseURL: 'https://mad-street-shop.herokuapp.com/api',
//   headers: {
//     'Access-Control-Allow-Origin': '*',
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
// });

const KAKAO_INSTANCE = axios.create({
  baseURL: 'https://kauth.kakao.com',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
});

/**
 * 카테고리
 * @param
 */
export const fetchLogin = () => {

};
