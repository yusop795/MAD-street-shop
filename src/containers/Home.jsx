import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import ModalPageUtill from '../util/ModalPageUtill.js';

import { shopTypes } from '../reducers/shopReducer'

import { HomeHeader } from '../components/Header'
import { MainMap } from '../components/Map';
import { ShopInfo, ShopDetailModal } from '../components/Unit';
import { SearchModal, SettingLocation } from '../containers/ModalPage';
import { localStorageGet } from '../util/LocalStorage.js';
import { isEmpty } from '../util/gm.js';

const Home = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState('');
  const shopList = useSelector(state => state.shopReducer.shopList, []);

  const [selectShop] = useState({
    shopName: "석정포장마차",
    shopTags: {
      title: "분식"
    },
    imageUrl: ["https://post-phinf.pstatic.net/MjAxOTEwMDFfNjkg/MDAxNTY5OTE5NzUxNDc2.mnGT1DcIaEY9os4ftETl5Bc_SudAwsUq8O3KaqlpQtQg.qhcMdUjcKqBoTC6hR1j7OnsY4BIpK1aulSmv0mlwO14g.JPEG/%EB%B6%84%EC%8B%9D.jpg?type=w1200"],
    now: {
      active: true,
    },
    link: "/",
    vicinity: 8,
    info: {
      distance: 8,
      like: 674,
      userLike: true,
    }
  });

  const [currentKeyword, setCurrentKeyword] = useState([]);
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

  const { targetModalPage, isModalOpen, setModalPage } = ModalPageUtill();

  useEffect(() => {
    if (navigator.geolocation) {
      fetchGeolocation();
    }
  }, []);

  // location 변경될때
  useEffect(() => {
    if (location) {
      dispatch({
        type: shopTypes.FETCH_SHOP_LIST,
        payload: { location, type: 'main' },
      });
    }
  }, [location]);

  useEffect(() => {
    // let keywords = isEmpty(localStorageGet('MadShopCurrentKeyword')) ? [] : JSON.parse(localStorageGet('MadShopCurrentKeyword'));
    // setCurrentKeyword(keywords);
    // console.log(123123123,shopList)
  }, []);

  const rederModalPage = () => {
    switch (targetModalPage) {
      case 'SearchModal':
        return <SearchModal isOpen={isModalOpen} onEvent={setModalPage} currentKeyword={currentKeyword} />;
      case 'ShopDetailModal':
        return <ShopDetailModal shopInfo={selectShop} isOpen={isModalOpen} onEvent={setModalPage} />;
      case 'SettingLocation':
        return <SettingLocation isOpen={isModalOpen} onEvent={setModalPage} />;
      case 'ShopInfoModal':
        return <ShopInfo shopInfo={selectShop} fetchGeolocation={fetchGeolocation} onEvent={setModalPage} />;
      default:
        return <ShopInfo shopInfo={selectShop} fetchGeolocation={fetchGeolocation} onEvent={setModalPage} />;
    }
  }

  return (
    <div>
      <HomeHeader fetchGeolocation={fetchGeolocation} setModalPage={setModalPage} />
      <Link to='/test' style={{ position: "fixed", top: '100px', zIndex: 999999 }}>test</Link>
      <div>
        <MainMap
          location={location}
          setLocation={setLocation}
          shopList={shopList}
          onEvent={setModalPage}
          containerId={'homeMap'}
        />
      </div>
      {rederModalPage()}
    </div >
  );
}
export default withRouter(Home);
