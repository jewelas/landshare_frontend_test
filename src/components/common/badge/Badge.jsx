import React from 'react';
import './Badge.css'

export const Badge = ({ 
  label1, 
  label2, 
  color 
}) => {
  return (
    <div className={`d-flex rounded-badge align-itmes-center justify-content-center ${color}`}>
      <div className='d-flex align-items-center'>
        <span className='badge-label1'>{label1}</span>
        <span className='badge-label2 ms-1'>{label2}</span>
      </div>
    </div>
  )
}
