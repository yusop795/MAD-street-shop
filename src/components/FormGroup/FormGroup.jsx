import React from 'react';
import './style.scss';


const FormGroup = ({fullMode=false, outline=false, title='', subTittle='', children=null, info}) => {
  return (
    <div className={`formGroup ${(fullMode)?'fullMode':''}`}>
      {title? <h2 className="formGroupTitle">{title}<span>{subTittle}</span></h2> : null}
      <div className={`formGroupList ${(outline)?'outline':''}`}>
        {children}
      </div>
      {info?<p className="infoTxt" dangerouslySetInnerHTML={{__html: info}} />:null}
    </div>
  )
};

export default FormGroup;
