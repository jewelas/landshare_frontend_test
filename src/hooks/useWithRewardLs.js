export default function useWithRewardLs({
  state,
  startTransaction,
  transactionResult,
  functionName,
}) {
  async function withdrawRewardLS() {
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
      if (Number(state.rewardPool) === 0) {
        window.alert("No Rewards Found.");
        return;
      }
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
          .withdrawReward()
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

  return {
    withdrawRewardLS,
  };
}
