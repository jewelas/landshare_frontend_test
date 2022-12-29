import React from 'react'
import { 
  ChargeIcon,
  BrickIcon,
  LumberIcon,
  ConcreteIcon,
  SteelIcon
} from '../NftIcon';

export const YieldCostContent = ({ 
  costs, 
  colorType, 
  color, 
  multiplier,
  receiveCost = [],
  btnLabel = '',
}) => {
  const disabledIcons = [
    <ChargeIcon className="" iconColor='#00000080' />,
    <LumberIcon className="" iconColor='#00000080' />,
    <BrickIcon className="" iconColor='#00000080' />,
    <ConcreteIcon className="" iconColor='#00000080' />,
    <SteelIcon className="" iconColor='#00000080' />
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
      <div className='d-flex flex-column yield-cost-value-content'>
        {((colorType < 2) || (btnLabel != 'SALVAGE')) ? (
          <div className='d-flex align-items-center'>
            <span className='status-label'>Yield: </span>
            <div className='status-value'>
              <span className={`status-value1 ${color}`}>
                x{multiplier}
              </span>
              <span className={`status-value1-land ${color}`}> LAND</span>
              <span className='status-value2 grey'> /year</span>
            </div>
          </div>
        ) : (
          <div className='d-flex align-items-center'>
            <span className='status-label'>Receive: </span>
            <div className='status-value w-100'>
              <div className='d-flex justify-content-between'>
                {receiveCost.map((cost, index) => {
                  if (Number(cost) > 0) 
                    return (
                      <div key={`next-cost-${index}`} className={`next-cost-icons fw-600 mt-1 yield-cost-value ${color}`}>
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
                {receiveCost.map((cost, index) => {
                  if (Number(cost) <= 0) 
                    return (
                      <div key={`next-empty-${index}`} className='next-cost-icons'>
                      </div>
                    )
                })}
              </div>
            </div>
          </div>
        )}
        <div className="divider w-100 my-1"></div>
      </div>
      <div className='d-flex align-items-center yield-cost-value-content'>
        <span className='status-label'>Cost: </span>
        <div className='status-value w-100'>
          <div className='d-flex justify-content-between'>
            {costs.map((cost, index) => {
              if (Number(cost) > 0) 
                return (
                  <div key={`next-cost-${index}`} className={`next-cost-icons fw-600 mt-1 yield-cost-value ${color}`}>
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
            {costs.map((cost, index) => {
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
