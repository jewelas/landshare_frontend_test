import React from 'react'
import { 
  ChargeIcon,
  BrickIcon,
  LumberIcon,
  ConcreteIcon,
  SteelIcon
} from '../NftIcon';

export const HarvestCostContent = ({ 
  costs, 
  colorType, 
  color, 
  type
}) => {
  const disabledIcons = [
    // <ChargeIcon className="" iconColor='#00000080' />,
    <ChargeIcon className="" iconColor='#263238' />,
    <LumberIcon className="" iconColor='#263238' />,
    <BrickIcon className="" iconColor='#263238' />,
    <ConcreteIcon className="" iconColor='#263238' />,
    <SteelIcon className="" iconColor='#263238' />
  ]
  const activeIcons = [
    <ChargeIcon className="" iconColor='#263238' />,
    <LumberIcon className="" iconColor='#263238' />,
    <BrickIcon className="" iconColor='#263238' />,
    <ConcreteIcon className="" iconColor='#263238' />,
    <SteelIcon className="" iconColor='#263238' />
  ]

  return (
    <>
      <div className='d-flex flex-column px-2 pt-2'>        
        {type == 'overdrive' && (
          <div className='d-flex align-items-center justify-content-between'>
            {costs.reductionPercent.map((percent, index) => {
              if (Number(percent) > 0) {
                return (
                  <div key={`reduction-percent-${index}`}>
                    <span className='status-label'>Production: </span>
                    <span className={`status-production-${color != 'blue' ? color : 'grey'}`}>{`${percent}%`}</span>
                  </div>
                )
              }
            })}
          </div>
        )}        
        <div className="divider w-100 my-2"></div>
      </div>
      <div className='d-flex align-items-center px-2'>
        <span className='status-label'>Cost: </span>
        <div className='status-value w-100'>
          <div className='d-flex justify-content-between'>
            {costs.cost.map((cost, index) => {
              if (Number(cost) > 0) 
                return (
                  <div key={`next-cost-${index}`} className={`next-cost-icons yield-cost-value ${color != 'blue' ? color : 'grey'}`}>
                    {colorType == 0 ? (
                      <>
                        {`${cost} `}
                        {disabledIcons[index]}
                      </>
                    ) : (
                      <>
                        {`${cost} `}
                        {activeIcons[index]}
                      </>
                    )}
                  </div>
                )
            })}
            {costs.cost.map((cost, index) => {
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
