import PropertyVaultContent from "./PropertyVaultContent";
import Web3, { utils } from "web3";
import { useLandshareFunctions } from "../../contexts/LandshareFunctionsProvider";

export default function PropertyVault() {
  const { state } = useLandshareFunctions();

  async function approvePV() {
    var amount = 1000000000;
    try {
      await state.busd.methods
        .approve(
          state.propertyVaultAddress,
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
    <div className="card-wrapper-vault m-below-md-auto ms-lg-auto h-100 w-100 max-w-sm-lg-300 max-w-lg-350 text-center py-3 px-xs-20 px-sm-35 min-h-700 d-flex flex-column">
      <PropertyVaultContent />
    </div>
  );
}
