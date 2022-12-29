import React from 'react';
import ReactLoading from 'react-loading';
import './BuyOrUpgrade.css';

export const BuyOrUpgrade = ({
  nextLevel,
  type,
  color,
  upgradeFacility,
  isLoading,
  children,
  activated = false
}) => {
  return (
    <>
      {nextLevel == 6 ? (
        <div className={`d-flex w-100 buy-or-upgrade-section justify-content-center align-items-center ${color}`}>
          <span className="upgrade-last my-3 fs-md fw-bold">LEVEL FIVE</span>
        </div>
      ) : (
        <div className={`d-flex flex-column w-100 buy-or-upgrade-section position-relative pb-0 ${color}`}>
          {children}
          <button
            onClick={() => upgradeFacility(type)}
            className={`btn nav-btn w-100 buy-or-upgrade-btn position-absolute ${color} ${((isLoading.type == type) && isLoading.loading) ? 'd-flex justify-content-center align-items-center' : ''}`}
            disabled={((isLoading.type == type) && isLoading.loading) || !activated}
          >
            {((isLoading.type == type) && isLoading.loading) ? (
              <>
                <ReactLoading type="spin" className="me-2 button-spinner" width="24px" height="24px" />
                <span className="upgrade-status">Loading</span>
              </>
            ) : (
              <>
                <span className="upgrade-status" size="sm">{nextLevel == 1 ? 'BUY' : 'UPGRADE'}</span>
                <span className="upgrade-value ms-1">{nextLevel > 1 ? 'TO LEVEL ' + nextLevel : ''}</span>
              </>
            )}
          </button>
        </div>
      )

      }
    </>
  )
}
