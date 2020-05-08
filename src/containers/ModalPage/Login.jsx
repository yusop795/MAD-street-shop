import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";


import AuthUtill from '../../util/AuthUtill'

import { userTypes, userApiTypes } from '../../reducers/userReducer';

// common components
import { ModalHeader } from '../../components/Header';
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
  const modalPage = useRef();

  const kakaoSignUp = (url) => {
    // 카카오 로그인
    KAKAO.Auth.login({
      success: (authObj) => {
        // 사용자 토큰 저장
        AuthUtill.setUserStore(authObj.access_token)
        dispatch({
          type: userTypes.SET_TOKEN,
          payload: {
            token: {
              accessToken: authObj.access_token,
              refreshToken: authObj.refresh_token
            }
          },
        })
        // 앱 로그인
        dispatch({
          type: userApiTypes.LOGIN,
        })
        // 카카오 회원 정보 조회
        KAKAO.API.request({
          url: '/v2/user/me',
          success: function (response) {
            dispatch({
              type: userTypes.SET_USER_INFO,
              payload: {
                userInfo: {
                  userId: response.id,
                }
              }
            })
          },
          fail: function (error) {
            console.log(error);
          }
        });
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
    console.log('Login', isUser)
    if (isUser) {
      history.push(`/home`)
    }
  }, [isUser]);

  return (
    <div ref={modalPage} className={`main login modalPage ${isOpen ? 'open' : ''}`}>
      <ModalHeader onEvent={onEvent} border={false} />
      <div className="loginBox">
        <img src={imgLogoTruck} alt="" />
        <p>매드스트릿샵의 모든 기능을<br />이용하시려면 <b>로그인</b>해주세요</p>
        <div className="kakaoBtn" onClick={() => kakaoSignUp()}>
          <img src={iconKakao} alt="" />
          <span>카카오톡으로 로그인</span>
        </div>
      </div>
      <div className="loginBox">
        <p>아직 매드스트릿샵의 회원이<br />아니신가요?</p>
        <div className="kakaoBtn" onClick={() => kakaoSignUp()}>
          <img src={iconKakao} alt="" />
          <span>카카오톡으로 회원가입</span>
        </div>
      </div>
      <p onClick={onEvent}>나중에 할래요</p>
    </div>
  );
};

export default withRouter(Login);
