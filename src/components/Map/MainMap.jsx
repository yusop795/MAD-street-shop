import React, { useState, useEffect } from 'react';
import scriptUtill from '../../util/scriptUtill';
import './style.scss';
import mapPinOn from '../../assets/imgs/mapPinOn.png';
import iconMapPin from '../../assets/imgs/iconMapPin.png';
import { SettingLocation } from '../../containers/ModalPage';

const kakaoMapScript = scriptUtill(`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&autoload=false&libraries=services`);

const MainMap = ({ location, shopList = [], containerId = null, onEvent, getGeocoder }) => {
  const [crruntLocation, setCrruntLocation] = useState(location);
  const [selectShop, setSelectShop] = useState(1);

  // const moveMap = (kakaoMap, map) => {
  //   // 중심 좌표나 확대 수준이 변경되면 발생
  //   kakaoMap.event.addListener(map, 'idle', () => {
  //     const latlng = map.getCenter();
  //     // setModal(false);
  //     // setLocation({ long: latlng.Ga, lat: latlng.Ha });
  //   });
  // };

  const moveMap = (kakaoMap, map, latlng) => {
    // 이동할 위도 경도 위치를 생성합니다 
    const moveLatLon = new kakaoMap.LatLng(latlng.Ga, latlng.Ha);
    // 지도 중심을 이동 시킵니다
    map.panTo(moveLatLon);
  }

  const clickMap = (kakaoMap, map) => {
    kakaoMap.event.addListener(map, 'click', () => {
      onEvent({
        target: 'ShopInfoModal',
      });
    });
  }

  const setAddress = (kakaoMap, map) => {
    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakaoMap.services.Geocoder();
    kakaoMap.event.addListener(map, 'click', (data) => {
      const latlng = data.latLng;
      // moveMap(kakaoMap, map, latlng)   
      geocoder.coord2Address(latlng.Ga, latlng.Ha, (result, status) => {

        if (result[0].road_address) {
          getGeocoder(result[0].road_address.address_name, { long: latlng.Ga, lat: latlng.Ha })
        } else {
          getGeocoder(result[0].address.address_name, { long: latlng.Ga, lat: latlng.Ha })
        }
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
      const src = selectShop === i+1 ? mapPinOn : iconMapPin;
      const image = createMarkerImage(kakaoMap, src);
      const marker = new kakaoMap.Marker({
        map,
        position: new kakaoMap.LatLng(shopList[i].location.latitude.$numberDecimal, shopList[i].location.longitude.$numberDecimal),
        title: shopList[i].name,
        image,
      });

      marker.setMap(map);

      // 마커 이벤트 등록
      kakaoMap.event.addListener(marker, 'click', () => {
        setSelectShop(i+1)
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

  const renderMap = () => {
    const container = document.getElementById(containerId);
    kakaoMapScript
      .then(() => {
        const kakaoMap = window.kakao.maps;
        kakaoMap.load(() => {
          // 지도 옵션
          const options = {
            center: new kakaoMap.LatLng(37.486450, 126.980934), // 지도의 중심좌표.
            level: 3, // 지도의 레벨(확대, 축소 정도)
          };
          // 지도 생성
          const map = new kakaoMap.Map(container, options);

          // 마커 생성
          const marker = new kakaoMap.Marker({
            map,
            position: new kakaoMap.LatLng(37.486450, 126.980934),
          });
          marker.setMap(map);

          // shop list 마커
          if (shopList.length > 0) {
            createShopsMarker(kakaoMap, map);
            // 마커 이벤트
            // moveMap(kakaoMap, map);
          }
          // if (onEvent) {
          //   clickMap(kakaoMap, map)
          // }

          // if (getGeocoder) {
          //   setAddress(kakaoMap, map)
          // }
          // 스핀 제거
          // setisSpin(false);
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (location) {
      renderMap();
    }
  });

  return <div id={containerId} className="mapBox"></div>;
};
export default MainMap;
