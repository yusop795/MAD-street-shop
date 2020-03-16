import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from "react-router-dom";
// utill
import AlertUtil from '../../util/AlertUtil.js';
// common components
import { ModalHeader } from '../../components/Header';
import { Alert } from '../../components/Alert';
// components
import { SelectTime, InputTag } from '../../components/FormGroup';
import { Button } from '../../components/Unit';
// style
import '../../assets/styles/containers/setting.scss';

const SettingTime = ({isOpen, onEvent}) => {
  const tagList = ['월','화','수','목','금','토','일']
  const [selectTag, setSelectTag] = useState([]);

  const modalPage = useRef();

  // 모달
  const { isShowing, title, contents, setAlert} = AlertUtil();

  const onChangeTag = (tag)=>{
    if(!selectTag.includes(tag)){
      setSelectTag([...selectTag,tag])
    }else {
      selectTag.splice(selectTag.indexOf(tag),1)
      setSelectTag([...selectTag])
    }
  }

  useEffect(() => {
    if(isOpen){
      console.log(modalPage)
      modalPage.current.style = 'transform: translateY(0)'
      modalPage.current.scrollTop = 0
    }
  },[isOpen]);

  

  return (
    <div ref={modalPage} className={`settingTime modalPage ${isOpen?'open':''}`}>
      <ModalHeader goBack={onEvent} title={'영업 시간 설정'}/>
      <SelectTime         
        title={'영업 시간'} 
      />
      <InputTag 
        title={'영업 요일'} 
        item={tagList}
        selectTag={selectTag}
        onEvent={onChangeTag}
      />
      <Button 
        active={selectTag.length >= 1} 
        bottom={true} 
        onEvent={()=>{alert(1)}} 
        text={'저장'}
      />
      <Alert isShowing={isShowing} hide={setAlert} title={title} contents={contents}/>
    </div>
  );
};

export default withRouter(SettingTime);
