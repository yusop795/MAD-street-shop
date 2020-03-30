import React from 'react'
import './style.scss';
import { ShopItem } from '../List'
import iconClock from '../../assets/imgs/iconClock.png'
import iconMapPin from '../../assets/imgs/iconMapPin.png'
import iconPhone from '../../assets/imgs/iconPhone.png'

const shopDetailModal = ({shopInfo, isOpen=true, onEvent=null}) => {

  return (
    <div className={`shopDetailModal ${isOpen ? 'open' : ''}`}>
      <ShopItem data={shopInfo} onEvent={onEvent}/>
      <ul className={'shopDetailInfo'}>
        <li className="infoList">
          <img src={iconMapPin}/>
          <div className="info">
            <p>서울 영등포구 서울 영등포구 여의도동 45</p>
            <p>국민은행본점 신사옥 앞</p>
          </div>
        </li>
        <li className="infoList">
          <img src={iconClock}/>  
          <div className="info">
            <p>영업시간<span>영업중</span></p>
            <p>월~금 07:00 ~ 22:00</p>
          </div>
        </li>
        <li className="infoList">
          <img src={iconPhone}/>
          <div className="info">
            <p>비공개</p>
          </div>
        </li>
      </ul>
    </div>
  )
};

export default shopDetailModal;
