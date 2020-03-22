import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';

const style = {};

const PhotoList = () => {
  return (
    <div className="photoListWrapper">
      <Link to="/signup/owner">
        <div className="photoListItem photoShow iconShow">
          <div className="listIcon">1</div>
          <div className="listTest">
            <div className="shopInfo">
              <span className="shopName">츄로킹</span>
              <span className="shopCategory">분식</span>
            </div>
            <div className="shopSubInfo">
              <span className="distance">129m</span>
              <span className="heart on">196</span>
            </div>
          </div>
          <div className="listPhoto">
            <img
              src="https://d20aeo683mqd6t.cloudfront.net/ko/articles/title_images/000/026/550/medium/IMG_2236s.jpg?2019"
              alt="돈까스"
            />
          </div>
        </div>
      </Link>
      <Link to="/signup/owner">
        <div className="photoListItem photoShow iconShow">
          <div className="listIcon line">2</div>
          <div className="listTest">
            <div className="shopInfo">
              <span className="shopName">츄로킹</span>
              <span className="shopCategory">분식</span>
            </div>
            <div className="shopSubInfo">
              <span className="distance">129m</span>
              <span className="heart on">196</span>
            </div>
          </div>
          <div className="listPhoto">
            <img
              src="https://d20aeo683mqd6t.cloudfront.net/ko/articles/title_images/000/026/550/medium/IMG_2236s.jpg?2019"
              alt="돈까스"
            />
          </div>
        </div>
      </Link>
      <Link to="/signup/owner">
        <div className="photoListItem">
          <div className="listTest">
            <div className="shopInfo">
              <span className="shopName">츄로킹</span>
              <span className="shopCategory">분식</span>
            </div>
            <div className="shopSubInfo">
              <span className="distance">129m</span>
              <span className="heart">196</span>
            </div>
          </div>
          <div className="listPhoto">
            <img
              src="https://d20aeo683mqd6t.cloudfront.net/ko/articles/title_images/000/026/550/medium/IMG_2236s.jpg?2019"
              alt="돈까스"
            />
            <div className="getReady">준비중</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PhotoList;
