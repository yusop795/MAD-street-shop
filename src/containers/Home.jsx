import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/styles/containers/home.scss';


import ModalPageUtill from '../util/ModalPageUtill';

import { shopTypes } from '../reducers/shopReducer'
import { startTypes } from '../reducers/startReducer'


import { HomeHeader } from '../components/Header'
import { MainMap } from '../components/Map';
import { ShopInfo, ShopDetailModal } from '../components/Unit';
import { SearchModal, SettingLocation } from '../containers/ModalPage';
import iconPin from '../assets/imgs/iconPin.png';
import btnHere from '../assets/imgs/btnHere.png';
import { localStorageGet } from '../util/LocalStorage.js';
import { isEmpty } from '../util/gm.js';

const Home = ({ history }) => {
  const dispatch = useDispatch();
  const location = useSelector(state => state.startReducer.location);
  const shopList = useSelector(state => state.shopReducer.shopList);
  const shopDetail = useSelector(state => state.shopReducer.shopDetail);
  const shopId = useSelector(state => state.shopReducer.selectShopId)
  const selectedFrom = useSelector(state => state.shopReducer.selectedFrom)
  const [address, setAddress] = useState('');
  const [selectShopId, setSelectShopId] = useState(shopId);
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
        dispatch({
          type: startTypes.SET_LOCATION,
          payload: {
            location: { lat: coords.latitude, long: coords.longitude }
          }
        })
      },
      e => console.log(`Geolocation 오류 [${e.code}] : ${e.message}`),
      options,
    );
  };

  const { targetModalPage, isModalOpen, setModalPage } = ModalPageUtill();

  useEffect(() => {
    /* 랭킹, watch리스트에서 넘어온 것이 아니면 selectedFrom은 빈값임 */
    if (selectedFrom == '') {
      setModalPage({ target: 'ShopInfoModal' })
    } else {
      setModalPage({ target: 'ShopDetailModal' })
    }
  }, []);

  // location 변경될때
  useEffect(() => {
    /* selectedFrom => 랭킹, watch리스트에서 넘어온 것 */
    if (location && selectedFrom == '') {
      dispatch({
        type: shopTypes.FETCH_SHOP_LIST,
        name: "shopList",
        payload: { location, type: 'main' },
      });
    }
  }, [location]);

  useEffect(() => {
    setSelectShopId(shopId)
  }, [shopId]);

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

  useEffect(() => {
    const getFromLocalStorage = JSON.parse(localStorageGet('MadShopCurrentKeyword'));

    isEmpty(getFromLocalStorage) || getFromLocalStorage.length === 0 ? setCurrentKeyword([]) : setCurrentKeyword(getFromLocalStorage);

  }, [targetModalPage])

  const rederModalPage = () => {
    if (targetModalPage === 'ShopInfoModal' && Object.keys(shopDetail).length > 0) {
      return <ShopInfo shopInfo={shopDetail} fetchGeolocation={fetchGeolocation} onEvent={setModalPage} />;
    }

    switch (targetModalPage) {
      case 'SearchModal':
        return <SearchModal history={history} isOpen={isModalOpen} onEvent={setModalPage} currentKeyword={currentKeyword} />;
      case 'ShopDetailModal':
        return <ShopDetailModal shopInfo={shopDetail} isOpen={isModalOpen} onEvent={setModalPage} />;
      case 'SettingLocation':
        return <SettingLocation type={'home'} addressText={address} isOpen={isModalOpen} onEvent={setModalPage} />;
      default:
        return null;
    }
  }

  return (
    <div>
      <HomeHeader address={address} fetchGeolocation={fetchGeolocation} setModalPage={setModalPage} />
      <div className={targetModalPage === 'ShopDetailModal' && isModalOpen ? 'mapCenter' : ''}>
        <MainMap
          location={location}
          selectShopId={selectShopId}
          shopList={shopList}
          onEvent={setModalPage}
          containerId={'homeMap'}
          getGeocoder={(address) => { setAddress(address) }}
        />
      </div>
      <div className={`buttonBox ${targetModalPage !== 'ShopInfoModal' || shopList.length <= 0 ? 'bottom' : ''}`}>
        <div className="ranking">
          <Link to="/ranking">
            <img src={iconPin} alt="현재위치" />
            <span className="text">내 주변 인기 스트릿푸드는?</span>
          </Link>
        </div>
        <div className="loactionBtn" onClick={fetchGeolocation}>
          <img src={btnHere} alt="현재위치" />
        </div>
      </div>
      {rederModalPage()}
    </div >
  );
}
export default withRouter(Home);
