import React from 'react';
import { 
  ChargeIcon,
  BrickIcon,
  LumberIcon,
  ConcreteIcon,
  SteelIcon
} from '../NftIcon';

export const FacilityContent = ({ 
  nextYield, 
  nextCost,
  type
}) => {
  const icons = [
    <ChargeIcon className="" iconColor='#323131' />,
    <LumberIcon className="" iconColor='#323131' />,
    <BrickIcon className="" iconColor='#323131' />,
    <ConcreteIcon className="" iconColor='#323131' />,
    <SteelIcon className="" iconColor='#323131' />
  ]

  return (
    <>
      <div className='d-flex flex-column facility-value-content facility-value-content-header'>
        <div className='d-flex align-items-center'>
          <span className='status-label'>Yield: </span>
          <div className='status-value'>
            <span className='fs-16 fw-600'>{`${nextYield} `}</span>
            {icons[type]}
            <span className='fs-12 fw-600'> /day</span>
          </div>
        </div>
        <div className="divider w-100"></div>
      </div>
      <div className='d-flex pb-2 align-items-center facility-value-content'>
        <span className='status-label'>Cost: </span>
        <div className='status-value w-100'>
          <div className='d-flex justify-content-between'>
            {nextCost.map((cost, index) => {
              if (Number(cost) > 0) 
                return (
                  <div key={`next-cost-${index}`} className='next-cost-icons fs-16 fw-600'>
                    {`${cost} `}
                    {icons[index]}
                  </div>
                )
            })}
            {nextCost.map((cost, index) => {
              if (Number(cost) <= 0) 
                return (
                  <div key={`next-empty-${index}`} className='next-cost-icons'>
                  </div>
                )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
