import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Topbar from "../nft/topbar/Topbar";
import { useScreenFixedProvider } from "../../contexts/ScreenFixedProvider";
import { useLandshareFunctions } from "../../contexts/LandshareFunctionsProvider";
import YouOwn from "../nft/YouOwn";
import { MarketplaceItems } from "./MarketplaceItems/MarketplaceItems";
import { InputIcon, SelectarrowIcon } from "../common/Icons";
import HeaderModal from "../HeaderModal";
const { toBN, fromWei } = Web3.utils;

const Marketplace = () => {
  const { setNftRoute, setShowNftFooter } = useScreenFixedProvider();
  const { state } = useLandshareFunctions();
  const [modalIsOpen, setIsOpen] = useState(false);
  const { account } = state;
  // TODO: Using hook for marketplaceIds and marketplaces. These should be fetch usign web3
  // const [marketplaceIds, setMarketplaceIds] = useState([]);
  // const [marketplaces, setMarketplaces] = useState({});
  const marketplaceIds = ["0", "1"];
  const marketplaces = {
    0: {
      currentDurability: "100000000000000000000",
      facilityLevel: ["1", "0", "0", "0", "0"],
      maxDurability: "100000000000000000000",
      multiplier: "1000000000000000000",
      activated: false,
      tokenReward: 100,
    },
    1: {
      currentDurability: "100000000000000000000",
      facilityLevel: ["1", "0", "0", "0", "0"],
      maxDurability: "100000000000000000000",
      multiplier: "1000000000000000000",
      activated: true,
      tokenReward: 1000,
    },
  };
  const [userResource, setUserResource] = useState({
    resource: ["0", "0", "0", "0", "0"],
    maxPowerLimit: "0",
    multiplier: "1",
    landTokenBalance: "0",
  });

  useEffect(() => {
    setNftRoute(true);
    setShowNftFooter(true);
    return () => {
      setNftRoute(false);
      setShowNftFooter(false);
    };
  }, []);

  return (
    <>
      <div className="container ">
        {state.web3 === "undefined" || !state.isConnected ? (
          <div className="text-center min-h-60vh d-flex flex-column justify-content-center align-items-center">
            <button
              className='btn nav-btn d-flex align-items-center justify-content-center px-5 fs-xs fw-700'
              onClick={() => setIsOpen(true)}
            >
              Connect Wallet
            </button>
          </div>
        ) : (
          <>
            <Topbar isNftList={true} />

            <div className="d-flex w-100 overflow-auto scrollbar-style  flex-wrap align-items-center justify-conetent-between ">
              <span className="fw-bold fs-md">Marketplace</span>
              <div className="divider w-100 d-block d-md-none d my-3"></div>
              <div className="d-flex ms-md-4 mb-3 mb-md-3 marketplace-input-wrapper  flex-nowrap flex-grow-1 justify-content-start justify-content-md-end">
                <div className="">
                  <div className="w-100 d-flex align-items-center py-2 justify-content-between search-input">
                    <input
                      type="text"
                      className="bg-transparent w-100 border-0"
                      placeholder="Search by name, address"
                    />
                    <InputIcon />
                  </div>
                </div>
                <div className="d-flex ms-sm-4 ms-1 align-items-center">
                  <label
                    htmlFor="marketplace-sort"
                    className="d-inline-block white-space-nowrap me-1 fs-16 fw-500 text-black-500"
                  >
                    Sort by:
                  </label>
                  <div className="position-relative marketplace-selection me-2">
                    <select
                      className="border-0 w-100 position-absolute"
                      name="marketplace-sort"
                      id="marketplace-sort"
                    >
                      <option value="volvo">APY</option>
                    </select>
                    <SelectarrowIcon />
                  </div>
                </div>
              </div>
            </div>

            <div className="divider d-none d-md-block w-100 mb-5"></div>
            <MarketplaceItems
              marketplaceIds={marketplaceIds}
              marketplaces={marketplaces}
            />
          </>
        )}
      </div>
      {state.web3 !== "undefined" && state.isConnected && (
        <YouOwn
          resource={userResource.resource}
          maxPowerLimit={userResource.maxPowerLimit}
          landTokenBalance={userResource.landTokenBalance}
        />
      )}
      <HeaderModal
        isOpen={modalIsOpen}
        closeModal={() => setIsOpen(false)}
      />
    </>
  );
};

export default Marketplace;
