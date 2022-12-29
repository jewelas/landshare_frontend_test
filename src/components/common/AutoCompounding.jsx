import React from "react";
import { useLandshareFunctions } from "../../contexts/LandshareFunctionsProvider";
import { AutoCompoundingIcon } from "./Icons";
import "./common.css"
const AutoCompounding = ({ handleShow }) => {
  const {
    state: { account },
    autoCompounding,
    isWalletAvailable,
    autoCompoundingHandler,
  } = useLandshareFunctions();

  return (
    <>
      <div className="d-flex align-items-center">
        <div
          onClick={handleShow}
          className="cursor-pointer d-flex align-items-center"
        >
          <span className="d-inline-block ms-3 me-1 my-2 fs-sm compound-text">
            Auto-compounding
          </span>{" "}
          <AutoCompoundingIcon />
        </div>
      </div>
      <div className="property-detail-page-toggle d-flex align-items-center my-2 ms-3 ">
        {/* : ( "(Wallet not connected!)" ) */}
        {account == "Not Connected" && isWalletAvailable == null && (
          <span className="notification text-white px-3  py-3">
            (Wallet not connected!)
          </span>
        )}
        {isWalletAvailable !== null && account !== "Not Connected" && (
          <div className="on-off-toggle">
            <input
              onChange={autoCompoundingHandler}
              className="on-off-toggle__input"
              checked={autoCompounding}
              type="checkbox"
              id="bopis"
            />
            <label htmlFor="bopis" className="on-off-toggle__slider"></label>
          </div>
        )}
      </div>
    </>
  );
};

export default AutoCompounding;
