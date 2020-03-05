import React from 'react';
// import { useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";


import ModalUtil from '../util/ModalUtil.js';
import { Modal } from '../components/Modal';
import { Header } from '../components/Header';
import '../assets/styles/containers/signUp.scss';

const SignUp = ({history, match}) => {
  // 스토어 값 가져오기
  // const loading = useSelector(({ authReducer }) => authReducer.loading, true);
  // 모달
  const { isShowing, title, contents, setModal} = ModalUtil();

  return (
    <div className="signUp">
      <Header goBack={history.goBack}/>
      <h2 className="title" onClick={()=>{
        setModal({
          contents:'대표메뉴는 최대 3개까지만<br/> 선택할 수 있어요.1'
        })
      }}>
        {`안녕하세요`} <br/>
        <b>{(match.params.type === 'owner')?`사장님 계정`:`사용자 계정`}</b>
        {`으로 매드스트릿샵`} <br/>
        {`회원가입을 진행합니다`} <br/>
      </h2>
      <Modal isShowing={isShowing} hide={setModal} title={title} contents={contents}/>
    </div>
  );
};

export default withRouter(SignUp);
