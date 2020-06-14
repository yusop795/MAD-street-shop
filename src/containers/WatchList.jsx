import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { userApiTypes, userTypes } from '../reducers/userReducer';


import { localStorageGet } from '../util/LocalStorage';

import { Header } from '../components/Header';
import Spinner from "../components/Unit/Spinner";
import { NoDataBox } from "../components/Unit";

import { ShopList } from '../components/List';

import '../assets/styles/containers/favorite.scss';

import ModalPageUtill from '../util/ModalPageUtill.js';

const WatchList = ({ history }) => {
  const dispatch = useDispatch();
  const [token] = useState(localStorageGet('MAD_KAKAO_ACCESS_TOKEN'))
  const [userId] = useState(localStorageGet('MAD_USER_ID'))
  const location = useSelector(state => state.startReducer.location, {})
  const favoritesList = useSelector(state => state.userReducer.favoritesList, [])
  const userLoading = useSelector(state => state.userReducer.userLoading)


  const { targetModalPage, isModalOpen, setModalPage } = ModalPageUtill();

  useEffect(() => {
    dispatch({
      type: userTypes.USER_LODING,
      payload: {
        userLoading: true
      }
    })

    dispatch({
      type: userApiTypes.FETCH_FAVORITE_LIST,
      payload: {
        token,
        userId,
        location
      }
    });
  }, []);



  console.log('djdjasdgjhasdjghsdjkghwelug', favoritesList);
  return (
    <div className="main ranking">
      <Header title="관심리스트" onEvent={history.goBack} />
      <ShopList items={favoritesList} type="watchList" history={history} onEvent={setModalPage} />
      {userLoading ? <Spinner /> : null}
    </div>
  );
};

export default withRouter(WatchList);
