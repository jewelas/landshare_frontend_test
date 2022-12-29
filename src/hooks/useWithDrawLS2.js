export default function useWithDrawLS({
    state,
    startTransaction,
    transactionResult,
    functionName,
  }) {
    async function withdrawLS2(amount) {
      if (state.isConnected == true) {
        if (
          Number(
            await state.depositBalance2
          ) === 0
        ) {
          return;
        }
        if (
          Number(
            await state.depositBalance2
          ) < amount
        ) {
          window.alert("Insufficient deposit amount");
          return;
        }
  

        if (
          Number(
            await state.depositBalance2
          ) === 0
        ) {
          window.alert("No deposit found");
          return;
        }
  
        startTransaction();
        try {
          await state.landStakeContract2.methods
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
    return { withdrawLS2 };
  }
  