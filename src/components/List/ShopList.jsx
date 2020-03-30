import React from 'react';
import './style.scss';

const ShopList = ({ items = [], type = '', onEvent = null}) => {
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

export const ShopItem = ({index = 10, data, type, onEvent})=> {
  return (
      <div 
        className={`shopListItem ${type === "icon" && index < 5 ? "iconShow" : ""}`}
        onClick={()=>{
          onEvent({
            target: 'ShopDetailModal',
          });
        }}
      >
        {
          type === "icon" && index < 5 ? (
            <div className={`listIcon ${index > 2 ? "iconShow line" : "iconShow"}`}>{index + 1}</div>
          ) : ("")
        }
        <div className="listTest">
          <div className="shopInfo">
            <span className="shopName">{data.name}</span>
            <span className="shopCategory">{data.category}
            </span>
          </div>
          <div className="shopSubInfo">
            <span className="distance">{data.info.distance}m</span>
            <span className={`heart ${data.info.userLike ? "on" : ""}`}>{data.info.like}</span>
          </div>
        </div>
        <div className="listPhoto">
          <img
            src={data.photo}
            alt="돈까스"
          />
          {
            data.open ? "" : <div className="getReady">준비중</div>
          }
        </div>
      </div>
  )
}

export default ShopList;
