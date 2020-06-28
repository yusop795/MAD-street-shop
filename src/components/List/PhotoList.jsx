import React from 'react';
import { Alert } from '../Alert';
import AlertUtil from '../../util/AlertUtil';
import './style.scss';

const PhotoList = ({ items = [] }) => {
  const { isShowing, title, contents, setAlert } = AlertUtil();

  const imgZoom = (v) => {
    setAlert({
      contents: v
    })
  }
  return (
    <div className="photoListBox">
      <div style={{ width: `${102 * items.length}px` }}>
        {items.map((v, i) => {
          return (
            <div className='imgBox' key={`imgBox-${i}`} style={{ backgroundImage: `url(${v})` }} onClick={() => { imgZoom(v) }} />
          )
        })}
      </div>
      <Alert isShowing={isShowing} hide={setAlert} title={title} contents={contents} type="img" />
    </div>
  );
};

export default PhotoList;
