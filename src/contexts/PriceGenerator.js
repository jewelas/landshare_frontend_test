import Web3, { utils } from "web3";
import ApePair from "./ApePair.json";


const coinPair = new Web3.eth.Contract(
    ApePair.abi,
    "0xB15f34082Baa4E3515A49E05D4d1D40cE933da0b"
  );

  const bnbPair = new Web3.eth.Contract(
    ApePair.abi,
    "0x51e6D27FA57373d8d4C256231241053a70Cb1d93"
  );

//price calculation

const reservesBNB = await bnbPair.methods.getReserves().call();

 const bnbPrice = reservesBNB[1] / reservesBNB[0];
  
const reservesToken = await coinPair.methods.getReserves().call();
  
const coinPrice = reservesToken[1] / reservesToken[0];
  
const usdPrice = coinPrice * bnbPrice;