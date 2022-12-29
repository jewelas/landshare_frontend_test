export default function useWithDrawLS({
  state,
  startTransaction,
  transactionResult,
  functionName,
}) {
  async function withdrawLS(amount) {
    if (state.isConnected == true) {
      if (
        Number(
          await state.landStakeContract.methods
            .amountStaked(state.account)
            .call()
        ) === 0
      ) {
        return;
      }
      if (
        Number(
          await state.landStakeContract.methods
            .amountStaked(state.account)
            .call()
        ) < amount
      ) {
        window.alert("Insufficient deposit amount");
        return;
      }

      console.log(
        await state.landStakeContract.methods.amountStaked(state.account).call()
      );
      if (
        Number(
          await state.landStakeContract.methods
            .amountStaked(state.account)
            .call()
        ) === 0
      ) {
        window.alert("No deposit found");
        return;
      }

      startTransaction();
      try {
        await state.landStakeContract.methods
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
    }
  }
  return { withdrawLS };
}
