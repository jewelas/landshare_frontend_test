export default function useHarvestPV({
  state,
  startTransaction,
  endTransaction,
  transactionResult,
  functionName,
}) {
  async function harvestPV(e) {
    try {
      startTransaction();
      if (
        Number(
          await state.propertyVaultContract.methods
            .balanceOf(state.account)
            .call()
        ) /
          5 >
        Number(
          await state.landTokenContract.methods.balanceOf(state.account).call()
        )
      ) {
        endTransaction();
        window.alert("Insufficient LAND Token Balance.");
        return;
      }
      if (
        Number(
          await state.propertyVaultContract.methods
            .balanceOf(state.account)
            .call()
        ) === 0
      ) {
        endTransaction();
        window.alert("No deposit found");
        return;
      }
      await state.propertyVaultContract.methods
        .harvest()
        .send({ from: state.account })
        .on("receipt", async function () {
          transactionResult("Transaction Completed.", true);
          functionName();
        });
    } catch (e) {
      transactionResult("Transaction Failed.", false);
      console.log("Error, withdraw: ", e);
    }
    //await loadBlockchainData();
  }
  return { harvestPV };
}
