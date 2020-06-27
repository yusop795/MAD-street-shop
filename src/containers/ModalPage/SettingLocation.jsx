import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { userTypes } from '../../reducers/userReducer';
import { startTypes } from '../../reducers/startReducer';

// components
import { ModalHeader } from '../../components/Header';
import { Button } from '../../components/Unit';
import { InputText } from '../../components/FormGroup';

import { MainMap } from '../../components/Map';
// style
import '../../assets/styles/containers/setting.scss';
import btnHere from '../../assets/imgs/btnHere.png';
import mapMarker from '../../assets/imgs/mapMarker.png';

const SettingLocation = ({ isOpen, onEvent, type, addressText = '' }) => {
  const dispatch = useDispatch();
  const location = useSelector(state => state.startReducer.location)
  const storeLocation = useSelector(state => state.userReducer.storeLocation)
  const [crrlocation, setCrrLocation] = useState(type === 'home' ? location : storeLocation.location)
  const [address, setAddress] = useState(addressText);
  const [locationComment, setLocationComment] = useState('');
  const modalPage = useRef();

  // 위치정보 조회
  const fetchGeolocation = () => {
    const options = {
      enableHighAccuracy: true,
      maximumAge: 300000,
      timeout: 50000,
    };

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        dispatch({
          type: startTypes.SET_LOCATION,
          payload: {
            location: { lat: coords.latitude, long: coords.longitude }
          }
        })
      },
      e => console.log(`Geolocation 오류 [${e.code}] : ${e.message}`),
      options,
    );
  };

  useEffect(() => {
    if (type === 'edit' || type === 'openShop') {
      setCrrLocation(storeLocation.location)
      setAddress(storeLocation.address)
      setLocationComment(storeLocation.locationComment)
    } else {
      setCrrLocation(location)
    }
  }, [location, storeLocation]);

  useEffect(() => {
    if (isOpen) {
      modalPage.current.style = 'transform: translateY(0)'
      modalPage.current.scrollTop = 0
    }
  }, [isOpen]);

  // 도로명 주소 가져오기
  const getGeocoder = (address) => {
    setAddress(address)
  }

  const setText = (e) => {
    setLocationComment(e.target.value)
  }

  const setData = () => {
    if (type === 'home') {
      // 현재위치 설정
      onEvent({ target: 'SettingLocation' })
      dispatch({
        type: startTypes.SET_LOCATION,
        payload: {
          location: crrlocation,
        }
      })
    } else {
      dispatch({
        // 가게 위치 설정
        type: userTypes.SET_STORE_LOCATION,
        payload: {
          storeLocation: {
            address,
            locationComment,
            location: crrlocation,
          }
        },
      })
      onEvent({ target: 'SettingLocation' })
    }
  }

  return (
    <div ref={modalPage} className={`main settingLocation modalPage ${isOpen ? 'open' : ''}`}>
      <ModalHeader onEvent={onEvent} title={'위치 설정'} />
      <MainMap
        location={crrlocation}
        containerId={'locationMap'}
        getGeocoder={getGeocoder}
        setLocation={setCrrLocation}
      />
      <div className="locationBox">
        <div className="loactionBtn" onClick={fetchGeolocation}>
          <img src={btnHere} alt="현재위치" />
        </div>
        <p className="location" style={type === 'home' ? { marginBottom: 20 } : null}>{address}</p>
        {type !== 'home' ? (<InputText placeholder={'상세주소 입력 (예 : OO빌딩 앞, OO아파트 단지 내)'} defaultValue={locationComment} onEvent={setText} />) : null}
        <Button fullmode={true} text={'선택한 위치로 설정'} onEvent={setData} />
      </div>
      <img className="marker" src={mapMarker} />
    </div>
  );
};

export default SettingLocation;
