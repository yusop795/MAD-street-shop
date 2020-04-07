import React, { useEffect, useRef } from 'react';
import { withRouter } from "react-router-dom";

// common components
import { ModalHeader } from '../../components/Header';
// style
import '../../assets/styles/containers/login.scss';
// img
import imgLogoTruck from '../../assets/imgs/imgLogoTruck.png';
import iconKakao from '../../assets/imgs/iconKakao.png';


const Login = ({ isOpen, onEvent }) => {
  const modalPage = useRef();

  useEffect(() => {
    if(isOpen){
      modalPage.current.style = 'transform: translateY(0)'
      modalPage.current.scrollTop = 0
    }
  },[isOpen]);
  
  return (
    <div ref={modalPage} className={`main login modalPage ${isOpen ? 'open' : ''}`}>
      <ModalHeader onEvent={onEvent} border={false}/>
      <div className="loginBox">
        <img src={imgLogoTruck} alt=""/>
        <p>매드스트릿샵의 모든 기능을<br/>이용하시려면 <b>로그인</b>해주세요</p>
        <div className="kakaoBtn">
          <img src={iconKakao} alt=""/>
          <span>카카오톡으로 로그인</span>
        </div>
      </div>
      <div className="loginBox">
        <p>아직 매드스트릿샵의 회원이<br/>아니신가요?</p>
        <div className="kakaoBtn">
          <img src={iconKakao} alt=""/>
          <span>카카오톡으로 회원가입</span>
        </div>
      </div>
      <p onClick={onEvent}>나중에 할래요</p>
    </div>
  );
};

export default withRouter(Login);
