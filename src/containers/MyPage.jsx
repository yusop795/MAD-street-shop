import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import AlertUtil from '../util/AlertUtil.js';
import ModalPageUtill from '../util/ModalPageUtill.js';

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

const MyPage = ({ history, match }) => {
  const type = 'user';
  const isLogin = false;

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
  const { isShowing, title, contents, setAlert} = AlertUtil();

  return (
    <div className="main myPage">
      <ModalHeader onEvent={history.goBack} border={false}/>
      {!isLogin ? 
      (
        <div className="userInfoBox">
          <img src={imgProfile03} className="userImg" alt="기본 프로필 이미지"/>
          <p>
            <b onClick={()=>{
               setModalPage({
                target: 'Login',
              });
            }}>로그인</b>이 필요한 서비스입니다
          </p>
        </div>
      ):(
        <>
          <div className="userInfoBox">
            <img src={type ==='user'?imgProfile01:imgProfile02} className="userImg" alt="기본 프로필 이미지"/>
            <div className="userInfo">
              {type ==='user'? <span>일반회원</span> : <span>사장님</span>}
              <p>김키모</p>
            </div>
          </div>
          <div className="menuList">
            <div className="menuItem">
              <img src={iconSettings} alt="취향설정"/>
              <p>취향설정</p>
            </div>
            <div className="menuItem">
              <img src={iconHeart} alt="관심리스트"/>
              <p>관심리스트</p>
            </div>
            <div className="menuItem" 
              onClick={()=>{
              setAlert({
                contents:'준비 중인 기능입니다.'
              })
            }}>
              <img src={iconDeclare} alt="신고리스트"/>
              <p>신고리스트</p>
            </div>
          </div>
        </>
      )}
      <div className="banner">
        <p>
          <span>스트릿푸드를 판매하고 계신가요?</span>
          지금 매장을 등록해보세요!
        </p>
        <img src={more} alt="더보기"/>
      </div>
      <ul className="settingList">
        <li className="settingItem">공지사항<img src={iconChevronRight} alt="이동"/></li>
        <li className="settingItem border">FAQ<img src={iconChevronRight} alt="이동"/></li>
        <li className="settingItem">로그아웃<img src={iconChevronRight} alt="이동"/></li>
      </ul>
      <p className="notice">매드스트릿샵을 탈퇴하려면 <b>여기</b>를 눌러주세요.</p>
      <Alert isShowing={isShowing} hide={setAlert} title={title} contents={contents}/>
      {rederModalPage()}
    </div>
  );
};

export default withRouter(MyPage);
