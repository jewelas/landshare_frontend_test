import React from "react";
import ReactLoading from 'react-loading';

const RepairButton = ({ repair, repairStatus, isLoading, activated }) => {
  return (
    <>
      <button
        className={`btn fs-16 position-absolute btn-repair btn-repair-${
          (repairStatus && activated) ? "allow" : "disable"
        } ${isLoading ? 'd-flex justify-content-center align-items-center' : ''}`}
        onClick={() => repair()}
        disabled={!activated || !repairStatus || isLoading}
      >
        {isLoading ? (
          <>
            <ReactLoading type="spin" className="me-2 button-spinner" width="24px" height="24px" />
            <span className="upgrade-status">Loading</span>
          </>
        ) : (
          'REPAIR'
        )}
      </button>
    </>
  );
};

export default RepairButton;
