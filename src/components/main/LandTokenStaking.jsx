import LandTokenStackingContent from "./LandTokenStackingContent";
import { useLandshareFunctions } from "../../contexts/LandshareFunctionsProvider";
import Web3, { utils } from "web3";

export default function LandTokenStaking() {
  const { state } = useLandshareFunctions();

  async function approveLS() {
    var amount = 1000000000;
    try {
      await state.landTokenContract.methods
        .approve(
          state.landStakeAddress,
          Web3.utils.toWei(amount.toString(), "ether")
        )
        .send({ from: state.account });
      window.location.reload();
      //await loadBlockchainData();
    } catch (e) {
      window.alert("Insufficient BNB");
    }
  }
  async function approveLS2() {
    var amount = 1000000000;
    try {
      await state.landTokenContract2.methods
        .approve(
          "0xA52182e43F9814aFd0739fEeca0df14aa9cb26E2",
          Web3.utils.toWei(amount.toString(), "ether")
        )
        .send({ from: state.account });
      window.location.reload();
      //await loadBlockchainData();
    } catch (e) {
      window.alert("Insufficient BNB");
    }
  }
  return (
    <div className="ml-auto-sm-xl card-wrapper-vault m-below-md-auto br-1-255 h-100 w-100 max-w-sm-lg-300 max-w-lg-350  br-30 text-center py-3 px-xs-20 px-sm-35 min-h-700 d-flex flex-column">
      {/* {!state.isApprovedLandStake ? (
        <div className="my-auto">
          <div className="py-3 text-center font-semibold fs-28">
            LAND Token Staking
          </div>
          <button
            className="btn-card text-capitalize"
            disabled={state.isAlert ? true : false}
            onClick={() => approveLS()}
          >
            Approve
          </button>
        </div>
      ) : ( */}

      <LandTokenStackingContent />
      {/* )} */}
    </div>
  );
}
