import React from 'react';
import { FormGroup } from '../FormGroup'
import './style.scss';

const InputTag = ({ fullMode = false, title = '', item = [], selectTag = [], onEvent }) => {
  return (
    <FormGroup fullMode={fullMode} title={title}>
      {item.map((v, i) => (
        <div
          className={`inputTagItem ${(Object.keys(selectTag).includes(v)) ? 'select' : ''}`}
          key={`inputTagItem-${i}`}
        >
          <label>
            <input
              type="checkbox"
              name="item"
              value={v.title}
              hidden={true}
              onChange={() => onEvent(v, i)}
            />
            <span>{v}</span>
          </label>
        </div>
      ))}
    </FormGroup>
  )
};

export default InputTag;


