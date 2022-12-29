import React from 'react'
import ReactLoading from 'react-loading';
import './BuyOrUpgrade.css'

export const YieldCostUpgrade = ({ 
  children, 
  color, 
  btnLabel,
  onPurcharse,
  disabled,
  isLoading,
  type
}) => {
  return (
    <div className={`d-flex flex-column w-100 buy-or-upgrade-section position-relative ${color}`}>
      {children}
      <button
        onClick={onPurcharse}
        className={`btn nav-btn w-100 buy-or-upgrade-btn position-absolute ${color} ${((isLoading.type == type) && isLoading.loading) ? 'd-flex justify-content-center align-items-center' : ''}`}
        disabled={disabled || ((isLoading.type == type) && isLoading.loading)}
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
