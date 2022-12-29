import React, { useEffect, useState } from "react";
import Web3 from "web3";
import ReactLoading from "react-loading";
import Topbar from "../nft/topbar/Topbar";
import { useScreenFixedProvider } from "../../contexts/ScreenFixedProvider";
import { useLandshareFunctions } from "../../contexts/LandshareFunctionsProvider";
import YouOwn from "../nft/YouOwn";
import { NftItems } from "./nftItems/NftItems";
import HeaderModal from "../HeaderModal";

const NftList = () => {
  const { setNftRoute, setShowNftFooter } = useScreenFixedProvider();
  const { state } = useLandshareFunctions();
  const { account } = state;
  const [isLoading, setIsLoading] = useState(true);
  const [tokenIds, setTokenIds] = useState([]);
  const [userResource, setUserResource] = useState({
    resource: ["0", "0", "0", "0", "0"],
    maxPowerLimit: "0",
    multiplier: "1",
    landTokenBalance: "0",
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setShowNftFooter(false);
    setNftRoute(true);
    return () => {
      setNftRoute(false);
      setShowNftFooter(false);
    };
  }, []);
  const getHouses = async () => {
    if (state.houseNFT) {
      let houseTokenIds = [];
      let resource = ['0', '0', '0', '0', '0'];
      const houseTokenId = await state.houseNFT.methods
        .getActiveHouseByOwner(account)
        .call();
      let maxPowerLimit = 0;
      if (houseTokenId != 1000000000) {
        houseTokenIds = await state.houseNFT.methods
          .getHousesByOwner(account)
          .call();
        resource = await state.game.methods
          .getResource(state.account, houseTokenId)
          .call();
        maxPowerLimit = await state.houseNFT.methods
          .calculateMaxPowerLimitByUser(houseTokenId)
          .call();
      }
      const landTokenBalance = await state.landTokenContract.methods
        .balanceOf(state.account)
        .call();
      setTokenIds(houseTokenIds);
      setUserResource({
        resource,
        maxPowerLimit,
        landTokenBalance,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (state.web3) {
      getHouses();
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [state]);

  useEffect(() => {
    const interval = setInterval(() => {
      getHouses();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="container overflow-hidden">
        { isLoading ? (
          <div className="d-flex w-100 min-h-60vh h-100 align-items-center justify-content-center">
            <ReactLoading type="bars" color="#0ed145" />
          </div>
        ) : state.web3 === "undefined" || !state.isConnected ? (
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
            <div className="w-100 mb-4"></div>
            <NftItems tokenIds={tokenIds} />
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

export default NftList;
