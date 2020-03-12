import { useState } from 'react';

const ModalPageUtill = () => {
  const [isModalOpen, setIsModalPageOpen] = useState(false);
  const [targetModalPage, setTargetModalPage] = useState(null);

  const setModalPage = ({ target }) => {
    console.log(target);
    if (target) {
      setTargetModalPage(target);
    }
    setIsModalPageOpen(!isModalOpen);
  };

  return {
    targetModalPage,
    isModalOpen,
    setModalPage,
  };
};

export default ModalPageUtill;
