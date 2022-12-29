import React from 'react'
import { 
  ChargeIcon,
  BrickIcon,
  LumberIcon,
  ConcreteIcon,
  SteelIcon
} from '../NftIcon';

export const ProductionCostContent = ({ 
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
      <div className='d-flex flex-column px-2'>
        {type == 'toolshed' && (
          <div className='d-flex align-items-center justify-content-between'>
            {costs.reductionPercent.map((percent, index) => {
              if (Number(percent) > 0) {
                return (
                  <div key={`reduction-percent-${index}`}>
                    <span className='status-label'>{disabledIcons[index]} repair: </span>
                    <span className='status-production'>{`-${percent}%`}</span>
                  </div>
                )
              } else {
                return (
                  <div key={`reduction-percent-${index}`}></div>
                )
              }
            })}
          </div>
        )}
        {type == 'overdrive' && (
          <div className='d-flex align-items-center justify-content-between'>
            {costs.reductionPercent.map((percent, index) => {
              if (Number(percent) > 0) {
                return (
                  <div key={`reduction-percent-${index}`}>
                    <span className='status-label'>{disabledIcons[index]} Increase Production: </span>
                    <span className='status-production'>{`${percent}%`}</span>
                  </div>
                )
              }
            })}
          </div>
        )}
        {type == 'fatification' && (
          <div className='d-flex justify-content-between'>
            <div>
              <span className='status-label'>Durability: </span>
              <span className='status-production'>{costs.durability}</span>
            </div>
            {costs.maxDurability && (
              <div>
                <span className='status-label'>Max Durability: </span>
                <span className='status-production'>+{costs.maxDurability - 100}%</span>
              </div>
            )}
          </div>
        )}
        {type == 'harvester' && (
          <div className='d-flex justify-content-start'>
            <div>
              <span className='status-label'>Harvest Cost: </span>
              <span className='status-production'>-{costs.reductionPercent}%</span>
            </div>
          </div>
        )}
        {type == 'concreteFoundation' && (
          <div className='d-flex justify-content-start'>
            <div>
              <span className='status-label'>Durability Loss: </span>
              <span className='status-production'>{`-${(10 - Number(costs.durability / 2 ?? 0)) * 10}`}%</span>
            </div>
          </div>
        )}
        <div className="divider w-100 my-2"></div>
      </div>
      <div className='d-flex pb-3 align-items-center px-2'>
        <span className='status-label'>Cost: </span>
        <div className='status-value w-100'>
          <div className='d-flex justify-content-between'>
            {costs.cost.map((cost, index) => {
              if (Number(cost) > 0) 
                return (
                  <div key={`next-cost-${index}`} className={`next-cost-icons yield-cost-value ${color}`}>
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
