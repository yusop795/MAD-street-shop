import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import ModalPageUtill from '../util/ModalPageUtill.js';

import { HomeHeader } from '../components/Header'
import { MainMap } from '../components/Map';
import { ShopInfo, ShopDetailModal } from '../components/Unit';
import { SearchModal, SettingLocation } from '../containers/ModalPage';

const Home = () => {
  const [location, setLocation] = useState('');
  const [shopList] = useState([{ name: '토토네 튀김', latitude: 37.489524599999996, longitude: 126.98655099999998 }, { name: '네네치킨', latitude: 37.489524599999996, longitude: 126.98643099999998 }]);
  const [selectShop] = useState({
    name: "석정포장마차",
    category: "분식",
    photo: "https://post-phinf.pstatic.net/MjAxOTEwMDFfNjkg/MDAxNTY5OTE5NzUxNDc2.mnGT1DcIaEY9os4ftETl5Bc_SudAwsUq8O3KaqlpQtQg.qhcMdUjcKqBoTC6hR1j7OnsY4BIpK1aulSmv0mlwO14g.JPEG/%EB%B6%84%EC%8B%9D.jpg?type=w1200",
    open: true,
    link: "/",
    info: {
      distance: 8,
      like: 674,
      userLike: true,
    }
  });
  // const loading = useSelector(({ authReducer }) => authReducer.loading, true);

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
      // dispatch({
      //   type: homeTypes.FETCH_SHOP_LIST,
      //   payload: { location, type: 'main' },
      // });
    }
  }, [location]);


  const rederModalPage = () => {
    switch (targetModalPage) {
      case 'SearchModal':
        return <SearchModal isOpen={isModalOpen} onEvent={setModalPage} />;
      case 'ShopDetailModal':
        return <ShopDetailModal shopInfo={selectShop} isOpen={isModalOpen} onEvent={setModalPage} />;
      case 'SettingLocation':
        return <SettingLocation isOpen={isModalOpen} onEvent={setModalPage} />;
      default:
        return <ShopInfo shopInfo={selectShop} fetchGeolocation={fetchGeolocation} onEvent={setModalPage}/>;
    }
  }

  return (
    <div>
      <HomeHeader fetchGeolocation={fetchGeolocation} setModalPage={setModalPage} />
      <MainMap 
        location={location} 
        setLocation={setLocation} 
        shopList={shopList} 
        onEvent={setModalPage} 
        containerId={'homeMap'}
      />
      {rederModalPage()}
    </div >
  );
}
export default withRouter(Home);
