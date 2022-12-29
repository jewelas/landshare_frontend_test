import Web3 from "web3";

export default function useApproveLS({
    state,
    startTransaction,
    endTransaction,
    transactionResult,
    functionName,
  }) {
    async function approveLS() {
      var amount = 1000000000;
      startTransaction();
      if (state.isConnected == true) {
  
        try {
            await state.landTokenContract.methods
              .approve(
                "0x35C7967e2D5D6341c51bfe9550F6402c84245868",
                Web3.utils.toWei(amount.toString(), "ether")
              )
              .send({ from: state.account }).on("receipt", async function () {
                transactionResult("Transaction Completed.");
                functionName();
              });
          } catch (e) {
         
            endTransaction();
            console.log(e)
          }
      } else {
        endTransaction();
        window.alert("Please connect your wallet to BSC");
      }
    }
    return {
      approveLS,
    };
  }
  