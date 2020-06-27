import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import scriptUtill from '../../util/scriptUtill';
import './style.scss';
import mapPinOn from '../../assets/imgs/mapPinOn.png';
import mapPinOff from '../../assets/imgs/mapPinOff.png';
import mapMarker from '../../assets/imgs/mapMarker.png';
import { shopTypes } from '../../reducers/shopReducer'
// const kakaoMapScript = scriptUtill(`https://dapi.kakao.com/v2/maps/sdk.js?appkey=a2634b699ee1deee53b339a1835cca33&autoload=false&libraries=services`);

const MainMap = ({ location, shopList = [], containerId = null, onEvent, selectShopId, getGeocoder, setLocation }) => {
  const dispatch = useDispatch();
  const [crrlocation, setCrrLocation] = useState(location)
  const shopId = useSelector(state => state.shopReducer.selectShopId)
  const shopDetail = useSelector(state => state.shopReducer.shopDetail);
  const [Map, setMap] = useState(null)

  useEffect(() => {
  }, [location]);

  useEffect(() => {
    if (location) {
      setCrrLocation(location)
    }
    renderMap()
  }, []);

  useEffect(() => {
    if (Map) {
      const marker = renderMarker(mapMarker, { width: 50, height: 48 }, location)
      marker.setMap(Map);
      console.log(Map)
      if (onEvent) {

        clickMap(Map)
      }
    }
  }, [Map]);

  useEffect(() => {
    if (shopList.length > 0) {
      console.log(shopList)
      createShopsMarker();
    }
  }, [shopList]);

  // 지도 이동
  const moveMap = (latlng) => {
    // 이동할 위도 경도 위치를 생성합니다 
    // const moveLatLon = new kakaoMap.LatLng(latlng.Ga, latlng.Ha);
    const moveLatLon = new window.kakao.maps.LatLng(latlng.Ha, latlng.Ga);
    setCrrLocation({ lat: latlng.Ha, long: latlng.Ga });

    // 지도 중심을 이동
    Map.setCenter(moveLatLon);
  }

  const createMarkerImage = (src, sizeObj) => {
    const size = new window.kakao.maps.Size(sizeObj.width, sizeObj.height);
    const options = {
      spriteOrigin: new window.kakao.maps.Point(0, 0),
      spriteSize: new window.kakao.maps.Size(sizeObj.width, sizeObj.height)
    }
    const markerImage = new window.kakao.maps.MarkerImage(src, size, options);
    return markerImage;
  }

  const renderMarker = (src, sizeObj, location, event = false) => {
    const image = createMarkerImage(src, sizeObj);
    const position = new window.kakao.maps.LatLng(location.lat, location.long);
    const marker = new window.kakao.maps.Marker({
      Map,
      position,
      image,
    });
    return marker
  }

  const addEvent = (marker, data, location) => {
    // 마커 이벤트 등록
    window.kakao.maps.event.addListener(marker, 'click', () => {
      const position = new window.kakao.maps.LatLng(location.lat, location.long);
      moveMap(position)
      onEvent({
        target: 'ShopDetailModal',
      });

      if (shopId) {
        dispatch({
          type: shopTypes.SET_SELECT_SHOP_ID,
          payload: {
            selectShopId: data._id
          },
        });

        dispatch({
          type: shopTypes.SET_SHOP_DETAIL,
          payload: {
            shopDetail: data
          }
        });
      }
    });
  }


  const clickMap = (map) => {
    window.kakao.maps.event.addListener(map, 'click', () => {
      onEvent({
        target: null,
      });
      if (shopId) {
        dispatch({
          type: shopTypes.SET_SELECT_SHOP_ID,
          payload: {
            selectShopId: ''
          },
        });
      }
    });
  }

  // 가게 마커 생성
  const createShopsMarker = () => {
    for (let i = 0; i < shopList.length; i++) {
      const data = shopList[i];
      const src = data.now.active ? mapPinOn : mapPinOff;
      const sizeObj = selectShopId === data._id ? { width: 35, height: 42 } : { width: 23, height: 28 };
      const lat = (data.now.active) ? data.now.location.latitude.$numberDecimal : data.location.latitude.$numberDecimal
      const long = (data.now.active) ? data.now.location.longitude.$numberDecimal : data.location.longitude.$numberDecimal
      const marker = renderMarker(src, sizeObj, { lat, long })
      marker.setMap(Map);
      addEvent(marker, data, { lat, long })
    }
  };
  // 주소 설정
  const setAddress = () => {
    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new window.kakao.maps.services.Geocoder();
    if (containerId === 'homeMap') {
      const coord = new window.kakao.maps.LatLng(location.long, location.lat);
      geocoder.coord2Address(coord.Ha, coord.Ga, (result, status) => {
        if (result[0].road_address) {
          getGeocoder(result[0].road_address.address_name)
        } else {
          getGeocoder(result[0].address.address_name)
        }
      });
    }

    if (containerId === 'locationMap') {
      window.kakao.maps.event.addListener(Map, 'idle', (data) => {
        const latlng = Map.getCenter();
        geocoder.coord2Address(latlng.Ga, latlng.Ha, (result, status) => {
          if (result[0].road_address) {
            getGeocoder(result[0].road_address.address_name)
          } else {
            getGeocoder(result[0].address.address_name)
          }
        });

        if (setLocation) {
          setLocation({ lat: latlng.Ha, long: latlng.Ga })
        }
      });
    }
  }

  const renderMap = () => {
    const container = document.getElementById(containerId);
    const options = {
      center: new window.kakao.maps.LatLng(crrlocation.lat, crrlocation.long), // 지도의 중심좌표.
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };

    console.log(location, crrlocation)

    if (containerId !== 'locationMap' && shopId) {
      const latitude = (shopDetail.now.active) ? shopDetail.now.location.latitude.$numberDecimal : shopDetail.location.latitude.$numberDecimal
      const longitude = (shopDetail.now.active) ? shopDetail.now.location.longitude.$numberDecimal : shopDetail.location.longitude.$numberDecimal
      options.center = new window.kakao.maps.LatLng(latitude, longitude);
    }


    setMap(new window.kakao.maps.Map(container, options))

    if (getGeocoder && Object.keys(crrlocation).length > 0) {
      setAddress()
    }
  };




  return <div id={containerId} className="mapBox"></div>;
};
export default MainMap;
