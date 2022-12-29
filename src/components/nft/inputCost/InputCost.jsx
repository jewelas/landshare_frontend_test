import React, { useEffect, useState } from "react";
import './InputCost.css';

export const InputCost = ({ width, height = 0, value, changeRepairAmount, calcMaxAmount }) => {
  return (
    <div 
      className="input-cost d-flex px-2"
      style={height ? { height: `${height}px` } : {}}
    >
      <input 
        type="text"
        className='input-cost-value'
        style={{ width: `${width}px` }}
        value={value}
        onChange={(e) => changeRepairAmount(e.target.value)}
      />
      <button className='btn btn-max px-2 me-2 fs-11 py-1' onClick={(e) => calcMaxAmount()} >
        MAX
      </button>
    </div>
  )
}
