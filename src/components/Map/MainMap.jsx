import React, { useState, useEffect, useRef } from 'react';
import scriptUtill from '../../util/scriptUtill';
import './style.scss';
import mapPinOn from '../../assets/imgs/mapPinOn.png';
import iconMapPin from '../../assets/imgs/iconMapPin.png';

console.log(process.env.REACT_APP_KAKAO_KEY)
const kakaoMapScript = scriptUtill(`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_KEY}&autoload=false`);

const MainMap = ({ location, shopList= [], isModal, setModal, setShop, onEvent }) => {
  const [isSpin, setisSpin] = useState(true);
  const [selectShop,setSelectShop] = useState(1);

  // const moveMap = (kakaoMap, map) => {
  //   // 중심 좌표나 확대 수준이 변경되면 발생
  //   kakaoMap.event.addListener(map, 'idle', () => {
  //     const latlng = map.getCenter();
  //     // setModal(false);
  //     // setLocation({ long: latlng.Ga, lat: latlng.Ha });
  //   });
  // };

  const clickMap = (kakaoMap, map) => {
    kakaoMap.event.addListener(map, 'click', () => {       
      console.log() 
      onEvent({
        target: 'ShopDetailModal',
      });
    });
  }

  const createMarkerImage = (kakaoMap, src) => {
    const size = new kakaoMap.Size(43, 50);
    const options = {
      spriteOrigin: new kakaoMap.Point(0, 0),    
      spriteSize: new kakaoMap.Size(43, 50)  
    }
    const markerImage = new kakaoMap.MarkerImage(src, size, options);
    return markerImage;            
  }

  const createShopsMarker = (kakaoMap, map) => {
    for (let i = 0; i < shopList.length; i++) {
      const src =  selectShop === i ? mapPinOn : iconMapPin;
      const image = createMarkerImage(kakaoMap, src);
      const marker = new kakaoMap.Marker({
        map,
        position: new kakaoMap.LatLng(shopList[i].latitude, shopList[i].longitude),
        title: shopList[i].name,
        image,
      });

      marker.setMap(map);

      // 마커 이벤트 등록
      kakaoMap.event.addListener(marker, 'click', () => {
        setSelectShop(i)
        onEvent({
          target: 'ShopDetailModal',
        });
        // if(marker.getZIndex() ===0){
        //   marker.setZIndex(1);
        // }else {
        //   marker.setZIndex(0);
        // }
      });
    }
  };

  const renderMap = containerId => {
    const container = document.getElementById(containerId);
    kakaoMapScript
      .then(() => {
        const kakaoMap = window.kakao.maps;
        kakaoMap.load(() => {
          // 지도 옵션
          const options = {
            center: new kakaoMap.LatLng(location.lat, location.long), // 지도의 중심좌표.
            level: 2, // 지도의 레벨(확대, 축소 정도)
          };
          // 지도 생성
          const map = new kakaoMap.Map(container, options);
          // 마커 생성
          const marker = new kakaoMap.Marker({
            map,
            position: new kakaoMap.LatLng(location.lat, location.long),
          });
          marker.setMap(map);
          
          // shop list 마커
          if(shopList.length > 0) {
            createShopsMarker(kakaoMap, map);
            // 마커 이벤트
            // moveMap(kakaoMap, map);
          }
          clickMap(kakaoMap, map)
          // 스핀 제거
          setisSpin(false);
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (location) {
      renderMap('mapBox');
    }
  });

  return <div id='mapBox'></div>;
};
export default MainMap;
