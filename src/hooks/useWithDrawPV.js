export default function useWithDrawPV({
  state,
  startTransaction,
  endTransaction,
  transactionResult,
  functionName,
}) {
  async function withdrawPV(amount) {
    startTransaction();
    if (state.isConnected == true) {
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
      if (
        Number(
          await state.propertyVaultContract.methods
            .balanceOf(state.account)
            .call()
        ) < amount
      ) {
        endTransaction();
        window.alert("Insufficient deposit amount");
        return;
      }
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
      try {
        await state.propertyVaultContract.methods
          .withdraw(amount)
          .send({ from: state.account })
          .on("receipt", async function () {
            transactionResult("Transaction Completed.", true);

            functionName();
          });
      } catch (e) {
        transactionResult("Transaction Failed.", false);
        console.log("Error, withdraw: ", e);
      }
      functionName();
    } else {
      endTransaction();
    }
  }
  return {
    withdrawPV,
  };
}
