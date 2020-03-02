import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const SignUp = () => {
  const dispatch = useDispatch();
  // 스토어 값 가져오기
  const shopList = useSelector(({ authReducer }) => authReducer.text, '');
  return <div>{shopList}</div>;
};

export default SignUp;
