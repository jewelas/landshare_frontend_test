import React from "react";
import ReactLoading from 'react-loading';

const FullPageLoading = () => {
  return (
    <>
      <div className="bg-f5fff7 d-flex justify-content-center align-items-center full-page-view">
        <ReactLoading type="bars" color="#0ed145" />
      </div>
    </>
  );
};

export default FullPageLoading;
