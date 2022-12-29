import React from "react";
import { NotAvailableICon } from "../components/common/Icons";
const NotAvailable = () => {
  return (
    <>
      <div className="bg-f5fff7 full-page-view">
        <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
          <div className="row">
            <div className="col-12 text-center">
              <div className="not-available-card ">
                <div>
                  <NotAvailableICon />
                </div>
                <h3 className="heading my-4">
                  SERVICE NOT AVAILABLE IN YOUR REGION
                </h3>
                <p className="para mb-4 pb-2">
                  Offering not available in your region, This offering is
                  provided under Regulations and is not available to US
                  investors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotAvailable;
