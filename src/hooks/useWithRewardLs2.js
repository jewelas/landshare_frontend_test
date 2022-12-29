export default function useWithRewardLs2({
    state,
    startTransaction,
    transactionResult,
    functionName,
  }) {
    async function withdrawRewardLS2() {
      if (state.isConnected == true) {

        if (Number(state.rewardPool2) === 0) {
          window.alert("No Rewards Found.");
          return;
        }
        if (
          Number(
            state.depositBalance2
          ) === 0
        ) {
          window.alert("No deposit found");
          return;
        }
  
        startTransaction();
        try {
          await state.landStakeContract2.methods
            .withdraw(0)
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
      withdrawRewardLS2,
    };
  }
  