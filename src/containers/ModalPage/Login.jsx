import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";


import AuthUtill from '../../util/AuthUtill'
import { localStorageSet } from '../../util/LocalStorage.js';

import { userTypes, userApiTypes } from '../../reducers/userReducer';

// common components
import { ModalHeader } from '../../components/Header';
import Spinner from "../../components/Unit/Spinner";
// style
import '../../assets/styles/containers/login.scss';
// img
import imgLogoTruck from '../../assets/imgs/imgLogoTruck.png';
import iconKakao from '../../assets/imgs/iconKakao.png';

const KAKAO = window.Kakao

const Login = ({ history, isOpen, onEvent }) => {
  const dispatch = useDispatch();
  const isUser = useSelector(state => state.userReducer.isUser, []);
  const isLogin = useSelector(state => state.userReducer.isLogin);
  const userId = useSelector(state => state.userReducer.userId);
  const userLoading = useSelector(state => state.userReducer.userLoading);
  const [type, setType] = useState('')
  const modalPage = useRef();

  const kakaoSignUp = (url) => {
    // 카카오 로그인
    KAKAO.Auth.login({
      throughTalk: false,
      success: (authObj) => {
        // 사용자 토큰 저장
        AuthUtill.setUserStore(authObj.access_token)
        localStorageSet('MAD_KAKAO_ACCESS_TOKEN', authObj.access_token);
        dispatch({
          type: userTypes.USER_LODING,
          payload: {
            userLoading: true
          }
        })
        // 앱 로그인
        dispatch({
          type: userApiTypes.LOGIN,
          payload: {
            token: authObj.access_token,
          }
        })
      },
      fail: (err) => {
        console.log(JSON.stringify(err))
      },
    })
  }

  useEffect(() => {
    if (isOpen) {
      modalPage.current.style = 'transform: translateY(0)'
      modalPage.current.scrollTop = 0
    }
  }, [isOpen]);

  useEffect(() => {
    if (!userLoading && isLogin && isUser) {
      history.push(`/home`)
      localStorageSet('MAD_USER_ID', userId);
    } else if (!userLoading && isLogin && !isUser) {
      history.push(`/signup/account`)
      localStorageSet('MAD_USER_ID', userId);
    }

  }, [userLoading]);

  return (
    <div ref={modalPage} className={`main login modalPage ${isOpen ? 'open' : ''}`}>
      <ModalHeader onEvent={onEvent} border={false} />
      <div className="loginBox">
        <img src={imgLogoTruck} alt="" />
        <p>매드스트릿샵의 모든 기능을<br />이용하시려면 <b>로그인</b>해주세요</p>
        <div className="kakaoBtn" onClick={() => {
          setType('login')
          kakaoSignUp()
        }}>
          <img src={iconKakao} alt="" />
          <span>카카오톡으로 로그인</span>
        </div>
      </div>
      <div className="loginBox">
        <p>아직 매드스트릿샵의 회원이<br />아니신가요?</p>
        <div className="kakaoBtn" onClick={() => {
          setType('signUP')
          kakaoSignUp()
        }}>
          <img src={iconKakao} alt="" />
          <span>카카오톡으로 회원가입</span>
        </div>
      </div>
      <p onClick={onEvent}>나중에 할래요</p>
      {userLoading ? <Spinner /> : null}
    </div >
  );
};

export default withRouter(Login);
