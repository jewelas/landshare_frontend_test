export default function useDepositPV({
  state,
  startTransaction,
  endTransaction,
  transactionResult,
  functionName,
}) {
  async function depositPV(amount) {
    startTransaction();
    if (state.isConnected == true) {
      if (
        Number(amount) >
        Number(await state.busd.methods.balanceOf(state.account).call())
      ) {
        endTransaction();
        window.alert("Insufficient Balance");
        return;
      }

      console.log(
        (Number(amount) +
          Number(
            await state.propertyVaultContract.methods
              .balanceOf(state.account)
              .call()
          )) /
          10
      );
      if (
        (Number(amount) +
          Number(
            await state.propertyVaultContract.methods
              .balanceOf(state.account)
              .call()
          )) /
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
        Number(amount) + Number(state.propertyVaultCurrentDepositTotal) >
        Number(state.currentVaultCapacity)
      ) {
        endTransaction();
        window.alert("Vault capacity reached");
        return;
      }

      try {
        await state.propertyVaultContract.methods
          .deposit(amount.toString())
          .send({ from: state.account })
          .on("receipt", async function () {
            transactionResult("Transaction Completed.", true);
            functionName();
          });
      } catch (e) {
        transactionResult("Transaction Failed.", false);
      }
    } else {
      endTransaction();
      window.alert("Please connect your wallet to BSC");
    }
  }

  return {
    depositPV,
  };
}
