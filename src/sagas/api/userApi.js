// import axios from 'axios';

const API_INSTANCE = axios.create({
  baseURL: 'https://mad-street-shop.herokuapp.com/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
});

/**
 * 카테고리
 * @param
 */
// export const fetchCategory = () => {
//   return API_INSTANCE.get('/tags')
//     .then(response => {
//       console.log('야호')
//       return response
//     })
//     .catch(error => {
//       console.log('fetchShopList', error);
//       return error;
//     });
// };
