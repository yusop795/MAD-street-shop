import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Test = () => {

  return (
    // <div>{process.env.REACT_APP_API_KEY}</div>
    <div>
      <div><Link to="/home">홈</Link></div>
      <div><Link to="/signup/owner">사장님 가입</Link></div>
      <div><Link to="/signup/user">사용자 가입</Link></div>
      <div><Link to="/ranking">리스트 보기</Link></div>

      <div className="iconBox">
        <span>🍢</span>
        <span>🥪</span>
        <span>🍩</span>
        <span>🍤</span>
        <span>🌭</span>
        <span>🐙</span>
      </div>
    </div>
  );
};

export default withRouter(Test);
