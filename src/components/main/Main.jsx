import ReactLoading from 'react-loading';
import LandTokenStacking from "./LandTokenStaking";
import PropertyVault from "./PropertyVault";
import "./Main.css";
import { useLandshareFunctions } from "../../contexts/LandshareFunctionsProvider";
import ClaimBox from "./ClaimBox";
import { useVaultBgProvider } from "../../contexts/VaultBgProvider";
import { useEffect } from "react";
import FullPageLoading from "../common/FullPageLoading";

export default function Main() {
  const { state } = useLandshareFunctions();
  const {
    setBackgoundVault,
    setWithOverlayBg,
    setVaultPageLoading,
    isVaultPageLoading,
  } = useVaultBgProvider();

  useEffect(() => {
    setBackgoundVault(true);
    setWithOverlayBg(false);
  }, [setBackgoundVault]);

  useEffect(() => {
    setTimeout(() => {
      setVaultPageLoading(false);
    }, 500);
  }, [isVaultPageLoading]);

  // IF BLOCK CHAIN LOADING TRUE SHOW LOADER ON PAGE ELSE SHOW CARDS
  if (state.isBlockchainDataLoading) {
    return (
      <>
        {/* IF VAULTPAGELOADING === TRUE SHOW LOADER ON FULL PAGE WITH OVERLAY */}
        {isVaultPageLoading ? (
          <FullPageLoading />
        ) : (
          <div className="container my-15px w-80 mx-auto d-flex flex-column justify-content-center align-items-center min-h-sm-200 min-h-700">
            <ReactLoading type="bars" color="#0ed145" />
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {isVaultPageLoading ? (
        <FullPageLoading />
      ) : (
        <>
          <div className="container my-15px w-80 mx-auto">
            <div className="row">
              {state.web3 === "undefined" || !state.isConnected ? (
                <div className="text-center min-h-60vh d-flex flex-column justify-content-center">
                  Please Connect Wallet
                </div>
              ) : (
                <>
                  <div className="col mt-3 mb-3">
                    <PropertyVault />
                  </div>
                  <div className="col mt-3 mb-3">
                    <LandTokenStacking />
                  </div>
                </>
              )}
            </div>
            {/* CLAIM PRESALE TOKENS  */}

            {state.web3 === "undefined" || !state.isConnected ? (
              ""
            ) : (
              <ClaimBox />
            )}
          </div>
        </>
      )}
    </>
  );
}
