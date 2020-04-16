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


/**
 * 리스트
 * @param 
 * 경도 long : 123.45
 * 위도 lat : 78.901
 * 종류 type : rank/main
 * 활성화 active : false
 * 범위 range : 기본값은 10000(=10km)
 */
export const fetchList = (longData, latData, typeData, activeData, rangeData = 10000) => {
  console.log('fetchList')
  return API_INSTANCE.get('/shops',
    {
      params: {
        long: longData,
        lat: latData,
        type: typeData,
        active: activeData,
        range: rangeData
      }
    },
    {
      headers: {
        'Authorization': `Bearer ${AuthUtill.accessToken}`
      }
    }
  )
    .then(response => {
      console.log('get List')
      return response
    })
    .catch(error => {
      console.log('get list error >>>>', error);
      return error;
    });
};
