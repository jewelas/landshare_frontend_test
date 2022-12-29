export default function useCompoundLS({
    state,
    startTransaction,
    transactionResult,
    functionName,
  }) {
    async function compoundLS() {
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
            .compoundReward()
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
      compoundLS,
    };
  }
  