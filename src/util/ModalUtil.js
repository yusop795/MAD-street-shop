import { useState } from 'react';

const ModalUtil = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [title, setModalTitle] = useState('');
  const [contents, setModalContents] = useState('');

  const setModal = ({ title, contents }) => {
    if (!isShowing) {
      // 타이틀 설정
      setModalTitle(title);
      // 내용 설정
      setModalContents(contents);
    }
    // 모달 노출여부
    setIsShowing(!isShowing);
  };

  return {
    isShowing,
    title,
    contents,
    setModal,
  };
};

export default ModalUtil;
