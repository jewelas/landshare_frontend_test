export default function useClaimTokens({
  state,
  startTransaction,
  transactionResult,
  functionName,
}) {
  async function claimTokens() {
    if (state.isConnected == true) {
      console.log(state.claimableAmt);
      if (Number(state.claimableAmt) === 0) {
        window.alert("No Claim Found.");
        return;
      }

      startTransaction();
      try {
        await state.claimableContract.methods
          .withdraw()
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
    claimTokens,
  };
}
