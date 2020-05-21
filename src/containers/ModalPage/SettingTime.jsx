import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userTypes } from '../../reducers/userReducer';

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

const SettingTime = ({ isOpen, onEvent }) => {
  const dispatch = useDispatch();
  const tagList = ['월', '화', '수', '목', '금', '토', '일']
  const storeOpenDays = useSelector(state => state.userReducer.storeOpenDays);
  const storeOpenTime = useSelector(state => state.userReducer.storeOpenTime);
  const storeCloseTime = useSelector(state => state.userReducer.storeCloseTime);
  const [selectTag, setSelectTag] = useState(storeOpenDays);
  const [openTime, setOpenTime] = useState(storeOpenTime, '01:00');
  const [closeTime, setCloseTime] = useState(storeCloseTime, '01:00');

  const modalPage = useRef();

  // 모달
  const { isShowing, title, contents, setAlert } = AlertUtil();

  const onChangeTag = (tag) => {
    if (!Object.keys(selectTag).includes(tag)) {
      const data = { ...selectTag, [tag]: true }
      setSelectTag(data)
    } else {
      delete selectTag[tag]
      setSelectTag({ ...selectTag })
    }
  }

  useEffect(() => {
    if (isOpen) {
      modalPage.current.style = 'transform: translateY(0)'
      modalPage.current.scrollTop = 0
    }
  }, [isOpen]);

  const setData = () => {
    dispatch({
      type: userTypes.SET_STORE_TIME,
      payload: {
        storeOpenDays: selectTag,
        storeOpenTime: openTime,
        storeCloseTime: closeTime,
      },
    })
    onEvent({ target: null })
  }

  return (
    <div ref={modalPage} className={`main settingTime modalPage ${isOpen ? 'open' : ''}`}>
      <ModalHeader onEvent={onEvent} title={'영업 시간 설정'} />
      <SelectTime
        title={'영업 시간'}
        setOpenTime={setOpenTime}
        setCloseTime={setCloseTime}
      />
      <InputTag
        title={'영업 요일'}
        item={tagList}
        selectTag={selectTag}
        onEvent={onChangeTag}
      />
      <Button
        active={Object.keys(selectTag).length >= 1}
        bottom={true}
        onEvent={setData}
        text={'저장'}
      />
      <Alert isShowing={isShowing} hide={setAlert} title={title} contents={contents} />
    </div>
  );
};

export default withRouter(SettingTime);
