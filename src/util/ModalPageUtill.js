import { useState } from 'react';

const ModalPageUtill = () => {
  const [isModalOpen, setIsModalPageOpen] = useState(true);
  const [targetModalPage, setTargetModalPage] = useState(null);
  const [beforeTargetModalPage, setBeforeTargetModalPage] = useState('');

  const setModalPage = ({ target }) => {
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
      if (target !== 'ShopDetailModal') {
        setIsModalPageOpen(!isModalOpen);
      }
    }
  };

  return {
    targetModalPage,
    isModalOpen,
    setModalPage,
    beforeTargetModalPage
  };
};

export default ModalPageUtill;
