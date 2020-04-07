import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

import { ShopItem } from '../List'
import iconPin from '../../assets/imgs/iconPin.png';
import btnHere from '../../assets/imgs/btnHere.png';


const shopInfo = ({shopInfo={}, fetchGeolocation, onEvent}) => {

  return (
    <div className="shopInfoBox">
      <div className="buttonBox">
        <div className="loactionBtn" onClick={fetchGeolocation}>
          <img src={btnHere} alt="현재위치"/>
        </div>
        <div className="ranking">
          <Link to="/ranking">
            <img src={iconPin} alt="현재위치"/>
            <span className="text">내 주변 인기 스트릿푸드는?</span>
          </Link>
        </div>
      </div>
      <div className="shopInfoList">
        <ShopItem data={shopInfo} onEvent={onEvent}/>
      </div>
    </div>
  )
};

export default shopInfo;
