import React from 'react';
import { useDispatch } from 'react-redux';
import { shopTypes } from '../../reducers/shopReducer'
import './style.scss';

import iconLikeOn from '../../assets/imgs/iconLikeOn.png'
import { isEmpty } from '../../util/gm';

const ShopList = ({ items = [], type = '', onEvent = null, history }) => {
  return (
    <div className="shopListWrapper">
      {
        items.map((v, i) => {
          return (
            <ShopItem index={i} data={v} type={type} onEvent={onEvent} history={history} key={i} />
          )
        })
      }
    </div>
  );
};

export const ShopItem = ({ index = 10, data, type, onEvent, history }) => {
  console.log('ShopItem >>>>', onEvent);
  const dispatch = useDispatch();
  return (
    <div
      className={`shopListItem ${type === "rank" && index < 5 ? "iconShow" : ""}`}
      onClick={() => {
        if (type !== 'icon') {
          dispatch({
            type: shopTypes.SET_SELECT_SHOP_ID,
            payload: {
              selectShopId: data._id
            },
          });
          if (history) {
            history.push('home')
          } else {
            onEvent({
              target: 'ShopDetailModal',
            });
          }
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
          <span className="distance">{data.vicinity.toFixed(2)}m</span>
          <span className={`heart ${data.likeScore ? "on" : ""}`}>{data.likeScore}</span>
        </div>
      </div>
      {
        type === 'icon' ? <button type="button" onClick={(event) => {
          console.log('djdjdjd');
          event.stopPropagation();
        }}><img src={iconLikeOn} alt={'좋아요'} /> </button> : (
            <div className="listPhoto">
              <img src={data.imageUrl[0]} alt="가게 사진" />
              {data.now.active ? null : <div className="getReady">준비중</div>}
            </div>
          )
      }
    </div >
  )
}

export default ShopList;
