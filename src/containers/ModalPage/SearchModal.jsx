import React, { useEffect, useRef } from 'react';
import { withRouter } from "react-router-dom";
// common components
import { ModalHeader } from '../../components/Header';
// style
import '../../assets/styles/containers/setting.scss';

const SearchModal = ({ isOpen, onEvent }) => {

    const modalPage = useRef();
    useEffect(() => {
        if (isOpen) {
            console.log(modalPage)
            modalPage.current.style = 'transform: translateX(0)'
            modalPage.current.scrollTop = 0
        }
    }, [isOpen]);



    return (
        <div ref={modalPage} className={`main searchModal modalPage ${isOpen ? 'open' : ''}`}>
            <ModalHeader onEvent={onEvent} />
            검색하기 페이지
        </div>
    );
};

export default withRouter(SearchModal);
