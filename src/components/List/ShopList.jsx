import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { shopTypes } from '../../reducers/shopReducer'
import './style.scss';

import { userApiTypes, userTypes } from '../../reducers/userReducer';


import iconLikeOn from '../../assets/imgs/iconLikeOn.png'
import iconLikeOff from '../../assets/imgs/iconLikeOff.png'

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

export const ShopItem = ({ index = 10, data, type, onEvent, history, userFavorite = [], userId, token }) => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);

  const getFavoirteList = (id) => {
    const findId = userFavorite.filter(v => v === id);
    return findId.length === 0 ? false : true;
  }

  const putFavoirteList = (id) => {
    console.log('dhdhdhdh', userId);
    dispatch({
      type: userApiTypes.PUT_FAVORITE_LIST,
      payload: {
        token: token,
        userId: userId,
        shopId: id
      }
    });
  }

  useEffect(() => {
    if (!isEmpty(userFavorite)) {
      getFavoirteList(data._id) ? setIsFavorite(true) : setIsFavorite(false);
      console.log('이 가게가 너의 즐겨찾기니?', getFavoirteList(data._id));
    }
  }, [data])

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
            if (type === 'rank' || type == 'watchList') {
              dispatch({
                type: shopTypes.FROM_SELECT_SHOP_ID,
                payload: type,
              });
              onEvent({
                target: 'ShopDetailModal',
              });
            }
          } else {
            if (type == 'serchResult') {
              dispatch({
                type: shopTypes.FROM_SELECT_SHOP_ID,
                payload: type,
              });
              onEvent({
                target: 'ShopDetailModal',
              });
            }
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
          <span className="shopCategory">{data.shopTags.title}</span>
          {type === 'icon' ? <p>{data.shopTags.item.join(', ')}</p> : null}
        </div>

        <div className="shopSubInfo">
          <span className="distance">{data.vicinity.toFixed(2)}m</span>
          <span className={`heart ${data.likeScore ? "on" : ""}`}>{data.likeScore}</span>
        </div>
      </div>
      {
        type === 'icon' ? <button className="btn_like" type="button" onClick={(event) => {
          console.log('djdjdjd');
          event.stopPropagation();
          setIsFavorite(!isFavorite);
          putFavoirteList(data._id)
        }}><img src={isFavorite ? iconLikeOn : iconLikeOff} alt={'좋아요'} /> </button> : (
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
