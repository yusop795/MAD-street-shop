import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from "react-router-dom";

const Home = () => {
  // console.log(4,process.env);
  const loading = useSelector(({ authReducer }) => authReducer.loading, true);
  return (
    // <div>{process.env.REACT_APP_API_KEY}</div>
    <>
    <div>{`Home: ${loading}`}</div>
    {/* <Redirect to='/signUp' /> */}
    <Link to="/signup/owner">사장님 가입</Link>
    <Link to="/signup/user">사용자 가입</Link>
    </>
  );
};

export default withRouter(Home);
