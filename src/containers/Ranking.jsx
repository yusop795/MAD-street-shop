import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { startTypes } from '../reducers/startReducer';


import ModalPageUtill from '../util/ModalPageUtill.js';

import { Header } from '../components/Header';
import { SettingCategory, SettingTime } from './ModalPage';

import '../assets/styles/containers/favorite.scss';
import { ShopList } from '../components/List';

const Ranking = ({ history }) => {

  // const loading = useSelector(({ authReducer }) => authReducer.loading, true);

  const { targetModalPage, isModalOpen, setModalPage } = ModalPageUtill();
  const dispatch = useDispatch();
  const storeShopList = useSelector(state => state.startReducer.rank, {});

  useEffect(() => {
    console.log('userEffect', storeShopList);
    dispatch({
      type: startTypes.FETCH_SHOP_LIST,
      payload: {
        type: "rank",
      }
    });
  }, []);

  const rederModalPage = () => {
    switch (targetModalPage) {
      case 'SettingCategory':
        return <SettingCategory isOpen={isModalOpen} onEvent={setModalPage} />;
      case 'SettingTime':
        return <SettingTime isOpen={isModalOpen} onEvent={setModalPage} />;
      default:
        return null;
    }
  };

  return (
    <div className="main ranking">
      <Header title="내주변 랭킹" onEvent={history.goBack} />
      <ShopList items={storeShopList} type="rank" />
      {rederModalPage()}
    </div>
  );
};

export default withRouter(Ranking);
