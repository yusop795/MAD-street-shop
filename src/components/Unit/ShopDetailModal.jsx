import React from 'react'
import './style.scss';
import { ShopItem, PhotoList } from '../List'
import iconClock from '../../assets/imgs/iconClock.png'
import iconMapPin from '../../assets/imgs/iconMapPin.png'
import iconPhone from '../../assets/imgs/iconPhone.png'

const shopDetailModal = ({ shopInfo, isOpen = true, onEvent = null, }) => {
  return (
    <div className={`shopDetailModal ${isOpen ? 'open' : ''}`}>
      <ShopItem data={shopInfo} type='icon' />
      <ul className={'shopDetailInfo'}>
        <li className="infoList">
          <img src={iconMapPin} alt={'위치'} />
          <div className="info">
            <p>-</p>
            <span className="subLocation">{shopInfo.now.locationComment}</span>
          </div>
        </li>
        <li className="infoList">
          <img src={iconClock} alt={'영업시간'} />
          <div className="info">
            <p>영업시간{shopInfo.now.active ? <span className="openInfo">영업중</span> : null}</p>
            <p>{`${shopInfo.openDays}`}{`${shopInfo.openTime}~${shopInfo.closeTime}`}</p>
          </div>
        </li>
        <li className="infoList">
          <img src={iconPhone} alt={'전화번호'} />
          <div className="info">
            <p>{shopInfo.mobile ? shopInfo.mobile : '비공개'}</p>
          </div>
        </li>
      </ul>
      <PhotoList items={shopInfo.imageUrl} />
    </div>
  )
};

export default shopDetailModal;
