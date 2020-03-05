import React from 'react';
import './style.scss';


const FormGroup = ({fullMode, title, children}) => {
  return (
    <div className={`formGroup ${(fullMode)?'fullMode':''}`}>
      <h2 className="formGroupTitle">{title}</h2>
      <ul className="formGroupList">
        {children}
      </ul>
    </div>
  )
};

export default FormGroup;
