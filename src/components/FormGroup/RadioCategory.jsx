import React from 'react';
import { FormGroup, Radio } from '../FormGroup'
import './style.scss';

const RadioCategory = ({fullMode = false, title = '', item = [], selectCategory, setSelectCategory}) => {
  return (
    <FormGroup fullMode={fullMode} title={title}>
      <div className='radioBox'>
        {item.map((v,i)=>(
            <Radio 
              key={`category-${i+1}`}
              type={`category`}
              index={i} 
              data={v} 
              selectItem={selectCategory} 
              setSelectItem={setSelectCategory}
            />
        ))}
      </div>
    </FormGroup>
  )
};

export default RadioCategory;
