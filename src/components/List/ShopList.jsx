import React from 'react';
import './style.scss';

import iconLikeOn from '../../assets/imgs/iconLikeOn.png'
import { isEmpty } from '../../util/gm';

const ShopList = ({ items = [], type = '', onEvent = null }) => {
  return (
    <div className="shopListWrapper">
      {
        items.map((v, i) => {
          return (
            <ShopItem index={i} data={v} type={type} onEvent={onEvent} key={i} />
          )
        })
      }
    </div>
  );
};

export const ShopItem = ({ index = 10, data, type, onEvent, icon = false, iconEvent = null }) => {
  return (
    <div
      className={`shopListItem ${type === "rank" && index < 5 ? "iconShow" : ""}`}
      onClick={() => {
        if (isEmpty(type)) {
          onEvent({
            target: 'ShopDetailModal',
          });
        } else {
          /* 200425 => 여기서 아이디 받아서 리스트 띄우는 거 하면 될 듯 */
          console.log('타입이 있는 리스트에서 넘어옴');
        }
      }}
    >
      {type === "rank" && index < 5 ?
        (<div className={`listIcon ${index > 2 ? "iconShow line" : "iconShow"}`}>{index + 1}</div>) : null
      }
      <div className="listTest">
        <div className="shopInfo">
          <span className="shopName">{data.shopName}</span>
          <span className="shopCategory">{data.shopTags.title}
          </span>
        </div>
        <div className="shopSubInfo">
          <span className="distance">{'data.vicinity.toFixed(0)'}m</span>
          <span className={`heart ${data.likeScore ? "on" : ""}`}>{data.likeScore}</span>
        </div>
      </div>
      {type === 'icon' ? <img src={iconLikeOn} alt={'좋아요'} /> : (
        <div className="listPhoto">
          <img src={data.imageUrl[0]} alt="가게 사진" />
          {data.now.active ? null : <div className="getReady">준비중</div>}
        </div>
      )}
    </div>
  )
}

export default ShopList;
