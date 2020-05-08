import React from 'react'
import './style.scss';
import { ShopItem, PhotoList } from '../List'
import iconClock from '../../assets/imgs/iconClock.png'
import iconMapPin from '../../assets/imgs/iconMapPin.png'
import iconPhone from '../../assets/imgs/iconPhone.png'

const shopDetailModal = ({ shopInfo, isOpen = true, onEvent = null, }) => {
  return (
    <div
      className={`shopDetailModal ${isOpen ? 'open' : ''}`}
      onClick={() => {
        onEvent({
          target: 'ShopInfo',
        });
      }}>
      <ShopItem data={shopInfo} type='icon' />
      <ul className={'shopDetailInfo'}>
        <li className="infoList">
          <img src={iconMapPin} alt={'위치'} />
          <div className="info">
            <p>서울 영등포구 서울 영등포구 여의도동 45</p>
            <span className="subLocation">국민은행본점 신사옥 앞</span>
          </div>
        </li>
        <li className="infoList">
          <img src={iconClock} alt={'영업시간'} />
          <div className="info">
            <p>영업시간<span className="openInfo">영업중</span></p>
            <p>월~금 07:00 ~ 22:00</p>
          </div>
        </li>
        <li className="infoList">
          <img src={iconPhone} alt={'비밀번호'} />
          <div className="info">
            <p>비공개</p>
          </div>
        </li>
      </ul>
      <PhotoList />
    </div>
  )
};

export default shopDetailModal;
