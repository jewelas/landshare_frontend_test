import Web3 from "web3";

export default function useApproveLS2({
    state,
    startTransaction,
    endTransaction,
    transactionResult,
    functionName,
  }) {
    async function approveLS2() {
      var amount = 1000000000;
      startTransaction();
      if (state.isConnected == true) {
  
        try {
            await state.landTokenContract.methods
              .approve(
                "0x165448D15C5C4a3629dDf83AF6dfD0A10ecd435a",
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
      approveLS2,
    };
  }
  