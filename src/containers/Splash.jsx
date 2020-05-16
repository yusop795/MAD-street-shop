import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { startTypes } from '../reducers/startReducer';
import '../assets/styles/containers/splash.scss';
import imgLogoTruck from '../assets/imgs/imgLogoTruck.png';

const KAKAO = window.Kakao

const Splash = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState('');
  const categoryList = useSelector(state => state.startReducer.shopCategory, []);
  const noticeList = useSelector(state => state.startReducer.ntc, []);
  const faqList = useSelector(state => state.startReducer.faq, []);
  const [allState, setAllState] = useState(false);

  // 위치정보 조회
  const fetchGeolocation = () => {
    const options = {
      enableHighAccuracy: true,
      maximumAge: 300000,
      timeout: 50000,
    };

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        console.log('coords', coords);
        setLocation({ lat: coords.latitude, long: coords.longitude });
      },
      e => console.log(`Geolocation 오류 [${e.code}] : ${e.message}`),
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
      type: startTypes.FETCH_SHOP_LIST,
      payload: {
        type: "main",
        name: "main",
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
    api_call_list.map(d => {
      return dispatch(d);
    });
    // KAKAO.Auth.login({
    //   success: (authObj) => {
    //     // 사용자 토큰 저장
    //     console.log(authObj)
    //   },
    //   fail: (err) => {
    //     console.log(JSON.stringify(err))
    //   },
    // })
  }, []);

  useEffect(() => {
    if (categoryList.length > 0 && noticeList.length > 0 && faqList.length > 0) {
      setAllState(true)
    }
    return () => {
      setAllState(false)
    }
  }, [categoryList, noticeList, faqList]);

  return (allState ? (
    <Redirect to="/home" />
  ) : (
      <div className="main splash">
        <div className="logoBox">
          <div>
            <img src={imgLogoTruck} alt="트럭" />
          </div>
        </div>
      </div >
    ));
};

export default withRouter(Splash);
