import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { shopTypes } from '../reducers/shopReducer';
import { withRouter } from 'react-router-dom';
import { MainMap } from '../components/Map';
import { Button } from '../components/Unit';
import { SettingTime, SettingLocation } from './ModalPage';
import ModalPageUtill from '../util/ModalPageUtill';
import Spinner from "../components/Unit/Spinner";
import '../assets/styles/containers/openShop.scss';

const OpenShop = ({ history, match }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState(true)
  const userId = useSelector(state => state.userReducer.userId, shallowEqual);
  const shopId = useSelector(state => state.userReducer.shopId, shallowEqual);
  const storeLocation = useSelector(state => state.userReducer.storeLocation, shallowEqual);
  const storeOpenTime = useSelector(state => state.userReducer.storeOpenTime, shallowEqual);
  const storeCloseTime = useSelector(state => state.userReducer.storeCloseTime, shallowEqual);
  const shopLoding = useSelector(state => state.shopReducer.shopLoding, shallowEqual);

  const { targetModalPage, isModalOpen, setModalPage } = ModalPageUtill();

  const renderTimes = () => {
    const openTime = `${storeOpenTime[0]}:${(+storeOpenTime[1] < 10) ? `0${+storeOpenTime[1]}` : storeOpenTime[1]}`
    const closeTime = `${storeCloseTime[0]}:${(+storeCloseTime[1] < 10) ? `0${+storeCloseTime[1]}` : storeCloseTime[1]}`
    return {
      openTime,
      closeTime,
      text: `${openTime} ~ ${closeTime}`
    }
  }

  const rederModalPage = () => {
    switch (targetModalPage) {
      case 'SettingTime':
        return <SettingTime type={'openShop'} isOpen={isModalOpen} onEvent={setModalPage} />;
      case 'SettingLocation':
        return <SettingLocation type={'openShop'} isOpen={isModalOpen} onEvent={setModalPage} />;
      default:
        return null;
    }
  };

  const openShop = () => {
    const { openTime, closeTime } = renderTimes()
    setState(false)
    dispatch({
      type: shopTypes.SET_SHOP_LOADING,
      payload: {
        shopLoding: true,
      },
    })
    dispatch({
      type: shopTypes.POST_SHOP_OPEN,
      payload: {
        shopId,
        userId,
        openTime,
        closeTime,
        subLocation: storeLocation.address,
        latitude: storeLocation.location.lat,
        longitude: storeLocation.location.long,
        locationComment: storeLocation.locationComment,
      },
    })
  }

  const closeShop = () => {
    setState(false)
    dispatch({
      type: shopTypes.SET_SHOP_LOADING,
      payload: {
        shopLoding: true,
      },
    })
    dispatch({
      type: shopTypes.DELETE_SHOP_CLOSE,
      payload: {
        shopId,
        userId,
      },
    })
  }

  useEffect(() => {
    if (!state && !shopLoding) {
      console.log(123)
      history.push('/home')
    }
  }, [shopLoding]);

  return (
    <div className="main openShop">
      <h2 className="title">
        안녕하세요, <br />
        <b>오늘의 영업정보</b>를<br />
        확인해주세요🙂<br />
      </h2>
      <div className="openShopMapBox">
        <MainMap
          location={storeLocation.location}
          containerId={'openShopMap'}
        />
      </div>
      <div className="openShopInfo">
        <h3>오늘 영업 위치</h3>
        <p>
          {storeLocation.address}<br />
          <span>{storeLocation.locationComment ? `(${storeLocation.locationComment})` : null}</span>
        </p>
        <Button fullmode={true} text="수정" onEvent={() => setModalPage({ target: 'SettingLocation' })} />
      </div>
      <div className="openShopInfo">
        <h3>오늘 영업 시간</h3>
        <p> {renderTimes().text}</p>
        <Button fullmode={true} text="수정" onEvent={() => setModalPage({ target: 'SettingTime' })} />
      </div>
      {match.path === '/openShop/edit' ? (
        <div className="btnBox">
          <Button fullmode={true} text="확인" onEvent={history.goBack} />
          <Button fullmode={true} text="영업종료" onEvent={closeShop} />
        </div>
      ) : (
          <>
            <p className="infoTxt">※ 오늘의 영업정보는 <b>마이페이지>오늘의 영업정보</b>에서 수정가능합니다. </p>
            <div className="btnBox">
              <Button fullmode={true} text="영업시작" onEvent={openShop} />
              <Button fullmode={true} text="나중에 확인" onEvent={() => history.push('home')} />
            </div>
          </>
        )}
      {rederModalPage()}
      {shopLoding ? <Spinner /> : null}
    </div>
  )
}

export default withRouter(OpenShop);