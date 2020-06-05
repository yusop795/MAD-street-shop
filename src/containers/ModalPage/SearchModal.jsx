import React, { useState, useEffect, useRef, useCallback } from 'react';
import { withRouter } from "react-router-dom";
import { useSelector } from 'react-redux';
// style
import '../../assets/styles/containers/setting.scss';
import { isEmpty } from "../../util/gm";
import iconSearch from '../../assets/imgs/iconSearch.png';

import { localStorageSet, localStorageGet } from '../../util/LocalStorage.js';
import { useDispatch } from 'react-redux';
import { startTypes } from '../../reducers/startReducer';

import SearchResult from "../SearchResult";
import { id } from 'postcss-selector-parser';

const SearchModal = ({ history, isOpen, currentKeyword, onEvent }) => {
  const [keywordList, setKewordList] = useState(currentKeyword);
  const [location, setLocation] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enterKeyword, setKeyword] = useState('');
  const [searchedKeyword, setSearchedKeyword] = useState('');

  const dispatch = useDispatch();

  const modalPage = useRef();

  const onKeywordRemove = useCallback(keyword => {
    keywordList.splice(keywordList.indexOf(keyword), 1)
    setKewordList([...keywordList]);
    localStorageSet('MadShopCurrentKeyword', JSON.stringify(keywordList));
  }, [keywordList])

  const searchForKeyword = (keyword) => {
    // history.push(`/searchResult?keyword=${keyword}`)
    setLoading(true)
    setKeyword(keyword);
    setSearchedKeyword(keyword)
    setIsSearch(true);
    if (!isEmpty(location)) {
      dispatch({
        type: startTypes.FETCH_SHOP_LIST,
        payload: {
          type: "main",
          long: location.long,
          lat: location.lat,
          type: "main",
          active: false,
          range: 3000,
          search: keyword,
          name: "searchResult",
        }
      });
    }
    return setLoading(false);
  }
  // 위치정보 조회
  const fetchGeolocation = () => {
    const options = {
      enableHighAccuracy: true,
      maximumAge: 300000,
      timeout: 50000,
    };

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocation({ lat: coords.latitude, long: coords.longitude });
      },
      e => console.log(`Geolocation 오류 [${e.code}] : ${e.message}`),
      options,
    );
  };

  useEffect(() => {
    if (isOpen) {
      modalPage.current.style = 'transform: translateX(0)'
      modalPage.current.scrollTop = 0
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      modalPage.current.style = 'transform: translateX(0)'
      modalPage.current.scrollTop = 0
    }
  }, [keywordList]);

  useEffect(() => {
    if (navigator.geolocation) {
      fetchGeolocation();
    }
  }, []);

  const searchEvent = (keyword) => {
    searchForKeyword(keyword)
    setIsSearch(true);
  }

  const renderRightContent = () => {
    return isSearch === false ? (
      currentKeywordList()
    ) : (<div><SearchResult loading={loading} onEvent={onEvent} /></div>)
  }

  const currentKeywordList = () => {
    return isEmpty(keywordList) ? <div className="currentSearch"><div>최근검색어가 없습니다</div></div> : (
      <div className="currentSearch">
        <div>최근검색어</div>
        <ul>
          {
            keywordList.map((v, i) => {
              return (
                <li key={i}>
                  <button className="searchForKeyword" onClick={() => searchForKeyword(v)} type="button">{v}</button>
                  <button type="button" className="deleteKeyword" onClick={() => onKeywordRemove(v)}></button>
                </li>
              )
            })
          }
        </ul>
      </div>)
  }

  const addKeyPress = (e) => {
    if (e.target.value === searchedKeyword) return false;
    if (e.key === 'Enter') {
      const current_keyword = isEmpty(localStorageGet('MadShopCurrentKeyword')) ? [] : JSON.parse(localStorageGet('MadShopCurrentKeyword'));
      if (e.target.value !== "") {
        current_keyword.unshift(e.target.value);
        const set_keyword_arr = current_keyword.reduce((a, b) => {
          if (a.indexOf(b) < 0) a.push(b);
          return a;
        }, [])
        localStorageSet('MadShopCurrentKeyword', JSON.stringify(set_keyword_arr));
        searchEvent(e.target.value);
      }
    }
  }

  useEffect(() => {
    if (enterKeyword !== searchedKeyword && isSearch) {
      setIsSearch(false);
    }
  }, [enterKeyword])


  return (
    <div ref={modalPage} className={`searchModal modalPageRight ${isOpen ? 'open' : ''}`}>
      <div className="header modalHeader">
        <div className="headerWrapper">
          <div className="search">
            <img src={iconSearch} alt={'검색'} />
          </div>
          <div className="textBoxWrapper focusOn">
            <input type="text" placeholder={'검색어를 입력하세요'} value={enterKeyword} onChange={(e) => setKeyword(e.target.value)} onKeyPress={(e) => { addKeyPress(e) }} />
            <button type="button" className="deleteText" onClick={() => setKeyword('')}>입력 텍스트 삭제</button>
          </div>
          <div className="cancel" onClick={onEvent}>취소</div>
        </div>
      </div>
      {renderRightContent()}
    </div>
  );
};

export default withRouter(SearchModal);
