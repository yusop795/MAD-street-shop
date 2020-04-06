import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Test = () => {

  return (
    <div>
      <div><Link to="/home">홈</Link></div>
      <div><Link to="/signup/owner">사장님 가입</Link></div>
      <div><Link to="/signup/user">사용자 가입</Link></div>
      <div><Link to="/ranking">리스트 보기</Link></div>
      <div><Link to="/signup/account">계정 설정</Link></div>
      <div><Link to="/signup/complet/owner">가입 완료</Link></div>
      <div><Link to="/myPage">마이페이지</Link></div>
    </div>
  );
};

export default withRouter(Test);
