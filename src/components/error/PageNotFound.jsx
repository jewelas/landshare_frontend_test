import React from "react";
import LandShareLogo from "../../assets/img/icons/logo.svg";

const PageNotFound = () => {
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
        <img cas="w-100" src={LandShareLogo} alt="LandShareLogo" />
        <h2 className="error">404</h2>
        <p className="not-found">page not found</p>
      </div>
    </>
  );
};
export default PageNotFound;
