import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

// import AuthUtill from '../util/AuthUtill'

import { startTypes } from '../reducers/startReducer';
import { userTypes } from '../reducers/userReducer';
import '../assets/styles/containers/splash.scss';
import imgLogoTruck from '../assets/imgs/imgLogoTruck.png';

const KAKAO = window.Kakao

const Splash = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState('');
  const categoryList = useSelector(state => state.startReducer.shopCategory, []);
  const token = useSelector(state => state.userReducer.token, {});
  const [allState, setAllState] = useState(false);

  // const {setToken} = AuthUtill();

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

  useEffect(() => {
    dispatch({
      type: startTypes.FETCH_SHOP_CATEGORY,
    });

    // console.log(location)
    // dispatch({
    //   type: startTypes.FETCH_SHOP_LIST,
    //   payload: {
    //     type: "rank",
    //   }
    // });
    // fetchGeolocation();
    // dispatch({
    //   type: startTypes.FETCH_SHOP_LIST,
    //   payload: {
    //     type: "main",
    //   }
    // });
    // if(KAKAO.Auth.getAccessToken()){
    //   dispatch({
    //     type: userTypes.SET_LOGIN,
    //     payload: {
    //       token: {
    //         accessToken: KAKAO.Auth.getAccessToken(),
    //       },
    //       isLogin: true
    //     },
    //   })
    // } 
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setAllState(true)
    }, 3000)

    if (categoryList.length > 0) {
      setAllState(true)
    }

  }, [categoryList]);

  return (allState ? (
    <Redirect to="/test" />
  ) : (
      <div className="main splash">
        <img src={imgLogoTruck} alt="" />
        <div className="loadingBar">
          <span className="span" />
        </div>
      </div>
    ));
};

export default withRouter(Splash);
