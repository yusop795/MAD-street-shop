import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// common components
// style
import '../assets/styles/containers/setting.scss';
import { ShopList } from '../components/List';
import '../assets/styles/containers/favorite.scss';
import { isEmpty } from "../util/gm";

import Spinner from "../components/Unit/Spinner";
const SearchResult = ({ onEvent }) => {
  const [location, setLocation] = useState('');
  const [childLoading, setChildLoading] = useState(true);

  const getResult = useSelector(state => state.startReducer.searchResult, '');

  // 위치정보 조회
  const fetchGeolocation = () => {
    const options = {
      enableHighAccuracy: true,
      maximumAge: 300000,
      timeout: 50000,
    };

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        console.log('SearchModal coords', coords);
        setLocation({ lat: coords.latitude, long: coords.longitude });
        // return { lat: coords.latitude, long: coords.longitude };

      },
      e => console.log(`Geolocation 오류 [${e.code}] : ${e.message}`),
      options,
    );

    console.log('fetchGeolocation');
  };


  useEffect(() => {
    if (navigator.geolocation) {
      fetchGeolocation();
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(getResult)) {
      setChildLoading(false);
    }
  }, [getResult]);

  console.log('searchResult >>>', onEvent);
  return (
    <div className="searchResult">
      <div className="resultInfo">내 주변 <strong>3km</strong> 이내의 검색 결과입니다</div>
      {
        childLoading ? (
          <Spinner />
        ) : getResult === "No Content" ? (
          <div className="resultWrapper">
            <div className="resultCounts">검색결과 <strong>0</strong></div>
            <div className="shopListWrapper noData">검색 결과 없음</div>
          </div>) : (<div className="resultWrapper">
            <div className="resultCounts">검색결과 <strong>{getResult.length}</strong></div>
            <ShopList items={getResult} type="serchResult" onEvent={onEvent} />
          </div>)
      }
    </div>
  );
};

export default SearchResult;
