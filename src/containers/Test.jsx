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
      <div><Link to="/account">가입</Link></div>

      <div className="iconBox">
        <span role="img" aria-label="1">🍢</span>
        <span role="img" aria-label="2">🥪</span>
        <span role="img" aria-label="3">🍩</span>
        <span role="img" aria-label="4">🍤</span>
        <span role="img" aria-label="5">🌭</span>
        <span role="img" aria-label="6">🐙</span>
      </div>
    </div>
  );
};

export default withRouter(Test);
