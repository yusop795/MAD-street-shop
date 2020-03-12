import React, {useState} from 'react';
import { FormGroup } from '../FormGroup'
import './style.scss';

const SelectTime = ({fullMode = false, title = ''}) => {
  const min = [0,10,20,30,40,50]
  const [openTime, setOpenTime] = useState({hour:0,min:0});
  const [closeTime, setCloseTime] = useState({hour:0,min:0});

  const renderHourOption = ()=>{
    const hour = 24
    const option = []
    for (let i = 1; i <= hour; i++) {
      option[i] = <option value={`${i}`} key={`hour-${i}`}>{(i < 10)?`0${i}`:i}</option>
    }
    return option;
  }

  return (
    <FormGroup fullMode={fullMode} title={title}> 
      <div>
        <div className="selectTimeBox">
          <label>여는 시간</label>
          <select onChange={({target})=>{
            setOpenTime({hour:target.value,min:openTime.min})
          }}>
            {renderHourOption()}
          </select>
          <select onChange={({target})=>{
            setOpenTime({hour:openTime.hour,min:target.value})
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
            setCloseTime({hour:target.value,min:closeTime.min})
          }}>
            {renderHourOption()}
          </select>
          <select onChange={({target})=>{
            setCloseTime({hour:closeTime.hour,min:target.value})
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
