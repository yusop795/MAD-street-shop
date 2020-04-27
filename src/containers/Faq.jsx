import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ModalHeader } from '../components/Header';
import { AccordionList } from "../components/List"; 

const Faq = ({ history }) => {
    const faqList = useSelector(state => state.startReducer.faq, []);
  return (
    <div className="main myPage">
      <ModalHeader onEvent={history.goBack} border={false} />
      <AccordionList items={faqList} listType="faq"/>
    </div>
  )
}

export default withRouter(Faq);