import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import ModalPageUtill from '../util/ModalPageUtill';

import { shopTypes } from '../reducers/shopReducer'

import { HomeHeader } from '../components/Header'
import { MainMap } from '../components/Map';
import { ShopInfo, ShopDetailModal } from '../components/Unit';
import { SearchModal, SettingLocation } from '../containers/ModalPage';
import { localStorageGet } from '../util/LocalStorage.js';
import { isEmpty } from '../util/gm.js';

const Home = ({ history }) => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState('');
  const shopList = useSelector(state => state.shopReducer.shopList, []);
  const shopDetail = useSelector(state => state.shopReducer.shopDetail, {});
  const [selectShop, setSelectShop] = useState({});
  const [selectShopId, setSelectShopId] = useState('');
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
        setLocation({ lat: 37.486107, long: 126.982643 });
        // setLocation({ lat: coords.latitude, long: coords.longitude });
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
    if (shopList.length > 0) {
      setSelectShopId(shopList[0]._id)
    }
  }, [shopList]);

  useEffect(() => {
    shopList.forEach(v => {
      if (selectShopId === v._id) {
        dispatch({
          type: shopTypes.FETCH_SHOP_DETAIL,
          payload: {
            shopId: selectShopId,
            long: location.long,
            lat: location.lat
          }
        });
      }
    });
  }, [selectShopId]);

  const rederModalPage = () => {
    if (Object.keys(shopDetail).length > 0) {
      switch (targetModalPage) {
        case 'SearchModal':
          return <SearchModal history={history} isOpen={isModalOpen} onEvent={setModalPage} currentKeyword={currentKeyword} />;
        case 'ShopDetailModal':
          return <ShopDetailModal shopInfo={shopDetail} isOpen={isModalOpen} onEvent={setModalPage} />;
        case 'SettingLocation':
          return <SettingLocation type={'home'} isOpen={isModalOpen} onEvent={setModalPage} />;
        case 'ShopInfoModal':
          return <ShopInfo shopInfo={shopDetail} fetchGeolocation={fetchGeolocation} onEvent={setModalPage} />;
        default:
          return <ShopInfo shopInfo={shopDetail} fetchGeolocation={fetchGeolocation} onEvent={setModalPage} />;
      }
    }
  }

  return (
    <div>
      <HomeHeader fetchGeolocation={fetchGeolocation} setModalPage={setModalPage} />
      <div>
        <MainMap
          location={location}
          selectShopId={selectShopId}
          setSelectShopId={setSelectShopId}
          shopList={shopList}
          onEvent={setModalPage}
          containerId={'homeMap'}
        />
      </div>
      {rederModalPage()}
    </div>
  );
}
export default withRouter(Home);
