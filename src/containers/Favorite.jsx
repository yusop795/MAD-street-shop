import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AlertUtil from '../util/AlertUtil.js';
import ModalPageUtill from '../util/ModalPageUtill.js';

import { Header } from '../components/Header';
import { SettingCategory, SettingTime } from './ModalPage';

import '../assets/styles/containers/favorite.scss';
import { PhotoList } from '../components/List';

const Favorite = ({ history }) => {
  // 스토어 값 가져오기
  // const loading = useSelector(({ authReducer }) => authReducer.loading, true);
  // 모달
  const { isShowing, title, contents, setAlert } = AlertUtil();
  const { targetModalPage, isModalOpen, setModalPage } = ModalPageUtill();

  const storeCategory = useSelector(
    state => state.userReducer.storeCategory,
    {},
  );

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
    <div className="signUp">
      <Header title="관심리스트" goBack={history.goBack} />
      <button
        type="button"
        onClick={() => {
          setModalPage({
            target: 'SettingCategory',
          });
        }}
      >
        모달 테스트
      </button>
      <PhotoList />

      {rederModalPage()}
    </div>
  );
};

export default withRouter(Favorite);
