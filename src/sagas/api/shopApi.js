import axios from 'axios';
import qs from 'qs'
import AuthUtill from '../../util/AuthUtill'

const API_INSTANCE = axios.create({
  baseURL: 'https://mad-street-shop.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
});


/**
 * 리스트
 * @param 
 * 경도 long : 123.45
 * 위도 lat : 78.901
 * 종류 type : rank/main
 * 활성화 active : false
 * 범위 range : 기본값은 10000(=10km)
 */
export const fetchShopList = (data) => {
  return API_INSTANCE.get('/shops/list',
    {
      params: {
        long: data.location.long,
        lat: data.location.lat,
        type: 'main',
        active: false,
        range: 3000,
      }
    },
  )
    .then(response => {
      return response
    })
    .catch(error => {
      console.log('get list error >>>>', error);
      return error;
    });
};

export const fetchShopDetail = ({ shopId, long, lat }) => {
  return API_INSTANCE.get(`/shops/${shopId}`,
    {
      params: {
        long,
        lat,
      },
      headers: {
        'Authorization': `Bearer ${AuthUtill.accessToken}`
      }
    })
    .then(response => {
      return response
    })
    .catch(error => {
      return error;
    });
}

/**
 * 가게 영업시작
 */
export const postShopOpen = (data) => {
  return API_INSTANCE.post(`/shops/${data.shopId}/operation`,
    qs.stringify(data),
    {
      headers: {
        'Authorization': `Bearer ${AuthUtill.accessToken}`
      }
    }
  )
    .then(response => {
      return response
    })
    .catch(error => {
      return error;
    });
}

/**
 * 가게 영업 종료
 */
export const deleteShopOpen = (data) => {
  return API_INSTANCE.delete(`/shops/${data.shopId}/operation`,
    {
      data: {
        userId: data.userId
      },
      headers: {
        'Authorization': `Bearer ${AuthUtill.accessToken}`
      }
    }
  )
    .then(response => {
      return response
    })
    .catch(error => {
      return error;
    });
}