import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { startTypes } from '../reducers/startReducer';
import '../assets/styles/containers/splash.scss';
import imgLogoTruck from '../assets/imgs/imgLogoTruck.png';
import { userApiTypes } from '../reducers/userReducer';
import { localStorageGet } from '../util/LocalStorage';
import AlertUtil from '../util/AlertUtil';
import { Alert } from '../components/Alert';

const Splash = ({ history }) => {
  const dispatch = useDispatch();
  const [token] = useState(localStorageGet('MAD_KAKAO_ACCESS_TOKEN'));
  const [userId] = useState(localStorageGet('MAD_USER_ID'));
  const location = useSelector(state => state.startReducer.location);
  const categoryList = useSelector(state => state.startReducer.shopCategory);
  const noticeList = useSelector(state => state.startReducer.ntc);
  const faqList = useSelector(state => state.startReducer.faq);
  const isLogin = useSelector(state => state.userReducer.isLogin);
  const userInfo = useSelector(state => state.userReducer.userInfo);
  const shopInfo = useSelector(state => state.userReducer.shopInfo);
  const [allState, setAllState] = useState(false);

  const { isShowing, title, contents, setAlert } = AlertUtil();

  // 위치정보 조회
  const fetchGeolocation = () => {
    const options = {
      enableHighAccuracy: true,
      maximumAge: 300000,
      timeout: 50000,
    };

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        dispatch({
          type: startTypes.SET_LOCATION,
          payload: {
            location: { lat: coords.latitude, long: coords.longitude }
          }
        })
      },
      e => {
        console.log(`Geolocation 오류 [${e.code}] : ${e.message}`)
        setAlert({
          contents: '위치값을 가져오는데 실패했습니다. 앱을 다시 실행해주세요'
        })
      },
      options,
    );
  };

  const api_call_list = [
    {
      type: startTypes.FETCH_SHOP_CATEGORY,
    },
    {
      type: startTypes.FETCH_SHOP_LIST,
      payload: {
        type: "rank",
        name: "rank",
      }
    },
    {
      type: startTypes.FETCH_ETC_LIST,
      payload: {
        type: "ntc",
      }
    },
    {
      type: startTypes.FETCH_ETC_LIST,
      payload: {
        type: "faq",
      }
    }
  ];

  useEffect(() => {
    fetchGeolocation()
    api_call_list.map(d => {
      return dispatch(d);
    });

    if (token && userId) {
      dispatch({
        type: userApiTypes.WHO_AM_I,
        payload: {
          token,
          userId
        }
      })
    }
  }, []);


  useEffect(() => {
    // console.log(categoryList, noticeList, faqList, location)
    // if (categoryList.length > 0 && noticeList.length > 0 && faqList.length > 0 && Object.keys(location).length > 0) {
    //   // if (Object.keys(shopInfo).length > 0 && !shopInfo.now.active) {
    //   //   history.push('openShop')
    //   // } else {
    //   //   setAllState(true)
    //   // }
    //   console.log(12312312, shopInfo)
    //   setAllState(true)

    // }
    if (isLogin) {
      if (categoryList.length > 0 && noticeList.length > 0 && faqList.length > 0 && Object.keys(location).length > 0) {
        if (userInfo.owner && !shopInfo.now.active) return history.push('openShop')
        setAllState(true)
      }
    } else {
      if (categoryList.length > 0 && noticeList.length > 0 && faqList.length > 0 && Object.keys(location).length > 0) {
        setAllState(true)
      }
    }
    return () => {
      setAllState(false)
    }
  }, [isLogin, categoryList, noticeList, location]);

  return (allState ? (
    <Redirect to="/home" />
  ) : (
      <div className="main splash">
        <div className="logoBox">
          <div>
            <img src={imgLogoTruck} alt="트럭" />
          </div>
        </div>
        <Alert isShowing={isShowing} hide={setAlert} title={title} contents={contents} />
      </div >
    ));
};

export default withRouter(Splash);
