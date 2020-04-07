import axios from 'axios';

const API_INSTANCE = axios.create({
  baseURL: 'https://mad-street-shop.herokuapp.com/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

/**
 * 카테고리
 * @param 
 */
export const fetchCategory = () => {
  return API_INSTANCE.get('/tag')
    .then(response => {
      console.log('fetchShopList', response)
    })
    .catch(error => {
      console.log('fetchShopList', error);
      return error;
    });
};
