import { useState } from 'react';

const AlertUtil = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [title, setAlertTitle] = useState('');
  const [contents, setAlertContents] = useState('');

  const setAlert = ({ title = '', contents = '' }) => {
    if (!isShowing) {
      // 타이틀 설정
      setAlertTitle(title);
      // 내용 설정
      setAlertContents(contents);
    }
    // 모달 노출여부
    setIsShowing(!isShowing);
  };

  return {
    isShowing,
    title,
    contents,
    setAlert,
  };
};

export default AlertUtil;
