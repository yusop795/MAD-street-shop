import React from 'react';
import './style.scss';


const FormGroup = ({fullMode = false, title = '', children = null}) => {
  return (
    <div className={`formGroup ${(fullMode)?'fullMode':''}`}>
      <h2 className="formGroupTitle">{title}</h2>
      <div className="formGroupList">
        {children}
      </div>
    </div>
  )
};

export default FormGroup;
