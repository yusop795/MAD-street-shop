import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userTypes, userApiTypes } from '../reducers/userReducer';
import AlertUtil from '../util/AlertUtil';
import ModalPageUtill from '../util/ModalPageUtill.js';
import { localStorageGet } from '../util/LocalStorage.js';

import { ModalHeader } from '../components/Header';
import { Alert } from '../components/Alert';

import { Login } from './ModalPage';

import imgProfile01 from '../assets/imgs/imgProfile01.png';
import imgProfile02 from '../assets/imgs/imgProfile02.png';
import imgProfile03 from '../assets/imgs/imgProfile03.png';
import iconDeclare from '../assets/imgs/iconDeclare.png';
import iconHeart from '../assets/imgs/iconHeart.png';
import iconSettings from '../assets/imgs/iconSettings.png';
import iconChevronRight from '../assets/imgs/iconChevronRight.png';
import more from '../assets/imgs/more.png';

import '../assets/styles/containers/myPage.scss';
import { useEffect } from 'react';

const MyPage = ({ history, match }) => {
  const dispatch = useDispatch();
  const token = useState(localStorageGet('MAD_KAKAO_ACCESS_TOKEN'));
  const userInfo = useSelector(state => state.userReducer.userInfo);
  const isUser = useSelector(state => state.userReducer.isUser);
  const userId = useSelector(state => state.userReducer.userId);
  const shopActive = useSelector(state => state.userReducer.shopActive);

  const kakaoLogout = () => {
    dispatch({
      type: userApiTypes.LOGOUT,
      payload: {
        token
      }
    })
  }

  const leave = () => {
    dispatch({
      type: userApiTypes.LEAVE,
      payload: { userId },
    })
  }

  const { targetModalPage, isModalOpen, setModalPage } = ModalPageUtill();

  const rederModalPage = () => {
    switch (targetModalPage) {
      case 'Login':
        return <Login isOpen={isModalOpen} onEvent={setModalPage} />;
      default:
        return null;
    }
  };
  // alert
  const { isShowing, title, contents, setAlert } = AlertUtil();
  return (
    <div className="main myPage">
      <ModalHeader onEvent={history.goBack} border={false} />
      {!isUser ?
        (
          <div className="userInfoBox">
            <img src={imgProfile03} className="userImg" alt="기본 프로필 이미지" />
            <p>
              <b onClick={() => {
                setModalPage({
                  target: 'Login',
                });
              }}>로그인</b>이 필요한 서비스입니다
          </p>
          </div>
        ) : (
          <>
            <div className="userInfoBox">
              {
                userInfo.kakao.profileLink ?
                  <img src={userInfo.kakao.profileLink.replace(':/', 's:/')} className="userImg" alt="기본 프로필 이미지" /> :
                  <img src={!userInfo.owner ? imgProfile01 : imgProfile02} className="userImg" alt="기본 프로필 이미지" />
              }
              <div className="userInfo">
                {!userInfo.owner ? <span>일반회원</span> : <span>사장님</span>}
                <p>{userInfo.kakao.nickname}</p>
              </div>
            </div>
            {userInfo.owner ? shopActive ? (
              <div className="banner bannerOpen"
                onClick={() => {
                  history.push('openShop/edit')
                }} />
            ) : (
                <div className="banner bannerClose"
                  onClick={() => {
                    history.push('openShop')
                  }} />
              ) : null}
            <div className={`menuList ${!userInfo.owner ? 'borderTop' : null}`}>
              {!userInfo.owner ? (
                <Link to='/myPage/user' className="menuItem">
                  <img src={iconSettings} alt="취향설정" />
                  <p>취향설정</p>
                </Link>
              ) : (
                  <Link to='/myPage/owner' className="menuItem">
                    <img src={iconSettings} alt="가게설정" />
                    <p>가게설정</p>
                  </Link>
                )}
              <Link to='/watchList' className="menuItem">
                <img src={iconHeart} alt="관심리스트" />
                <p>관심리스트</p>
              </Link>
              <div className="menuItem"
                onClick={() => {
                  setAlert({
                    contents: '준비 중인 기능입니다.'
                  })
                }}>
                <img src={iconDeclare} alt="신고리스트" />
                <p>신고리스트</p>
              </div>
            </div>
          </>
        )}
      {!isUser ? (
        <div className="banner"
          onClick={() => {
            setModalPage({
              target: 'Login',
            });
          }}>
        </div>
      ) : null}
      <ul className="settingList">
        <li className="settingItem">
          <Link to="/notice">
            공지사항<img src={iconChevronRight} alt="이동" />
          </Link>
        </li>
        <li className="settingItem border">
          <Link to="/faq">
            FAQ<img src={iconChevronRight} alt="이동" />
          </Link>
        </li>
        {isUser ?
          (<li className="settingItem" onClick={kakaoLogout}>
            <a>
              로그아웃<img src={iconChevronRight} alt="이동" />
            </a>
          </li>) : null}
      </ul>
      {isUser ? <p className="notice">매드스트릿샵을 탈퇴하려면 <b onClick={leave}>여기</b>를 눌러주세요.</p> : null}
      <Alert isShowing={isShowing} hide={setAlert} title={title} contents={contents} />
      {rederModalPage()}
    </div>
  );
};

export default withRouter(MyPage);
