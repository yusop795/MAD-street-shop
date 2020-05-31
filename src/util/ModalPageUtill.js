import { useState } from 'react';

const ModalPageUtill = () => {
  const [isModalOpen, setIsModalPageOpen] = useState(true);
  const [targetModalPage, setTargetModalPage] = useState(null);
  const [beforeTargetModalPage, setBeforeTargetModalPage] = useState('');

  const setModalPage = ({ target }) => {
    console.log(isModalOpen, target)
    if (beforeTargetModalPage === '') {
      setBeforeTargetModalPage(target);
    }
    if (beforeTargetModalPage !== target) {
      setTargetModalPage(target);
      setBeforeTargetModalPage(target);
      setIsModalPageOpen(true);
    } else {
      setTargetModalPage(target);
      setBeforeTargetModalPage('');
      setIsModalPageOpen(!isModalOpen);
    }
    // console.log('isModalOpen', isModalOpen);
    // console.log('target', target);
    // if (target) {
    //   setTargetModalPage(target);
    // }
    // setIsModalPageOpen(!isModalOpen);
  };

  return {
    targetModalPage,
    isModalOpen,
    setModalPage,
    beforeTargetModalPage
  };
};

export default ModalPageUtill;
