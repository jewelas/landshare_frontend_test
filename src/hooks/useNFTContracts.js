import
import useWalletConnector from "../hooks/useWalletConnector";

export default function useWalletConnector({
    state,
    setState,

}) {

    const { disconnectWallet, walletConnector, metaMask, ONTOWallet } = useWalletConnector({
        state,
        setState,
    })

    const assetToken = new state.web3.eth.Contract(
        Token.abi,
        "0x9D986A3f147212327Dd658F712d5264a73a1fdB0"
    );




}

