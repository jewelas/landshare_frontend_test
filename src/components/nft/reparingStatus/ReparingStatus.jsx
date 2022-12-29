import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import numeral from 'numeral';
import './ReparingStatus.css'

export const ReparingStatus = ({ max, now }) => {
  const showNow = numeral(Number(now)).format('0.[0]')
  return (
    <div className='progress-content-show' style={{ width: '100%' }}>
      {max > 100 ? (
        showNow > 100 ? (
          <ProgressBar max={max} now={showNow} label={`${showNow}%`} />
        ) : (
          <div className='d-flex w-100'>
            <div style={{ width: ((100 / max) * 100) + '%' }} className='empty-status'>
              <ProgressBar max={100} now={showNow} label={`${showNow}%`} />
            </div>
            <div style={{ width: ((100 * (max - 100)) / max) + '%' }} className='empty-status-progress'>
            </div>
          </div>
        )
      ) : (
        <ProgressBar max={max} now={showNow} label={`${showNow}%`} />
      )}
    </div>
  );
};
