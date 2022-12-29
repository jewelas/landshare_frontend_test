export default function useDepositLS({
  state,
  startTransaction,
  endTransaction,
  transactionResult,
  functionName,
}) {
  async function depositLS(amount) {
    startTransaction();
    const balance = await state.landTokenContract.methods
      .balanceOf(state.account)
      .call();
    if (state.isConnected == true) {
      if (Number(amount) > Number(balance)) {
        endTransaction();
        window.alert("Insufficient Balance");

        return;
      }

      try {
        await state.landStakeContract.methods
          .deposit(amount.toString())
          .send({ from: state.account })
          .on("receipt", async function () {
            transactionResult("Transaction Completed.");
            functionName();
          });
      } catch (e) {
        transactionResult("Transaction Failed.");
      }
    } else {
      endTransaction();
      window.alert("Please connect your wallet to BSC");
    }
  }

  async function depositLS2(amount) {
    startTransaction();

    const balance = await state.landTokenContract.methods
      .balanceOf(state.account)
      .call();
    if (state.isConnected == true) {
      if (Number(amount) > Number(balance)) {
        endTransaction();
        window.alert("Insufficient Balance");

        return;
      }

      try {
        await state.landStakeContract2.methods
          .deposit(amount.toString())
          .send({ from: state.account })
          .on("receipt", async function () {
            transactionResult("Transaction Completed.");
            functionName();
          });
      } catch (e) {
        transactionResult("Transaction Failed.");
      }
    } else {
      endTransaction();
      window.alert("Please connect your wallet to BSC");
    }
  }

  return {
    depositLS,
    depositLS2,
    
  };
}




