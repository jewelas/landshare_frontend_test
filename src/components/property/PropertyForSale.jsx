import React, { useEffect } from "react";
import Property1 from "../../assets/img/property-img-1.png";
import Property3 from "../../assets/img/property-img-3.png";
import Property2 from "../../assets/img/property-img-2.png";
import Property4 from "../../assets/img/property-img-4.png";
import PropertyCards from "./PropertyCards";
import { useVaultBgProvider } from "../../contexts/VaultBgProvider";

const PropertyForSale = () => {
  const { setBackgoundVault } = useVaultBgProvider();

  useEffect(() => {
    setBackgoundVault(false);
  }, [setBackgoundVault]);

  return (
    <>
      <div className="container my-15px px-0 w-sm-80per mx-auto">
        <div className="my-2 my-sm-4 my-xxl-5">
          <p className="hero-heading mb-0 mb-sm-4">Property For Sale</p>
          <p className="hero-subHeading mb-2">
            Become the landlord of the future
          </p>
          <div className="row">
            <div className="col-11">
              <span className="para-text">
                For the first time, investors around the globe can buy into the
                US real estate market through fully-compliant, fractional,
                tokenized ownership. Powered by blockchain.
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-xl-6 mt-4 mb-3 pe-xxl-4">
            <img className="w-100 h-lg-483" src={Property1} alt="" />
          </div>
          <PropertyCards />
        </div>

        {/* cards section2 */}
        <div className="row flex-column-reverse flex-xl-row">
          <PropertyCards />
          <div className="col-12 col-xl-6 mt-5 mb-3">
            <img className="w-100 h-lg-483" src={Property2} alt="" />
          </div>
        </div>

        {/* cards section3 */}
        <div className="row">
          <div className="col-12 col-xl-6 mt-5 mb-3">
            <img className="w-100 h-lg-483" src={Property3} alt="" />
          </div>
          <PropertyCards />
        </div>

        {/* cards section4 */}
        <div className="row flex-column-reverse flex-xl-row">
          <PropertyCards />
          <div className="col-12 col-xl-6 mt-5 mb-3">
            <img className="w-100 h-lg-483" src={Property4} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyForSale;
