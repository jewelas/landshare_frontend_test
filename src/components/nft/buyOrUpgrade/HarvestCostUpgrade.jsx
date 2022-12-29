import React from 'react'
import ReactLoading from 'react-loading';
import './BuyOrUpgrade.css'

export const HarvestCostUpgrade = ({ 
  children, 
  color, 
  btnLabel,
  onPurcharse,
  isLoading,
  type,
  disabled
}) => {
  return (
    <div className={`d-flex flex-column w-100 buy-or-upgrade-section position-relative ${color}`}>
      {children}
      <button
        onClick={onPurcharse}
        className={`btn nav-btn w-100 buy-or-upgrade-btn position-absolute ${color} ${((isLoading.type == type) && isLoading.loading) ? 'd-flex justify-content-center align-items-center' : ''}`}
        disabled={(color != "yellow") || (btnLabel == "ACTIVE") || ((isLoading.type == type) && isLoading.loading) || disabled}
      >
        {((isLoading.type == type) && isLoading.loading) ? (
          <>
            <ReactLoading type="spin" className="me-2 button-spinner" width="24px" height="24px" />
            <span className="upgrade-status">Loading</span>
          </>
        ) : (
          <span className="upgrade-status">{btnLabel}</span>
        )}
      </button>
    </div>
  )
}
