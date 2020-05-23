import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './style.scss';
import { Link } from 'react-router-dom';
import iconBack from '../../assets/imgs/iconBack.png';
import btnClose from '../../assets/imgs/btnClose.png';
import iconSearch from '../../assets/imgs/iconSearch.png';
import adressEdit from '../../assets/imgs/adressEdit.png';

import imgProfile01 from '../../assets/imgs/imgProfile01.png';
import imgProfile02 from '../../assets/imgs/imgProfile02.png';
import imgProfile03 from '../../assets/imgs/imgProfile03.png';

import { localStorageGet, localStorageSet } from '../../util/LocalStorage.js';
import { isEmpty } from '../../util/gm';


const Header = ({ onEvent, title = '' }) => {
  return (
    <div className="header">
      <div onClick={onEvent} className="gobackBtn"><img src={iconBack} alt={'뒤로가기'} /></div>
      <h2 className="headerTitle">{(title) ? title : ''}</h2>
      <div>{''}</div>
    </div>
  );
};

export const ModalHeader = ({ onEvent, title = '', border = true }) => {
  return (
    <div className={`header modalHeader ${border ? 'border' : ''}`}>
      <div onClick={onEvent}><img src={btnClose} alt="btnClose" /></div>
      <h2 className="headerTitle">{(title) ? title : ''}</h2>
      <div>{''}</div>
    </div>
  );
};

export const SearchModalHeader = ({ history, textarea = '', goTo, textValue = '', location = {}, onEvent }) => {
  const [enterKeyword, setKeyword] = useState('');

  const addKeyPress = (e) => {
    if (e.key === 'Enter') {
      const current_keyword = isEmpty(localStorageGet('MadShopCurrentKeyword')) ? [] : JSON.parse(localStorageGet('MadShopCurrentKeyword'));
      if (e.target.value !== "") {
        current_keyword.unshift(e.target.value);
        const set_keyword_arr = current_keyword.reduce((a, b) => {
          if (a.indexOf(b) < 0) a.push(b);
          return a;
        }, [])
        localStorageSet('MadShopCurrentKeyword', JSON.stringify(set_keyword_arr));

      }
      history.push(`${goTo}?keyword=${e.target.value}`)
    }
  }

  useEffect(() => {
    if (textValue !== '') {
      setKeyword(textValue);
    }
  }, []);

  return (
    <div className="header modalHeader">
      <div className="headerWrapper">
        <div className="search">
          <img src={iconSearch} alt={'검색'} />
        </div>
        <div className="textBoxWrapper focusOn">
          <input type="text" placeholder={(textarea) ? textarea : '검색어를 입력하세요'} value={enterKeyword} onChange={(e) => setKeyword(e.target.value)} onKeyPress={(e) => { addKeyPress(e) }} />
          <button type="button" className="deleteText" onClick={() => setKeyword('')}>입력 텍스트 삭제</button>
        </div>
        <div className="cancel" onClick={onEvent}>취소</div>
      </div>
    </div>
  );
}


export const HomeHeader = ({ address = '서울 영등포구 여의도동 37', setModalPage }) => {
  const isLogin = useSelector(state => state.userReducer.isLogin);
  const isUser = useSelector(state => state.userReducer.isUser);
  const userInfo = useSelector(state => state.userReducer.userInfo);
  let img = ''
  if (isLogin && isUser) {
    if (userInfo.kakao.profileLink) {
      img = userInfo.kakao.profileLink
    } else {
      img = (userInfo.owner) ? imgProfile02 : imgProfile01
    }
  } else {
    img = imgProfile03
  }
  return (
    <div className="header homeHeader">
      <div className="menu">
        <Link to="/myPage">
          <img src={img} alt={'메뉴'} />
        </Link>
      </div>
      <div className="address" onClick={() => setModalPage({ target: 'SettingLocation' })}>
        <span className="text">{address}</span>
        <img src={adressEdit} alt={'주소 수정'} />
      </div>
      <div className="search" onClick={() => setModalPage({ target: 'SearchModal' })}>
        <img src={iconSearch} alt={'검색'} />
      </div>
    </div>
  );
};

export default Header;
