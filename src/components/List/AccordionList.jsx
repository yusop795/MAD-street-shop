import React, { useState, useEffect } from 'react';
import './style.scss';

import chevronUp from '../../assets/imgs/chevronUp.png';
import chevronDown from '../../assets/imgs/chevronDown.png';

import { toHtml } from "../../util/gm";

const AccordionList = ({ items = [], listType = '' }) => {
  return (
    <div className="accordionMenu">
      {
        items.map((v, i) => {
          return <AccordionItem key={i} data={v} type={listType} />
        })
      }
    </div>
  );
};

export const AccordionItem = ({ data = {}, type = '', onEvent = null }) => {
  const [isOpen, setIsOpen] = useState(false);

  const clickAccordion = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div className="accordionItem">
      <div className={`subject ${type}`}
        onClick={() => clickAccordion()}
      >{data.title}<img src={isOpen ? chevronUp : chevronDown} /></div>
      <div className={`desc ${isOpen ? "on" : ""}`} dangerouslySetInnerHTML={toHtml(data.contents)}></div>
    </div>
  );
}

export default AccordionList;
