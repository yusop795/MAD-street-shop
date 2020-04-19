import React from 'react';
import './style.scss';

import iconLikeOn from '../../assets/imgs/iconLikeOn.png'

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
        if (!onEvent) return false
        onEvent({
          target: 'ShopDetailModal',
        });
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
          <span className="distance">{data.vicinity.toFixed(0)}m</span>
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
