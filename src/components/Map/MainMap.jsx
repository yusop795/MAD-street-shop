import React, { useState, useEffect } from 'react';
import scriptUtill from '../../util/scriptUtill';
import './style.scss';
import mapPinOn from '../../assets/imgs/mapPinOn.png';
import adressEdit from '../../assets/imgs/adressEdit.png';

const kakaoMapScript = scriptUtill(`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&autoload=false&libraries=services`);

const MainMap = ({ location, shopList = [], containerId = null, onEvent, selectShopId, setSelectShopId, getGeocoder }) => {
  const [crrlocation, setCrrLocation] = useState({})

  useEffect(() => {
    if (location) {
      setCrrLocation(location)
    }
  }, [location]);

  useEffect(() => {
    if (crrlocation) {
      renderMap()
    }
  }, [crrlocation, selectShopId]);

  // useEffect(() => {
  //   if (shopList.length > 0) {
  //     createShopsMarker(kaka, maps);
  //   }
  // }, [selectShopId]);


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
    // const moveLatLon = new kakaoMap.LatLng(latlng.Ga, latlng.Ha);
    const moveLatLon = new kakaoMap.LatLng(latlng.Ha, latlng.Ga);
    setCrrLocation({ lat: latlng.Ha, long: latlng.Ga });

    // 지도 중심을 부드럽게 이동 시킵니다
    map.setCenter(moveLatLon);
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
    const coord = new kakaoMap.LatLng(crrlocation.long, crrlocation.lat);
    geocoder.coord2Address(coord.Ha, coord.Ga, (result, status) => {
      if (result[0].road_address) {
        getGeocoder(result[0].road_address.address_name)
      } else {
        getGeocoder(result[0].address.address_name)
      }
    });

    // 지도 클릭시 이벤트 추가
    kakaoMap.event.addListener(map, 'click', (data) => {
      const latlng = data.latLng;
      // moveMap(kakaoMap, map, latlng)
      geocoder.coord2Address(latlng.Ga, latlng.Ha, (result, status) => {
        if (result[0].road_address) {
          getGeocoder(result[0].road_address.address_name)
        } else {
          getGeocoder(result[0].address.address_name)
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
      const src = selectShopId === shopList[i]._id ? mapPinOn : adressEdit;
      const image = createMarkerImage(kakaoMap, src);
      const latitude = shopList[i].location.latitude.$numberDecimal
      const longitude = shopList[i].location.longitude.$numberDecimal
      const position = new kakaoMap.LatLng(latitude, longitude)
      const marker = new kakaoMap.Marker({
        map,
        position,
        title: shopList[i].name,
        image,
      });

      marker.setMap(map);

      // 마커 이벤트 등록
      kakaoMap.event.addListener(marker, 'click', () => {
        setSelectShopId(shopList[i]._id)
        moveMap(kakaoMap, map, position)
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
            center: new kakaoMap.LatLng(crrlocation.lat, crrlocation.long), // 지도의 중심좌표.
            level: 3, // 지도의 레벨(확대, 축소 정도)
          };
          // 지도 생성
          const map = new kakaoMap.Map(container, options);

          // 현재 내위치 마커 생성
          const marker = new kakaoMap.Marker({
            map,
            position: new kakaoMap.LatLng(crrlocation.lat, crrlocation.long),
          });
          marker.setMap(map);
          // shop list 마커
          if (shopList.length > 0) {
            createShopsMarker(kakaoMap, map);
          }

          if (onEvent) {
            clickMap(kakaoMap, map)
          }
          if (getGeocoder && Object.keys(crrlocation).length > 0) {
            setAddress(kakaoMap, map)
          }
          // 스핀 제거
          // setisSpin(false);
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  return <div id={containerId} className="mapBox"></div>;
};
export default MainMap;
