import React, { useState, useEffect } from 'react';
import { FormGroup } from '../FormGroup'
import './style.scss';

const SelectTime = ({ fullMode = false, title = '', setOpenTime = null, setCloseTime = null, openTime, closeTime }) => {
  const min = [0, 10, 20, 30, 40, 50]
  const [open, setOpen] = useState({ hour: openTime[0], min: openTime[1] });
  const [close, setClose] = useState({ hour: closeTime[0], min: closeTime[1] });

  const renderHourOption = () => {
    const hour = 24
    const option = []
    for (let i = 1; i <= hour; i++) {
      option[i] = <option value={i} key={`hour-${i}`}>{(i < 10) ? `0${i}` : i}</option>
    }
    return option;
  }


  useEffect(() => {
    if (setOpenTime) setOpenTime([open.hour, open.min])

    setCloseTime([close.hour, close.min])
  }, [open, close]);

  return (
    <FormGroup fullMode={fullMode} title={title}>
      <div>
        <div className="selectTimeBox">
          {setOpenTime ? (<>
            <label>여는 시간</label>
            <select
              defaultValue={open.hour}
              onChange={({ target }) => {
                setOpen({ hour: +target.value, min: open.min })
              }}>
              {renderHourOption()}
            </select>
            <select
              defaultValue={open.min}
              onChange={({ target }) => {
                setOpen({ hour: open.hour, min: +target.value })
              }}>
              {
                min.map((v, i) => {
                  return <option value={v} key={`min-${i}`} defaultValue={open.min === v}>{(v < 10) ? `0${v}` : v}</option>
                })
              }
            </select>
          </>) : null}
        </div>
        <div className="selectTimeBox">
          <label>닫는 시간</label>
          <select
            defaultValue={close.hour}
            onChange={({ target }) => {
              setClose({ hour: +target.value, min: close.min })
            }}>
            {renderHourOption()}
          </select>
          <select
            defaultValue={close.min}
            onChange={({ target }) => {
              setClose({ hour: close.hour, min: +target.value })
            }}>
            {
              min.map((v, i) => {
                return <option value={v} key={`min-${i}`} defaultValue={close.min === v}>{(v < 10) ? `0${v}` : v}</option>
              })
            }
          </select>
        </div>
      </div>
    </FormGroup>
  )
};

export default SelectTime;
