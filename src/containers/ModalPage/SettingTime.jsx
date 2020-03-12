import React, {useState} from 'react';
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

  // 모달
  const { isShowing, title, contents, setAlert} = AlertUtil();

  const onChangeTag = (v)=>{
    if(!selectTag.includes(v)){
      setSelectTag([...selectTag,v])
    }else {
      selectTag.splice(selectTag.indexOf(v),1)
      setSelectTag([...selectTag])
    }
  }

  

  return (
    <div className={`settingTime modalPage ${isOpen?'open':''}`}>
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
