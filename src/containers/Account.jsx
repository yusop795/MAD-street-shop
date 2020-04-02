import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Header } from '../components/Header';
import { RoundButton } from '../components/Unit';

import '../assets/styles/containers/account.scss';

const Account = ({ history, match }) => {
  return (
    <div className="main account">
      <Header onEvent={history.goBack} />
      <h2 className="title">
        회원가입을 위한 <br />
        <b>가입 유형</b>
        {`을 선택해주세요`} <br />
      </h2>
      <div className="accountCard">
        <div className='icon'>🙋🏻‍♀️</div>
        <h3>일반회원</h3>
        <p>내주변의 스트릿푸드를<br/>찾고있어요</p>
        <RoundButton text={"선택"} onEvent={() => history.push('/signup/user')}/>
      </div>
      <div className="accountCard">
        <div className='icon'>🧑🏻‍🍳</div>
        <h3>사장님</h3>
        <p>스트릿푸드를 만들어<br/>판매하고 있어요</p>
        <RoundButton text={"선택"} onEvent={()=> history.push('/signup/owner')}/>
      </div>
    </div>
  );
};

export default withRouter(Account);
