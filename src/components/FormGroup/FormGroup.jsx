import React from 'react';
import './style.scss';


const FormGroup = ({fullMode=false, outline=false, title='', children=null, info}) => {
  return (
    <div className={`formGroup ${(fullMode)?'fullMode':''}`}>
      <h2 className="formGroupTitle">{title}</h2>
      <div className={`formGroupList ${(outline)?'outline':''}`}>
        {children}
      </div>
      {info?<p>{info}</p>:null}
    </div>
  )
};

export default FormGroup;
