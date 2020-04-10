import axios from 'axios';
import AuthUtill from '../../util/AuthUtill'

const API_INSTANCE = axios.create({
  baseURL: 'https://mad-street-shop.herokuapp.com/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});


/**
 * 카테고리
 * @param 
 */
export const fetchCategory = () => {
  console.log('fetchCategory', AuthUtill.accessToken)
  return API_INSTANCE.get('/tags')
    .then(response => {
      console.log('야호')
      return response
    })
    .catch(error => {
      console.log('fetchShopList', error);
      return error;
    });
};
