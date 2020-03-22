import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

const style = {};

const PhotoList = ({ items = [], type = '' }) => {
  console.log('list', items);
  return (
    <div className="photoListWrapper">
      {
        items.map((v, i) => {
          return (
            <Link key={i} to={v.link}>
              <div className={`photoListItem ${type === "icon" && i < 5 ? "iconShow" : ""}`}>
                {
                  type === "icon" && i < 5 ? (
                    <div className={`listIcon ${i > 2 ? "iconShow line" : "iconShow"}`}>{i + 1}</div>
                  ) : ("")
                }
                <div className="listTest">
                  <div className="shopInfo">
                    <span className="shopName">{v.name}</span>
                    <span className="shopCategory">{v.category}
                    </span>
                  </div>
                  <div className="shopSubInfo">
                    <span className="distance">{v.info.distance}m</span>
                    <span className={`heart ${v.info.userLike ? "on" : ""}`}>{v.info.like}</span>
                  </div>
                </div>
                <div className="listPhoto">
                  <img
                    src={v.photo}
                    alt="돈까스"
                  />
                  {
                    v.open ? "" : <div className="getReady">준비중</div>
                  }
                </div>
              </div>
            </Link>
          )
        })
      }
    </div>
  );
};

export default PhotoList;
