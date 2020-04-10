import React, {useState, useEffect} from 'react';
import { FormGroup } from '../FormGroup'
import './style.scss';

const SelectTime = ({fullMode = false, title = '', setOpenTime=null, setCloseTime=null}) => {
  const min = [0,10,20,30,40,50]
  const [open, setOpen] = useState({hour:0,min:0});
  const [close, setClose] = useState({hour:0,min:0});

  const renderHourOption = ()=>{
    const hour = 24
    const option = []
    for (let i = 1; i <= hour; i++) {
      option[i] = <option value={`${i}`} key={`hour-${i}`}>{(i < 10)?`0${i}`:i}</option>
    }
    return option;
  }

  useEffect(() => {
    setOpenTime(`${open.hour}:${(open.min < 10)?`0${open.min}`:open.min}`)
    setCloseTime(`${close.hour}:${(close.min < 10)?`0${close.min}`:close.min}`)
  },[open,close]);

  return (
    <FormGroup fullMode={fullMode} title={title}> 
      <div>
        <div className="selectTimeBox">
          <label>여는 시간</label>
          <select onChange={({target})=>{
            setOpen({hour:target.value,min:open.min})
          }}>
            {renderHourOption()}
          </select>
          <select onChange={({target})=>{
            setOpen({hour:open.hour,min:target.value})
          }}>
            {
              min.map((v,i)=>{
                return <option value={v} key={`min-${i}`}>{(v < 10)?`0${v}`:v}</option>
              })
            }
          </select>
        </div>
        <div className="selectTimeBox">
          <label>닫는 시간</label>
          <select onChange={({target})=>{
            setClose({hour:target.value,min:close.min})
          }}>
            {renderHourOption()}
          </select>
          <select onChange={({target})=>{
            setClose({hour:close.hour,min:target.value})
          }}>
            {
              min.map((v,i)=>{
              return <option value={v} key={`min-${i}`}>{(v < 10)?`0${v}`:v}</option>
              })
            }
          </select>
        </div>
      </div>
    </FormGroup>
  )
};

export default SelectTime;
