import React from "react";

const RestrictedCountry = () => {
  return (
    <>
      <div
        className="
        container
        vh-100
        d-flex
        flex-column
        justify-content-center
        align-items-center
      "
      >
        <h2 className="error">Error:</h2>
        <p className="not-found">
          This offering is not available in your country
        </p>
      </div>
    </>
  );
};
export default RestrictedCountry;
