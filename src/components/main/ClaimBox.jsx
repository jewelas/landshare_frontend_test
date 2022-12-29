import React from "react";
import { useLandshareFunctions } from "../../contexts/LandshareFunctionsProvider";
import useClaimTokens from "../../hooks/useClaimTokens";
import Web3 from "web3";

const ClaimBox = () => {
  const {
    state,
    startTransaction,
    endTransaction,
    transactionResult,
    functionName,
  } = useLandshareFunctions();

  const { claimTokens } = useClaimTokens({
    state,
    startTransaction,
    endTransaction,
    transactionResult,
    functionName,
  });

  return (
    <>
      <div className="row">
        <div className="col d-flex justify-content-center">
          <div className="card-wrapper-vault p-3 p-sm-4 my-4 w-100 text-center max-w-539">
            <h5 className="fs-xs-18 fs-20 fw-500  d-block text-center d-sm-inline">
              Claim Presale Tokens
            </h5>
            <div className="d-flex flex-column flex-sm-row flex-md-row flex-lg-row flex-xl-row justify-content-around text-center align-items-center">
              <span className="d-flex flex-row justify-content-between">
                <span className="d-flex flex-column mt-3">
                  <span className="fs-xs-14 fs-16 text-4d4d4d font-medium">
                    Claimable
                  </span>
                  <span className="fs-xs-12 fs-16 fw-600 text-black ">
                    {Web3.utils.fromWei(state.claimableAmt.toString(), "ether")}
                  </span>
                </span>
                <span className="mx-4"></span>
                <span className="d-flex flex-column mt-3">
                  <span className="fs-xs-14 fs-16 text-4d4d4d font-medium">
                    Remaining
                  </span>
                  <span className="fs-xs-12 fs-16 fw-600 text-black ">
                    {state.unclaimedTokens}
                  </span>
                </span>
                <span className="mx-1"></span>
              </span>

              <button
                className="mt-3  btn withdraw-all-btn align-items-center d-flex flex-column justify-content-center"
                onClick={() => claimTokens()}
              >
                Claim
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClaimBox;
